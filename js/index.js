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

function updateUserCount(count) {
  userCountSpan.textContent = `${count} Contacts`;
}

function sortContacts() {
  contacts.sort((a, b) => a.name.localeCompare(b.name));
}

function showContacts(filtered = contacts) {
  sortContacts();
  contactsListElement.replaceChildren();
  if (filtered.length === 0) {
    contactsListElement.insertAdjacentHTML('beforeend', '<div class="no-contacts-message">No Contacts</div>');
  } else {
    filtered.forEach(contact => {
      contactsListElement.insertAdjacentHTML('beforeend', contactHTML(contact));
    });
  }
  updateUserCount(filtered.length);
}

contactsListElement.addEventListener("mouseover", (event) => {
  const item = event.target.closest(".contacts-item");
  if (item) item.classList.add("hover");
});

contactsListElement.addEventListener("mouseout", (event) => {
  const item = event.target.closest(".contacts-item");
  if (item) item.classList.remove("hover");
});

showContacts();

createContactBtn.addEventListener('click', () => {
  modalBgElement.style.display = 'flex';
  contactFormElement.style.display = 'flex';
  contactFormInputs.forEach(i => i.value = '');
  editingId = null;
});

exitContactBtn.addEventListener('click', hideModal);
modalBgElement.addEventListener('click', (event) => {
  if (!contactFormElement.contains(event.target) && !contactInfoModal.contains(event.target)) {
    hideModal();
  }
});

function hideModal() {
  modalBgElement.style.display = 'none';
  contactFormElement.style.display = 'none';
  contactInfoModal.style.display = 'none';
}

saveContactBtn.addEventListener('click', (event) => {
  event.preventDefault();
  const newContact = {};
  for (const input of contactFormInputs) {
    if (!input.value.trim()) return alert("Please fill out all fields.");
    const key = input.dataset.key;
    newContact[key] = input.value.trim();
  }

  const isDuplicate = contacts.some(c =>
    c.id !== editingId &&
    (c.name.toLowerCase() === newContact.name.toLowerCase() || c.telephone === newContact.telephone)
  );
  if (isDuplicate) {
    return alert("The contact already exists");
  }

  if (editingId !== null) {
    const index = contacts.findIndex(c => c.id === editingId);
    contacts[index] = { ...contacts[index], ...newContact };
    editingId = null;
  } else {
    newContact.id = contacts.length ? Math.max(...contacts.map(c => c.id)) + 1 : 0;
    contacts.push(newContact);
  }
  showContacts();
  hideModal();
});


contactsListElement.addEventListener('click', (event) => {
  const contactEl = event.target.closest(".contacts-item");
  const id = Number(contactEl.dataset.id);
  const contact = contacts.find(c => c.id === id);

  if (event.target.classList.contains("remove-button")) {
    if (confirm("Are you sure?")) {
      setTimeout(() => {
        contactEl.classList.add('fade-out');
        contacts = contacts.filter(c => c.id !== id);
        updateUserCount(contacts.length);
        setTimeout(() => {
          contactEl.remove();
        }, 250)
      }, 400);
    }
  }

  if (event.target.classList.contains("edit-btn")) {
    editingId = id;
    contactFormInputs.forEach(input => {
      const key = input.dataset.key;
      input.value = contact[key] || '';
    });
    modalBgElement.style.display = 'flex';
    contactFormElement.style.display = 'flex';
  }

  if (event.target.classList.contains("info-btn")) {
    contactInfoModal.innerHTML = `
      <div><span>Name: </span><span>${contact.name}</span></div>
      <div><span>Age: </span><span>${contact.age}</span></div>
      <div><span>Telephone: </span><span>${contact.telephone}</span></div>
      <div><span>Adress: </span><span>${contact.address}</span></div>
    `;
    modalBgElement.style.display = 'flex';
    contactInfoModal.style.display = 'flex';
    contactFormElement.style.display = 'none';
  }
});

searchInput.addEventListener("input", (event) => {
  const term = event.target.value.toLowerCase();
  const filtered = contacts.filter(c => c.name.toLowerCase().includes(term));
  showContacts(filtered);
});

globalDeleteBtn.addEventListener("click", () => {
  if (confirm("Are you sure you want to delete ALL contacts?")) {
    const items = document.querySelectorAll('.contacts-item');
    items.forEach((item, index) => {
      item.classList.add('fade-out');
      setTimeout(() => {
        if (index === items.length - 1) {
          contacts = [];
          showContacts();
        }
      }, 650);
    });
  }
});




