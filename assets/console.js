import * as commandsJS from "./commands.js"

const terminal      = document.getElementById('terminal');
const mobileInput   = document.getElementById('mobileInput');

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
let user = "gschmirgal";
let host = "ShellFolio";
let commandList = ["clear", "help"]; //commandes ajoutées dans le code
fetch('/assets/commands.json')
    .then(response => response.json())
    .then(data => {
        const config = data['config'];
        if( config && config['user'] )
            user = config['user'];
        if( config && config['host'] )
            host = config['host'];

        document.title = `${user} — ${host}`;

        commands = data['commands'];
        // Fusionne la liste initiale et les commandes dynamiquement, sans doublons
        commandList = Array.from(new Set([...commandList, ...Object.keys(commands)])).sort();
        commandsLoaded = true;
        const startup = data['startup'];
        
        // Initial prompt
        createPromptLine();
        if (Array.isArray(startup)) {
            (async () => {
                for (const cmd of startup) {
                    executeCommand(cmd);
                    await sleep(750); // Petite pause entre les commandes
                }
            })();
        }
    });

function createPromptLine() {
    const promptLine = document.createElement('div');
    promptLine.className = 'line';
    promptLine.innerHTML = `${user}@${host}:~$ <span id=\"inputArea\"></span><span class=\"cursor\">█</span>`;
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
    inputArea.parentElement.innerHTML = `${user}@${host}:~$ ${cmd}`;

    if (!commandsLoaded) {
        printResponse("⏳ Les commandes ne sont pas encore prêtes. Veuillez patienter.");
        currentCommand = '';
        createPromptLine();
        return;
    }

    switch(cmd) {
        case 'help':
            printResponse("💡 Liste des commandes disponibles : " + commandList.join(", "));
            break;

        case 'clear':
            terminal.innerHTML = '';
            break;

        default:
            if (commands.hasOwnProperty(cmd)) {
                if (typeof commandsJS[commands[cmd]] === 'function') {
                    printResponse(commandsJS[commands[cmd]]());
                }else{
                    printResponse(commands[cmd]);
                }
            
            } else {
                printResponse(`Commande inconnue : ${cmd} - Tapez 'help' pour de l'aide`);    
            }

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
    if (document.activeElement === mobileInput) 
        return;
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

function scrollToBottom() {
  window.scrollTo({
    top: document.body.scrollHeight,
    behavior: 'smooth' // pour un défilement fluide
  });
}

async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}



console.log("Bonjour, que cherchez vous ici ? Voici une photo de moi dans le doute: "+window.location.href+"/medias/photo.txt")
