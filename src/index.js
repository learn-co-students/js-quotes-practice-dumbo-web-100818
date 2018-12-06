document.addEventListener('DOMContentLoaded',function() {
  getData()
  const quoteForm = document.getElementById('new-quote-form')
  quoteForm.addEventListener('submit', createQuote)

  let quoteArea = document.getElementById('quote-list')
  quoteArea.addEventListener('click', handleQuoteAreaClick)
})
/*
Submitting the form creates a new quote and adds it to the list of quotes without having to refresh the page. (Whether you choose to optimistically render or not is up to you).
Clicking the delete button should delete the respective quote from the database and remove it from the page without having to refresh.
Clicking the like button will increase the number of likes for this particular comment in the database and on the page without having to refresh.
*/

function increaseLikes(event) {

  let like = event.target.children[0].innerText
  let counter = parseInt(like)
  // counter += 1
  ++counter
  event.target.children[0].innerText = counter
  addLike(event, counter)
}

function addLike(event,counter) {
  let quoteId = event.target.parentElement.parentElement.id
  debugger
    fetch(`http://localhost:3000/quotes/${quoteId}`,{
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        "likes": counter
      })
    })
    .then(res => res.json()).then(console.log)
  }

  function quoteDelete(e) {
    let quoteId = e.target.parentElement.parentElement.id
    event.target.parentElement.parentElement.remove()
    fetch(`http://localhost:3000/quotes/${quoteId}`,{
      method: "DELETE"})

  }


function createQuote(e) {
  e.preventDefault()
  let quoteValue = document.getElementById('new-quote').value
  let quoteAuthor = document.getElementById('author').value
  debugger
  fetch('http://localhost:3000/quotes',{
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "quote": quoteValue,
      "author": quoteAuthor,
      "likes": 0
    })
  })
  .then(res => res.json()).then(showQuotes)
}

function getData() {
  fetch('http://localhost:3000/quotes')
  .then(res => res.json())
  .then(seperateData)
}

function seperateData(quotes) {
  for (quote of quotes){
    showQuotes(quote)
  }

}


function showQuotes(quote) {
  let quoteArea = document.getElementById('quote-list')
  quoteArea.innerHTML += `<li id="${quote.id}" class='quote-card'>
    <blockquote class="blockquote">
      <p class="mb-0">${quote.quote}</p>
      <footer class="blockquote-footer">${quote.author}</footer>
      <br>
      <button class='btn-success'>Likes: <span id='likes'>${quote.likes}</span></button>
      <button class='btn-danger'>Delete</button>
    </blockquote>
  </li>`

}

//***************** Click Handlers**************

function handleQuoteAreaClick(e) {
  if(e.target.className === 'btn-success'){
    increaseLikes(e)
  } else if(e.target.className === 'btn-danger') {
    quoteDelete(e)
    debugger
  }

}
