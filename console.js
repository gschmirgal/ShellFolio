const terminal = document.getElementById('terminal');
let currentCommand = '';
let inputArea = null;

let commands = null;
let commandsLoaded = false;

fetch('commands.json')
    .then(response => response.json())
    .then(data => {
    commands = data['commands'];
    commandsLoaded = true;
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

        default:
        printResponse(`Commande inconnue : ${cmd}`);
    }

    currentCommand = '';
    createPromptLine();
}

function updateInputDisplay() {
    if (inputArea) {
    inputArea.textContent = currentCommand;
    }
}

document.body.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
    executeCommand(currentCommand.trim().toLowerCase());
    } else if (e.key === 'Backspace') {
    currentCommand = currentCommand.slice(0, -1);
    updateInputDisplay();
    } else if (e.key.length === 1) {
    currentCommand += e.key;
    updateInputDisplay();
    }
});

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