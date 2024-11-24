let startTime, elapsedTime = 0, intervalId;
let isRunning = false;
let laps = [];

const display = document.getElementById('display');
const startPauseButton = document.getElementById('start-pause');
const resetButton = document.getElementById('reset');
const lapButton = document.getElementById('lap');
const lapsList = document.getElementById('laps-list');

// Format time as mm:ss:ms
function formatTime(ms) {
    let date = new Date(ms);
    let minutes = String(date.getUTCMinutes()).padStart(2, '0');
    let seconds = String(date.getUTCSeconds()).padStart(2, '0');
    let milliseconds = String(date.getUTCMilliseconds()).padStart(3, '0').slice(0, 2);
    return `${minutes}:${seconds}.${milliseconds}`;
}

// Start/Pause functionality
startPauseButton.addEventListener('click', () => {
    if (isRunning) {
        pauseStopwatch();
    } else {
        startStopwatch();
    }
});

function startStopwatch() {
    startTime = Date.now() - elapsedTime;
    intervalId = setInterval(updateDisplay, 10);
    isRunning = true;
    startPauseButton.textContent = 'Pause';
}

function pauseStopwatch() {
    clearInterval(intervalId);
    elapsedTime = Date.now() - startTime;
    isRunning = false;
    startPauseButton.textContent = 'Start';
}

// Update display
function updateDisplay() {
    elapsedTime = Date.now() - startTime;
    display.textContent = formatTime(elapsedTime);
}

// Reset functionality
resetButton.addEventListener('click', () => {
    clearInterval(intervalId);
    elapsedTime = 0;
    display.textContent = '00:00:00.00';
    isRunning = false;
    startPauseButton.textContent = 'Start';
    laps = [];
    renderLaps();
});

// Lap functionality
lapButton.addEventListener('click', () => {  
    if (isRunning) {
        laps.push(formatTime(elapsedTime));
        renderLaps();
    }
});

// Display laps
function renderLaps() {
    lapsList.innerHTML = '';
    laps.forEach((lap, index) => {
        const lapItem = document.createElement('li');
        lapItem.textContent = `Lap ${index + 1}: ${lap}`;
        lapsList.appendChild(lapItem);
    });
}



