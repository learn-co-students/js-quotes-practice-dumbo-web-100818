function addLike(e) {
    fetch('http://localhost:3000/quotes',{
      method: "POST",
      headers: {
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        "id": e.target.parentElement.id
      })
    })
    .then(res => res.json())
  }

  function quoteDelete(e) {
    debugger
    let quoteId = e.target.parentElement.parentElement.id
    event.target.parentElement.parentElement.remove()
    fetch(`http://localhost:3000/quotes/${quoteId}`,{
      method: "DELETE"})

  }
