// Kiểm tra xem file có chạy không
console.log("Game Script Đã Tải Thành Công!");

const icons = ["🧸", "🎀", "🍭", "🌸", "🐰", "🌈", "🍦", "✨", "🍓", "🧁", "🐾", "🎈", "🐥", "🎨", "🍩"];
const levels = [10, 20, 30];
let currentLvlIdx = 0;
let flippedCards = [];
let matchedCount = 0;
let isWaiting = false;

function initGame() {
    const grid = document.getElementById('game-grid');
    const progress = document.getElementById('progress-fill');
    if (!grid) return;

    const numCards = levels[currentLvlIdx];
    const selectedIcons = icons.slice(0, numCards / 2);
    const gameIcons = [...selectedIcons, ...selectedIcons].sort(() => Math.random() - 0.5);

    grid.innerHTML = '';
    grid.style.gridTemplateColumns = `repeat(${numCards === 30 ? 6 : 5}, 70px)`;
    matchedCount = 0;
    progress.style.width = '0%';

    gameIcons.forEach(icon => {
        const card = document.createElement('div');
        card.className = 'card';
        card.dataset.icon = icon;
        card.innerHTML = `
            <div class="card-back">🐾</div>
            <div class="card-front">${icon}</div>
        `;
        card.onclick = () => {
            if (isWaiting || card.classList.contains('flipped') || card.classList.contains('matched')) return;
            card.classList.add('flipped');
            flippedCards.push(card);

            if (flippedCards.length === 2) {
                isWaiting = true;
                const [c1, c2] = flippedCards;
                if (c1.dataset.icon === c2.dataset.icon) {
                    setTimeout(() => {
                        c1.classList.add('matched');
                        c2.classList.add('matched');
                        matchedCount += 2;
                        progress.style.width = (matchedCount / numCards) * 100 + '%';
                        flippedCards = [];
                        isWaiting = false;
                        if (matchedCount === numCards) {
                            setTimeout(() => {
                                if (currentLvlIdx < levels.length - 1) {
                                    currentLvlIdx++;
                                    initGame();
                                } else {
                                    document.getElementById('win-screen').style.display = 'flex';
                                }
                            }, 1000);
                        }
                    }, 600);
                } else {
                    setTimeout(() => {
                        c1.classList.remove('flipped');
                        c2.classList.remove('flipped');
                        flippedCards = [];
                        isWaiting = false;
                    }, 1000);
                }
            }
        };
        grid.appendChild(card);
    });
}

// Đảm bảo DOM đã sẵn sàng trước khi chạy
window.onload = initGame;