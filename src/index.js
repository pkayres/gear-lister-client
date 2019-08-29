document.addEventListener('DOMContentLoaded', (event) => {
  const listDiv = document.querySelector('.list-of-listings')
  const infoDiv = document.querySelector('.info')

  fetch('http://localhost:3000/users/4')
    .then(res => res.json())
    .then(data => userInfo(data));

  function userInfo(user){
    user.listings.forEach(createGear)
  }

  function createGear(listing){
      listDiv.innerHTML += `<div id="listing" data-id="listing-${listing.id}"><h2 id="title-${listing.id}">${listing.title}</h2>
      <img id="img" src="${listing.image}">
      <br><p id="description">Description: ${listing.description}</p>
      <p id="price">Price: ${listing.price}</p>
      <button class="del-btn">Delete</button>
      <button class="up-btn" data-id="${listing.id}">UPDATE Gear</button>
      </div>`
  }


  listDiv.addEventListener('click', (event) => {
    if (event.target.className == 'del-btn'){
      removeGear(event.target.parentNode)
    }
    if (event.target.className == 'up-btn'){
      updateGearForm(event.target.parentNode)
    }
  })

  const newGearForm = document.querySelector('#create-post')
  newGearForm.addEventListener('submit', createNewGear)

  function removeGear(div){
    const divId = div.dataset.id
    fetch(`http://localhost:3000/listings/${divId}`, {
      method: 'DELETE',
      headers:{
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
    .then(response => div.remove())
  }


  function updateGearForm(listing){

    const listTitle = listing.querySelector("#title-8").innerText
    const listImage = listing.querySelector("#img").innerText
    const listingDescription = listing.querySelector("#description").innerText
    const listPrice = listing.querySelector("#price").innerText

    let updateForm = document.createElement('form')
    updateForm.id = 'update-form'
    updateForm.innerHTML = `
    Instrument Name:<br>
    <input type = 'text' name ='title' value ='${listTitle}'><br>
    Image:<br>
    <input type = 'text' name ='image' value ='${listImage}'><br>
    Description for item:<br>
    <input type = 'text' name ='description' value ='${listingDescription}'><br>
    Price:<br>
    <input type = 'text' name ='price' value ='${listPrice}'><br>
    <input type = 'submit'> `
    infoDiv.append(updateForm)
    updateForm.addEventListener('submit', updateGear(listing))
  }

  function updateGear(listing){
    const listingId = listing.dataset.id
    event.preventDefault()
    const listTitle = listing.querySelector("#title-8").innerText
    const listImage = listing.querySelector("#img").innerText
    const listingDescription = listing.querySelector("#description").innerText
    const listPrice = listing.querySelector("#price").innerText
    fetch("http://localhost:3000/listings/{}", {
      method: "PATCH",
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
     body: JSON.stringify({title:listingTitle,image:listingImage,description:listingDescription,price:listingPrice,user_id:4})
    })
    .then(response => response.json())
    .then(updatedGear => createGear(updatedGear))

  }

  function createNewGear(event){
    event.preventDefault()
      const titleInput = document.querySelector('#title-input').value
      const imageInput = document.querySelector('#image-input').value
      const descriptionInput = document.querySelector('#description-input').value
      const priceInput = document.querySelector('#price-input').value
    fetch("http://localhost:3000/listings", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
     body: JSON.stringify({title: titleInput,image:imageInput,description:descriptionInput,price:priceInput, user_id:4})
    })
    .then(response => response.json())
    .then(newGear => createGear(newGear))

  }




});
