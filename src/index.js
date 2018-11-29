// It might be a good idea to add event listener to make sure this file
// only runs after the DOM has finshed loading.

document.addEventListener('DOMContentLoaded', () => {
  let filterButton = document.querySelector('#filter')
  getQuotes()


})

function getQuotes(){
  const quoteContainer = document.querySelector('#quote-list')
  quoteContainer.innerHTML = ''
  fetch('http://localhost:3000/quotes')
  .then(response => response.json())
  .then(quotes =>
    quotes.forEach((quote) => {
      quoteContainer.innerHTML += constructQuote(quote)
    })
  )
}

document.querySelector('#new-quote-form').addEventListener('submit', ()=> {
  event.preventDefault()
  let buttonContent = event.target.elements[2].innerHTML
  let form = event.target
  let quote = form.elements[0].value
  let author = form.elements[1].value

  if (author !== "" && quote !== ""){
    if (event.target.id === 'btn-primary'){
      buttonContent === "Submit" ? createQuote(author, quote) : updateQuote(author, quote)
    }
  }
})

function createQuote(author, quote){
  fetch('http://localhost:3000/quotes', {
    method: "POST",
    headers: {
      'Content-Type':'application/json'
    },
    body: JSON.stringify({quote: quote, author: author, likes: 0})
  }).then(response => response.json()).then(quote => {
    document.querySelector('#quote-list').innerHTML += constructQuote(quote)
  })
}

function constructQuote(quoteObject){
  return `<li class='quote-card'>
<blockquote class="blockquote">
  <p class="mb-0">${quoteObject.quote}</p>
  <footer class="blockquote-footer">${quoteObject.author}</footer>
  <br>
  <button class='btn-success'>Likes: <span>${quoteObject.likes}</span></button>
  <button data-id='${quoteObject.id}'class='btn-danger'>Delete</button>
  <button class='btn-edit'>Edit</button>
</blockquote>
</li>`
}

document.getElementById('quote-list').addEventListener('click', ()=> {
  let button = event.target
  // debugger
  if( button.className === 'btn-danger') {
    // console.log('this is delete')
    deleteQuote(button)
  }else if(button.className === 'btn-success'){
    // console.log('this is like')
    addLike(button)
  } else if (button.className === 'btn-edit'){
    editQuote(button)
  }
})

function deleteQuote(button){
  button.parentElement.parentElement.remove()
  let quoteId = button.dataset.id
  fetch(`http://localhost:3000/quotes/${quoteId}`, {method: "DELETE"})
}

function addLike(button){
  let quoteId = button.nextElementSibling.dataset.id
  let likesDisplay = button.firstElementChild
  let likeNumber = parseInt(likesDisplay.innerHTML)
  likesDisplay.innerHTML = `${++likeNumber}`
  fetch(`http://localhost:3000/quotes/${quoteId}`, {
    method: "PATCH",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({likes: likeNumber})
  })
}

function editQuote(button){
  let oldQuote = button.parentElement.firstElementChild
  let oldAuthor = oldQuote.nextElementSibling

  let quoteId = button.previousElementSibling.dataset.id
  let form = document.getElementById('new-quote-form')

  form.elements[0].value = oldQuote.innerHTML
  form.elements[1].value = oldAuthor.innerHTML
  form.elements[2].innerHTML = 'Edit'




  updateQuote(form, quoteId, )


  // by clicking edit we want to populate the values of the inputs on the form with the quote content
  // we also want to change the submit button innerHTML to edit and immediately change it back after the form is submitted
}


function updateQuote(form, id, author, quote){

  // fetch(`http://localhost:3000/quotes/${id}`, {
  //   method: "PATCH",
  //   headers: {
  //     'Content-Type': 'application/json'
  //   },
  //   body: JSON.stringify({quote: quote, author: author})
  // })
}

document.getElementById('filter').addEventListener('click', updateFilterStatus)

function updateFilterStatus(){
  let filterButton = event.target
  x = filterButton.innerHTML.split(": ")
  x[1] === 'OFF' ? x[1] = 'ON' : x[1] = 'OFF'
  filterButton.innerHTML = x.join(": ")
  changePage(x)
}

function changePage(status){
  return status[1] === 'OFF' ? getQuotes() : alphabetizeQuotes()
}


function alphabetizeQuotes(){
  let quoteContainer = document.querySelector('#quote-list')
  fetch('http://localhost:3000/quotes')
  .then(response => response.json())
  .then(quotes => {

    let sortedQuotes = quotes.sort((quoteA, quoteB) => quoteA.author.localeCompare(quoteB.author))
    quoteContainer.innerHTML = ''
    sortedQuotes.forEach((quote) => {
       quoteContainer.innerHTML += constructQuote(quote)
     })
  })
}
