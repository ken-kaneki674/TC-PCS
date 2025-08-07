# Configuration EmailJS pour les Notifications

## 🚀 Installation d'EmailJS

### 1. Créer un compte EmailJS
1. Allez sur [EmailJS.com](https://www.emailjs.com/)
2. Créez un compte gratuit
3. Vérifiez votre email

### 2. Configurer votre service email
1. Dans le dashboard EmailJS, allez dans "Email Services"
2. Cliquez sur "Add New Service"
3. Choisissez votre fournisseur email (Gmail, Outlook, etc.)
4. Suivez les instructions pour connecter votre compte

### 3. Créer un template d'email
1. Allez dans "Email Templates"
2. Cliquez sur "Create New Template"
3. Utilisez ce template :

```html
<h2>🔍 Notification de Vérification</h2>

<p><strong>Type de vérification :</strong> {{verification_type}}</p>
<p><strong>Valeur saisie :</strong> {{input_value}}</p>
<p><strong>Résultat :</strong> {{result}}</p>
<p><strong>Date et heure :</strong> {{timestamp}}</p>

<hr>
<p><em>Notification automatique du Vérificateur en Ligne</em></p>
```

### 4. Récupérer vos clés
1. Notez votre **Service ID** (dans Email Services)
2. Notez votre **Template ID** (dans Email Templates)
3. Notez votre **Public Key** (dans Account > API Keys)

### 5. Configurer le code JavaScript

Remplacez dans `script.js` la ligne :
```javascript
// emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', templateParams)
```

Par :
```javascript
emailjs.send('VOTRE_SERVICE_ID', 'VOTRE_TEMPLATE_ID', templateParams)
```

### 6. Ajouter EmailJS au HTML

Ajoutez cette ligne dans le `<head>` de `index.html` :
```html
<script src="https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js"></script>
```

Et cette ligne juste avant `</body>` :
```html
<script>
    emailjs.init("VOTRE_PUBLIC_KEY");
</script>
```

## 📧 Exemple d'email reçu

```
🔍 Notification de Vérification

Type de vérification : Email
Valeur saisie : user@example.com
Résultat : ✅ Adresse email valide !
Date et heure : 15/12/2024, 14:30:25

---
Notification automatique du Vérificateur en Ligne
```

## 🔧 Configuration Alternative

Si vous préférez un autre service, vous pouvez utiliser :
- **SendGrid** (gratuit jusqu'à 100 emails/jour)
- **Mailgun** (gratuit jusqu'à 5000 emails/mois)
- **Nodemailer** (si vous avez un serveur)

## ⚠️ Notes importantes

1. **Limite gratuite** : EmailJS offre 200 emails/mois gratuitement
2. **Sécurité** : Les clés API sont visibles côté client, utilisez des restrictions par domaine
3. **Test** : Testez toujours en mode développement avant la production
4. **Backup** : Sauvegardez vos clés API en lieu sûr

## 🎯 Fonctionnalités

- ✅ Envoi automatique après chaque vérification
- ✅ Masquage des mots de passe sensibles
- ✅ Horodatage des vérifications
- ✅ Informations détaillées sur la vérification
- ✅ Interface utilisateur intuitive
- ✅ Sauvegarde locale de l'email de destination 