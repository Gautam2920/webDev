let isLoading = false;
let data = null;
let error = null;

const button = document.querySelector(".btn");
const output = document.querySelector(".data");

button.addEventListener("click", async () => {
    isLoading = true;
    error = null;
    output.textContent = "Loading...";
    button.disabled = true;

    try {
        const response = await fetch("https://jsonplaceholder.typicode.com/posts");
        const result = await response.json();

        data = result;

        const titles = data.map(item => item.title);
        output.textContent = titles.join("\n");
    } catch (err) {
        error = err.message;
        output.textContent = error;
    }

    isLoading = false;
    button.disabled = false;
});