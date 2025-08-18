document.getElementById('verifForm').addEventListener('submit', async function (e) {
  e.preventDefault();
  const cardInput = document.getElementById('cardInput').value.trim();
  const resultDiv = document.getElementById('result');
  resultDiv.textContent = "Vérification en cours…";
  resultDiv.className = "";

  try {
    const response = await fetch('/api/verif', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ card: cardInput })
    });
    const data = await response.json();
    resultDiv.textContent = data.message;
    if (data.status === 'ok') {
      resultDiv.className = "alert alert-success";
    } else {
      resultDiv.className = "alert alert-danger";
    }
  } catch (err) {
    resultDiv.textContent = "Erreur lors de la vérification.";
    resultDiv.className = "alert alert-danger";
  }
});