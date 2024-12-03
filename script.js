let score = 0;
let multiplier = 1;
let autoClickerCount = 0;
let autoClickerActive = false;
let rewardsUnlocked = [];

let multiplierPrice = 100;
let autoClickerPrice = 200;

const ranks = [
    { name: 'Newbie', clicksRequired: 0 },
    { name: 'Beginner', clicksRequired: 50 },
    { name: 'Novice', clicksRequired: 200 },
    { name: 'Apprentice', clicksRequired: 1_000 },
    { name: 'Journeyman', clicksRequired: 5_000 },
    { name: 'Skilled', clicksRequired: 10_000 },
    { name: 'Expert', clicksRequired: 50_000 },
    { name: 'Master', clicksRequired: 100_000 },
    { name: 'Grandmaster', clicksRequired: 500_000 },
    { name: 'Legendary', clicksRequired: 1_000_000 },
    { name: 'Mythic', clicksRequired: 5_000_000 },
    { name: 'Epic', clicksRequired: 10_000_000 },
    { name: 'Godlike', clicksRequired: 50_000_000 },
    { name: 'Titan', clicksRequired: 100_000_000 },
    { name: 'Immortal', clicksRequired: 500_000_000 },
    { name: 'Celestial', clicksRequired: 1_000_000_000 },
    { name: 'Universal', clicksRequired: 5_000_000_000 },
    { name: 'Cosmic', clicksRequired: 10_000_000_000 },
    { name: 'Omniscient', clicksRequired: 100_000_000_000 },
    { name: 'Ultimate Clicker', clicksRequired: 10_000_000_000_000 },
    { name: 'Loser Clicker', clicksRequired: 100_000_000_000_000 },
    { name: 'No-Life Clicker', clicksRequired: 10_000_000_000_000_000 },
    { name: 'Degenerate GOD of Clicking', clicksRequired: 100_000_000_000_000_000_000_000_000_000_000_000_000_000_000_000 },
];

let currentRankIndex = 0;
const scoreElement = document.getElementById('score');
const clickButton = document.getElementById('clickButton');
const rankElement = document.getElementById('rank');
const nextRankClicksElement = document.getElementById('nextRankClicks');
const buyMultiplierButton = document.getElementById('buyMultiplier');
const buyAutoClickerButton = document.getElementById('buyAutoClicker');
const rewardSection = document.getElementById('rewardSection');
const resetButton = document.getElementById('resetButton');
const multiplierPriceElement = document.getElementById('multiplierPrice');
const autoClickerPriceElement = document.getElementById('autoClickerPrice');

const rewards = [
    { name: 'Badge', clicksRequired: 50 },
    { name: 'Animal (Dog)', clicksRequired: 150 },
    { name: 'Trophy', clicksRequired: 500 },
];

function updateScore(amount) {
    score += amount;
    scoreElement.textContent = score;
    checkRank();
    checkUpgrades();
    checkRewards();
}

function checkRank() {
    const nextRank = ranks[currentRankIndex + 1];

    if (nextRank && score >= nextRank.clicksRequired) {
        currentRankIndex++;
        rankElement.textContent = ranks[currentRankIndex].name;

        if (ranks[currentRankIndex + 1]) {
            nextRankClicksElement.textContent = ranks[currentRankIndex + 1].clicksRequired;
        } else {
            nextRankClicksElement.textContent = 'Max Rank Reached!';
        }
    }
}

function buyMultiplier() {
    if (score >= multiplierPrice) {
        score -= multiplierPrice;
        multiplier *= 2;  // Double the multiplier
        multiplierPrice *= 2;  // Double the price for the next upgrade
        multiplierPriceElement.textContent = multiplierPrice;
        updateScore(0); // update score display
    }
}

function buyAutoClicker() {
    if (score >= autoClickerPrice) {
        score -= autoClickerPrice;
        autoClickerCount += 1;  // Increase auto-clicker count
        if (!autoClickerActive) {
            autoClickerActive = true;
            setInterval(() => updateScore(multiplier * autoClickerCount), 1000);  // Auto-click with multiplier
        }
        autoClickerPrice *= 3;  // Triple the price for the next auto-clicker
        autoClickerPriceElement.textContent = autoClickerPrice;
        updateScore(0); // update score display
    }
}

function checkUpgrades() {
    buyMultiplierButton.disabled = score < multiplierPrice;
    buyAutoClickerButton.disabled = score < autoClickerPrice;
}

function checkRewards() {
    rewards.forEach((reward) => {
        if (score >= reward.clicksRequired && !rewardsUnlocked.includes(reward.name)) {
            rewardsUnlocked.push(reward.name);
            const rewardMessage = document.createElement('p');
            rewardMessage.textContent = `You unlocked: ${reward.name}!`;
            rewardSection.appendChild(rewardMessage);
        }
    });
}

function resetGame() {
    score = 0;
    multiplier = 1;
    autoClickerCount = 0;
    autoClickerActive = false;
    rewardsUnlocked = [];
    currentRankIndex = 0;
    multiplierPrice = 100;
    autoClickerPrice = 200;

    scoreElement.textContent = score;
    rankElement.textContent = ranks[0].name;
    nextRankClicksElement.textContent = ranks[1].clicksRequired;
    multiplierPriceElement.textContent = multiplierPrice;
    autoClickerPriceElement.textContent = autoClickerPrice;

    rewardSection.innerHTML = '<p>Reach certain milestones to unlock rewards!</p>';
    buyMultiplierButton.disabled = false;
    buyAutoClickerButton.disabled = false;
}

// Click event to increase score
clickButton.addEventListener('click', () => updateScore(multiplier));

// Upgrade purchase events
buyMultiplierButton.addEventListener('click', buyMultiplier);
buyAutoClickerButton.addEventListener('click', buyAutoClicker);

// Reset button event
resetButton.addEventListener('click', resetGame);
