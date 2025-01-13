let idUser = localStorage.getItem('idUser');

// ----------------------------
function createTask(idUser) {
    console.log(idUser);

    let inputTitle = document.getElementById("inputNameTask").value;

    let statusSpan = document.getElementById("statusSpan");
    statusSpan = statusSpan.textContent.charAt(0).toLowerCase() + statusSpan.textContent.slice(1);

    let prioSpan = document.getElementById("prioSpan");
    prioSpan = prioSpan.textContent.charAt(0).toLowerCase() + prioSpan.textContent.slice(1);

    let inputRespon = document.getElementById("inputRespon").value;
    inputRespon = inputRespon.textContent.charAt(0).toLowerCase() + inputRespon.textContent.slice(1);

    let inputData = document.getElementById("inputData").value;
    function converterParaDataBrasileira(dataISO) {
        const [ano, mes, dia] = dataISO.split('-');
        return `${dia}/${mes}/${ano}`;
    }
    inputData = converterParaDataBrasileira(inputData);

    let descricao = document.getElementById("descricao").value;

    // Fazer a requisição para criar uma nova tarefa
    fetch(`http://localhost:3000/user/${idUser}/tasks/createTask/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idUser, inputTitle, statusSpan, prioSpan, inputData, inputRespon, descricao })
    })
    .then(response => {
        if (response.status === 200) {
            alert('Tarefa criada com sucesso');
            return response.json();
        } else {
            alert('Erro ao criar a tarefa');
            throw new Error('Erro ao criar a tarefa');
        }
    })
    .then(dados => {
        console.log('Nova tarefa criada:', dados);
    });
}

document.getElementById('addTaskAdicionar').addEventListener('click', () => {
    createTask(idUser);
});

