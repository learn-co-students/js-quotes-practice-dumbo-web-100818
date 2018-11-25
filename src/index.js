// It might be a good idea to add event listener to make sure this file
// only runs after the DOM has finshed loading.

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
  const successButtonElement = document.createElement("button");
  const spanElement = document.createElement("span");
  const dangerButtonElement = document.createElement("button");

  quoteElement.classList.add("quote-card");
  blockQuoteElement.classList.add("blockquote");
  paragraphElement.classList.add("mb-0");
  paragraphElement.innerHTML = quote.quote;
  footerElement.classList.add("blockquote-footer");
  footerElement.innerHTML = quote.author;
  successButtonElement.classList.add("btn-success");
  successButtonElement.innerHTML = "Likes: ";
  spanElement.innerHTML = quote.likes;
  dangerButtonElement.classList.add("btn-danger");
  dangerButtonElement.innerHTML = "Delete";

  successButtonElement.appendChild(spanElement)
  blockQuoteElement.appendChild(paragraphElement);
  blockQuoteElement.appendChild(footerElement);
  blockQuoteElement.appendChild(breakElement);
  blockQuoteElement.appendChild(successButtonElement);
  blockQuoteElement.appendChild(dangerButtonElement);
  quoteElement.appendChild(blockQuoteElement);
  return quoteElement;
}

document.addEventListener("DOMContentLoaded", function(event) {
  fetchQuotes();
});
