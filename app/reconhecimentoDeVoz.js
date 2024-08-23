const elementoChute = document.getElementById('words');
const startStopBtn = document.getElementById('startStopBtn');
const div = document.getElementById('elemento');
let isRecognitionActive = false;

window.SpeechRecognition = window.SpeechRecognition || webkitSpeechRecognition;

const recognition = new SpeechRecognition();
recognition.lang = 'pt-BR';

recognition.start(); // Inicia o reconhecimento de fala
recognition.stop();  // Para o reconhecimento de fala

recognition.addEventListener('result', onSpeak);

function onSpeak(e) {
    const words = e.results[0][0].transcript;
    exibeChuteNaTela(words); 
    mudarCorDiv(words);
}
function exibeChuteNaTela(words) {
    elementoChute.innerHTML += ` ${words}`;
}
startStopBtn.addEventListener('click', () => {
    if (isRecognitionActive) {
        recognition.stop();
        startStopBtn.textContent = "Iniciar Reconhecimento";
    } else {
        recognition.start();
        startStopBtn.textContent = "Parar Reconhecimento";
    }
    isRecognitionActive = !isRecognitionActive;
});

// Adiciona tratamento para erros
recognition.addEventListener('error', (e) => {
    console.error('Erro no reconhecimento de voz:', e.error);
    isRecognitionActive = false;
    startStopBtn.textContent = "Iniciar Reconhecimento";
});

// Impede que o reconhecimento reinicie automaticamente ao terminar
recognition.addEventListener('end', () => {
    if (isRecognitionActive) {
        recognition.start();
    }
});


function mudarCorDiv(words) {
    let color = 'white'; // Cor padrão
    
    // Mapeia o texto para cores
    switch (words.toLowerCase()) { // Adicione toLowerCase() para garantir que a comparação seja feita de forma insensível a maiúsculas/minúsculas
        case 'vermelho':
            color = 'red';
            break;
        case 'verde':
            color = 'green';
            break;
        case 'azul':
            color = 'blue';
            break;
            case 'amarelo':
            color = 'yellow';
            break;
        case 'preto':
            color = 'black';
            break;
        case 'cinza':
            color = 'gray';
            break;
        case 'roxo':
            color = 'purple';
            break;
        case 'laranja':
            color = 'orange';
            break;
        case 'rosa':
            color = 'pink';
            break;
        // Adicione mais casos conforme necessário
        default:
            color = 'white'; // Cor padrão
    }
    
    // Aplica a cor à div
    div.style.backgroundColor = color;
}
