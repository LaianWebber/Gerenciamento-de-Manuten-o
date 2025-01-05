let idUser = localStorage.getItem('idUser');

window.onload = function() {
    const idTask = localStorage.getItem('taskId');
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