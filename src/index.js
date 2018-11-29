// It might be a good idea to add event listener to make sure this file
// only runs after the DOM has finshed loading.

document.addEventListener('DOMContentLoaded', function(){

  const fetchQuotes = fetch('http://localhost:3000/quotes').then(res => res.json())
  const quoteList = document.getElementById('quote-list')
  const newQuoteForm = document.getElementById('new-quote-form')

  fetchQuotes
  .then(quotes => {
    quotes.forEach((quote) =>{
      quoteList.innerHTML += `<li data-id = ${quote.id} class= "quote-card">
        <blockquote class="blockquote">
          <p class="mb-0">${quote.quote}</p>
          <footer class="blockquote-footer">${quote.author}</footer>
          <br>
          <button class='btn-success' data-id = ${quote.id}>Likes: <span>${quote.likes}</span></button>
          <button class='btn-danger' data-id = ${quote.id}>Delete</button>
        </blockquote>
      </li>`
    })
  })

  quoteList.addEventListener('click',  function (e) {
    if (e.target.className === 'btn-success'){
      addLike(e)
    }
  })

  quoteList.addEventListener('click', function (e) {
    if (e.target.className === 'btn-danger'){
      deleteQuote(e)
    }
  })

  newQuoteForm.addEventListener('submit', function (e) {
    let newQuote = document.getElementById("new-quote").value
    let newAuthor = document.getElementById("author").value
    addQuote(newQuote, newAuthor)
  })

})


function addLike(e) {
  let value = e.target.innerText.slice(-1)
  let addedLike = parseInt(value)
  addedLike ++
  fetch(`http://localhost:3000/quotes/${e.target.dataset.id}`,{
    method:"PATCH",
    headers:{
    "Content-Type":"application/json"
  },
    body:JSON.stringify({"likes": addedLike })
  })

  e.target.innerText = `Likes: ${addedLike}`
}

function deleteQuote(e) {
  e.target.parentNode.remove()
  return fetch(`http://localhost:3000/quotes/${e.target.dataset.id}`, {
    method: "DELETE",
  })
  .then(res => res.json())
}

function addQuote(quote, author) {
  fetch(`http://localhost:3000/quotes/`,{
    method:"POST",
    headers:{
    "Content-Type":"application/json"
  },
    body:JSON.stringify({"quote": quote, "likes": 0, "author": author })
  })
}
