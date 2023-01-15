function loadTable() {
 
    fetch('http://127.0.0.1:8080/api/users')
        .then(res => res.json())
        .then(data => {
            const tbl = document.getElementById('mytable');
            console.log(data);

            data.forEach( el => {
                tbl.innerHTML += `<td>ID: ${el.id}</td>
                <td>Name: ${el.name}</td>
                <td>Email: ${el.email}</td>
                <td>Password: ${el.password}</td>
                <td>Admin: ${data.admin}</td>`;
            })
        });


  }
