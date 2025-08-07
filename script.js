// Gestion des onglets
document.addEventListener('DOMContentLoaded', function() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetTab = btn.getAttribute('data-tab');
            
            // Retirer la classe active de tous les onglets
            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Ajouter la classe active à l'onglet cliqué
            btn.classList.add('active');
            document.getElementById(targetTab + '-tab').classList.add('active');
            });
});

// Fonction de vérification de cartes cadeaux
function verifyGiftCard() {
    const cardType = document.getElementById('card-type').value;
    const cardCode = document.getElementById('gift-card-input').value.trim();
    const resultDiv = document.getElementById('gift-card-result');
    
    if (!cardCode) {
        showResult(resultDiv, 'Veuillez entrer un code de carte cadeau.', 'error');
        return;
    }

    // Validation basée sur le type de carte
    const validationResult = validateGiftCard(cardType, cardCode);
    
    if (validationResult.isValid) {
        showResult(resultDiv, `<i class="fas fa-check-circle"></i> Carte ${validationResult.cardName} valide ! ${validationResult.message}`, 'success');
    } else {
        showResult(resultDiv, `<i class="fas fa-times-circle"></i> Code invalide pour ${validationResult.cardName}. ${validationResult.message}`, 'error');
    }
}

// Fonction de validation des cartes cadeaux
function validateGiftCard(cardType, code) {
    const cardTypes = {
        'transcash': { name: 'Transcash', pattern: /^[0-9]{16}$/, message: 'Format attendu : 16 chiffres' },
        'google-play': { name: 'Google Play', pattern: /^[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}$/, message: 'Format attendu : XXXX-XXXX-XXXX-XXXX' },
        'steam': { name: 'Steam', pattern: /^[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}$/, message: 'Format attendu : XXXX-XXXX-XXXX' },
        'paysafe': { name: 'Paysafe', pattern: /^[0-9]{16}$/, message: 'Format attendu : 16 chiffres' },
        'pcs': { name: 'PCS', pattern: /^[A-Z0-9]{8,12}$/, message: 'Format attendu : 8-12 caractères alphanumériques' },
        'itunes': { name: 'iTunes', pattern: /^[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}$/, message: 'Format attendu : XXXX-XXXX-XXXX-XXXX' },
        'neosurf': { name: 'Néosurf', pattern: /^[A-Z0-9]{10}$/, message: 'Format attendu : 10 caractères alphanumériques' },
        'amazon': { name: 'Amazon', pattern: /^[A-Z0-9]{4}-[A-Z0-9]{6}-[A-Z0-9]{4}$/, message: 'Format attendu : XXXX-XXXXXX-XXXX' },
        'netflix': { name: 'Netflix', pattern: /^[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}$/, message: 'Format attendu : XXXX-XXXX-XXXX-XXXX' },
        'spotify': { name: 'Spotify', pattern: /^[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}$/, message: 'Format attendu : XXXX-XXXX-XXXX-XXXX' }
    };

    const cardInfo = cardTypes[cardType];
    const isValid = cardInfo.pattern.test(code.toUpperCase());
    
    return {
        isValid,
        cardName: cardInfo.name,
        message: isValid ? 'Code vérifié avec succès.' : cardInfo.message
    };
}

// Fonction de vérification de codes
function verifyCode() {
    const codeType = document.getElementById('code-type').value;
    const code = document.getElementById('code-input').value.trim();
    const resultDiv = document.getElementById('code-result');
    
    if (!code) {
        showResult(resultDiv, 'Veuillez entrer un code à vérifier.', 'error');
        return;
    }

    // Validation basée sur le type de code
    const validationResult = validateCode(codeType, code);
    
    if (validationResult.isValid) {
        showResult(resultDiv, `<i class="fas fa-check-circle"></i> Code ${validationResult.codeName} valide ! ${validationResult.message}`, 'success');
    } else {
        showResult(resultDiv, `<i class="fas fa-times-circle"></i> Code ${validationResult.codeName} invalide. ${validationResult.message}`, 'error');
    }
}

