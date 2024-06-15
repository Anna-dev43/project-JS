import { clientManager } from './client.js';
import {
  getClients, saveClient, removeClient, changeClient, searchClient, apiURL,
} from './api.js';
import {
  vk, phone, mail, facebook, leter,
} from './svg.js';

let removedClient = null;
let changedClient = null;

// добавление в DOM элементов
const $headerInput = document.getElementById('header-inp');
const $tableId = document.getElementById('main__table');
const $createButton = document.getElementById('button-create');
const $removeButton = document.getElementById('modal__close');
const $removeButtonTwo = document.getElementById('button__reset');
const $nameInput = document.getElementById('name');
const $surnameInput = document.getElementById('surname');
const $lastNameInput = document.getElementById('lastname');
const $namesInput = document.getElementById('names');
const $surnamesInput = document.getElementById('surnames');
const $lastNamesInput = document.getElementById('lastnames');
const $modalContacts = document.getElementById('modal__contacts');
const $modalDeleteButton = document.getElementById('modal__delete-btn');
const $modalReset = document.getElementById('modal__reset');
const $modalClose = document.getElementById('close');
const $changeClose = document.getElementById('closed__modal-svg');
const $changeClosed = document.getElementById('closed__modal');
const $newContacts = document.getElementById('create__contacts');
const $modalForm = document.getElementById('modalform');
const $modalContact = document.getElementById('modal__contact');
const $modalChageForm = document.getElementById('modal__change-form');
const $modalDelete = document.getElementById('modal__two');
const $modalNew = document.getElementById('modal');
const $modalChanged = document.getElementById('modal__three');
const $modalChageContact = document.getElementById('modal-change');
const searchDivChange = $modalChageContact.querySelector('#create__contact');
const changeModalId = document.getElementById('change__Id');
const $errorsWrap = document.getElementById('errors');
const $errorsWrapChange = document.getElementById('errors__change');
const DEFAULT_ERROR_MESSAGE = 'Что-то пошло не так...';

// Функция очищения инпутов
function clearInputs() {
  $nameInput.value = '';
  $surnameInput.value = '';
  $lastNameInput.value = '';
  searchDivChange.innerHTML = '';
}

// Функция очищения инпутов
function clearInputes() {
  $namesInput.value = '';
  $surnamesInput.value = '';
  $lastNamesInput.value = '';
  searchDivChange.innerHTML = '';
  changeModalId.innerHTML = '';
}

// Функция очищения инпутов контактов
function clearInpContact() {
  $newContacts.innerHTML = '';
}

// Функция открытия модального окна создания клиента
$createButton.addEventListener('click', () => {
  $modalNew.classList.add('open');
  clearInputs();
});

// Функция закрытия модального окна создания клиента
$removeButton.addEventListener('click', () => {
  $modalNew.classList.remove('open');
  clearInpContact();
  clearError();
  clearError();
  clearInputs();
});

// Функция закрытия модального окна создания клиента
$removeButtonTwo.addEventListener('click', () => {
  $modalNew.classList.remove('open');
  clearInpContact();
  clearError();
  clearError();
  clearInputs();
});

// Функция сортировки таблицы
const createSortHandler = (prop) => function sortTable() {
  clientManager.sortBy(prop);
  renderTable();
};

const sortTableDate = (prop) => function sortTable() {
  clientManager.sortByDate(prop);
  renderTable();
};

// Функция создания таблицы
function renderTable(clientList = clientManager.list) {
  const table = document.createElement('table');
  const thead = document.createElement('thead');
  const tbody = document.createElement('tbody');
  const trHeading = document.createElement('tr');

  const tdStroke1 = document.createElement('td');
  tdStroke1.textContent = 'ID';
  tdStroke1.onclick = createSortHandler('id');

  const tdStroke2 = document.createElement('td');
  tdStroke2.textContent = 'Фамилия Имя Отчество';
  tdStroke2.onclick = createSortHandler('surname');

  const tdStroke3 = document.createElement('td');
  tdStroke3.textContent = 'Дата и время создания';
  tdStroke3.onclick = sortTableDate('createdAt');

  const tdStroke4 = document.createElement('td');
  tdStroke4.textContent = 'Последние изменения';
  tdStroke4.onclick = sortTableDate('updatedAt');

  const tdStroke5 = document.createElement('td');
  tdStroke5.textContent = 'Контакты';

  const tdStroke6 = document.createElement('td');
  tdStroke6.textContent = 'Действия';

  table.classList.add('table');
  thead.classList.add('thead');
  trHeading.classList.add('tr__heading');
  tdStroke1.classList.add('stroke-1', 'td__all');
  tdStroke1.setAttribute('type', 'button');
  tdStroke2.classList.add('stroke-2', 'td__all');
  tdStroke2.setAttribute('type', 'button');
  tdStroke3.classList.add('stroke-3', 'td__all');
  tdStroke3.setAttribute('type', 'button');
  tdStroke4.classList.add('stroke-4', 'td__all');
  tdStroke4.setAttribute('type', 'button');
  tdStroke5.classList.add('stroke-5', 'td__all');
  tdStroke6.classList.add('stroke-6', 'td__all');
  tbody.classList.add('tbody');

  clientList.forEach((client) => {
    const row = createUserTr(client);
    tbody.append(row);
  });

  trHeading.append(tdStroke1, tdStroke2, tdStroke3, tdStroke4, tdStroke5, tdStroke6);
  thead.append(trHeading);
  table.append(thead);
  table.append(tbody);
  $tableId.innerHTML = '';
  $tableId.append(table);
}

