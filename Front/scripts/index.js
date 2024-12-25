
let id = localStorage.getItem('idUser');

window.onload = () => {
    getUserName(id);
    getUserTask(id);
}

export function getUserName(id) {
    fetch(`http://localhost:3000/user/${id}`)
        .then(response => {
            if (response.status === 200) {
                console.log(response.json());
                console.log(id);

            } else {
                console.log('nok');
            }
        })
}

// ----------------------------
export function getUserTask(id) {
    fetch(`http://localhost:3000/user/${id}/tasks`)
        .then(response => {
            if (response.status === 200) {
                return response.json();

            } else {
                console.log('nok');
            }
        })
        .then(tarefas => {
            if (tarefas.length === 0) {
                document.querySelector('#tableTasks').style.display = 'none';
            } else {
                console.log(tarefas);

                tarefas.forEach(tarefa => {
                    let htmlTask = `<tr>
                                    <td class="tarefas">📺<a href="#">${tarefa.task_title}</a></td>
                                    <td class="status"> <span class="fazer">${tarefa.task_status}</span></td>
                                    <td class="responsavel"><a href="#">${tarefa.task_respon}</a></td>
                                    <td class="prazo"><span>${tarefa.task_prazo}</span></td>
                                    <td class="prioridade"><span class="alta">${tarefa.task_prior}</span></td>
                                    <td class="descricao">${tarefa.task_text}}</td>
                                </tr>`;

                
                    document.querySelector('#tasks').innerHTML += htmlTask;
                });
            }
        })
}