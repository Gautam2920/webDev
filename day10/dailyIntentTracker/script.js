let intentionText = "";
let isCompleted = false;
let date = new Date().toDateString();

let textArea = document.querySelector('#intentionInput');
let saveButton = document.querySelector('.save-btn');
let markComplete = document.querySelector('.complete-btn');
let resetDay = document.querySelector('.reset-btn');
let feedback = document.querySelector('.feedback');

const STORAGE_KEY = "daily-intent";

function loadStateFromStorage() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return;

    const parsed = JSON.parse(saved);
    const today = new Date().toDateString();

    if (parsed.date === today) {
        intentionText = parsed.intentionText;
        isCompleted = parsed.isCompleted;
        date = parsed.date;
    } else localStorage.removeItem(STORAGE_KEY);
}

function saveStateToStorage() {
    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
            intentionText,
            isCompleted,
            date
        })
    );
}

function renderUI() {
    textArea.value = intentionText;

    if (!intentionText) feedback.textContent = "";
    else if (isCompleted) feedback.textContent = "Completed";
    else feedback.textContent = "In Progress";

    saveButton.disabled = !textArea.value.trim();
    markComplete.disabled = !intentionText || isCompleted;
    resetDay.disabled = !intentionText;
}

textArea.addEventListener("input", (e) => {
    intentionText = e.target.value;
    renderUI();
});

saveButton.addEventListener("click", () => {
    intentionText = textArea.value.trim();
    isCompleted = false;
    date = new Date().toDateString();

    saveStateToStorage();
    renderUI();
});

markComplete.addEventListener("click", () => {
    isCompleted = true;

    saveStateToStorage();
    renderUI();
});

resetDay.addEventListener("click", () => {
    intentionText = "";
    isCompleted = false;
    date = new Date().toDateString();

    localStorage.removeItem(STORAGE_KEY);
    renderUI();
});


loadStateFromStorage();
renderUI();