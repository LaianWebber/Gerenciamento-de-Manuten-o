const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

// Opções de conexão com o MySQL
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'bd_tasks'
});

const app = new express();
app.listen(3000, () => {
    console.log('Servidor iniciado.');
})

app.use(cors());
app.use(express.json());

// Rotas
// ---------------------------------
app.get("/", (req, res) => {

    connection.query("SELECT COUNT(*) users FROM users", (err, results) => {
        if (err) {
            res.send('MySQL Connection error');
        }

        res.send('MySQL Connection OK.');
    })
});

// -------------------------------------

app.get("/users/:username", (req, res) => {
    connection.query("SELECT id, passwrd FROM users WHERE username = ?", [req.params.username], (err, results) => {
        if (err) {
            res.send('MySQL Connection error');
        }

        // Retorna os resultados como JSON para o frontend
        res.json(results);
    });
});

// -------------------------------------
app.get("/user/:id", (req, res) => {
    connection.query("SELECT id, username, passwrd FROM users WHERE id = ?", [req.params.id], (err, results) => {
        if (err) {
            res.send('MySQL Connection error');
        }

        res.json(results);
    })
});
// -------------------------------------

app.get("/user/:id/tasks/", (req, res) => {
    connection.query("SELECT * FROM tasks WHERE id_user = ?", [req.params.id], (err, results) => {
        if (err) {
            res.send('MySQL Connection error');
            console.log('erro');
        }

        res.json(results);
    })
});
// -------------------------------------

// Nova rota para pegar informações de uma tarefa de um usuário específico
app.get("/user/:id/tasks/:taskId", (req, res) => {
    const userId = req.params.id;       // ID do usuário
    const taskId = req.params.taskId;   // ID da tarefa

    connection.query("SELECT * FROM tasks WHERE id_user = ? AND id = ?", [userId, taskId], (err, results) => {
            if (err) {
                res.send('MySQL Connection error');
                console.log('erro');
            }

            // Se não encontrar nenhuma tarefa com os IDs fornecidos
            if (results.length === 0) {
                return res.status(404).json({ message: "Tarefa não encontrada para este usuário" });
            }

            // Retorna os resultados como JSON para o frontend
            res.json(results[0]); // Retorna a tarefa encontrada (apenas um resultado)
        }
    );
});

// -------------------------------------
app.post("/user/:id/tasks/updateTask", (req, res) => {
    // console.log(req.body.idUser);
    // console.log(req.body.idTask);
    // console.log(req.body.inputTitle);
    // res.send('finalizado');

    connection.query("UPDATE tasks SET task_title = ?, task_status = ?, task_prior = ?, task_prazo = ?, task_respon = ?, task_text = ?, updated_at = NOW() WHERE id = ?", [req.body.inputTitle, req.body.statusSpan, req.body.prioSpan, req.body.inputData, req.body.inputRespon, req.body.descricao, req.body.idTask], (err, results) => {
        if (err) {
            res.send('MySQL Connection error');
            console.log('erro');
        }
    })
    
    res.json('ok');

})




