// It might be a good idea to add event listener to make sure this file
// only runs after the DOM has finshed loading.
const quoteForm = document.querySelector("#new-quote-form");

function postQuote() {
  event.preventDefault();
  let quoteInput = document.querySelector("#new-quote");
  let authorInput = document.querySelector("#author");

  quoteData = {
    quote: quoteInput.value,
    author: authorInput.value,
    likes: 0
  }

  fetch("http://localhost:3000/quotes", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify(quoteData)
  })
  .then(resp => resp.json())
  .then(function(json) {
    const quoteList = document.querySelector("#quote-list");
    let quote = createQuote(json)
    quoteList.appendChild(quote)
    quoteForm.reset();
  })
}

function fetchQuotes() {
  fetch("http://localhost:3000/quotes")
  .then(resp => resp.json())
  .then(renderQuotes)
};

function renderQuotes(json) {
  const quoteList = document.querySelector("#quote-list");
  json.forEach(function(quote) {
    let newQuote = createQuote(quote);
    quoteList.appendChild(newQuote);
  })
};

function createQuote(quote) {
  const quoteElement = document.createElement("li");
  const blockQuoteElement = document.createElement("blockquote");
  const paragraphElement = document.createElement("p");
  const footerElement = document.createElement("footer");
  const breakElement = document.createElement("br");
  const likeButtonElement = document.createElement("button");
  const spanElement = document.createElement("span");
  const dangerButtonElement = document.createElement("button");

  quoteElement.classList.add("quote-card");
  blockQuoteElement.classList.add("blockquote");
  paragraphElement.classList.add("mb-0");
  paragraphElement.innerHTML = quote.quote;
  footerElement.classList.add("blockquote-footer");
  footerElement.innerHTML = quote.author;
  likeButtonElement.classList.add("btn-success");
  likeButtonElement.innerHTML = "Likes: ";
  likeButtonElement.id = quote.id;
  spanElement.innerHTML = quote.likes;
  dangerButtonElement.classList.add("btn-danger");
  dangerButtonElement.innerHTML = "Delete";
  dangerButtonElement.id = quote.id;
  dangerButtonElement.onclick = deleteQuote;

  likeButtonElement.appendChild(spanElement)
  blockQuoteElement.appendChild(paragraphElement);
  blockQuoteElement.appendChild(footerElement);
  blockQuoteElement.appendChild(breakElement);
  blockQuoteElement.appendChild(likeButtonElement);
  blockQuoteElement.appendChild(dangerButtonElement);
  quoteElement.appendChild(blockQuoteElement);
  return quoteElement;
}

function deleteQuote() {
  let parentElement = event.target.parentElement;
  let id = event.target.id;
  fetch(`http://localhost:3000/quotes/${id}`, {
    method: "DELETE",
  })
  .then(function(resp) {
    removeQuote(resp, parentElement);
  })
};

function removeQuote(resp, blockquote) {
  blockquote.remove()
}

document.addEventListener("DOMContentLoaded", function(event) {
  fetchQuotes();
  quoteForm.addEventListener("submit", postQuote)
});
