// Función para agregar datos
const addData = () => {
    //obtener los valores de los inputs llamandolos mediante su ID
    const name = document.getElementById('name').value;
    const address = document.getElementById('address').value;
    const email = document.getElementById('email').value;

    // verificamos que los campos no esten vacios, si alguno de los campos esta vacio
    if (!name || !address || !email) {
        alert('Por favor, rellene todos los campos requeridos');
        return;
    }


    //creamos un objeto con los datos
    const data = { name, address, email };
    const savedData = JSON.parse(localStorage.getItem('savedData')) || []; // obtener losdatos guardados en el almacenamiento local O crear un nuevo array
    
    //agregar los nuevos datos al array
    savedData.push(data);
    localStorage.setItem('savedData', JSON.stringify(savedData));//guardamos los nuevos datos actualizados en el almacenamiento local

    showData();//Mostramos los datos actualizado en Tabla 
};


// Función para borrar datos de la tabla
const deleteData = (index) => {
    const savedData = JSON.parse(localStorage.getItem('savedData'));//obtener los datos guardados en el almacenamiento local 

    if (index >= 0 && index < savedData.length) {
        savedData.splice(index, 1);
        localStorage.setItem('savedData', JSON.stringify(savedData));
        showData();
    }
};


// funcion para editar datos 
const editData = (index) => {
    const savedData = JSON.parse(localStorage.getItem('savedData'));

    if (index >= 0 && index < savedData.length) {
        const data = savedData[index];
        document.getElementById('name').value = data.name;
        document.getElementById('address').value = data.address;
        document.getElementById('email').value = data.email;

        // Cambiar el botón de agregar por el botón de actualizar
        document.getElementById('addData').style.display = 'none';
        document.getElementById('updateData').style.display = 'inline';
        
        // Almacenar el índice actual en un atributo de datos para usarlo en updateData()
        document.getElementById('updateData').setAttribute('data-index', index);
        
        // Asignar la función de actualización al botón de actualizar
        document.getElementById('updateData').onclick = updateData;
    }
};


// Función para actualizar datos en el formulario
const updateData = () => {
    // Obtener el índice del atributo de datos almacenado en el botón de actualizar
    const index = parseInt(document.getElementById('updateData').getAttribute('data-index'));

    const name = document.getElementById('name').value;
    const address = document.getElementById('address').value;
    const email = document.getElementById('email').value;

    if (!name || !address || !email) {
        alert('Por favor, rellene todos los campos requeridos');
        return;
    }

    const data = { name, address, email };
    const savedData = JSON.parse(localStorage.getItem('savedData')) || [];

    if (index >= 0 && index < savedData.length) {
        savedData[index] = data;
        localStorage.setItem('savedData', JSON.stringify(savedData));
        showData();

        // Restaurar el botón de agregar y ocultar el botón de actualizar
        document.getElementById('addData').style.display = 'inline';
        document.getElementById('updateData').style.display = 'none';
        
        // Limpiar los campos del formulario
        document.getElementById('name').value = '';
        document.getElementById('address').value = '';
        document.getElementById('email').value = '';
    }
};

// ...

// Función para mostrar los datos en la tabla
const showData = () => {
    const savedData = JSON.parse(localStorage.getItem('savedData')) || [];
    const tableBody = document.getElementById('tableBody');
    tableBody.innerHTML = '';

    for (let index = 0; index < savedData.length; index++) {
        const data = savedData[index];
        const row = document.createElement('tr');

        for (const key in data) {
            const cell = document.createElement('td');
            cell.textContent = data[key];
            row.appendChild(cell);
        }

        const actionsCell = document.createElement('td');

        const editBtn = document.createElement('button');
        editBtn.textContent = 'Editar';
        editBtn.classList.add('btn', 'btn-warning', 'm-1');
        editBtn.setAttribute('data-index', index);

        editBtn.addEventListener('click', (event) => {
            const dataIndex = parseInt(event.target.getAttribute('data-index')) || [];
            editData(dataIndex); // Llamamos a la función de edición al hacer clic en "Editar"
        });

        actionsCell.appendChild(editBtn);

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Borrar';
        deleteBtn.classList.add('btn', 'btn-danger', 'm-1');
        deleteBtn.setAttribute('data-index', index);

        deleteBtn.addEventListener('click', (event) => {
            const dataIndex = parseInt(event.target.getAttribute('data-index')) || [];
            deleteData(dataIndex);
        });

        actionsCell.appendChild(deleteBtn);
        row.appendChild(actionsCell);
        tableBody.appendChild(row);
    }
};

// Llamar a la función para mostrar los datos en la tabla al cargar la página
showData();

// Escuchar el evento de clic en el botón "addData" y llamar a la función addData()
document.getElementById('addData').addEventListener('click', addData);