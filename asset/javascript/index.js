

let register = [] // utilizamos un array vacio para almacenar los datos
let idEdit = null; // almacena temporalmente la id del elemento en edicion 

// ENCAPSULO EN FUNCIONES CODIGO REPETITIVO PARA OPTIMIZAR EL CODIGO Y MEJORAR LA LEGIBILIDAD
const getInputValues = () => {
    return {
        name: document.getElementById('name').value,
        address: document.getElementById('address').value,
        email: document.getElementById('email').value
    };
}

const setInputValues = (data) => {
    document.getElementById('name').value = data.name;
    document.getElementById('address').value = data.address;
    document.getElementById('email').value = data.email;
}

const getSavedData = () => {
    register = JSON.parse(localStorage.getItem('savedData')) || [];
}

const saveData = () => {
    localStorage.setItem('savedData', JSON.stringify(register));
}

const updateForm = () => {
    document.getElementById('addData').style.display = 'inline';
    document.getElementById('updateData').style.display = 'none';

    setInputValues({ name: '', address: '', email: '' });
}

// Función para mostrar los datos en la tabla
const showData = () => {
    getSavedData();
    const tableBody = document.getElementById('tableBody');
    tableBody.innerHTML = '';

    register.forEach(element => { // Utilizamos el metodo "forEach" para recorrer el array y de esta manera presentar los datos en la tabla
        tableBody.innerHTML += `
        <tr>
            <td>${element.name}</td>
            <td>${element.address}</td>
            <td>${element.email}</td>
            <td>
                <button class="btn btn-warning" onclick="editData(${element.id})">Editar</button>
                <button class="btn btn-danger" onclick="deleteData(${element.id})">Borrar</button>
            </td>
        </tr>`;
    });
};


// Función para agregar datos
const addData = () => {
    const { name, address, email } = getInputValues();//obtenemos valor del formulario con la funcion getInputValues

    if (!name || !address || !email) {//verificamos si los campos requeridos estan vacios
        alert('Por favor, rellene todos los campos requeridos');// si estan vacios le informamos al usuario con una alerta 
        return;
    }

    const data = { name, address, email, id: Date.now() }; // creamos un oobjeto 'data' con valores obtenidos generando una ID basada en la hora ACTUAL

    register.push(data);// agregamos el nuevo objeto 'data' al arreglo 'savedData'
    saveData();

    updateForm();//actualiza el formulario
    showData();// y muestra los datos en la tabla 
};

// Función para borrar datos de la tabla se llama cuando hacemos click en el boton "Borrar"
    const deleteData = (id) => {
        const index = register.findIndex((el) => el.id == id); //busca en el array "register" y devuelve el indice del primer elemento que cumple con la condicion proporcionada en la funcion callback
        register.splice(index, 1)// especificamos la posicion de elemento que se eliminara, y la cantidad de elemntos que se eliminaran a partir de dicha posicion en este caso 1


    saveData();// llamamos para guardar los datos,
    showData();// y actualizar la tabla
};

// Función para editar datos
const editData = (id) => {
    document.getElementById('addData').style.display = 'none';// oculta el boton agregar
    document.getElementById('updateData').style.display = 'inline';// mostramos el boton actualizar
    idEdit = id;//almacena la id del objeto editado en idEdit
    
    const index = register.findIndex((el) => el.id == id);// encontramos el indece del elemento en el array "register" usando su id
    const data = register[index]; // obtenemos los datos del elemento 
    setInputValues(data)          // y llenamos el formulario con esos valores
};



// Función para actualizar datos en el formulario
const updateData = (event) => {

    event.preventDefault()// evitamos comportamiento prederterminado del formulario

    const data = getInputValues(); // obtenemos valores del formulario
    const index = register.findIndex((el) => el.id == idEdit);//encontramos el indice del elemento editado en el array "register"
    console.log(index)
    register[index] = data; //actualizamos los datos del elemento en el array "register"
    console.log(register)
    
    saveData() // guardamos
    showData()// mostramos en la tabla

    idEdit = null; // restablecer la variable idEdit 
    updateForm() //

};

// Llamar a la función para mostrar los datos en la tabla al cargar la página
showData();

// Escuchar el evento de clic en el botón "addData" y llamar a la función addData()
document.getElementById('addData').addEventListener('click', addData);

//Escuchar el evento del clic en el boton "updateData" y llamar a la funcion updateData
document.getElementById('updateData').addEventListener('click', updateData);




