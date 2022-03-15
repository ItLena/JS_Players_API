
const list = document.getElementById("list");
const sectionCreate = document.getElementById("sectionCreate");
const sectionEdit = document.getElementById("sectionEdit");
const addNew = document.getElementById("addNew");
const searchInput = document.getElementById("search-input")

const addForm = document.getElementById("form-add");
const newId = document.getElementById("newId");
const newName = document.getElementById("newName");
const newJersey = document.getElementById("newJersey");
const newAge = document.getElementById("newAge");
const newBorn = document.getElementById("newBorn")

const editForm = document.getElementById("form-edit");
const editName = document.getElementById("editName");
const editJersey = document.getElementById("editJersey");
const editAge = document.getElementById("editAge");
const editBorn = document.getElementById("editBorn")

let players = []; 

list.innerHTML = " ";
const url = "https://hockeyplayers.systementor.se/elena/player";
 

//method skriver ut en players lista på skärm 
let getPlayers  = (player) => {
   player.forEach(item => {
           list.innerHTML  += `
        <tr data-id =${item.id}>
            <td class = "id">${item.id}</td>
            <td class = "name">${item.namn}</td>
            <td class = "jersey">${item.jersey}</td>
            <td class = "age">${item.age}</td>
            <td class = "born">${item.born}</td> 
            <td><button id="edit">Edit</button></td> 
    </tr>`
    });
}

 //ListPlayer Get
 fetch(url, {
    method: 'GET',
    headers:{
        'Content-type': 'application/json; charset=UTF-8'
    },  
})
.then(response => response.json())
.then(data => getPlayers(data));

//Add New Player Knapp
addNew.addEventListener("click", ()=>{
    sectionCreate.style.display = "block";
    sectionList.style.display = "none";
    sectionEdit.style.display = "none";
});


//Search

searchInput.addEventListener("keyup", (e)=>{

const searchString = e.target.value;
const filteredPlayers = players.filter(p=>{
   return p.namn.includes(searchString) || p.born.includes(searchString)
})
console.log(filteredPlayers)
})

//Skappa en ny player metod
addForm.addEventListener("submit", async e =>{
    e.preventDefault();

  await fetch(url, {
    method: 'POST',
    headers:{
        'Content-type': 'application/json; charset=UTF-8'
    },  
    body: JSON.stringify({
        id: newId.value,
        namn: newName.value,
        age: newAge.value,
        jersey: newJersey.value,
        born: newBorn.value 
    })
})
.then(response =>  response.json())
.then((data) => {
    
    players.push(data);
    getPlayers(players) 
    })
   
    addForm.reset();
    sectionCreate.style.display = "none";
    sectionList.style.display = "block";
    sectionEdit.style.display = "none";
})

//Visa edit form
list.addEventListener("click", (e)=>{
   e.preventDefault();
    let editLink = e.target.id == "edit"
    let id = e.target.parentNode.parentNode.dataset.id;
    let parent = e.target.parentNode.parentNode;

    let idContent = parent.querySelector(".id").textContent;
    let nameContent = parent.querySelector(".name").textContent;
    let ageContent = parent.querySelector(".age").textContent;
    let jerseyContent = parent.querySelector(".jersey").textContent;
    let bornContent = parent.querySelector(".born").textContent;
    
   sectionCreate.style.display = "none";
   sectionList.style.display = "none";
   sectionEdit.style.display = "block";

   editId.value = idContent;
   editName.value = nameContent;
   editAge.value = ageContent;
   editJersey.value= jerseyContent;
   editBorn.value= bornContent;

//Ändra player i edit form och uppdatera list
if(editLink){

editForm.addEventListener("submit", async e => {
    e.preventDefault();
    await fetch(`${url}/${id}`, {
        method: 'PUT',
        headers:{
            'Content-type': 'application/json; charset=UTF-8',
        }, 
        body: JSON.stringify({
            id: editId.value,
            namn: editName.value,
            age: editAge.value,
            jersey: editJersey.value,
            born: editBorn.value 
        })
    })
    .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not OK');
        }
        return response.json()})
    /*.then(response => response.json())*/
    .then((json)=>console.log(json)) 

    .catch(error => {
        console.error('There has been a problem with your fetch operation:', error);
      });

    window.location.reload(false);
         
    sectionCreate.style.display = "none";
    sectionList.style.display = "block";
    sectionEdit.style.display = "none";   
    })
}
})