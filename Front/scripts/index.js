let id = 1;

window.onload =  () =>{
    getUserName(id);
    getUserTask(id);
}

function getUserName(id){
    fetch(`http://localhost:3000/user/${id}`)
    .then(response => {
        if (response.status === 200) {
            console.log(response.json());
            
        } else {
            console.log('nok');
        }
    })
}

// ----------------------------
function getUserTask(id){
    fetch(`http://localhost:3000/user/${id}/tasks`)
    .then(response => {
        if (response.status === 200) {
            return response.json();
            
        } else {
            console.log('nok');
        }
    })
    .then(dados => {
        if (dados.length === 0) {
            console.log('Não existem tasks');
        } else {
            console.log(dados);
        }
    })
}