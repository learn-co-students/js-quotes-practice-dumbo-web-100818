document.addEventListener('DOMContentLoaded', function(){
fetchAllQuotes();

let quoteList = document.getElementById('quote-list')
document.addEventListener('submit', createNewQuote)
document.body.addEventListener('click', increaseLikes)
document.addEventListener('click', handleDeleteButton)


function fetchAllQuotes(){
fetch(`http://localhost:3000/quotes`)
  .then(res => res.json())
  .then(displayAllQuotes)
}

function displayAllQuotes(quotes){
    quotes.forEach(quote => quoteList.innerHTML +=
    `<li data-id="${quote.id}" class='quote-card'>
      <blockquote class="blockquote">
        <p class="mb-0">${quote.quote}</p>
        <footer class="blockquote-footer">${quote.author}</footer>
        <br>
        <button class='btn-success'>Likes: <span>${quote.likes}</span></button>
        <button class='btn-danger'>Delete</button>
      </blockquote>
    </li>`
  )}

function createNewQuote(event){
  event.preventDefault()
    let inputs = document.querySelectorAll(".form-control")
    let newQuote =inputs[0].value
    let newAuthor =inputs[1].value
    let newLike = 0
//     fetchNewQuote();
//   }
// function fetchNewQuote(){
  fetch(`http://localhost:3000/quotes`,{
    method: 'POST', // or 'PUT'
    body: JSON.stringify({quote: newQuote, author: newAuthor, likes: newLike}), // data can be `string` or {object}!
    headers:{
    'Content-Type': 'application/json'
    }
  }).then(res => res.json())
    .then(quote =>{
      quoteList.innerHTML +=
      `<li data-id="${quote.id}" class='quote-card'>
        <blockquote class="blockquote">
          <p class="mb-0">${quote.quote}</p>
          <footer class="blockquote-footer">${quote.author}</footer>
          <br>
          <button class='btn-success'>Likes: <span>${quote.likes}</span></button>
          <button class='btn-danger'>Delete</button>
        </blockquote>
      </li>`
})
  }
// __________________________________________________________________
  function increaseLikes(event){
    if(event.target.className === "btn-success"){
      let quoteId = event.target.parentElement.parentElement.dataset.id

      let likePlace = event.target.getElementsByTagName('span')[0]
      let likeCount = parseInt(event.target.getElementsByTagName('span')[0].innerText)
      likePlace.innerHTML = `${++likeCount}`

      fetch(`http://localhost:3000/quotes/${quoteId}`,{
        method: 'PATCH', // or 'PUT'
        body: JSON.stringify({likes: likeCount}),
        headers:{
        'Content-Type': 'application/json',
        'Accept': 'application/json'
        }
      })
    }
  }

// __________________________________________________________________

function handleDeleteButton(event){
  if(event.target.className === "btn-danger"){
  let buttonId = event.target.parentElement.parentElement.dataset.id
  event.target.parentElement.parentElement.remove()
  deleteQuote(buttonId)
  }
}

function deleteQuote(buttonId){
  fetch(`http://localhost:3000/quotes/${buttonId}`,{
    method: 'DELETE'
  })
}








})
