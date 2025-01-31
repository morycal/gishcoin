let coinCount = 0;
let pointCount = 0;
let miningRate = 0.2; // Initial coins per minute
let miningInterval;
let miningActive = false;
let miningDuration = 12 * 60 * 60 * 1000; // 12 hours in milliseconds
let lastMiningTime = 0;

const coinCountElement = document.getElementById('coin-count');
const pointCountElement = document.getElementById('point-count');
const mineButton = document.getElementById('mine-button');
const levelUpButton = document.getElementById('level-up-button');

// Mining section elements
const miningSection = document.getElementById('mining-section');
const startMineButton = document.getElementById('start-mine-button');
const progressBar = document.getElementById('progress-bar');
const progressContainer = document.getElementById('progress-container');
const statusMessage = document.getElementById('status-message');
const closeMiningButton = document.getElementById('close-mining-button');

// Costs for each level up
const upgradeCosts = [5, 10, 20, 35, 80, 160, 320, 640, 1280, 2560];
let upgradeCount = 0; // Track number of upgrades

mineButton.addEventListener('click', () => {
    miningSection.style.display = 'block'; // Show mining section
});

startMineButton.addEventListener('click', startMining);
closeMiningButton.addEventListener('click', () => {
    miningSection.style.display = 'none'; // Hide mining section
    stopMining(); // Stop mining if active
});

levelUpButton.addEventListener('click', () => {
    if (upgradeCount < 10) {
        const cost = upgradeCosts[upgradeCount];
        if (pointCount >= cost) {
            pointCount -= cost; // Deduct points
            miningRate += 0.2; // Increase mining rate
            upgradeCount++; // Increment upgrade count
            pointCountElement.textContent = pointCount; // Update displayed points
            alert(`Mining speed increased! Current speed: ${miningRate} coins/minute`);
        } else {
            alert('Not enough points to upgrade!');
        }
    } else {
        alert('Maximum upgrades reached!');
    }
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
    let elapsedTime = 0;

    miningInterval = setInterval(() => {
        elapsedTime += 60000; // Increase elapsed time by 1 minute
        coinCount += miningRate; // Increase coins mined

        // Update progress bar
        const progress = (elapsedTime / miningDuration) * 100;
        progressBar.style.width = `${progress}%`;

        if (elapsedTime >= miningDuration) {
            clearInterval(miningInterval);
            miningInterval = null; // Reset mining interval
            miningActive = false;
            statusMessage.textContent = `Mining has stopped. You mined ${Math.floor(coinCount)} coins!`;
        }
    }, 60000); // Update every minute
}

function stopMining() {
    clearInterval(miningInterval);
    miningActive = false;
    progressBar.style.width = '0%'; // Reset progress bar
    progressContainer.style.display = 'none'; // Hide progress bar
}

// Load user data on page load
function loadUserData() {
    const storedPoints = localStorage.getItem('points');
    const storedCoins = localStorage.getItem('coins');
    const storedUpgrades = localStorage.getItem('upgrades');

    pointCount = storedPoints ? parseInt(storedPoints) : 0;
    coinCount = storedCoins ? parseInt(storedCoins) : 0;
    upgradeCount = storedUpgrades ? parseInt(storedUpgrades) : 0;

    // Update displayed values
    pointCountElement.textContent = pointCount;
    coinCountElement.textContent = Math.floor(coinCount);
}

// Load user data on page load
loadUserData();