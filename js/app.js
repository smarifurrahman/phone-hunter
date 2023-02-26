const loadPhones = async (searchString, dataLimit) => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchString}`;
    const res = await fetch(url);
    const data = await res.json();
    displayPhones(data.data, dataLimit);
}

const displayPhones = (phones, dataLimit) => {
    const phoneContainer = document.getElementById('phone-container');
    // display 15 phone maximum
    const showAll = document.getElementById('show-all');
    if (dataLimit && phones.length > 15) {
        phones = phones.slice(0, 15);
        showAll.classList.remove('d-none');
    }
    else {
        showAll.classList.add('d-none');
    }
    // display no phone found
    const noPhoneFound = document.getElementById('no-phone-found');
    if (!phones.length) {
        noPhoneFound.classList.remove('d-none');
        toggleSpinner(false);
        return;
    }
    else {
        noPhoneFound.classList.add('d-none');
    }
    // display all phone
    phones.forEach(phone => {
        const phoneDiv = document.createElement('div');
        phoneDiv.classList.add('col');
        phoneDiv.innerHTML = `
            <div class="card h-100">
                <img src="${phone.image}" class="card-img-top w-75 mx-auto p-5" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${phone.phone_name}</h5>
                    <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                    <button onclick="loadPhoneDetails('${phone.slug}')" type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#detailsModal">
                        Show Details
                    </button>
                </div>
            </div>
        `;
        phoneContainer.appendChild(phoneDiv);
    });
    toggleSpinner(false);
}

const emptyPhoneContainer = () => {
    const phoneContainer = document.getElementById('phone-container');
    phoneContainer.innerHTML = '';
}

const toggleSpinner = isLoading => {
    const loaderContainer = document.getElementById('spinner');
    if (isLoading) {
        loaderContainer.classList.remove('d-none');
    }
    else {
        loaderContainer.classList.add('d-none');
    }
}

const processSearch = (dataLimit = false) => {
    emptyPhoneContainer();
    toggleSpinner(true);
    const searchFieldValue = document.getElementById('input-search').value;
    loadPhones(searchFieldValue, dataLimit);
}

document.getElementById('btn-search').addEventListener('click', function () {
    processSearch(15);
});

document.getElementById('input-search').addEventListener('keyup', function (event) {
    if (event.key === 'Enter') {
        processSearch(15);
    }
});

document.getElementById('btn-show-all').addEventListener('click', function () {
    processSearch();
});

const emptyModalInfo = () => {
    const modalContainer = document.getElementById('detailsModalLabel');
    modalContainer.innerText = 'Loading...';
    const modalBody = document.getElementById('modal-body');
    modalBody.innerHTML = `<p>Loading...</p>`;
}

const loadPhoneDetails = async (id) => {
    emptyModalInfo();
    const url = `https://openapi.programming-hero.com/api/phone/${id}`;
    const res = await fetch(url);
    const data = await res.json();
    displayPhoneDetails(data.data);
}

const displayPhoneDetails = (phone) => {
    const modalContainer = document.getElementById('detailsModalLabel');
    modalContainer.innerText = `${phone.name}`;
    const modalBody = document.getElementById('modal-body');
    modalBody.innerHTML = `
        <p>Release Date: ${phone.releaseDate ? phone.releaseDate : 'No Release Date Found'}</p>
        <p>Storage: ${phone.mainFeatures.storage}</p>
        <p>Display Size: ${phone.mainFeatures.displaySize}</p>
        <p>Chip Set: ${phone.mainFeatures.chipSet}</p>
        <p>Memory: ${phone.mainFeatures.memory}</p>
    `;
}

loadPhones('apple');