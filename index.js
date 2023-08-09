// Función para agregar datos
const addData = () => {
    const { name, address, email } = getInputValues();

    if (!name || !address || !email) {
        alert('Por favor, rellene todos los campos requeridos');
        return;
    }

    const data = { name, address, email, id: Date.now() };
    const savedData = getSavedData();

    savedData.push(data);
    saveData(savedData);

    updateForm();
    showData();
};

// Función para borrar datos de la tabla
const deleteData = (id) => {
    const savedData = getSavedData();
    const newData = savedData.filter(data => data.id !== id);

    saveData(newData);
    showData();
};

// Función para editar datos
const editData = (id) => {
    const savedData = getSavedData();
    const dataToEdit = savedData.find(data => data.id === id);

    if (dataToEdit) {
        setInputValues(dataToEdit);

        document.getElementById('addData').style.display = 'none';
        document.getElementById('updateData').style.display = 'inline';
        idEdit = id;

        document.getElementById('updateData').onclick = updateData;
    }
};

// Función para actualizar datos en el formulario
const updateData = () => {
    const { name, address, email } = getInputValues();

    if (!name || !address || !email) {
        alert('Por favor, rellene todos los campos requeridos');
        return;
    }

    const savedData = getSavedData();
    const dataToUpdateIndex = savedData.findIndex(data => data.id === idEdit);

    if (dataToUpdateIndex !== -1) {
        savedData[dataToUpdateIndex] = { ...savedData[dataToUpdateIndex], name, address, email };
        saveData(savedData);

        updateForm();
        showData();

        idEdit = null;
    }
};

// Función para mostrar los datos en la tabla
const showData = () => {
    const savedData = getSavedData();
    const tableBody = document.getElementById('tableBody');
    tableBody.innerHTML = '';

    savedData.forEach(element => {
        tableBody.innerHTML += `
        <tr>
            <td>${element.name}</td>
            <td>${element.address}</td>
            <td>${element.email}</td>
            <td>${element.id}</td>
            <td>
                <button class="btn btn-warning" onclick="editData(${element.id})">Editar</button>
                <button class="btn btn-danger" onclick="deleteData(${element.id})">Borrar</button>
            </td>
        </tr>`;
    });
};

// Llamar a la función para mostrar los datos en la tabla al cargar la página
showData();

// Escuchar el evento de clic en el botón "addData" y llamar a la función addData()
document.getElementById('addData').addEventListener('click', addData);

let idEdit = null;

function getInputValues() {
    return {
        name: document.getElementById('name').value,
        address: document.getElementById('address').value,
        email: document.getElementById('email').value
    };
}

function setInputValues(data) {
    document.getElementById('name').value = data.name;
    document.getElementById('address').value = data.address;
    document.getElementById('email').value = data.email;
}

function getSavedData() {
    return JSON.parse(localStorage.getItem('savedData')) || [];
}

function saveData(data) {
    localStorage.setItem('savedData', JSON.stringify(data));
}

function updateForm() {
    document.getElementById('addData').style.display = 'inline';
    document.getElementById('updateData').style.display = 'none';

    setInputValues({ name: '', address: '', email: '' });
}
