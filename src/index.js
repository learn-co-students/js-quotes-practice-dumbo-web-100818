// It might be a good idea to add event listener to make sure this file
// only runs after the DOM has finshed loading.
const quoteUrl = 'http://localhost:3000/quotes'
const quoteList = document.querySelector('#quote-list')
function addQuote(quote) {
divy = `<li class='quote-card'>
  <blockquote data-id="${quote.id}" class="blockquote">
    <p class="mb-0">${quote.quote}</p>
    <footer class="blockquote-footer">${quote.author}</footer>
    <br>
    <button class='btn-success'>Likes: <span>${quote.likes}</span></button>
    <button class='btn-danger'>Delete</button>
  </blockquote>
</li>
`
quoteList.innerHTML += divy
}
function getQuotes() {
  fetch(quoteUrl).then(r => r.json()).then(json => json.forEach(quote => addQuote(quote)))
}

function addNewQuote(e) {
  e.preventDefault()

  let inputs = document.querySelectorAll('.form-control')
  let quote = inputs[0].value
  let author = inputs[1].value

  let sendy = {
    quote: quote,
    author: author,
    likes: 0
  }

  addQuote(sendy)
  fetch(quoteUrl, {
    method: "POST",
    body: JSON.stringify(sendy),
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  })
}


function changey(e) {
  if (e.target.className === 'btn-success') {
    let id = e.target.parentElement.dataset.id
    let like = e.target.firstElementChild
    let likenum = parseInt(e.target.firstElementChild.innerText)
    like.innerText = `${++likenum}`


    fetch(`${quoteUrl}/${id}`, {
      method: "PATCH",
      body: JSON.stringify({
        likes: likenum
      }),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
  } else if (e.target.className === 'btn-danger') {
    let id = e.target.parentElement.dataset.id
    e.target.parentElement.parentElement.remove()

    fetch(`${quoteUrl}/${id}`, {
      method: 'DELETE'
    })
  }
}


document.addEventListener('DOMContentLoaded',() => {
getQuotes()
document.querySelector('#new-quote-form').addEventListener('submit', addNewQuote)
document.body.addEventListener('click', changey)
})