// Fonction de validation des codes
function validateCode(codeType, code) {
    const codeTypes = {
        'promo': { name: 'promo', pattern: /^[A-Z0-9]{4,12}$/, message: 'Format attendu : 4-12 caractères alphanumériques' },
        'coupon': { name: 'coupon', pattern: /^[A-Z0-9]{6,16}$/, message: 'Format attendu : 6-16 caractères alphanumériques' },
        'serial': { name: 'numéro de série', pattern: /^[A-Z0-9]{8,20}$/, message: 'Format attendu : 8-20 caractères alphanumériques' },
        'activation': { name: 'd\'activation', pattern: /^[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}-[A-Z0-9]{4}$/, message: 'Format attendu : XXXX-XXXX-XXXX-XXXX' },
        'license': { name: 'de licence', pattern: /^[A-Z0-9]{5}-[A-Z0-9]{5}-[A-Z0-9]{5}-[A-Z0-9]{5}$/, message: 'Format attendu : XXXXX-XXXXX-XXXXX-XXXXX' },
        'voucher': { name: 'bon d\'achat', pattern: /^[A-Z0-9]{6,12}$/, message: 'Format attendu : 6-12 caractères alphanumériques' }
    };

    const codeInfo = codeTypes[codeType];
    const isValid = codeInfo.pattern.test(code.toUpperCase());
    
    return {
        isValid,
        codeName: codeInfo.name,
        message: isValid ? 'Code vérifié avec succès.' : codeInfo.message
    };
}

// ===== FONCTIONS DE GESTION EMAIL =====

// Sauvegarder la configuration email
function saveEmailConfig() {
    const email = document.getElementById('notification-email').value.trim();
    const statusDiv = document.getElementById('email-status');
    
    if (!email) {
        showEmailStatus('Veuillez entrer une adresse email.', 'error');
        return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showEmailStatus('Adresse email invalide.', 'error');
        return;
    }

    // Sauvegarder dans le localStorage
    localStorage.setItem('notificationEmail', email);
    showEmailStatus('Email sauvegardé avec succès !', 'success');
}

// Charger la configuration email
function loadEmailConfig() {
    const savedEmail = localStorage.getItem('notificationEmail');
    if (savedEmail) {
        document.getElementById('notification-email').value = savedEmail;
    }
}

// Afficher le statut de l'email
function showEmailStatus(message, type) {
    const statusDiv = document.getElementById('email-status');
    statusDiv.textContent = message;
    statusDiv.className = `email-status ${type}`;
    
    // Masquer le message après 3 secondes
    setTimeout(() => {
        statusDiv.style.display = 'none';
    }, 3000);
}

// Envoyer un email de notification
async function sendNotificationEmail(verificationData) {
    const savedEmail = localStorage.getItem('notificationEmail');
    
    if (!savedEmail) {
        console.log('Aucun email configuré pour les notifications');
        return;
    }

    try {
        // Utiliser EmailJS pour envoyer l'email
        // Note: Vous devrez configurer EmailJS avec vos propres clés
        const templateParams = {
            to_email: savedEmail,
            verification_type: verificationData.type,
            input_value: verificationData.value,
            result: verificationData.result,
            timestamp: new Date().toLocaleString('fr-FR'),
            user_agent: navigator.userAgent
        };

        // Simulation d'envoi d'email (remplacez par votre service)
        console.log('Email de notification:', templateParams);
        
        // Pour un vrai envoi, utilisez EmailJS ou un autre service
        // emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', templateParams)
        
        // Pour l'instant, on simule l'envoi
        showEmailStatus('Notification envoyée par email !', 'success');
        
    } catch (error) {
        console.error('Erreur lors de l\'envoi de l\'email:', error);
        showEmailStatus('Erreur lors de l\'envoi de l\'email.', 'error');
    }
}

