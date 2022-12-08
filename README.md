# API

## Installation

```bash
  # Install dependencies
  npm ci

  # Copy environment variables file example and fill it
  cp .env.dist .env
```

## Usage

```bash
# Run development server
npm run dev
```

API : https://connectify-api-ynov.herokuapp.com/

## Environnement technique

Cette API REST a été développée en utilisant les technologies suivantes:

Langage de programmation: Nodejs
Framework web: Express
Base de données: Mongodb

## Architecture du web service

L'architecture de cette API REST est basée sur le modèle de trois couches:

- La couche de présentation: Gère l'interaction avec les clients et expose les différentes ressources de l'API sous forme de routes HTTP.

- La couche de logique métier: Contient les fonctionnalités principales de l'application, telles que les algorithmes de traitement des données et les règles métier.

- La couche de stockage des données: Stocke les données de l'application dans une base de données relationnelle.

## Librairies

Les librairies principales utilisées par cette API REST sont les suivantes:

Express: Framework web open source pour Node.js utilisé pour la couche de présentation.
MongoDB: Système de gestion de base de données NoSQL utilisé pour la couche de stockage des données.
Argon2: Bibliothèque de hashage de mot de passe utilisée pour la sécurisation des données.
Cors: Bibliothèque utilisée pour gérer les requêtes Cross-Origin Resource Sharing (CORS).
Dotenv: Bibliothèque utilisée pour gérer les variables d'environnement de l'application.
jsonwebtoken: Bibliothèque utilisée pour la génération et la validation des tokens JWT.
Morgan: Bibliothèque utilisée pour la journalisation des requêtes HTTP.
