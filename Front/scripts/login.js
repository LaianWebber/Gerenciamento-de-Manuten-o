const btnEntrar = document.querySelector('#btnEntrar');

export let id = 0;

btnEntrar.addEventListener('click', () => {
    const inputEmail = document.querySelector('#inputEmail').value;
    const inputSenha = document.querySelector('#inputSenha').value;

    getUserTask(inputEmail, inputSenha);
});



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

                window.location.href = ''
            } else {
                console.log("Senha errada");   
            }
        }
    })

    
}