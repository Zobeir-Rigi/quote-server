const fetchQuote = async () => {
    const response = await fetch("https://zobeir-rigi-quote-serverr.hosting.codeyourfuture.io/")
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