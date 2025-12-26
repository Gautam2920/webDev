const switchBtn = document.querySelector(".switch");
const body = document.body;

let isDark = false;

switchBtn.addEventListener("click", () => {
    if (!isDark) {
        body.classList.add("dark");
        switchBtn.textContent = "Light Mode";
        isDark = true;
    } else {
        body.classList.remove("dark");
        switchBtn.textContent = "Dark Mode";
        isDark = false;
    }
});