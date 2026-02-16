document.addEventListener('DOMContentLoaded', function () {
  const codeInput = document.getElementById('codeInput');
  const hideRadios = document.getElementsByName('hideCode');
  const verifyBtn = document.getElementById('verifyBtn');
  const resultDiv = document.getElementById('result');
  const cardTypeSelect = document.getElementById('cardType');
  const form = document.getElementById('verifyForm');
  const darkModeToggle = document.getElementById('darkModeToggle');

  // Dark mode gestion
  function setDarkMode(on) {
    if (on) {
      document.body.classList.add('dark');
      localStorage.setItem('darkMode', '1');
      darkModeToggle.innerHTML = '<i class="fa-solid fa-sun"></i>';
      darkModeToggle.title = 'Désactiver le mode sombre';
    } else {
      document.body.classList.remove('dark');
      localStorage.setItem('darkMode', '0');
      darkModeToggle.innerHTML = '<i class="fa-solid fa-moon"></i>';
      darkModeToggle.title = 'Activer le mode sombre';
    }
  }
  // Initialisation dark mode
  setDarkMode(localStorage.getItem('darkMode') === '1');
  darkModeToggle.addEventListener('click', () => {
    setDarkMode(!document.body.classList.contains('dark'));
  });

  // Gère l'affichage ou le masquage du code
  hideRadios.forEach(radio => {
    radio.addEventListener('change', function () {
      codeInput.type = (this.value === 'yes') ? 'password' : 'text';
    });
  });

  form.addEventListener('submit', async function (e) {
    e.preventDefault();
    const cardType = cardTypeSelect.value;
    const code = codeInput.value.trim();
    resultDiv.className = 'result-badge';
    resultDiv.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Vérification en cours...';
    try {
      const response = await fetch('/api/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cardType, code })
      });
      const data = await response.json();
      if (data.valid) {
        resultDiv.className = 'result-badge valid';
        resultDiv.innerHTML = '<i class="fa-solid fa-circle-check"></i> ' + data.message;
      } else {
        resultDiv.className = 'result-badge invalid';
        resultDiv.innerHTML = '<i class="fa-solid fa-circle-xmark"></i> ' + data.message;
      }
    } catch (err) {
      resultDiv.className = 'result-badge invalid';
      resultDiv.innerHTML = '<i class="fa-solid fa-triangle-exclamation"></i> Erreur de connexion au serveur.';
    }
  });
});