// Функции проверки длинны дива с контактами
function lenContactDeletes() {
  const len = $modalForm.querySelectorAll('.form__contact').length;
  if (len >= 10) {
    $modalContacts.classList.add('btn__off');
  }
  if (len <= 9) {
    $modalContacts.classList.remove('btn__off');
  }
}

function lenContactDelete() {
  const len = $modalChageForm.querySelectorAll('.form__contact').length;
  if (len >= 10) {
    $modalContact.classList.add('btn__off');
  }
  if (len <= 9) {
    $modalContact.classList.remove('btn__off');
  }
}

// Функция разметки ошибки
function wrapperError(errorText) {
  const text = document.createElement('p');
  text.classList.add('text__error');
  text.innerHTML = errorText;

  $errorsWrap.append(text);
}

// Функция разметки ошибки
function wrappersError(errorText) {
  const text = document.createElement('p');
  text.classList.add('text__error');
  text.innerHTML = errorText;

  $errorsWrapChange.append(text);
}

// Функция очищения дива с ошибкой
function clearError() {
  $errorsWrap.innerHTML = '';
};

// Функция очищения дива с ошибкой
function clearsError() {
  $errorsWrapChange.innerHTML = '';
};

// Функция проверки валидации инпутов
function validateClients(newClientData) {
  clearError();
  if (newClientData.ok) return true;

  if (!newClientData.ok) {
    if (newClientData.hasOwnProperty('answer')) {
      if (newClientData.answer.errors.length) {
        for (const error of newClientData.answer.errors) {
          if (error.message) {
            wrapperError(error.message);
          } else {
            wrapperError(DEFAULT_ERROR_MESSAGE);
          }
        }
      } else {
        wrapperError(DEFAULT_ERROR_MESSAGE);
      }
    } else {
      wrapperError(DEFAULT_ERROR_MESSAGE);
    }

    return false;
  }
}

// Функция проверки валидации инпутов
function validatesClients(newClientData) {
  if (newClientData.ok) return true;

  if (!newClientData.ok) {
    if (newClientData.hasOwnProperty('answer')) {
      if (newClientData.answer.errors.length) {
        for (const error of newClientData.answer.errors) {
          if (error.message) {
            wrappersError(error.message);
          } else {
            wrappersError(DEFAULT_ERROR_MESSAGE);
          }
        }
      } else {
        wrappersError(DEFAULT_ERROR_MESSAGE);
      }
    } else {
      wrappersError(DEFAULT_ERROR_MESSAGE);
    }

    return false;
  }
}

// Функция отрисовки добавления контакта
function createNewContact(contactData) {
  const formContact = document.createElement('div');
  const selectNew = document.createElement('select');
  const inputNew = document.createElement('input');
  const buttonNewClear = document.createElement('button');
  const optionTel = document.createElement('option');
  const optionTelTwo = document.createElement('option');
  const optionEmail = document.createElement('option');
  const optionVk = document.createElement('option');
  const optionFb = document.createElement('option');

  formContact.classList.add('form__contact');
  selectNew.classList.add('select__new');
  selectNew.setAttribute('id', 'select-new');
  optionTel.textContent = 'Телефон';
  optionTel.value = 'phone';
  optionTelTwo.textContent = 'Доп. телефон';
  optionTelTwo.value = 'secondPhone';
  optionEmail.textContent = 'Email';
  optionVk.textContent = 'Vk';
  optionFb.textContent = 'Facebook';
  inputNew.classList.add('input__new');
  inputNew.setAttribute('id', 'input-new');
  buttonNewClear.classList.add('button__new', 'btn__reset');
  buttonNewClear.setAttribute('id', 'button__new-clear');
  buttonNewClear.setAttribute('type', 'button');
  if (contactData) {
    switch (contactData.type) {
      case 'phone':
        optionTel.selected = true;
        break;
      case 'secondPhone':
        optionTelTwo.selected = true;
        break;
      case 'Email':
        optionEmail.selected = true;
        break;
      case 'Facebook':
        optionFb.selected = true;
        break;
      case 'Leter':
        optionTel.selected = true;
        break;
      case 'Vk':
        optionVk.selected = true;
        break;
      default:
        console.log();
    }
    inputNew.value = contactData.value;
  }
  buttonNewClear.addEventListener('click', () => {
    formContact.remove();
    lenContactDeletes();
    lenContactDelete();
  });

  selectNew.append(optionTel, optionTelTwo, optionEmail, optionVk, optionFb);
  formContact.append(selectNew, inputNew, buttonNewClear);
  return formContact;
}

