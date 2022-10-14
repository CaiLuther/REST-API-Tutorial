const uri = 'items';
let todos = [];

function getItems() {
  fetch(uri)
    .then(response => response.json())
    .then(data => _displayItems(data))
    .catch(error => console.error('Unable to get items.', error));
}

function getItemsDisplaySearch() {
  fetch(uri)
    .then(response => response.json())
    .then(data => _displaySearchItems(data))
    .catch(error => console.error('Unable to get items.', error));
}

function addItem() {
  const addNameTextbox = document.getElementById('add-name');
  const addEffectTextbox = document.getElementById('add-effect');
  const addDurationTextbox = document.getElementById('add-duration');
  const addFirstIngredientTextbox = document.getElementById('add-firstIngredient');
  const addSecondIngredientTextbox = document.getElementById('add-secondIngredient');
  const addThirdIngredientTextbox = document.getElementById('add-thirdIngredient');

  const item = {
    didWork: false,
    name: addNameTextbox.value.trim(),
    effect: addEffectTextbox.value.trim(),
    duration: addDurationTextbox.value.trim(),
    firstIngredient: addFirstIngredientTextbox.value.trim(),
    secondIngredient: addSecondIngredientTextbox.value.trim(),
    thirdIngredient: addThirdIngredientTextbox.value.trim(),
  };

  fetch(uri, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(item)
  })
    .then(response => response.json())
    .then(() => {
      getItems();
      addNameTextbox.value = '';
      addEffectTextbox.value = '';
      addDurationTextbox.value = '';
      addFirstIngredientTextbox.value = "";
      addSecondIngredientTextbox.value = "";
      addThirdIngredientTextbox.value = "";
    })
    .catch(error => console.error('Unable to add item.', error));
}

function deleteItem(event) {
  event.preventDefault();
  const providedId = event.target.dataset.itemId
  fetch(`${uri}/${providedId}`, {
    method: 'DELETE'
  })
  .then(() => getItems())
  .catch(error => console.error('Unable to delete item.', error));
}

function displayEditForm(event) {
  event.preventDefault();

  // console.dir(event);
  // console.dir(event.target);
  // console.log(event.target.dataset);
  const providedId = event.target.dataset.itemId;

  const item = todos.find(item => item.id === providedId);
  
  document.getElementById('edit-thirdIngredient').value = item.thirdIngredient;
  document.getElementById('edit-secondIngredient').value = item.secondIngredient;
  document.getElementById('edit-firstIngredient').value = item.firstIngredient;
  document.getElementById('edit-duration').value = item.duration;
  document.getElementById('edit-effect').value = item.effect;
  document.getElementById('edit-name').value = item.name;
  document.getElementById('edit-id').value = item.id;
  document.getElementById('edit-didWork').checked = item.didWork;
  document.getElementById('editForm').style.display = 'block';
}

function updateItem() {
  const itemId = document.getElementById('edit-id').value;
  const item = {
    id: parseInt(itemId, 10),
    didWork: document.getElementById('edit-didWork').checked,
    name: document.getElementById('edit-name').value.trim(),
    effect: document.getElementById('edit-effect').value.trim(),
    duration: document.getElementById('edit-duration').value.trim(),
    firstIngredient: document.getElementById('edit-firstIngredient').value.trim(),
    secondIngredient: document.getElementById('edit-secondIngredient').value.trim(),
    thirdIngredient: document.getElementById('edit-thirdIngredient').value.trim()
  };

  fetch(`${uri}/${itemId}`, {
    method: 'PUT',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(item)
  })
  .then(() => getItems())
  .catch(error => console.error('Unable to update item.', error));

  closeInput();

  return false;
}

function closeInput() {
  document.getElementById('editForm').style.display = 'none';
}

function _displayCount(itemCount) {
  const name = (itemCount === 1) ? 'spell' : 'spells';

  document.getElementById('counter').innerText = `${itemCount} ${name}`;
}

