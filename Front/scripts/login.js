const btnEntrar = document.querySelector('#btnEntrar');

let id = 0;
export let inputEmail = 0;

function callLogin() {
    inputEmail = document.querySelector('#inputEmail').value;
    const inputSenha = document.querySelector('#inputSenha').value;

    getUserTask(inputEmail, inputSenha);
}


if (btnEntrar) {
    btnEntrar.addEventListener('click', () => {
        callLogin();
    });
}


function getUserTask(username, passwrd){

    fetch(`http://localhost:3000/users/${username}`)
    .then(response => {
        if (response.status === 200) {
            return response.json();
        } else {
            console.log('nok');
        }
    })
    .then(dados => {
        if (dados.length === 0) {
            console.log('Não existe esse usuario');
        } else {
            const senha = dados[0].passwrd;

            if (senha === passwrd) {
                console.log("Senha correta");
                id = dados[0].id;

                localStorage.setItem('idUser', id);

                if (dados[0].nivel === 1) {
                    window.location.href = 'http://localhost/Front/pages/taskManager.html';
                } else if (dados[0].nivel === 2) {
                    window.location.href = 'http://localhost/Front/pages/taskColab.html';
                }
                
                

            } else {
                console.log("Senha errada");   
            }

           
        }
    })   
}

document.addEventListener("keydown", function(event) {
    if (event.key === "Enter") { // Verifica se a tecla é o Enter
        callLogin();
    }
});