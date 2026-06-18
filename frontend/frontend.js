const fetchQuote = async () => {
    const response = await fetch("http://127.0.0.1:3000/")
    const data = await response.json()
    const q = document.getElementById("quote");
    q.textContent = data.quote

    const a = document.getElementById("author");
    a.textContent = data.author;
};

const button = document.getElementById("new-quote");
button.addEventListener("click", () => {
    fetchQuote();
})


fetchQuote();