// Функция клика для отрисовки добавления контакта
$modalContact.addEventListener('click', () => {
  const changeClientContact = createNewContact();
  searchDivChange.append(changeClientContact);
  lenContactDelete();
});

// Функция клика на кнопку добавить контакт
$modalContacts.addEventListener('click', () => {
  const formContact = createNewContact();
  $newContacts.append(formContact);
  lenContactDeletes();
});

// Функция создания нового клиента
$modalForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  const allContact = $modalForm.querySelectorAll('#create__contacts .form__contact');
  const fullContactsArr = [];

  allContact.forEach(($div) => {
    fullContactsArr.push({
      type: $div.querySelector('.select__new').value,
      value: $div.querySelector('.input__new').value,
    });
  });

  const newClientData = {
    surname: `${$surnameInput.value}`,
    name: `${$nameInput.value}`,
    lastName: `${$lastNameInput.value}`,
    contacts: fullContactsArr,
  };

  // Функция сохранения объекта на сервер
  const clientData = await saveClient(newClientData);
  if (!validateClients(clientData)) return;

  clientManager.addClient(clientData.answer);
  clearInpContact();
  clearError();
  clearInputs();
  clearInputes();
  renderTable();
  $modalNew.classList.remove('open');
});

// Функция создания разметки для контактов
function createContactElement(contact) {
  const elementLi = document.createElement('li');
  const elementBtn = document.createElement('button');

  elementLi.classList.add('list__reset', 'list__contact');
  elementBtn.classList.add('btn__reset', 'btn__contact');
  elementBtn.setAttribute('id', 'btn__tooltip');

  switch (contact.type) {
    case 'phone':
      elementBtn.innerHTML = phone;
      break;
    case 'secondPhone':
      elementBtn.innerHTML = phone;
      break;
    case 'Email':
      elementBtn.innerHTML = mail;
      break;
    case 'Facebook':
      elementBtn.innerHTML = facebook;
      break;
    case 'Leter':
      elementBtn.innerHTML = leter;
      break;
    case 'Vk':
      elementBtn.innerHTML = vk;
      break;
    default:
      console.log();
  }
  tippy(elementBtn, {
    content: contact.value,
  });
  elementLi.append(elementBtn);

  return elementLi;
}

function renderContacts(contacts, list, flag) {
  for (let i = flag; i < contacts.length; i++) {
    const item = createContactElement(contacts[i]);
    list.append(item);
  }
}

function showBnt(list, contacts, flag) {
  const btn = document.createElement('button');
  btn.classList.add('btn__flag', 'btn__reset');
  const restContacts = contacts.length - flag;

  btn.textContent = `+${restContacts}`;

  btn.addEventListener('click', () => {
    renderContacts(contacts, list, flag);
    btn.remove();
  });

  return btn;
}

const wrapperContacts = function (newClient) {
  const contactsWrap = document.createElement('div');
  contactsWrap.classList.add('container__contacts', 'flex');
  const contactsList = document.createElement('ul');
  contactsList.classList.add('list__reset', 'list__contacts');
  const contact = newClient.contacts;
  const flag = contact.length > 4 ? 4 : contact.length;

  for (let i = 0; i < flag; i++) {
    const item = createContactElement(contact[i]);
    contactsList.append(item);
  }

  contactsWrap.append(contactsList);

  if (contact.length > flag) {
    const btn = showBnt(contactsList, contact, flag);
    contactsWrap.append(btn);
  }

  return contactsWrap;
};

// Функция удаления студента
$modalDeleteButton.onclick = () => {
  removeClient(removedClient);
  clientManager.removeClient(removedClient);
  $modalDelete.classList.remove('open');
  removedClient = null;
  renderTable();
};

