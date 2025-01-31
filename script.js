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

// Costs for each level up
const upgradeCosts = [5, 10, 20, 35, 80, 160, 320, 640, 1280, 2560]; 
let upgradeCount = 0; // Track number of upgrades

mineButton.addEventListener('click', () => {
    // Open a new page when MINE is clicked
    window.open('mine.html', '_blank'); // Replace 'mine.html' with the desired URL
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
    miningActive = true;
    lastMiningTime = Date.now();
    miningInterval = setInterval(() => {
        const elapsedTime = (Date.now() - lastMiningTime) / 60000; // Convert ms to minutes
        coinCount += miningRate * elapsedTime;
        coinCountElement.textContent = Math.floor(coinCount); // Update displayed coin count
        lastMiningTime = Date.now();
    }, 60000); // Update every minute

    setTimeout(stopMining, miningDuration); // Stop mining after 12 hours
}

function stopMining() {
    clearInterval(miningInterval);
    miningActive = false;
    alert('Mining has stopped. Please click "MINE" to start again.');
}

// Load user data (if needed)
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