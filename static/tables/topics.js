function init() {
 
    fetch('http://127.0.0.1:8080/api/topics',{
        headers:{
            'Content-Type': 'application/json'
        }
        
    })
        .then(res => res.json())
        .then(data => {
            const tbl = document.getElementById('table');
            console.log(data);

            data.forEach( el => {
                tbl.innerHTML += 
                `<tr>
                <td> ${el.id}</td>
                <td>${el.name}</td>
                <td>${el.userId}</td>
                <td>${el.description}</td>
                <td> ${el.createdAt}</td>
                <td>
                    <a href="#editEmployeeModal" class="edit" data-toggle="modal"><i class="material-icons" data-toggle="tooltip" title="Edit">&#xE254;</i></a>
                    <a href="#deleteEmployeeModal" class="delete" data-toggle="modal"><i class="material-icons" data-toggle="tooltip" title="Delete">&#xE872;</i></a>
                </td>
            </tr>`;
            })
        });


  }