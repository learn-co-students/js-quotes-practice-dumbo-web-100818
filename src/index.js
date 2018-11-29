// It might be a good idea to add event listener to make sure this file
// only runs after the DOM has finshed loading.
document.addEventListener('DOMContentLoaded', function() {
  console.log("the DOM has finished loading")
  getAllQuotes()

  let container = document.getElementById('quote-list')
  let newForm = document.getElementById('new-quote-form')


  newForm.addEventListener('submit', handleNewQuote)
  container.addEventListener('click', handleRemoveQuote)
  container.addEventListener('click', handleNewLike)
  container.addEventListener('click', handleEdit)
//---------------FETCH--------------
  function getAllQuotes(){
  fetch('http://localhost:3000/quotes')
  .then(res => res.json())
  .then(displayAllQuote)
}
  function addNewQuote(quote, author){
    fetch('http://localhost:3000/quotes', {
      method: "POST",
      body: JSON.stringify({quote: quote, author: author, likes: 0}),
      headers:{
        'Content-Type': 'application/json'
      }
    }).then(res => res.json())
    .then(displayNewQuote)
  }

  function removeQuote(quoteId){
    fetch(`http://localhost:3000/quotes/${quoteId}`, {
      method: "DELETE"
    })
    // .then(res => res.json())
    .then(getAllQuotes)
  }

  function addLike(quoteId, likes){
    //likes is one less than what we want
    //1. turn likes in integer, add 1 then turn back into string

    //-----
      let likes_int = parseInt(likes)
      likes_int += 1
      like = likes_int.toString()

      //--> expected value "2"
    //-----
    fetch(`http://localhost:3000/quotes/${quoteId}`, {
      method: "PATCH",
      body: JSON.stringify({likes: like}),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(res => res.json())
    .then(getAllQuotes)

  }

  function editQuote(quoteId, quote, author){
    fetch (`http://localhost:3000/quotes/${quoteId}`, {
      method: "PATCH",
      body: JSON.stringify({quote: quote, author: author}),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(res => res.json())
    .then(getAllQuotes)
    }



//--------------DOM-------------
  function displayAllQuote(quotes){
    container.innerHTML = ""
    quotes.forEach(quote => {
      container.innerHTML +=
      `<li class='quote-card'>
        <blockquote class="blockquote">
          <p class="mb-0">${quote.quote}</p>
          <footer class="blockquote-footer">${quote.author}</footer>
          <br>
          <button data-id=${quote.id} class='btn-success'>Likes: <span>${quote.likes}</span></button>
          <button data-id=${quote.id} class='btn-danger'>Delete</button>
          <button data-id=${quote.id} class='btn-edit'>Edit</button>
        </blockquote>
      </li>`
    })

  }

  function displayNewQuote(quote){
  container.innerHTML +=
    `<li class='quote-card'>
      <blockquote class="blockquote">
        <p class="mb-0">${quote.quote}</p>
        <footer class="blockquote-footer">${quote.author}</footer>
        <br>
        <button data-id=${quote.id} class='btn-success'>Likes: <span>0</span></button>
        <button data-id=${quote.id} class='btn-danger'>Delete</button>
        <button data-id=${quote.id} class='btn-edit'>Edit</button>
      </blockquote>
    </li>`
  }
  // ------------Handelers---------
  function handleNewQuote(event){
    let quote, author;
     quote = event.target[0].value
     author = event.target[1].value

    addNewQuote(quote, author)
  }

  function handleRemoveQuote(event){
    let quoteId;
    if (event.target.classList[0] === "btn-danger"){
      quoteId = event.target.dataset.id
      removeQuote(quoteId)
    }
  }

  function handleNewLike(event){
    let quoteId, likes;
    if (event.target.classList[0] === "btn-success")
    quoteId = event.target.dataset.id

    likes = event.target.firstElementChild.innerText
    addLike(quoteId, likes)
  }

  function handleEdit(event){
    let quoteId, quote, author;
    quote = event.target.parentElement.firstElementChild.innerText
    author = event.target.parentElement.children[1].innerText
    if (event.target.classList[0] === "btn-edit")
    quoteId = event.target.dataset.id
    editQuote(quoteId, quote, author)
  }


})
