# TC-PCS
site de verification en ligne
Parfait ! Voici un **README.md complet** prêt à être utilisé dans ton dépôt GitHub pour ton projet **TC-PCS**.

---

```markdown
# TC-PCS – Gestion Utilisateur Full Stack (Vue.js + Express.js + MongoDB)

> Projet full stack de gestion d’utilisateurs avec authentification, basé sur **Vue.js** (frontend) et **Express.js** (backend), avec une base de données **MongoDB**.

---

## 📁 Structure du projet

```

TC-PCS/
├── backend/              # Serveur Express.js
│   ├── controllers/      # Logique métier (CRUD, auth)
│   ├── models/           # Modèles Mongoose
│   ├── routes/           # Routes API
│   ├── middleware/       # Middleware auth (JWT)
│   ├── config/           # Connexion MongoDB
│   └── server.js         # Entrée du serveur
│
├── frontend/             # Vue.js avec Vite
│   ├── src/
│   │   ├── components/   # Login/Register/User list
│   │   ├── views/        # Pages (home, dashboard)
│   │   └── router/       # Vue Router
│   └── vite.config.js
│
└── README.md

````

---

## 🚀 Installation et lancement

### 🔧 Prérequis

- Node.js (v18+)
- npm
- MongoDB (local ou via Atlas)

---

### ⚙️ Backend

```bash
cd backend
npm install
````

Créer un fichier `.env` :

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/tcpcs
JWT_SECRET=ton_jwt_secret
```

Lancer le serveur :

```bash
npm start
```

---

### 🖥️ Frontend

```bash
cd frontend
npm install
npm run dev
```

Le front sera disponible sur `http://localhost:5173`.

---

## 📡 API Principales

| Méthode | Route                 | Description                   |
| ------: | --------------------- | ----------------------------- |
|    POST | `/api/users/register` | Créer un utilisateur          |
|    POST | `/api/users/login`    | Authentification + JWT        |
|     GET | `/api/users/`         | Liste des utilisateurs (auth) |
|     GET | `/api/users/:id`      | Obtenir un utilisateur        |
|     PUT | `/api/users/:id`      | Modifier un utilisateur       |
|  DELETE | `/api/users/:id`      | Supprimer un utilisateur      |

> ⚠️ Les routes sont sécurisées par token JWT (middleware `auth.js`)

---

## 🔐 Authentification

* Mot de passe hashé avec `bcryptjs`
* Token JWT stocké côté client (ex : localStorage)
* Middleware côté serveur pour valider l’accès

---

## 🛠️ Technologies utilisées

* **Frontend** : Vue.js, Vue Router, Vite, Axios
* **Backend** : Express.js, MongoDB (via Mongoose), JWT, dotenv, bcryptjs
* **Outils** : Node.js, npm, Git

---

## 📄 Licence

Ce projet est open-source sous licence MIT.

```

---

Souhaites-tu que je te génère maintenant :
- Le **dossier backend** avec tous les fichiers prêts (server.js, routes, modèles, etc.) ?
- Ou le **frontend Vue.js** avec formulaire de login, inscription, et appel API ?
- Ou les deux ?
```
