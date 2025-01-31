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
const telegramIdInput = document.getElementById('telegram-id');
const loginButton = document.getElementById('login-button');

const upgradeCosts = [5, 10, 20, 35, 80, 160, 320, 640, 1280, 2560]; // Costs for each level up
let upgradeCount = 0; // Track number of upgrades

// Load user data from local storage
function loadUserData() {
    const storedTelegramId = localStorage.getItem('telegramId');
    const storedPoints = localStorage.getItem('points');
    const storedCoins = localStorage.getItem('coins');
    const storedUpgrades = localStorage.getItem('upgrades');

    if (storedTelegramId) {
        telegramIdInput.value = storedTelegramId;
        pointCount = storedPoints ? parseInt(storedPoints) : 0;
        coinCount = storedCoins ? parseInt(storedCoins) : 0;
        upgradeCount = storedUpgrades ? parseInt(storedUpgrades) : 0;

        // Update displayed values
        pointCountElement.textContent = pointCount;
        coinCountElement.textContent = Math.floor(coinCount);
        
        // Show sections after login
        document.querySelector('.sections').style.display = 'flex';
    }
}

// Save user data to local storage
function saveUserData() {
    localStorage.setItem('telegramId', telegramIdInput.value);
    localStorage.setItem('points', pointCount);
    localStorage.setItem('coins', coinCount);
    localStorage.setItem('upgrades', upgradeCount);
}

loginButton.addEventListener('click', () => {
    const telegramId = telegramIdInput.value.trim();
    if (telegramId) {
        saveUserData();
        loadUserData();
    } else {
        alert('Please enter a valid Telegram ID.');
    }
});

mineButton.addEventListener('click', () => {
    if (!miningActive) {
        startMining();
    } else {
        alert('Mining is already active. Please wait until it stops.');
    }
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

// Load user data on page load
loadUserData();