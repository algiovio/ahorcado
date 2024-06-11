const palabras = [
    { palabra: "PARE", pista: "Esta señal se usa para indicar al vehículo que se detenga." },
    { palabra: "PASO A NIVEL", pista: "Esta señal se utiliza para indicar un cruce o intersección al mismo nivel entre una vía férrea y una carretera o camino." },
    { palabra: "PROHIBIDO ESTACIONAR", pista: "Esta señal informa que no es posible aparcar en el lugar." },
    { palabra: "DESPACIO ESCUELA", pista: "Esta señal indica que hay un colegio cerca, por lo cual no se debe conducir de forma rápida." },
    { palabra: "CURVA PRONUNCIADA", pista: "Informa de una diagonal peligrosa." }
];

let palabraActual;
let letrasAdivinadas;
let intentosRestantes;
const maxIntentos = 6;
const figureParts = document.querySelectorAll('.figure-part');

function startGame() {
    const randomIndex = Math.floor(Math.random() * palabras.length);
    palabraActual = palabras[randomIndex].palabra.toUpperCase();
    const pista = palabras[randomIndex].pista;
    
    letrasAdivinadas = new Set();
    intentosRestantes = maxIntentos;
    
    document.getElementById('pista').textContent = `Pista: ${pista}`;
    document.getElementById('message').textContent = '';
    document.getElementById('word-container').textContent = '_ '.repeat(palabraActual.length);
    
    const lettersContainer = document.getElementById('letters-container');
    lettersContainer.innerHTML = '';
    for (let i = 65; i <= 90; i++) {
        const letter = String.fromCharCode(i);
        const button = document.createElement('button');
        button.textContent = letter;
        button.onclick = () => guessLetter(letter);
        lettersContainer.appendChild(button);
    }
    
    figureParts.forEach(part => part.style.display = 'none');
}

function guessLetter(letter) {
    if (letrasAdivinadas.has(letter) || intentosRestantes === 0) {
        return;
    }
    
    letrasAdivinadas.add(letter);
    
    const wordContainer = document.getElementById('word-container');
    let displayedWord = '';
    let allLettersGuessed = true;
    
    for (const char of palabraActual) {
        if (char === ' ') {
            displayedWord += '  ';
        } else if (letrasAdivinadas.has(char)) {
            displayedWord += char + ' ';
        } else {
            displayedWord += '_ ';
            allLettersGuessed = false;
        }
    }
    
    wordContainer.textContent = displayedWord.trim();
    
    if (palabraActual.includes(letter)) {
        if (allLettersGuessed) {
            document.getElementById('message').textContent = '¡Felicidades! Has adivinado la palabra.';
            document.getElementById('letters-container').innerHTML = '';
        }
    } else {
        intentosRestantes--;
        if (intentosRestantes >= 0) {
            figureParts[maxIntentos - intentosRestantes - 1].style.display = 'block';
        }
        if (intentosRestantes === 0) {
            document.getElementById('message').textContent = `Lo siento, has perdido. La palabra era: ${palabraActual}`;
            document.getElementById('letters-container').innerHTML = '';
        }
    }
}

startGame();
