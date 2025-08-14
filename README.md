# ShellFolio

Portfolio interactif sous forme de terminal web, développé par Guillaume Schmirgal.

## Présentation

ShellFolio est une application web qui simule un terminal interactif pour présenter vos projets, compétences et liens professionnels. L'utilisateur peut saisir des commandes pour naviguer dans le portfolio, comme dans un vrai terminal.

## Fonctionnalités principales

- Interface de terminal web responsive
- Commandes personnalisées (hello, whoami, projets, liens, etc.)
- Thème "neon" activable par commande
- Affichage de liens vers GitHub, LinkedIn, email, etc.
- Exécution automatique de commandes au démarrage (définies dans `commands.json`)

## Installation et utilisation

1. **Cloner le dépôt**

```bash
# via HTTPS
git clone https://github.com/gschmirgal/ShellFolio.git
```

2. **Ouvrir le projet**

Ouvrez le dossier dans votre éditeur ou servez-le avec un serveur web local (ex: Live Server, Python http.server, etc.).

3. **Accéder à l'application**

Ouvrez `index.html` dans votre navigateur.

## Personnalisation

- Modifiez les commandes et le démarrage dans `commands.json`.
- Personnalisez le style dans `console.css`.
- Ajoutez ou adaptez les commandes dans le script de `index.html`.

## Commandes disponibles (exemples)

- `hello` : message de bienvenue
- `whoami` : présentation
- `projets` : liste des projets
- `liens` : liens GitHub et LinkedIn
- `theme neon` : active le thème néon
- `clear` : efface le terminal

## Auteur

Guillaume Schmirgal

- [GitHub](https://github.com/gschmirgal)
- [LinkedIn](https://www.linkedin.com/in/schmirgal/)

---

Projet open-source, libre de réutilisation et d'adaptation.
