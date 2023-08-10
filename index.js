

let register = []

// Función para agregar datos
const addData = () => {
    const { name, address, email } = getInputValues();//obtenemos valor del formulario con la funcion getInputValues

    if (!name || !address || !email) {//verificamos si los campos requeridos estan vacios
        alert('Por favor, rellene todos los campos requeridos');
        return;
    }

    const data = { name, address, email, id: Date.now() }; // creamos un oobjeto 'data' con valores obtenidos generando una ID basada en la hora ACTUAL

    register.push(data);// agregamos el nuevo objeto 'data' al arreglo 'savedData'
    saveData();

    updateForm();//actualiza el formulario
    showData();// y muestra los datos en la tabla 
};

// Función para borrar datos de la tabla
    const deleteData = (id) => {
        const index = register.findIndex((el) => el.id == id);
        register.splice(index, 1)


    saveData();
    showData();
};

// Función para editar datos
const editData = (id) => {
    document.getElementById('addData').style.display = 'none';// oculta el boton agregar
    document.getElementById('updateData').style.display = 'inline';// mostramos el boton actualizar
    idEdit = id;//almacena la id del objeto editado en idEdit
    
    const index = register.findIndex((el) => el.id == id);
    const data = register[index];
    setInputValues(data)
};



// Función para actualizar datos en el formulario
const updateData = (event) => {

    event.preventDefault()

    const data = getInputValues();
    const index = register.findIndex((el) => el.id == idEdit);
    console.log(index)
    register[index] = data;
    console.log(register)
    
    saveData()
    showData()

    idEdit = null;
    updateForm()

};

// Función para mostrar los datos en la tabla
const showData = () => {
    getSavedData();
    const tableBody = document.getElementById('tableBody');
    tableBody.innerHTML = '';

    register.forEach(element => {
        tableBody.innerHTML += `
        <tr>
            <td>${element.name}</td>
            <td>${element.address}</td>
            <td>${element.email}</td>
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

//Escuchar el evento del clic en el boton "updateData" y llamar a la funcion updateData
document.getElementById('updateData').addEventListener('click', updateData)

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
    register = JSON.parse(localStorage.getItem('savedData')) || [];
}

function saveData() {
    localStorage.setItem('savedData', JSON.stringify(register));
}

function updateForm() {
    document.getElementById('addData').style.display = 'inline';
    document.getElementById('updateData').style.display = 'none';

    setInputValues({ name: '', address: '', email: '' });
}
