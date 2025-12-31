let isLoading = false;
let data = null;
let error = null;

const button = document.querySelector(".btn");
const output = document.querySelector(".data");

async function fetchPosts(url) {
    const response = await fetch(url);

    if (!response.ok)
        throw new Error(`Request failed: ${response.status}`);

    return response.json();
}

function renderUI() {
    if (isLoading) {
        output.textContent = "Loading...";
    } else if (error) {
        output.textContent = error;
    } else if (data) {
        const titles = data.map(item => item.title);
        output.textContent = titles.join("\n");
    }
}

async function handleClick(){
    isLoading = true;
    error = null;
    renderUI();
    button.disabled = true;

    try{
        data = await fetchPosts("https://jsonplaceholder.typicode.com/posts");
    }catch(err){
        error = err.message;
        data = null;
    }finally{
        isLoading = false;
        button.disabled = false;
        renderUI();
    }
}

button.addEventListener("click", handleClick);