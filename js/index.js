'use strict';

const contactsListElement = document.querySelector(".contacts-list");
const contactFormElement = document.querySelector(".contact_form");
const modalBgElement = document.querySelector(".modal_bg");
const createContactBtn = document.querySelector(".create-contact-btn");
const exitContactBtn = document.querySelector(".close-modal-btn");
const saveContactBtn = document.querySelector('.save_input');
const contactFormInputs = document.querySelectorAll('.contact-form-input');
const userCountSpan = document.querySelector(".user_count");
const searchInput = document.querySelector("#search");
const contactInfoModal = document.querySelector(".contact_info");
const globalDeleteBtn = document.querySelector(".fa-trash-can");

let contacts = [
  {
    id: 0,
    name: "Stacey Blum",
    age: 23,
    telephone: "052-8887771",
    address: "Tel Aviv",
    imageUrl: "https://img.freepik.com/premium-vector/avatar-profile-icon-flat-style-female-user-profile-vector-illustration-isolated-background-women-profile-sign-business-concept_157943-38866.jpg?semt=ais_hybrid&w=740"
  },

  {
    id: 1,
    name: "Jakie Flum",
    age: 25,
    telephone: "058-9998882",
    address: "Haifa",
    imageUrl: "https://cdni.iconscout.com/illustration/premium/thumb/female-user-image-illustration-download-in-svg-png-gif-file-formats--person-girl-business-pack-illustrations-6515859.png"
  },

  {
    id: 2,
    name: "Luba Vos",
    age: 26,
    telephone: "054-2223434",
    address: "Jerusalem",
    imageUrl: "https://img.freepik.com/free-vector/woman-with-long-brown-hair-pink-shirt_90220-2940.jpg"
  },

  {
    id: 3,
    name: "Miley Syrus",
    age: 23,
    telephone: "052-6667772",
    address: "Tel Aviv",
    imageUrl: "https://img.freepik.com/free-vector/flat-style-woman-avatar_90220-2944.jpg?semt=ais_hybrid&w=740"
  },

  {
    id: 4,
    name: "Jennifer lopez",
    age: 23,
    telephone: "050-5557727",
    address: "Eilat",
    imageUrl: "https://www.svgrepo.com/show/382100/female-avatar-girl-face-woman-user-7.svg"
  },
];

let editingId = null;

// Declaring funcion - that creates html-contact-template as a string.
// The function takes option variable - contactData as an object and returns it as a string.
function contactHTML(contactData) {
  return `
    <li class="contacts-item" data-id="${contactData.id}">
      <div class="imge_icon">
        <div class="user_profile_row">
          <div class="user_profile">
            <img src="${contactData.imageUrl}" alt="img_icon">
            <span class="user_name">${contactData.name}</span>
          </div>
          <div class="user_actions">
            <i class="fa-solid fa-circle-info info-btn"></i>
            <i class="fa-solid fa-user-pen edit-btn"></i>
            <i class="fa-regular fa-trash-can remove-button"></i>
          </div>
        </div>
      </div>
    </li>`;
}

// Declaring function that updates user count
// The function takes as option variable - count as a number and put it to html element
function updateUserCount(count) {
  userCountSpan.textContent = `${count} Contacts`;
}

// Declaring function that makes sorting contacts by A-Z
// Function take our contacts - array that exist in the file not as option, but as variable that exists in global scope and use sort-method of array to sort contacts by name
function sortContacts() {
  contacts.sort((a, b) => a.name.localeCompare(b.name));
}

// Declaring function that shows our contacts in the page.
// The function takes as an option variable - filtered as array of contacts which as a default our default-contacts (filtered=contacts) if the function doesn't takes another option.

function showContacts(filtered = contacts) {
  sortContacts(); // First sorting contacts
  contactsListElement.replaceChildren(); // Removing all contacts in HTML-list for avoiding duplicates
  if (filtered.length === 0) { // if contacts is empty
    contactsListElement.insertAdjacentHTML('beforeend', '<div class="no-contacts-message">No Contacts</div>'); // If contacts-array is empty put this div-element with "No Contacts"-text into our HTML-list 
  } else {
    filtered.forEach(contact => {
      contactsListElement.insertAdjacentHTML('beforeend', contactHTML(contact));
    }); // if contacts is NOT empty we make cicle on our contacts-array and put our contact-HTML-element maked by function-contactHTML and put it into our HTML-list
  }
  updateUserCount(filtered.length); // Finally we update our new-userCount after showing them
}

