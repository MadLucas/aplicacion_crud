// // imperativa

// const showData = () => {
//     const savedData = JSON.parse(localStorage.getItem('savedData')) || [];
//     const tableBody = document.getElementById('tableBody');
//     tableBody.innerHTML = '';

//     for (let index = 0; index < savedData.length; index++) {
//         const data = savedData[index];
//         const row = document.createElement('tr');

//         for (const key in data) {
//             const cell = document.createElement('td');
//             cell.textContent = data[key];
//             row.appendChild(cell);
//         }

//         const actionsCell = document.createElement('td');

//         const editBtn = document.createElement('button');
//         editBtn.textContent = 'Editar';
//         editBtn.classList.add('btn', 'btn-warning', 'm-1');
//         editBtn.setAttribute('data-index', index);

//         editBtn.addEventListener('click', (event) => {
//             const dataIndex = parseInt(event.target.getAttribute('data-index')) || [];
//             editData(dataIndex); // Llamamos a la función de edición al hacer clic en "Editar"
//         });

//         actionsCell.appendChild(editBtn);

//         const deleteBtn = document.createElement('button');
//         deleteBtn.textContent = 'Borrar';
//         deleteBtn.classList.add('btn', 'btn-danger', 'm-1');
//         deleteBtn.setAttribute('data-index', index);

//         deleteBtn.addEventListener('click', (event) => {
//             const dataIndex = parseInt(event.target.getAttribute('data-index')) || [];
//             deleteData(dataIndex);
//         });

//         actionsCell.appendChild(deleteBtn);
//         row.appendChild(actionsCell);
//         tableBody.appendChild(row);
//     }
// };

// // Llamar a la función para mostrar los datos en la tabla al cargar la página
// showData();


// //declarativa 

// const showData = () => {
//     const savedData = JSON.parse(localStorage.getItem('savedData')) || [];
//     const tableBody = document.getElementById('tableBody');
//     tableBody.innerHTML = '';
//     savedData.forEach(element => {
//         tableBody.innerHTML += `
//         <tr>
//             <td>${element.name}</td>
//             <td>${element.address}</td>
//             <td>${element.email}</td>
//             <td>
//             <button class="btn btn-warning" data-id=`${element.id}`>Editar</button>
//                 <button class = " btn btn-danger" data-id=`${element.id}`>Borrar</buttton>

//             </td>
//         </tr> 
//         `
        
//     });
//     }


//     //tengo que darle la funcion Onclick a los btns editar y borrar
//     // y trabajar el resto de mi codigo con id 