// Fonction modifiée pour inclure l'envoi d'email
function showResult(element, message, type) {
    element.innerHTML = message;
    element.className = `result ${type}`;
    element.style.display = 'block';
    
    // Récupérer les données de vérification pour l'email
    const verificationData = getVerificationData();
    if (verificationData) {
        sendNotificationEmail(verificationData);
    }
}

// Récupérer les données de vérification actuelles
function getVerificationData() {
    const activeTab = document.querySelector('.tab-content.active');
    if (!activeTab) return null;

    const tabId = activeTab.id;
    let type = '';
    let value = '';
    let result = '';

    switch (tabId) {
        case 'email-tab':
            type = 'Email';
            value = document.getElementById('email-input').value;
            result = document.getElementById('email-result').textContent;
            break;
        case 'phone-tab':
            type = 'Téléphone';
            value = document.getElementById('phone-input').value;
            result = document.getElementById('phone-result').textContent;
            break;
        case 'password-tab':
            type = 'Mot de passe';
            value = '***' + document.getElementById('password-input').value.slice(-3); // Masquer le mot de passe
            result = document.getElementById('password-result').textContent;
            break;
        case 'url-tab':
            type = 'URL';
            value = document.getElementById('url-input').value;
            result = document.getElementById('url-result').textContent;
            break;
        case 'credit-card-tab':
            type = 'Carte bancaire';
            value = document.getElementById('card-input').value;
            result = document.getElementById('card-result').textContent;
            break;
        case 'gift-cards-tab':
            type = 'Carte cadeau';
            value = document.getElementById('gift-card-input').value;
            result = document.getElementById('gift-card-result').textContent;
            break;
        case 'codes-tab':
            type = 'Code';
            value = document.getElementById('code-input').value;
            result = document.getElementById('code-result').textContent;
            break;
    }

    return {
        type,
        value,
        result,
        timestamp: new Date().toISOString()
    };
}

    // Vérification en temps réel du mot de passe
    const passwordInput = document.getElementById('password-input');
    if (passwordInput) {
        passwordInput.addEventListener('input', updatePasswordStrength);
    }

    // Formatage automatique du numéro de carte
    const cardInput = document.getElementById('card-input');
    if (cardInput) {
        cardInput.addEventListener('input', formatCardNumber);
    }

    // Gestion de l'option "cacher le code" pour les cartes cadeaux
    const hideCodeToggle = document.getElementById('hide-code-toggle');
    const giftCardInput = document.getElementById('gift-card-input');
    if (hideCodeToggle && giftCardInput) {
        hideCodeToggle.addEventListener('change', function() {
            giftCardInput.type = this.checked ? 'password' : 'text';
        });
    }

        // Gestion de l'option "cacher le code" pour les codes
    const hideCodeToggle2 = document.getElementById('hide-code-toggle-2');
    const codeInput = document.getElementById('code-input');
    if (hideCodeToggle2 && codeInput) {
        hideCodeToggle2.addEventListener('change', function() {
            codeInput.type = this.checked ? 'password' : 'text';
        });
    }

    // Charger l'email sauvegardé au démarrage
    loadEmailConfig();
});