// Declaring function onContactMouseOver that contains TWO eventListeners that works when we over on contact with mouse. NOT works yet, only declaring...
function onContactMouseOver() {
  contactsListElement.addEventListener("mouseover", (event) => {
    const item = event.target.closest(".contacts-item");
    if (item) item.classList.add("hover");
  });
  
  contactsListElement.addEventListener("mouseout", (event) => {
    const item = event.target.closest(".contacts-item");
    if (item) item.classList.remove("hover");
  });
}

showContacts(); // CALL our function here to run it for our app. FIRST running of the function here to show in HTML our default contacts that exists only in our JS-file as an array-contacts.
onContactMouseOver(); // CALL our function here to run it for our app - now it works and events into our function-onContactMouseOver - are listening (ready) for actions in the page

// Declaring function that contains eventListener by click on createContactBtn-element
function onClickCreateContact() {
  createContactBtn.addEventListener('click', () => {
    modalBgElement.style.display = 'flex'; // Shows modal-HTML-element
    contactFormElement.style.display = 'flex'; // Shows form-HTML-element
    contactFormInputs.forEach(i => i.value = ''); // Clear all inputs in the form (preparing for entering new content into inputs) by cicle because contactFormInputs-elements is an array of inputs-elements in JS.
    editingId = null; // Make this variable null beacause we create new contact
  });
}

onClickCreateContact(); // CALL here this function, and now its ready for actions in the page


function onCloseModal() {
  exitContactBtn.addEventListener('click', hideModal); // On click exitContactBtn call function-hideModal, so hiding modal
  modalBgElement.addEventListener('click', (event) => {
    if (!contactFormElement.contains(event.target) && !contactInfoModal.contains(event.target)) {
      hideModal(); // Call hiding modal
    }
  }); // onclick modalBgElement we check if click outside the forms and hide modal if outside
}

onCloseModal(); // CALL here this function, and now its ready for actions in the page

// Declaring function that contains logic that made modal hide
function hideModal() {
  modalBgElement.style.display = 'none'; // hide modal-background-element
  contactFormElement.style.display = 'none'; // hide contac-form-element
  contactInfoModal.style.display = 'none'; // hide contact-info-modal-element
}

// Declaring function that contains logic for saving contact
function onClickSaveContact() {
  saveContactBtn.addEventListener('click', (event) => {
    event.preventDefault(); // Stop default behavior of submit-input-button
    const newContact = {}; // Create empty object to fill it with needed values
    // Filling contact-object using cicle that goes on contactFormInputs-ARRAY-elements and collect and put the value of input into the field of the object
    for (const input of contactFormInputs) {
      if (!input.value.trim()) return alert("Please fill out all fields."); // If input is empty - alert fill input
      const key = input.dataset.key; // get and save key of the input which the same key as in our contact-object, like name, phone, etc...
      newContact[key] = input.value.trim(); // save in our contact-object (IN KEY) the value of the current input
    }
  
    // save in isDuplicate boolean value if this contact already exists (by ID and name and phone)
    const isDuplicate = contacts.some(c =>
      c.id !== editingId &&
      (c.name.toLowerCase() === newContact.name.toLowerCase() || c.telephone === newContact.telephone)
    );
    if (isDuplicate) {
      return alert("The contact already exists"); // If exists - alert
    }
  
    if (editingId !== null) {
      const index = contacts.findIndex(c => c.id === editingId); // in this case-(IF) the contact exists, so we find here the id of the contact
      contacts[index] = { ...contacts[index], ...newContact }; // edit existed contact with new fields(values) and save them with old values that we didn't change
      editingId = null; // returns this variable to null value
    } else {
      newContact.id = contacts.length ? Math.max(...contacts.map(c => c.id)) + 1 : 0; // contact is NOT exists in this ELSE case, so we create here new id of the new contact
      contacts.push(newContact); // push here new full contact to contacts-ARRAY
    }
    showContacts(); // show updated contacts in HTML (CALL here this function)
    hideModal(); // Close(hide) modal finally
  });
}

onClickSaveContact() // CALL here this function

