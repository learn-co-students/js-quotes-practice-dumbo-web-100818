// It might be a good idea to add event listener to make sure this file
// only runs after the DOM has finshed loading.
document.addEventListener("DOMContentLoaded",(e)=>{
  loadPosts()
  getForm()
  document.getElementById('quote-list').addEventListener("click", (event)=>{
    if(event.target.className === "btn-danger"){
      deleteQuote(event)
    }else {
      likeQuote(event)
    }
  })
})

function deleteQuote(givenData) {
  let idString = givenData.target.dataset.id
  let id = parseInt(idString)
  let url = `http://localhost:3000/quotes/${id}`
  fetch(url, {method: "DELETE",
  headers:
  {
    "Content-Type":"application/json"
  }
 })
}

function likeQuote(givenData) {
  let idString = givenData.target.dataset.id
  let id = parseInt(idString)
  let getLikes = givenData.srcElement.firstElementChild.innerText
  let likesString = parseInt(getLikes)
  let addLike = (++likesString)
  let url = `http://localhost:3000/quotes/${id}`
  givenData.srcElement.firstElementChild.innerText = addLike
  fetch(url, {method: "PATCH",
  headers:
  {
    "Content-Type":"application/json",
    Accept: "application/json"
  },
  body:JSON.stringify({likes:addLike})

})

}




 function loadPosts() {
   fetch("http://localhost:3000/quotes")
   .then(res => res.json())
   .then(json => displayPosts(json))
   .catch(err => console.log(err))
 }

 function displayPosts(givenposts) {
  let quoteDiv = document.getElementById("quote-list")
   givenposts.forEach((post)=>{
     let eachPost = `<li class="quote-card">
                      <blockquote class="blockquote">
                      <p class="mb-0">${post.quote} </p>
                      <footer class="blockquote-footer">${post.author}</footer>
                      <br>
                      <button class="btn-success" data-id="${post.id}">Likes: <span>${post.likes}</span></button>
                      <button class="btn-danger" data-id="${post.id}">Delete</button>
                      </blockquote>
                      </li>`
      quoteDiv.innerHTML += eachPost
   })
 }

 function getForm() {
   document.getElementById('new-quote-form').addEventListener("submit",(e)=>{
     const quote = e.srcElement.children[0].lastElementChild.value
     const author = e.srcElement.children[1].lastElementChild.value
     addQuote(quote, author)
   })
 }

 function addQuote(givenQuote, givenAuthor) {
   let url = "http://localhost:3000/quotes"
   let newData = JSON.stringify({quote: givenQuote, likes: 0, author: givenAuthor})
   fetch(url, {method: "POST",
    headers:
    {
      "Content-Type":"application/json",
      Accept: "application/json"
    },
    body: newData
  })
 }
