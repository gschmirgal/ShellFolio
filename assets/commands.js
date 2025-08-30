function getFileContent(url) {
    const xhr = new XMLHttpRequest();
    try {
        xhr.open('GET', url, false); // false pour synchrone
        xhr.send(null);
        if (xhr.status === 200) {
            return xhr.responseText;
        } else {
            return "Erreur lors de la lecture du fichier " + url;
        }
    } catch (e) {
        return "Erreur lors de la lecture du fichier " + url;
    }
}

export async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export function barrelRoll() {
  document.body.style.transition = 'transform 2s ease-in-out';
  document.body.style.transform = 'rotate(360deg)';
  // Remettre à zéro après la rotation
  setTimeout(() => {
    document.body.style.transform = '';
  }, 2000);
  return "🐸🦊🐦🐰!!";
}

export function activateNeonTheme() {
    document.body.style.backgroundColor = '#0f0f0f';
    document.body.style.color = '#39ff14'; // vert néon

    const terminalDiv = document.getElementById('terminal');
    if (terminalDiv) {
        terminalDiv.style.border = '2px solid #ff00ff';
        terminalDiv.style.boxShadow = '0 0 20px #ff00ff, 0 0 40px #00ffff';
        terminalDiv.classList.add('neon-glow');
    }
    return "💡 Neon theme activated. Welcome to the future.";
}

export function rickroll(){
    window.open('https://www.youtube.com/watch?v=dQw4w9WgXcQ', '_blank');
    return "🎵 Never gonna give you up...";

}

export function zelda(){
    const audio = new Audio('/medias/audio/danger.mp3');
    audio.play();
    return "It's dangerous to go alone! Take this: 🗡️";
}

export function projetJS() {
    return getFileContent('/medias/txt/projects.txt');
}

export async function boot(){
    const terminal = document.getElementById('terminal');
    const audio = new Audio('/medias/audio/boot.mp3');
    audio.play();
    terminal.innerHTML = "<div class='line'>" + getFileContent('/medias/txt/boot.txt') + "</div>";
    await sleep(7000);
    terminal.innerHTML = "";
    await sleep(1000);
    return "";
}
