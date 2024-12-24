const btnEntrar = document.querySelector('#btnEntrar');


//Função para quando clicar em entrar, efetuar o login
btnEntrar.addEventListener('click', () => {
const inputEmail = document.querySelector('#inputEmail').value;
// const inputSenha = document.querySelector('#inputSenha').value

// if (inputEmail === 'admin') {
//     window.location.href = './pages/taskManager.html';
// } else {
//     alert('não funcionou')
// }

 // Função para buscar usuários com a idade digitada
    // Verifica se a idade foi fornecida
    if (!inputEmail) {
        alert('Por favor, insira um email.');
        return;
    }
})



