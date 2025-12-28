const app = document.querySelector(".app");
const themeToggle = document.querySelector(".theme-toggle");
const timeDisplay = document.querySelector(".time");
const playButton = document.querySelector(".play-btn");
const durationSelect = document.querySelector(".duration-select");
const sessionCountEl = document.querySelector(".session-count");

const STORAGE_KEY = "focusTimerState";

let state = {
    theme: "light",
    duration: 25 * 60,
    timeLeft: 25 * 60,
    sessionCount: 0,
};

let isRunning = false;
let timer = null;

function loadState() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return;

    try {
        const parsed = JSON.parse(saved);
        state = { ...state, ...parsed };
    } catch (e) {
        console.warn("Invalid saved state, resetting.");
    }
}

function saveState() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
}

function updateDisplay() {
    timeDisplay.textContent = formatTime(state.timeLeft);
    sessionCountEl.textContent = String(state.sessionCount).padStart(2, "0");
    durationSelect.value = state.duration / 60;
}

function applyTheme() {
    const isDark = state.theme === "dark";
    document.body.classList.toggle("dark", isDark);
    themeToggle.textContent = isDark ? "☀️" : "🌙";
}

themeToggle.addEventListener("click", () => {
    state.theme = state.theme === "light" ? "dark" : "light";
    applyTheme();
    saveState();
});

function startTimer() {
    if (isRunning) return;

    isRunning = true;
    playButton.textContent = "⏸";

    timer = setInterval(() => {
        if (state.timeLeft > 0) {
            state.timeLeft--;
            updateDisplay();
            saveState();
        } else {
            clearInterval(timer);
            isRunning = false;
            state.sessionCount++;
            state.timeLeft = state.duration;
            playButton.textContent = "▶";
            updateDisplay();
            saveState();
        }
    }, 1000);
}

function pauseTimer() {
    isRunning = false;
    clearInterval(timer);
    playButton.textContent = "▶";
}

playButton.addEventListener("click", () => {
    isRunning ? pauseTimer() : startTimer();
});

durationSelect.addEventListener("change", () => {
    state.duration = Number(durationSelect.value) * 60;
    state.timeLeft = state.duration;

    if (isRunning) pauseTimer();

    updateDisplay();
    saveState();
});

loadState();
applyTheme();
updateDisplay();