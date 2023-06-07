document.addEventListener('DOMContentLoaded', () => {

  fetch('http://localhost:3000/dogs')
  .then(resp => resp.json())
  .then(dogsArray => dogsArray.forEach(dog => {
    renderDogs(dog) 
    let dogId = dog.id
  }))
  
  const form = document.getElementById('dog-form')
  const table = document.getElementById('table-body')
  
  function renderDogs(dog) {
    const tr = document.createElement('tr')
    table.appendChild(tr)
    const tdName = document.createElement('td')
    tdName.textContent = dog.name
    tr.appendChild(tdName)
    const tdBreed = document.createElement('td')
    tdBreed.textContent = dog.breed
    tr.appendChild(tdBreed)
    const tdSex = document.createElement('td')
    tdSex.textContent = dog.sex
    tr.appendChild(tdSex)
    const button = document.createElement('button')
    button.textContent = 'Edit Dog'
    tr.appendChild(button)
    button.addEventListener('click', () => {
      //console.log(form)
      form.name.value = dog.name
      form.breed.value = dog.breed
      form.sex.value = dog.sex
      form.name.id = dog.id
    })
  }

  form.addEventListener ('submit', (e, dogId) => {
    //console.log(e.target)
    //console.log(form)
    e.preventDefault()
    const newDogObj = {
      name: e.target.name.value,
      breed: e.target.breed.value,
      sex: e.target.sex.value
    }
    updateDog(e.target.name.id, newDogObj)
    //console.log(e.target.name.id)
    e.target.reset()
  })

  function updateDog(id, newDogObj) {
    fetch(`http://localhost:3000/dogs/${id}`, { 
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify(newDogObj)
    })
    .then(resp => resp.json())
    .then(newDogObj => {
      //console.log(newDogObj)
      table.innerHTML = ''

      fetch('http://localhost:3000/dogs')
      .then(resp => resp.json())
      .then(updatedDogsArray => updatedDogsArray.forEach(updatedDog => renderDogs(updatedDog)))
    })
  }
})