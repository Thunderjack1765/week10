// class Animal {
//     constructor(name, location) {
//         this.location = location;
//         this.name = name;
//     }
// }


class Animal {
constructor(id, name, location) {
    this.id = id;
    this.name = name;
    this.location = location;
    this.members = [];
}
addMember(member) {
    this.members.push(member);
}
deleteMember(member) {
    let index = this.members.indexOf(member);
    this.members.splice(index, 1);
}
}``

let animal = [];
let animalId = 0;

onClick('new-animal', () => {
    animal.push(new Animal(animalId++, getValue('cool-animal-name')));
    drawDOM();
});

function onClick(id, action) {
    let element = document.getElementById(id);
    element.addEventListener('click', action);
    return element;
}


function getValue(id) {
    return document.getElementById(id).value;
}

function drawDOM() {
    let animalDiv = document.getElementById('animal');
    clearElement(animalDiv);
    for(animal of animal) {
        let table = createAnimalTable(animal);
        let title = document.createElement('h2');
        title.innerHTML = animal.name;
        title.appendChild(createDeleteRowButton(animal));
        animalDiv.appendChild(title);
        animalDiv.appendChild(table);
        for (member of animal.members) {
            createMemberRow(animal, table, member);
        }
    }
}

function createMemberRow(animal, table, member) {
    let row = table.insertRow(2);
    row.insertCell(0).innerHTML = member.name;
    row.insertCell(1).innerHTML = member.location;
    let actions = row.insertCell(2);
    actions.appendChild(createDeleteRowButton(animal,member));
}

function createDeleteRowButton(animal,member) {
    let btn = document.createElement('button');
    btn.className = 'btn btn-primary';
    btn.innerHTML = 'Delete';
    btn.onclick = () => {
    let index = animal.members.indexOf(member);
    animal.members.splice(index, 1);
    drawDOM();
    };
    return btn;
}


function createNewMemberButton(animal) {
    let btn = document.createElement('button');
    btn.className = 'btn btn-primary';
    btn.innerHTML = 'Create';
    btn.onClick = () => {
    animal.members.push(new Animal(getValue(`name-input-${animal.id}`),getValue(`location-input-${animal.id}`)));
    drawDOM();
    };
    return btn;
}




function createAnimalTable(animal) {
    let table = document.createElement('table');
    table.setAttribute('class', 'table table-dark table-striped');
    let row = table.insertRow(0);
    let nameColumn = document.createElement('th');
    let locationColumn = document.createElement('th');
    nameColumn.innerHTML = 'Name';
    locationColumn.innerHTML = 'Location';
    row.appendChild(nameColumn);
    row.appendChild(locationColumn);
    let formRow = table.insertRow(1);
    let nameTh = document.createElement('th');
    let locationTh = document.createElement('th');
    let createTh =  document.createElement('th');
    let nameInput = document.createElement('input');
    nameInput.setAttribute('id', `name-input-${animal.id}`);
    nameInput.setAttribute('type', 'text');
    nameInput.setAttribute('class', 'form-control');
    let locationInput = document.createElement('input');
    locationInput.setAttribute('id', `position-input-${animal.id}`);
    locationInput.setAttribute('type', 'text');
    locationInput.setAttribute('class', 'form-control');
    let newMemberButton = createNewMemberButton(animal);
    nameTh.appendChild(nameInput);
    locationTh.appendChild(locationInput);
    createTh.appendChild(newMemberButton);
    formRow.appendChild(nameTh);
    formRow.appendChild(locationTh);
    formRow.appendChild(createTh);
    return table;
    


}















function clearElement(element) {
    while(element.firstChild) {
        element.removeChild(element.firstChild);
    }
    }