// Fonction de vérification d'email
function verifyEmail() {
    const email = document.getElementById('email-input').value.trim();
    const resultDiv = document.getElementById('email-result');
    
    if (!email) {
        showResult(resultDiv, 'Veuillez entrer une adresse email.', 'error');
        return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (emailRegex.test(email)) {
        showResult(resultDiv, '<i class="fas fa-check-circle"></i> Adresse email valide !', 'success');
    } else {
        showResult(resultDiv, '<i class="fas fa-times-circle"></i> Adresse email invalide. Veuillez vérifier le format.', 'error');
    }
}

// Fonction de vérification de téléphone
function verifyPhone() {
    const phone = document.getElementById('phone-input').value.trim();
    const resultDiv = document.getElementById('phone-result');
    
    if (!phone) {
        showResult(resultDiv, 'Veuillez entrer un numéro de téléphone.', 'error');
        return;
    }

    // Regex pour les formats français et internationaux
    const phoneRegex = /^(\+33|0)[1-9](\d{8})$/;
    const cleanPhone = phone.replace(/\s/g, '');
    
    if (phoneRegex.test(cleanPhone)) {
        showResult(resultDiv, '<i class="fas fa-check-circle"></i> Numéro de téléphone valide !', 'success');
    } else {
        showResult(resultDiv, '<i class="fas fa-times-circle"></i> Numéro de téléphone invalide. Format attendu : +33XXXXXXXXX ou 0XXXXXXXXX', 'error');
    }
}

// Fonction de vérification de mot de passe
function verifyPassword() {
    const password = document.getElementById('password-input').value;
    const resultDiv = document.getElementById('password-result');
    
    if (!password) {
        showResult(resultDiv, 'Veuillez entrer un mot de passe.', 'error');
        return;
    }

    const strength = calculatePasswordStrength(password);
    let message = '';
    let resultClass = '';

    switch (strength.level) {
        case 'weak':
            message = '<i class="fas fa-exclamation-triangle"></i> Mot de passe faible. Ajoutez des lettres majuscules, des chiffres et des caractères spéciaux.';
            resultClass = 'error';
            break;
        case 'medium':
            message = '<i class="fas fa-info-circle"></i> Mot de passe moyen. Pour plus de sécurité, ajoutez des caractères spéciaux.';
            resultClass = 'info';
            break;
        case 'strong':
            message = '<i class="fas fa-check-circle"></i> Mot de passe fort !';
            resultClass = 'success';
            break;
        case 'very-strong':
            message = '<i class="fas fa-shield-alt"></i> Mot de passe très fort ! Excellent niveau de sécurité.';
            resultClass = 'success';
            break;
    }

    showResult(resultDiv, message, resultClass);
}

// Fonction de calcul de la force du mot de passe
function calculatePasswordStrength(password) {
    let score = 0;
    let feedback = [];

    // Longueur
    if (password.length >= 8) score += 1;
    if (password.length >= 12) score += 1;
    
    // Lettres minuscules
    if (/[a-z]/.test(password)) score += 1;
    
    // Lettres majuscules
    if (/[A-Z]/.test(password)) score += 1;
    
    // Chiffres
    if (/\d/.test(password)) score += 1;
    
    // Caractères spéciaux
    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) score += 1;

    let level = 'weak';
    if (score >= 5) level = 'very-strong';
    else if (score >= 4) level = 'strong';
    else if (score >= 3) level = 'medium';

    return { level, score };
}

// Fonction de mise à jour de la force du mot de passe en temps réel
function updatePasswordStrength() {
    const password = document.getElementById('password-input').value;
    const strengthFill = document.getElementById('strength-fill');
    const strengthText = document.getElementById('strength-text');
    
    if (!password) {
        strengthFill.className = 'strength-fill';
        strengthText.textContent = 'Force du mot de passe';
        return;
    }

    const strength = calculatePasswordStrength(password);
    
    strengthFill.className = `strength-fill ${strength.level}`;
    
    switch (strength.level) {
        case 'weak':
            strengthText.textContent = 'Faible';
            break;
        case 'medium':
            strengthText.textContent = 'Moyen';
            break;
        case 'strong':
            strengthText.textContent = 'Fort';
            break;
        case 'very-strong':
            strengthText.textContent = 'Très fort';
            break;
    }
}

// Fonction de vérification d'URL
function verifyUrl() {
    const url = document.getElementById('url-input').value.trim();
    const resultDiv = document.getElementById('url-result');
    
    if (!url) {
        showResult(resultDiv, 'Veuillez entrer une URL.', 'error');
        return;
    }

    try {
        const urlObj = new URL(url);
        if (urlObj.protocol === 'http:' || urlObj.protocol === 'https:') {
            showResult(resultDiv, '<i class="fas fa-check-circle"></i> URL valide !', 'success');
        } else {
            showResult(resultDiv, '<i class="fas fa-times-circle"></i> URL invalide. Le protocole doit être HTTP ou HTTPS.', 'error');
        }
    } catch (e) {
        showResult(resultDiv, '<i class="fas fa-times-circle"></i> URL invalide. Veuillez vérifier le format.', 'error');
    }
}

