// It might be a good idea to add event listener to make sure this file
// only runs after the DOM has finshed loading.

document.addEventListener('DOMContentLoaded', () =>{
  fetch("http://localhost:3000/quotes")
    .then(response => response.json())
    .then(json => {
      showQuotes(json)

      document.addEventListener('click', (e) => {
        addQuote(e)
      })

      document.addEventListener('click', (e) =>{

        const targetClass = e.target.className

        if (targetClass === "btn-danger"){
          const quoteId = e.target.dataset.id
          const quote = json.find(quote => quote.id == quoteId)

          fetch(`http://localhost:3000/quotes/${quoteId}`,{
            method: "DELETE"
          })
          e.target.parentElement.parentElement.remove()
        }
        if(targetClass === "btn-success"){
          const quoteId = e.target.dataset.id
          const quote = json.find(quote => quote.id == quoteId)

          const upLikes = quote.likes + 1

          fetch(`http://localhost:3000/quotes/${quoteId}`,{
            method: "PATCH",
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              likes: upLikes
            })
          }).then(res => {e.target.innerText = `Likes: ${upLikes}`})

        }
      })
    })

})

function showQuotes(json){
  let ul = document.getElementById('quote-list')

  json.forEach(quote =>{
    ul.innerHTML += `<li class='quote-card'>
      <blockquote class="blockquote">
        <p class="mb-${quote.id}">${quote.quote}</p>
        <footer class="blockquote-footer">${quote.author}</footer>
        <br>
        <button class='btn-success' data-id=${quote.id}>Likes: <span>${quote.likes}</span></button>
        <button class='btn-danger' data-id="${quote.id}">Delete</button>
      </blockquote>
    </li>`


  })
}



function addQuote(e){
  e.preventDefault()
  if(e.target.className.includes("btn-primary")){
    const newQuote = document.getElementById('new-quote').value
    const newAuthor = document.getElementById('author').value

    fetch("http://localhost:3000/quotes", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        quote: newQuote,
        author: newAuthor,
        likes: 0
      })
    })
    .then(response => response.json())
    .then(quote => {
      let ul = document.getElementById('quote-list')
      ul.innerHTML += `<li class='quote-card'>
        <blockquote class="blockquote">
          <p class="mb-${quote.id}">${quote.quote}</p>
          <footer class="blockquote-footer">${quote.author}</footer>
          <br>
          <button class='btn-success' data-id=${quote.id}>Likes: <span>${quote.likes}</span></button>
          <button class='btn-danger' data-id="${quote.id}">Delete</button>
        </blockquote>
      </li>`
    })
  }
}
