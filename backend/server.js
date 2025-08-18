const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

app.post('/api/verif', (req, res) => {
  const { card } = req.body;
  // Ex : vérification simple, à remplacer selon la logique attendue
  if (card && card.length === 16 && /^\d+$/.test(card)) {
    res.json({ status: 'ok', message: 'Carte valide ✅' });
  } else {
    res.json({ status: 'error', message: 'Carte invalide ❌' });
  }
});

app.listen(PORT, () => {
  console.log(`Serveur démarré sur http://localhost:${PORT}`);
});
