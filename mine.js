let miningDuration = 12 * 60 * 1000; // 12 hours in milliseconds
let miningRate = 0.2; // Coins per minute
let totalCoinsMined = 0; // Total coins mined
let miningInterval;
let progressBar = document.getElementById('progress-bar');
let progressContainer = document.getElementById('progress-container');
let statusMessage = document.getElementById('status-message');

document.getElementById('start-mine-button').addEventListener('click', startMining);

function startMining() {
    if (miningInterval) {
        alert('Mining is already in progress.');
        return;
    }

    totalCoinsMined = 0; // Reset coins mined
    progressBar.style.width = '0%'; // Reset progress bar
    progressContainer.style.display = 'block'; // Show progress bar
    statusMessage.textContent = 'Mining has started!';

    let elapsedTime = 0;

    miningInterval = setInterval(() => {
        elapsedTime += 60000; // Increase elapsed time by 1 minute
        totalCoinsMined += miningRate; // Increase coins mined

        // Update progress bar
        const progress = (elapsedTime / miningDuration) * 100;
        progressBar.style.width = `${progress}%`;

        if (elapsedTime >= miningDuration) {
            clearInterval(miningInterval);
            miningInterval = null; // Reset mining interval
            statusMessage.textContent = 'Mining has stopped. You mined ' + Math.floor(totalCoinsMined) + ' coins!';
        }
    }, 60000); // Update every minute
}