let idUser = localStorage.getItem('idUser');
let idTask;

window.onload = function() {
    idTask = localStorage.getItem('taskId');
    console.log(idTask);

    getTask(idUser, idTask);
}


// ----------------------------
export function getTask(idUser, idTask) {
    fetch(`http://localhost:3000/user/${idUser}/tasks/${idTask}"`)
        .then(response => {
            if (response.status === 200) {
                console.log('funcionou');
                return response.json();

            } else {
                console.log('nok');
            }
        })
        .then(tarefa => {
            if (tarefa.length === 0) {
                console.log('Não existe');
            } else {
                const inputTitle = document.getElementById("inputNameTask");
                inputTitle.value = tarefa.task_title;

                const statusSpan = document.getElementById("statusSpan");
                statusSpan.textContent = tarefa.task_status.charAt(0).toUpperCase() + tarefa.task_status.slice(1); //Deixa o começo em maiusculo
                statusSpan.classList.add(tarefa.task_status.replace(/\b(a|em)\b/g, '').trim()) //Tira o 'em' da classe
                
                const prioSpan = document.getElementById("prioSpan");
                prioSpan.textContent = tarefa.task_prior.charAt(0).toUpperCase() + tarefa.task_prior.slice(1);;
                prioSpan.classList.add(tarefa.task_prior);
                
                const inputRespon = document.getElementById("inputRespon");
                inputRespon.value = tarefa.task_respon;

                const inputData = document.getElementById("inputData");
                function converterParaISO(dataBr) {
                    const [dia, mes, ano] = dataBr.split('/'); // Divide a string em partes
                    return `${ano}-${mes}-${dia}`; // Reorganiza para o formato ISO
                }
                const data = converterParaISO(tarefa.task_prazo);
                inputData.value = data;
                
                const descricao = document.getElementById("descricao");
                descricao.value = tarefa.task_text; 
            }
        })
}


// ----------------------------
function updateTask(idUser, idTask) {
    let inputTitle = document.getElementById("inputNameTask").value;

    let statusSpan = document.getElementById("statusSpan");
    statusSpan = statusSpan.textContent.charAt(0).toLowerCase() + statusSpan.textContent.slice(1);

    let prioSpan = document.getElementById("prioSpan");
    prioSpan = prioSpan.textContent.charAt(0).toLowerCase() + prioSpan.textContent.slice(1);


    let inputRespon = document.getElementById("inputRespon").value;

    let inputData = document.getElementById("inputData").value;
    function converterParaDataBrasileira(dataISO) {
        const [ano, mes, dia] = dataISO.split('-'); // Divide a string em partes
        return `${dia}/${mes}/${ano}`; // Reorganiza para o formato dd/mm/yyyy
    }
    inputData = converterParaDataBrasileira(inputData);
    
    let descricao = document.getElementById("descricao").value;



    fetch(`http://localhost:3000/tasks/updateTask`, {
        method: 'POST',
        headers: { 'Content-Type' : 'application/json' },
        body: JSON.stringify({idUser, idTask, inputTitle, statusSpan, prioSpan, inputData, inputRespon, descricao})
    })
    .then(response => {
        if (response.status === 200) {
            alert('Tarefa atualizada com sucesso')
            console.log('Tarefa atualizada com sucesso');
            
            window.location.href = "http://localhost/Front/pages/taskManager.html";
            // return response.json();
        } else {
            alert('Erro ao atualizar a tarefa');
            throw new Error('Erro ao atualizar a tarefa');
        }
    })
    .then(dados => {
        console.log(dados);
        console.log(inputTitle);
        console.log(statusSpan);
        console.log(prioSpan);
        console.log(inputRespon);
        console.log(inputData);
        console.log(descricao);
    })
}

function deleteTask(idUser, idTask) {
    if (confirm("Tem certeza de que deseja deletar esta tarefa?")) {
        fetch(`http://localhost:3000/user/${idUser}/tasks/${idTask}`, {
            method: "DELETE",
        })
        .then((response) => {
            if (response.status === 200) {
                alert("Tarefa deletada com sucesso!");
                // Aqui você pode recarregar a lista de tarefas
                console.log(`Tarefa ${idTask} deletada!`);

                window.location.href = "http://localhost/Front/pages/taskManager.html";
            } else if (response.status === 404) {
                alert("Tarefa não encontrada.");
            } else {
                alert("Erro ao deletar a tarefa.");
            }
            return response.json();
        })
        .catch((err) => {
            console.error("Erro na exclusão da tarefa:", err);
        });
    }
}

document.getElementById('addTaskAdicionar').addEventListener('click', () => {
    updateTask(idUser, idTask);
});

document.getElementById('addTaskDeletar').addEventListener('click', () => {
    deleteTask(idUser, idTask)
})

