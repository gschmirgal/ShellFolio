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
│   ├── commands.js           # Commandes dynamiques (module JS)
│   └── commands.json         # Commandes dynamiques en JSON
├── medias/                   # Sons, images, PDF, etc.
└── README.md                 # Ce fichier
```

## Description du fichier `commands.json`

Le fichier `assets/commands.json` permet de définir dynamiquement les commandes disponibles dans le terminal et certains paramètres d’affichage.

- Le champ `commands` est un objet où chaque **clé** correspond à la commande à taper, et chaque **valeur** est soit :
	- Un texte à afficher dans le terminal
	- Le nom d’une fonction à exécuter (si elle existe dans `commands.js`)
- Le champ `startup` est un tableau de commandes à exécuter automatiquement au lancement de la console.
- Le champ `config` (optionnel) permet de personnaliser l’affichage du terminal :
	- `user` : le nom d’utilisateur affiché dans le prompt (et dans le titre de la page)
	- `host` : le nom d’hôte affiché dans le prompt (et dans le titre de la page)

**Exemple minimal** :
```json
{
	"commands": {
		"hello": "Bienvenue !",
		"danger": "danger"
	},
	"startup": ["hello"],
	"config": {
		"user": "guillaume",
		"host": "portfolio"
	}
}
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
- Dans `assets/commands.json`, chaque **clé** du champ `commands` correspond à la commande à taper dans le terminal.
- La **valeur** associée à cette clé peut être :
	- Un texte : il sera affiché dans le terminal lors de l’exécution de la commande.
	- Le nom d’une fonction (ex : "danger") : si une fonction du même nom existe et est exportée dans `assets/commands.js`, elle sera exécutée à la place de l’affichage d’un texte.
- Pour ajouter une commande avancée (fonction JS, son, animation, etc.) :
	1. Ajoute la clé dans `assets/commands.json` (avec comme valeur le nom de la fonction à lancer).
	2. Ajoute la fonction correspondante dans `assets/commands.js` et exporte-la.
- Les commandes personnalisées sont automatiquement ajoutées à la liste des commandes disponibles.

### À propos du champ `startup` dans le JSON
Le tableau `startup` dans `commands.json` permet de lister les commandes qui seront exécutées automatiquement au lancement de la console (par exemple, afficher un message de bienvenue, une présentation, etc.).


### Exemple d’ajout de commandes

**Dans `assets/commands.json` :**
```json
{
	"commands": {
		"hello": "Bienvenue !", // Affiche simplement le texte
		"danger": "danger"      // Lance la fonction danger() si elle existe dans commands.js
	},
	"startup": ["hello"]
}
```

**Dans `assets/commands.js` :**
```js
export function danger() {
	const audio = new Audio('./medias/danger.mp3');
	audio.play();
	return "It's dangerous to go alone! Take this: 🗡️";
}
```

## Compatibilité mobile
- Un champ texte invisible permet d'afficher le clavier virtuel sur smartphone.
- L'expérience est fluide sur desktop et mobile.

## Auteur
Guillaume Schmirgal  
[GitHub](https://github.com/gschmirgal)  
[LinkedIn](https://www.linkedin.com/in/schmirgal/)

---
Projet open-source, libre de réutilisation et d'adaptation.
