git clone https://github.com/gschmirgal/ShellFolio.git

# ShellFolio

ShellFolio est un portfolio interactif sous forme de terminal web, développé par Guillaume Schmirgal.

## Fonctionnalités principales
- Interface de terminal simulée en JavaScript/CSS
- Commandes personnalisées (hello, whoami, projets, liens, etc.)
- Thèmes dynamiques (ex : "theme neon")
- Exécution de sons et d'animations
- Compatible desktop et mobile (clavier virtuel géré)
- Commandes dynamiques via un fichier JSON ou module JS

## Structure du projet

```
ShellFolio/
│
├── index.html                # Page principale
├── assets/
│   ├── console.js            # Logique du terminal (JS principal)
│   ├── console.css           # Styles du terminal
│   └── commands.js           # Commandes dynamiques (module JS)
├── medias/
│   ├── danger.mp3            # Exemple de son
│   ├── commands.json         #  Commandes dynamiques en JSON
│   └── ...                   # Autres médias (images, pdf, etc.)
└── README.md                 # Ce fichier
```

## Installation et utilisation

1. **Cloner le dépôt**
	```bash
	git clone https://github.com/gschmirgal/ShellFolio.git
	```
2. **Ouvrir le projet**
	- Ouvre le dossier dans VS Code ou ton éditeur préféré.
	- Utilise un serveur local (Live Server, http-server, etc.) pour éviter les problèmes de chargement de fichiers.
3. **Accéder à l'application**
	- Ouvre `index.html` dans ton navigateur.

## Ajouter/modifier des commandes
- Les commandes personnalisées sont automatiquement ajoutées à la liste des commandes disponibles.


## Ajouter/modifier des commandes
- Pour des commandes simples (texte), modifie `commands.json`.
- Pour des commandes avancées (fonctions JS, sons, animations), il faut :
	1. Ajouter la commande dans `commands.json` (avec un texte d’aide ou d’explication).
	2. Ajouter la fonction correspondante dans `assets/commands.js` et l’exporter.
- Les commandes personnalisées sont automatiquement ajoutées à la liste des commandes disponibles.

### À propos du champ `startup` dans le JSON
Le tableau `startup` dans `commands.json` permet de lister les commandes qui seront exécutées automatiquement au lancement de la console (par exemple, afficher un message de bienvenue, une présentation, etc.).

## Compatibilité mobile
- Un champ texte invisible permet d'afficher le clavier virtuel sur smartphone.
- L'expérience est fluide sur desktop et mobile.

## Auteur
Guillaume Schmirgal  
[GitHub](https://github.com/gschmirgal)  
[LinkedIn](https://www.linkedin.com/in/schmirgal/)

---
Projet open-source, libre de réutilisation et d'adaptation.
