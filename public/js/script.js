document.getElementById('verifForm').addEventListener('submit', async function(e) {
  e.preventDefault();
  const cardInput = document.getElementById('cardInput').value.trim();
  const resultDiv = document.getElementById('result');
  resultDiv.textContent = "";
  resultDiv.className = "";

  // Validation côté client
  if (!cardInput) {
    resultDiv.textContent = "Veuillez entrer un numéro de carte.";
    resultDiv.className = "alert alert-warning";
    return;
  }
  if (!/^[0-9]+$/.test(cardInput)) {
    resultDiv.textContent = "Le numéro de carte doit contenir uniquement des chiffres.";
    resultDiv.className = "alert alert-warning";
    return;
  }
  if (cardInput.length < 8 || cardInput.length > 20) {
    resultDiv.textContent = "Le numéro de carte doit comporter entre 8 et 20 chiffres.";
    resultDiv.className = "alert alert-warning";
    return;
  }

  resultDiv.textContent = "Vérification en cours...";
  resultDiv.className = "";

  try {
    const response = await fetch('/api/verif', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ card: cardInput })
    });
    const data = await response.json();
    if(data.status === 'ok') {
      resultDiv.textContent = data.message || "Carte vérifiée avec succès !";
      resultDiv.className = "alert alert-success";
    } else {
      resultDiv.textContent = data.message || "Erreur de vérification.";
      resultDiv.className = "alert alert-danger";
    }
  } catch (err) {
    resultDiv.textContent = "Erreur de communication avec le serveur.";
    resultDiv.className = "alert alert-danger";
  }
});
