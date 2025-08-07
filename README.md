# Vérificateur en Ligne

Un site web moderne et responsive pour vérifier différents types d'informations en temps réel.

## 🚀 Fonctionnalités

### 📧 Vérification d'Email
- Validation du format email standard
- Vérification en temps réel
- Messages d'erreur clairs

### 📱 Vérification de Téléphone
- Support des formats français (+33 et 0)
- Validation des numéros de téléphone
- Formatage automatique

### 🔒 Vérification de Mot de Passe
- Analyse de la force du mot de passe en temps réel
- Barre de progression visuelle
- Critères de sécurité multiples :
  - Longueur minimale (8 caractères)
  - Lettres majuscules et minuscules
  - Chiffres
  - Caractères spéciaux

### 🔗 Vérification d'URL
- Validation du format URL
- Vérification des protocoles HTTP/HTTPS
- Messages d'erreur informatifs

### 💳 Vérification de Carte Bancaire
- Algorithme de Luhn pour la validation
- Détection automatique du type de carte (Visa, Mastercard, etc.)
- Formatage automatique avec espaces
- Support des principales cartes bancaires

### 🎁 Vérification de Cartes Cadeaux
- Support de multiples types de cartes (Transcash, Google Play, Steam, etc.)
- Validation des formats spécifiques à chaque type
- Option pour cacher/montrer les codes
- Messages d'erreur personnalisés par type de carte

### 📋 Vérification de Codes
- Validation de codes promo, coupons, licences, etc.
- Formats adaptés selon le type de code
- Option pour cacher/montrer les codes
- Support des numéros de série et codes d'activation

### 📧 Notifications par Email
- Configuration d'un email de destination
- Envoi automatique après chaque vérification
- Masquage des informations sensibles (mots de passe)
- Horodatage et détails complets des vérifications
- Sauvegarde locale de l'email de destination

## 🎨 Interface

- **Design moderne** avec dégradés et animations
- **Interface responsive** qui s'adapte à tous les écrans
- **Navigation par onglets** intuitive
- **Animations fluides** pour une meilleure expérience utilisateur
- **Icônes Font Awesome** pour une interface claire

## 🛠️ Technologies Utilisées

- **HTML5** - Structure sémantique
- **CSS3** - Styles modernes avec Flexbox et Grid
- **JavaScript ES6+** - Logique de vérification
- **Font Awesome** - Icônes
- **Responsive Design** - Compatible mobile et desktop

## 📱 Compatibilité

- ✅ Chrome
- ✅ Firefox
- ✅ Safari
- ✅ Edge
- ✅ Mobile (iOS/Android)

## 🚀 Installation et Utilisation

1. **Téléchargez** tous les fichiers dans un dossier
2. **Ouvrez** `index.html` dans votre navigateur
3. **Utilisez** les différents onglets pour tester les vérifications

### Structure des fichiers :
```
CDN/
├── index.html              # Page principale
├── styles.css              # Styles CSS
├── script.js               # Logique JavaScript
├── emailjs-setup.md        # Guide configuration EmailJS
└── README.md               # Documentation
```

## 🔧 Fonctionnalités Techniques

### Validation Email
```javascript
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
```

### Validation Téléphone (Format français)
```javascript
const phoneRegex = /^(\+33|0)[1-9](\d{8})$/;
```

### Algorithme de Luhn (Cartes bancaires)
- Vérification mathématique de la validité
- Support des principales cartes bancaires

### Force du Mot de Passe
- Score basé sur 6 critères
- 4 niveaux : Faible, Moyen, Fort, Très fort
- Mise à jour en temps réel

## 🎯 Exemples d'Utilisation

### Email valide
```
user@example.com ✅
```

### Téléphone français valide
```
+33123456789 ✅
0123456789 ✅
```

### Mot de passe fort
```
MySecurePass123! ✅
```

### URL valide
```
https://www.example.com ✅
```

### Carte bancaire valide
```
4532 1234 5678 9012 ✅ (Visa)
```

### Carte cadeau valide
```
XXXX-XXXX-XXXX-XXXX ✅ (Google Play)
1234567890123456 ✅ (Transcash)
```

### Code promo valide
```
PROMO123 ✅
COUPON456 ✅
```

## 🔒 Sécurité

- **Validation côté client** pour les vérifications
- **Masquage automatique** des mots de passe dans les emails
- **Sauvegarde locale** de l'email de destination
- **Configuration EmailJS** pour l'envoi sécurisé des notifications
- **Horodatage** de toutes les vérifications

## 📈 Améliorations Futures

- [ ] Vérification en temps réel des emails (API)
- [ ] Validation des numéros de téléphone internationaux
- [ ] Test de connectivité des URLs
- [ ] Historique des vérifications
- [ ] Export des résultats
- [ ] Mode sombre
- [ ] Support multilingue

## 🤝 Contribution

Les suggestions d'amélioration sont les bienvenues !

## 📄 Licence

Ce projet est sous licence MIT.

---

**Développé avec ❤️ pour simplifier la vérification d'informations en ligne.** 