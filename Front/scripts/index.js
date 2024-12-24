import { id } from '../scripts/login.js';

// window.onload =  () =>{
//     getUserName(id);
//     getUserTask(id);
// }

export function getUserName(id){
    fetch(`http://localhost:3000/user/${id}`)
    .then(response => {
        if (response.status === 200) {
            console.log(response.json());
            console.log('teste1');
            
        } else {
            console.log('nok');
        }
    })
}

// ----------------------------
export function getUserTask(id){
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