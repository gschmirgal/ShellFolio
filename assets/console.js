const terminal = document.getElementById('terminal');

// Ajout d'un input invisible pour mobile
const mobileInput = document.createElement('input');
mobileInput.type = 'text';
mobileInput.id = 'mobileInput';
mobileInput.autocomplete = 'off';
mobileInput.autocapitalize = 'off';
mobileInput.spellcheck = false;
mobileInput.style.position = 'absolute';
mobileInput.style.opacity = 0;
mobileInput.style.height = '1px';
mobileInput.style.width = '1px';
mobileInput.style.zIndex = 0;
mobileInput.style.pointerEvents = 'none';
document.body.appendChild(mobileInput);

function focusMobileInputIfNeeded() {
    // Si sur mobile (tactile), focus l'input
    if (/Mobi|Android|iPhone|iPad|iPod|Touch/i.test(navigator.userAgent)) {
        mobileInput.focus();
    }
}
let currentCommand = '';
let inputArea = null;

let commands = null;
let commandsLoaded = false;
let commandList = ["barrel roll", "clear", "rickroll", "theme neon", "help", "danger"]; //commandes ajoutées dans le code
fetch('commands.json')
    .then(response => response.json())
    .then(data => {
        commands = data['commands'];
        commandsLoaded = true;
        // Fusionne la liste initiale et les commandes dynamiquement, sans doublons
        commandList = Array.from(new Set([...commandList, ...Object.keys(commands)])).sort();
        const startup = data['startup'];
        // Initial prompt
        createPromptLine();
        if (Array.isArray(startup)) {
            startup.forEach(cmd => {
                executeCommand(cmd);
            });
        }
    });

function createPromptLine() {
    const promptLine = document.createElement('div');
    promptLine.className = 'line';
    promptLine.innerHTML = `guillaume@portfolio:~$ <span id=\"inputArea\"></span><span class=\"cursor\">█</span>`;
    terminal.appendChild(promptLine);
    inputArea = promptLine.querySelector('#inputArea');
}

function printResponse(responseHTML = '') {
    if (responseHTML) {
        const response = document.createElement('div');
        response.className = 'line';
        response.innerHTML = responseHTML // Remove leading tab for consistency
        terminal.appendChild(response);
    }
}

function executeCommand(cmd) {
    // Replace current prompt line with static command
    inputArea.parentElement.innerHTML = `guillaume@portfolio:~$ ${cmd}`;

    if (!commandsLoaded) {
        printResponse("⏳ Les commandes ne sont pas encore prêtes. Veuillez patienter.");
        currentCommand = '';
        createPromptLine();
        return;
    }

    if (commands.hasOwnProperty(cmd)) {
        printResponse(commands[cmd]);
    
    } else switch(cmd) {
        case 'help':
            printResponse("💡 Liste des commandes disponibles : " + commandList.join(", "));
            break;
        case 'clear':
            terminal.innerHTML = '';
            break;
        case 'rickroll':
            printResponse("🎵 Never gonna give you up...");
            window.open('https://www.youtube.com/watch?v=dQw4w9WgXcQ', '_blank');
            break;
        case 'theme neon':
            activateNeonTheme();
            printResponse("💡 Neon theme activated. Welcome to the future.");
            break;
        case 'danger':
            printResponse("It's dangerous to go alone! Take this: 🗡️");
            document.getElementById("danger_audio").play();
            break;
        case 'barrel roll':
            printResponse("🐸🦊🐦🐰!!");
            barrelRoll();
            break;

        default:
            printResponse(`Commande inconnue : ${cmd} - Tapez 'help' pour de l'aide`);
    }

    currentCommand = '';
    createPromptLine();
    scrollToBottom();
}

function updateInputDisplay() {
    if (inputArea) {
        inputArea.textContent = currentCommand;
    }
}


// Gestion clavier physique (desktop)
document.body.addEventListener('keydown', function(e) {
    // Ne rien faire si l'input mobile est focus (évite double saisie)
    if (document.activeElement === mobileInput) return;
    if (e.key === 'Enter') {
        executeCommand(currentCommand.trim().toLowerCase());
        focusMobileInputIfNeeded();
    } else if (e.key === 'Backspace') {
        currentCommand = currentCommand.slice(0, -1);
        updateInputDisplay();
    } else if (e.key.length === 1) {
        currentCommand += e.key;
        updateInputDisplay();
    }
    focusMobileInputIfNeeded();
});

// Gestion clavier virtuel (mobile)
mobileInput.addEventListener('input', function(e) {
    currentCommand = mobileInput.value;
    updateInputDisplay();
});
mobileInput.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
        executeCommand(currentCommand.trim().toLowerCase());
        mobileInput.value = '';
        currentCommand = '';
        updateInputDisplay();
        e.preventDefault();
    }
});

// Focus auto sur mobile au toucher
terminal.addEventListener('touchstart', focusMobileInputIfNeeded);
document.body.addEventListener('touchstart', focusMobileInputIfNeeded);

// Focus auto au chargement sur mobile
window.addEventListener('load', focusMobileInputIfNeeded);

function activateNeonTheme() {
    document.body.style.backgroundColor = '#0f0f0f';
    document.body.style.color = '#39ff14'; // vert néon

    const terminalDiv = document.getElementById('terminal');
    if (terminalDiv) {
        terminalDiv.style.border = '2px solid #ff00ff';
        terminalDiv.style.boxShadow = '0 0 20px #ff00ff, 0 0 40px #00ffff';
        terminalDiv.classList.add('neon-glow');
    }
}

function scrollToBottom() {
  window.scrollTo({
    top: document.body.scrollHeight,
    behavior: 'smooth' // pour un défilement fluide
  });
}

function barrelRoll() {
  document.body.style.transition = 'transform 2s ease-in-out';
  document.body.style.transform = 'rotate(360deg)';

  // Remettre à zéro après la rotation
  setTimeout(() => {
    document.body.style.transform = '';
  }, 2000);
}


console.log("Bonjour, que cherchez vous ici ? Voici une photo de moi dans le doute: "+window.location.href+"/medias/photo.txt")