// Функция создания строки таблицы
function createUserTr(newClient) {
  const tr = document.createElement('tr');
  const clientId = document.createElement('td');
  const clientInitial = document.createElement('td');
  const dateCreate = document.createElement('td');
  const dateChange = document.createElement('td');
  const clientContacts = document.createElement('td');
  const clientUse = document.createElement('td');
  const buttonChange = document.createElement('button');
  const buttonDelete = document.createElement('button');
  const valueWrapper = wrapperContacts(newClient);
  const dateObj = newClient.formatedDate;
  const dateObject = newClient.formatingDate;

  clientId.classList.add('td__id');
  clientId.textContent = `${newClient.id}`;
  clientInitial.classList.add('td__initial');
  clientInitial.textContent = `${newClient.surname} ${newClient.name} ${newClient.lastName}`;
  dateCreate.classList.add('td__create');
  dateCreate.innerHTML = `<span>${dateObj.date}</span> ${dateObj.time}`;
  dateChange.classList.add('td__change');
  dateChange.innerHTML = `<span>${dateObject.date}</span> ${dateObject.time}`;
  clientContacts.classList.add('td__contacts');
  clientContacts.append(valueWrapper);
  clientUse.classList.add('td__use');
  buttonChange.textContent = 'Изменить';
  buttonChange.classList.add('btn__change-client', 'btn__reset');
  buttonDelete.textContent = 'Удалить';
  buttonDelete.classList.add('btn__delete-client', 'btn__reset');

  // Функция открытия модального окна удаления клиента
  buttonDelete.addEventListener('click', () => {
    removedClient = newClient;
    $modalDelete.classList.add('open');
  });

  // Функция закрытия модального окна удаления клиента
  $modalReset.addEventListener('click', () => {
    $modalDelete.classList.remove('open');
    removedClient = null;
  });
  $modalClose.addEventListener('click', () => {
    $modalDelete.classList.remove('open');
    removedClient = null;
  });

  // Функция открытия окна изменения клиента.
  buttonChange.addEventListener('click', () => {
    changedClient = newClient;
    changeModalId.innerHTML = `Id:${newClient.id}`;
    document.querySelector('#modal-change .input__surname').value = newClient.surname;
    document.querySelector('#modal-change .input__name').value = newClient.name;
    document.querySelector('#modal-change .input__lastname').value = newClient.lastName;
    newClient.contacts.forEach((contact) => {
      const changeClientContact = createNewContact(contact);
      searchDivChange.append(changeClientContact);
    });
    $modalChanged.classList.add('open');
  });

  // Функция закрытия модального окна изменения клиента
  $changeClose.addEventListener('click', () => {
    $modalChanged.classList.remove('open');
    clearsError();
    clearInputes();
  });

  $changeClosed.onclick = () => {
    removeClient(newClient);
    clientManager.removeClient(newClient);
    $modalChanged.classList.remove('open');
    clearsError();
    clearInputes();
    renderTable();
  };

  clientUse.append(buttonChange, buttonDelete);
  tr.append(clientId, clientInitial, dateCreate, dateChange, clientContacts, clientUse);
  return tr;
}

// Функция перезаписи клиента
$modalChageForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  const allContact = $modalChageForm.querySelectorAll('#create__contact .form__contact');
  const fullContactsArr = [];
  allContact.forEach(($div) => {
    fullContactsArr.push({
      type: $div.querySelector('.select__new').value,
      value: $div.querySelector('.input__new').value,
    });
    const clearInput = $modalChageForm.querySelector('.button__new');
    const formContact = $modalChageForm.querySelector('.form__contact');
    clearInput.addEventListener('click', () => {
      formContact.remove();
    });
    $modalChanged.classList.remove('open');
  });
  const surnamed = $surnamesInput.value.trim();
  const named = $namesInput.value.trim();
  const lastNamed = $lastNamesInput.value.trim();
  const changeClientData = {
    surname: surnamed,
    name: named,
    lastName: lastNamed,
    contacts: fullContactsArr,
  };

  // Функция изменения объекта на сервере
  const changeClientDatas = await changeClient(changeClientData, changedClient.id);
  if (!validatesClients(changeClientDatas)) return;
  clientManager.addClients(await getClients());
  clearsError();
  clearInputes();
  renderTable(clientManager.list);
});

// Функция поиска клиента
$headerInput.addEventListener('input', async () => {
  setTimeout(async () => {
    const searchData = await searchClient();
    clientManager.addSearchList(searchData);
    renderTable(clientManager.searchList);
  }, 300);
});

const dataList = await getClients();
clientManager.addClients(dataList);
renderTable(clientManager.list);
window.clientManager = clientManager;

