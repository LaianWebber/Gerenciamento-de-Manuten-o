const btnEntrar = document.querySelector('#btnEntrar');


//Função para quando clicar em entrar, efetuar o login
btnEntrar.addEventListener('click', () => {
const inputEmail = document.querySelector('#inputEmail').value;
const inputSenha = document.querySelector('#inputSenha').value

if (inputEmail === 'admin' && inputSenha === 'root') {
    window.location.href = './pages/taskManager.html';
} else {
    alert('não funcionou')
}
})