// Fonction de vérification de carte bancaire
function verifyCard() {
    const cardNumber = document.getElementById('card-input').value.replace(/\s/g, '');
    const resultDiv = document.getElementById('card-result');
    
    if (!cardNumber) {
        showResult(resultDiv, 'Veuillez entrer un numéro de carte.', 'error');
        return;
    }

    if (cardNumber.length < 13 || cardNumber.length > 19) {
        showResult(resultDiv, '<i class="fas fa-times-circle"></i> Numéro de carte invalide. Longueur incorrecte.', 'error');
        return;
    }

    // Algorithme de Luhn pour vérifier la validité
    if (luhnCheck(cardNumber)) {
        const cardType = getCardType(cardNumber);
        showResult(resultDiv, `<i class="fas fa-check-circle"></i> Numéro de carte valide ! Type détecté : ${cardType}`, 'success');
    } else {
        showResult(resultDiv, '<i class="fas fa-times-circle"></i> Numéro de carte invalide.', 'error');
    }
}

// Algorithme de Luhn pour vérifier les cartes bancaires
function luhnCheck(cardNumber) {
    let sum = 0;
    let isEven = false;
    
    for (let i = cardNumber.length - 1; i >= 0; i--) {
        let digit = parseInt(cardNumber.charAt(i));
        
        if (isEven) {
            digit *= 2;
            if (digit > 9) {
                digit -= 9;
            }
        }
        
        sum += digit;
        isEven = !isEven;
    }
    
    return sum % 10 === 0;
}

// Fonction pour détecter le type de carte
function getCardType(cardNumber) {
    const patterns = {
        'Visa': /^4/,
        'Mastercard': /^5[1-5]/,
        'American Express': /^3[47]/,
        'Discover': /^6(?:011|5)/,
        'Diners Club': /^3(?:0[0-5]|[68])/,
        'JCB': /^(?:2131|1800|35\d{3})/
    };
    
    for (let [type, pattern] of Object.entries(patterns)) {
        if (pattern.test(cardNumber)) {
            return type;
        }
    }
    
    return 'Carte bancaire';
}

// Fonction de formatage automatique du numéro de carte
function formatCardNumber() {
    const input = document.getElementById('card-input');
    let value = input.value.replace(/\s/g, '');
    
    // Limiter à 19 caractères
    if (value.length > 19) {
        value = value.substring(0, 19);
    }
    
    // Ajouter des espaces tous les 4 chiffres
    const formatted = value.replace(/(\d{4})(?=\d)/g, '$1 ');
    input.value = formatted;
}

// Fonction utilitaire pour afficher les résultats
function showResult(element, message, type) {
    element.innerHTML = message;
    element.className = `result ${type}`;
    element.style.display = 'block';
}

// Fonction pour effacer les résultats
function clearResult(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        element.style.display = 'none';
        element.className = 'result';
    }
}

// Événements pour effacer les résultats quand on change d'onglet
document.addEventListener('DOMContentLoaded', function() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Effacer tous les résultats
            const results = document.querySelectorAll('.result');
            results.forEach(result => {
                result.style.display = 'none';
                result.className = 'result';
            });
            
            // Effacer les champs de saisie
            const inputs = document.querySelectorAll('input');
            inputs.forEach(input => {
                input.value = '';
            });
            
            // Réinitialiser la force du mot de passe
            const strengthFill = document.getElementById('strength-fill');
            const strengthText = document.getElementById('strength-text');
            if (strengthFill && strengthText) {
                strengthFill.className = 'strength-fill';
                strengthText.textContent = 'Force du mot de passe';
            }
        });
    });
}); 