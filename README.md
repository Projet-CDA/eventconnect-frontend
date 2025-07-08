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
  - Métier (node.js)
  - Données (MySQL via Sequelize)
- **API REST** : Respect des bonnes pratiques REST, progression vers HATEOAS prévue

---

## 🔐 Sécurité

- **Authentification** : JSON Web Tokens (JWT)
- **Rôles utilisateurs** :
  - `Admin` : gestion des utilisateurs, modération des événements
  - `User` : création, inscription et participation à des événements


## 🗃 Base de données

- **Type** : SQL (MySQL)

## 📡 API

- **Framework** : node.js
- **ORM** : Sequelize
- **Documentation Swagger** : incluse dans le projet (`/api-docs`)
- **Outils de test** : Swagger, Postman


---

## 🎨 Frontend

- **Framework** : Next.js
- **Maquettage & wireframes** : réalisés avec Figma
- **Approche** : Mobile First

---

## ☁️ Hébergement

- **Hébergeur** : o2switch (API + Frontend déployés)

## 🧪 Qualité du code

- **Versioning Git** :
  - Repository public sur GitHub
  - Branches séparées pour les fonctionnalités
  - Commits clairs, nommés selon les conventions (pas entièrement conventionnels)
- **.gitignore** configuré :
  - Exclusion des fichiers sensibles (`.env`, `node_modules`, etc.)
- **Tests** :
  - Tests manuels via Swagger et Postman
- **Organisation du projet** :
  - Dossiers clairement structurés (`/frontend`, `/backend`)
  - Respect des conventions de nommage

---

## 🧪 Tests unitaires

- **Frameworks utilisés** : Mocha, Chai, Sinon, Supertest
- **Couverture** :
  - Tests unitaires sur tous les contrôleurs, modèles et middlewares du backend
  - Tests d’intégration sur les routes principales de l’API
- **Structure** :
  - Tous les tests sont situés dans le dossier `/test`
  - Les tests sont écrits en JavaScript (ESM)
- **Lancement des tests** :
  ```bash
  npm test
  ```
- **Objectif** :
  - Garantir la fiabilité des fonctionnalités critiques (authentification, gestion des événements, paiements, etc.)
  - Faciliter la maintenance et l’évolution du projet 

## 📄 Documentation

- **Choix techniques** :
  - Frontend : Next.js pour le rendu SSR et l’expérience utilisateur fluide
  - Backend : node.js + Sequelize pour sa rapidité de mise en œuvre
  - JWT pour sécuriser l’accès aux routes protégées
- **Base de données** : schéma relationnel 
- **Endpoints API** : documentés avec Swagger 
- **Fonctionnalités principales** :
  - Création d’événements collaboratifs
  - Inscription avec confirmation
  - Interface admin pour la modération