// Declaring function that remove contact by id
function onClickRemoveContactById() {
  contactsListElement.addEventListener('click', (event) => {
    const contactEl = event.target.closest(".contacts-item"); // find contact-element (li)
    const id = Number(contactEl.dataset.id); // get the id of contact from data-attribute
  
    if (event.target.classList.contains("remove-button")) { // if click on remove-btn
      if (confirm("Are you sure?")) { // check if confirm
        setTimeout(() => { // making setTimeout for animation
          contactEl.classList.add('fade-out'); // add class name to contact-element
          contacts = contacts.filter(c => c.id !== id); // change contacts-ARRAY in JS by filtering (removing) by id that we want to remove
          updateUserCount(contacts.length); // call function to update users-count
          setTimeout(() => {
            contactEl.remove(); // remove from HTML this contact also using setTimeout for correct work of animation
          }, 250)
        }, 400);
      }
    }
  });
}

onClickRemoveContactById(); // CALL here this function

// Declaring function that OPENS form for editing contact by id and PREPARING for finally-editing (it will be edited by click on SaveBtn)
function onClickEditContactById() {
  contactsListElement.addEventListener('click', (event) => {
    const contactEl = event.target.closest(".contacts-item");
    const id = Number(contactEl.dataset.id);
    const contact = contacts.find(c => c.id === id); // find needed contact-object using id
  
    if (event.target.classList.contains("edit-btn")) { // if click on edit-btn-element
      editingId = id; // save id value of contact in this variable
      contactFormInputs.forEach(input => {
        const key = input.dataset.key; // get the key from data-attribute from input which the same as contact-object-field
        input.value = contact[key] || ''; // fill the input with the value from contact-object or empty string if doesn't have value in this field
      }); // cicle on inputs-ARRAY-elements and put in every input data from object or fill it with empty string if doesn't have value in this field of object
      modalBgElement.style.display = 'flex'; // Show modal-background-element FINALLY
      contactFormElement.style.display = 'flex'; // Show contact-form-element FINALLY
    }
  });
}

onClickEditContactById(); // CALL here this function

// Declaring function that OPENS and fill info-modal with contact-data by contact-id
function onClickShowContactInfo() {
  contactsListElement.addEventListener('click', (event) => {
    const contactEl = event.target.closest(".contacts-item");
    const id = Number(contactEl.dataset.id);
    const contact = contacts.find(c => c.id === id);
  
    if (event.target.classList.contains("info-btn")) { // if click on info-btn
      const infoEl = `
        <div><span>Name: </span><span>${contact.name}</span></div>
        <div><span>Age: </span><span>${contact.age}</span></div>
        <div><span>Telephone: </span><span>${contact.telephone}</span></div>
        <div><span>Adress: </span><span>${contact.address}</span></div>
      `; // create the info-modal-element with content that contains contact-object-data
      contactInfoModal.replaceChildren(); // Removing previous content in HTML for avoiding duplicates
      contactInfoModal.insertAdjacentHTML('beforeend', infoEl); // Fill the contactInfoModal with created infoEl
      modalBgElement.style.display = 'flex'; // Show modal-background-element
      contactInfoModal.style.display = 'flex'; // Show contact-info-modal-element
      contactFormElement.style.display = 'none'; // Hide contact-form-element
    }
  });
}

onClickShowContactInfo(); // CALL here this function

// Declare function that contains logic for finding contact/contacts
function onSearchInput() {
  searchInput.addEventListener("input", (event) => {
    const term = event.target.value.toLowerCase(); // get the value from input
    const filtered = contacts.filter(c => c.name.toLowerCase().includes(term)); // find here contacts that contain in their names letters which we entered in input
    showContacts(filtered); // call function and show only FILTERED-contacts which we pass as argument into this function
  });
}

onSearchInput(); // CALL here this function

// Declare function that contains logic for removing all contacts
function onClickDeleteAllContacts() {
  globalDeleteBtn.addEventListener("click", () => {
    if (confirm("Are you sure you want to delete ALL contacts?")) { // confirm
      const items = document.querySelectorAll('.contacts-item'); // get all contacts-HTML-elements and save into items-variable
      items.forEach((item, index) => { // making cicle to delete each contact
        item.classList.add('fade-out'); // add class name for animation
        setTimeout(() => { // setTimeout for animation
          if (index === items.length - 1) {
            contacts = []; // Make contacts-ARRAY-JS empty
            showContacts(); // Call function that show contacts in HTML
          }
        }, 650);
      });
    }
  });
}

onClickDeleteAllContacts(); // CALL here this function


