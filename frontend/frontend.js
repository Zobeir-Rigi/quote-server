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


const postNewQuote = async () => {
  console.log("button clicked");

  const textArea = document.getElementById("text-area").value;
  const author = document.getElementById("new-author").value;
  const div = document.getElementById("user-feedback")

  console.log(textArea);
  console.log(author);

  if (!textArea || !author) {
    console.log("Fill all fields");
    div.textContent = "plz fill all fields"
  } else {

    try {
      console.log("sending request...");

      const response = await fetch("http://127.0.0.1:3000/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          quote: textArea,
          author: author
        })
      });

      const result = await response.text();
      if (response.ok) {
        div.textContent = "Quote successfully added";

        document.getElementById("text-area").value = "";
        document.getElementById("new-author").value = "";
      } else {
        div.textContent = "check if the server is running"

      }
      console.log("response:", result);

    } catch (error) {
      console.log("error", error);

      div.textContent = "Server not reachable";

    }
  }
};