# 📅 EventConnect

**EventConnect** est une plateforme web collaborative de gestion d’événements (conférences, meetups, ateliers, soirées). Elle permet à des utilisateurs de créer, gérer et rejoindre des événements, avec un système de modération via un espace administrateur.

Projet réalisé par : **Toréa, Ugo, Pachara, Killian**  
Formation : **Concepteur Développeur d’Applications (CDA)**

---

## 🧠 Sommaire

- [🔧 Environnement de travail](#-environnement-de-travail)
- [🏗 Architecture logicielle](#-architecture-logicielle)
- [🔐 Sécurité](#-sécurité)
- [🗃 Base de données](#-base-de-données)
- [📡 API](#-api)
- [🎨 Frontend](#-frontend)
- [☁️ Hébergement](#-hébergement)
- [🧪 Qualité du code](#-qualité-du-code)
- [📄 Documentation](#-documentation)

---

## 🔧 Environnement de travail

- **IDE** : WebStorm
- **Langages** :
  - Frontend : JavaScript (Next.js)
  - Backend : JavaScript (Node.js + Express)
- **Contrôle de version** : Git avec GitHub
- **Base de données** : MySQL
- **ORM** : Sequelize
- **Système d’exploitation** : Environnements mixtes

---

## 🏗 Architecture logicielle

- **Type** : Architecture en couches (MVC)
- **Couches** :
  - Présentation (Next.js)
  - Métier (Express)
  - Données (MySQL via Sequelize)
- **API REST** : Respect des bonnes pratiques REST, progression vers HATEOAS prévue

---

## 🔐 Sécurité

- **Authentification** : JSON Web Tokens (JWT)
- **Rôles utilisateurs** :
  - `Admin` : gestion des utilisateurs, modération des événements
  - `User` : création, inscription et participation à des événements
- **Validation des données** : _À implémenter (non réalisée)_

---

## 🗃 Base de données

- **Type** : SQL (MySQL)
- **Outil de modélisation** : MERISE (non joint ici)
- **Modèle relationnel** :
  - `User` (id, nom, email, mot de passe, rôle…)
  - `Event` (id, titre, lieu, description, date, heure, capacité…)
  - `Registration` (utilisateur inscrit à un événement)
  - Relations : 
    - Un `User` peut créer plusieurs `Events`
    - Plusieurs `Users` peuvent s’inscrire à plusieurs `Events`

---

## 📡 API

- **Framework** : Express.js
- **ORM** : Sequelize
- **Documentation Swagger** : incluse dans le projet (`/api-docs`)
- **Endpoints majeurs** :
  - `POST /auth/signup` — Inscription
  - `POST /auth/login` — Connexion avec JWT
  - `GET /events` — Liste des événements
  - `POST /events` — Création d’un événement
  - `POST /events/:id/register` — Inscription à un événement
  - `GET /admin/users` — Liste des utilisateurs (admin)
  - `PATCH /admin/events/:id/moderate` — Modération d’un événement

- **Outils de test** : Swagger, Postman
- **Cahier de tests** : à compléter (structure à part ou en `docs/`)

---

## 🎨 Frontend

- **Framework** : Next.js
- **Maquettage & wireframes** : réalisés avec Figma
- **Approche** : Mobile First
- **Pages fonctionnelles** :
  - Accueil (recherche et exploration des événements)
  - Page de profil utilisateur
  - Page de création/modification d’événement
  - Tableau de bord administrateur
- **Gestion des états** : loading, erreurs, confirmation
- **Accessibilité** : conformité partielle RGAA (à améliorer via Lighthouse)

---

## ☁️ Hébergement

- **Hébergeur** : o2switch (API + Frontend déployés)
- **CI/CD** : non mis en place (déploiement manuel)
- **Documentation de déploiement** : voir section [📄 Documentation](#-documentation)

---

## 🧪 Qualité du code

- **Versioning Git** :
  - Repository public sur GitHub
  - Branches séparées pour les fonctionnalités
  - Commits clairs, nommés selon les conventions (pas entièrement conventionnels)
- **.gitignore** configuré :
  - Exclusion des fichiers sensibles (`.env`, `node_modules`, etc.)
- **Tests** :
  - Tests manuels via Swagger et Postman
  - Tests automatisés à implémenter
- **Organisation du projet** :
  - Dossiers clairement structurés (`/frontend`, `/backend`)
  - Respect des conventions de nommage

---

## 📄 Documentation

- **Choix techniques** :
  - Frontend : Next.js pour le rendu SSR et l’expérience utilisateur fluide
  - Backend : Express.js + Sequelize pour sa rapidité de mise en œuvre
  - JWT pour sécuriser l’accès aux routes protégées
- **Architecture** : voir schéma dans `/docs/architecture.pdf` *(à ajouter si non fait)*
- **Base de données** : voir schéma relationnel dans `/docs/db-model.pdf` *(à ajouter)*
- **Endpoints API** : documentés avec Swagger dans `/api-docs`
- **Captures d’écran** : disponibles dans `/docs/screenshots`
- **Fonctionnalités principales** :
  - Création d’événements collaboratifs
  - Inscription avec confirmation
  - Notifications (par redirection/états visuels)
  - Interface admin pour la modération

