const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Pour servir les fichiers statiques (HTML, CSS, JS, etc.)
app.use(express.static(path.join(__dirname, '../public')));
app.use(express.json());

// Exemple de route API
app.post('/api/verif', (req, res) => {
  // Traitement de la vérification ici
  res.json({ status: 'ok', message: 'Vérification à implémenter' });
});

app.listen(PORT, () => {
  console.log(`Serveur démarré sur http://localhost:${PORT}`);
});