function _displayItems(data) {
  const tBody = document.getElementById('todos');
  tBody.innerHTML = '';

  _displayCount(data.length);

  const button = document.createElement('button');

  data.forEach(item => {
    let didWorkCheckbox = document.createElement('input');
    didWorkCheckbox.type = 'checkbox';
    didWorkCheckbox.disabled = true;
    didWorkCheckbox.checked = item.didWork;

    let editButton = button.cloneNode(false);
    editButton.innerText = 'Edit';
    editButton.dataset.itemId = item.id;

    editButton.addEventListener('click', displayEditForm)
    //editButton.setAttribute('onclick', `displayEditForm(${item.id})`);

    let deleteButton = button.cloneNode(false);
    deleteButton.innerText = 'Delete';
    deleteButton.dataset.itemId = item.id;

    deleteButton.addEventListener('click', deleteItem);
    //deleteButton.setAttribute('onclick', `deleteItem(${item.id})`);

    let tr = tBody.insertRow();
    
    let td1 = tr.insertCell(0);
    td1.appendChild(didWorkCheckbox);

    let td2 = tr.insertCell(1);
    let textNode = document.createTextNode(item.name);
    td2.appendChild(textNode);

    let td3 = tr.insertCell(2);
    let textNode2 = document.createTextNode(item.effect);
    td3.appendChild(textNode2);

    let td4 = tr.insertCell(3);
    let textNode3 = document.createTextNode(item.duration);
    td4.appendChild(textNode3);

    let td5 = tr.insertCell(4);
    let textNode4 = document.createTextNode(item.firstIngredient);
    td5.appendChild(textNode4);

    let td6 = tr.insertCell(5);
    let textNode5 = document.createTextNode(item.secondIngredient);
    td6.appendChild(textNode5);

    let td7 = tr.insertCell(6);
    let textNode6 = document.createTextNode(item.thirdIngredient);
    td7.appendChild(textNode6);

    let td8 = tr.insertCell(7);
    td8.appendChild(editButton);

    let td9 = tr.insertCell(8);
    td9.appendChild(deleteButton);
  });

  todos = data;

}

function _displaySearchItems(data){
  const searchTerm = document.getElementById;
  console  

  const tBody = document.getElementById('todos');
  tBody.innerHTML = '';

  _displayCount(data.length);

  const button = document.createElement('button');

  data.forEach(item => {
    let didWorkCheckbox = document.createElement('input');
    didWorkCheckbox.type = 'checkbox';
    didWorkCheckbox.disabled = true;
    didWorkCheckbox.checked = item.didWork;

    let editButton = button.cloneNode(false);
    editButton.innerText = 'Edit';
    editButton.dataset.itemId = item.id;

    editButton.addEventListener('click', displayEditForm)
    //editButton.setAttribute('onclick', `displayEditForm(${item.id})`);

    let deleteButton = button.cloneNode(false);
    deleteButton.innerText = 'Delete';
    deleteButton.dataset.itemId = item.id;

    deleteButton.addEventListener('click', deleteItem);
    //deleteButton.setAttribute('onclick', `deleteItem(${item.id})`);

    let tr = tBody.insertRow();
    
    let td1 = tr.insertCell(0);
    td1.appendChild(didWorkCheckbox);

    let td2 = tr.insertCell(1);
    let textNode = document.createTextNode(item.name);
    td2.appendChild(textNode);

    let td3 = tr.insertCell(2);
    let textNode2 = document.createTextNode(item.effect);
    td3.appendChild(textNode2);

    let td4 = tr.insertCell(3);
    let textNode3 = document.createTextNode(item.duration);
    td4.appendChild(textNode3);

    let td5 = tr.insertCell(4);
    let textNode4 = document.createTextNode(item.firstIngredient);
    td5.appendChild(textNode4);

    let td6 = tr.insertCell(5);
    let textNode5 = document.createTextNode(item.secondIngredient);
    td6.appendChild(textNode5);

    let td7 = tr.insertCell(6);
    let textNode6 = document.createTextNode(item.thirdIngredient);
    td7.appendChild(textNode6);

    let td8 = tr.insertCell(7);
    td8.appendChild(editButton);

    let td9 = tr.insertCell(8);
    td9.appendChild(deleteButton);
  });

  todos = data;
}