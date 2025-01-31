let coinCount = 0;
let miningRate = 0.2; // 0.2 tokens per minute
let miningInterval;
let miningActive = false;
let miningDuration = 12 * 60 * 60 * 1000; // 12 hours in milliseconds
let elapsedTime = 0; // Time elapsed
let totalCoinsMined = 0; // Total coins mined

const coinCountElement = document.getElementById('coin-count');
const mineButton = document.getElementById('mine-button');
const miningSection = document.getElementById('mining-section');
const startMineButton = document.getElementById('start-mine-button');
const progressBar = document.getElementById('progress-bar');
const progressContainer = document.getElementById('progress-container');
const statusMessage = document.getElementById('status-message');
const closeMiningButton = document.getElementById('close-mining-button');

// Function to give tokens on first visit
function giveInitialTokens() {
    const storedCoins = localStorage.getItem('coins');
    if (!storedCoins) {
        coinCount += 15; // Give 15 tokens
        localStorage.setItem('coins', coinCount); // Store in localStorage
        alert('You have received 15 free MINED TOKEN!'); // Notify user
    } else {
        coinCount = parseInt(storedCoins); // Load existing coins
    }
}

mineButton.addEventListener('click', () => {
    miningSection.style.display = 'block'; // Show mining section
});

startMineButton.addEventListener('click', startMining);
closeMiningButton.addEventListener('click', () => {
    miningSection.style.display = 'none'; // Hide mining section
    stopMining(); // Stop mining if active
});

function startMining() {
    if (miningActive) {
        alert('Mining is already in progress.');
        return;
    }

    progressBar.style.width = '0%'; // Reset progress bar
    progressContainer.style.display = 'block'; // Show progress bar
    statusMessage.textContent = 'Mining has started!';
    miningActive = true;
    elapsedTime = 0; // Reset elapsed time
    totalCoinsMined = 0; // Reset total coins mined

    miningInterval = setInterval(() => {
        elapsedTime += 60000; // Increase elapsed time by 1 minute
        totalCoinsMined += miningRate; // Increase coins mined

        // Update progress bar
        const progress = (elapsedTime / miningDuration) * 100;
        progressBar.style.width = `${progress}%`;

        // Update mined tokens and time remaining
        document.getElementById('mined-coins').textContent = Math.floor(totalCoinsMined);
        const timeRemaining = miningDuration - elapsedTime;
        document.getElementById('time-remaining').textContent = formatTime(timeRemaining);

        if (elapsedTime >= miningDuration) {
            clearInterval(miningInterval);
            miningInterval = null; // Reset mining interval
            miningActive = false;
            totalCoinsMined += 144; // Ensure total mined equals to 144 at the end
            coinCount += Math.floor(totalCoinsMined); // Add mined coins to total
            localStorage.setItem('coins', coinCount); // Update coins in localStorage
            statusMessage.textContent = `Mining has stopped. You mined ${Math.floor(totalCoinsMined)} tokens!`;
            coinCountElement.textContent = coinCount; // Update displayed coins
        }
    }, 60000); // Update every minute
}

function stopMining() {
    clearInterval(miningInterval);
    miningActive = false;
    progressBar.style.width = '0%'; // Reset progress bar
    progressContainer.style.display = 'none'; // Hide progress bar
}

function formatTime(ms) {
    const totalSeconds = Math.floor(ms / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

// Load user data on page load
function loadUserData() {
    const storedCoins = localStorage.getItem('coins');

    coinCount = storedCoins ? parseInt(storedCoins) : 0;

    // Update displayed values
    coinCountElement.textContent = Math.floor(coinCount);

    // Give initial tokens if it's the first visit
    giveInitialTokens();
}

// Load user data on page load
loadUserData();