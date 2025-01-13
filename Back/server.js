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

// ---------------------------------
app.get("/tasks", (req, res) => {
    connection.query("SELECT * from tasks", (err, results) => {
        if (err) {
            res.send('MySQL Connection error');
        }
        res.json(results);
        
    })
});

// -------------------------------------

app.get("/users/:username", (req, res) => {
    connection.query("SELECT id, passwrd, nivel FROM users WHERE username = ?", [req.params.username], (err, results) => {
        if (err) {
            res.send('MySQL Connection error');
        }

        
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
    // const userId = req.params.id;       // ID do usuário
    const taskId = req.params.taskId;   // ID da tarefa

    connection.query("SELECT * FROM tasks WHERE id = ?", [ taskId ], (err, results) => {
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
app.post("/tasks/updateTask", (req, res) => {
    // console.log(req.body.idUser);
    // console.log(req.body.idTask);
    // console.log(req.body.inputTitle);
    // res.send('finalizado');

    connection.query("UPDATE tasks SET task_title = ?, task_status = ?, task_prior = ?, task_prazo = ?, task_respon = ?, task_text = ?, updated_at = NOW() WHERE id = ?", 
        [req.body.inputTitle, req.body.statusSpan, req.body.prioSpan, req.body.inputData, req.body.inputRespon, req.body.descricao, req.body.idTask], (err, results) => {
        if (err) {
            res.send('MySQL Connection error');
            console.log('erro');
        }
    })
    
    res.json('ok');
})

// -------------------------------------
app.post("/user/:id/tasks/createTask", (req, res) => {
    const { idUser, inputTitle, statusSpan, prioSpan, inputData, inputRespon, descricao } = req.body;

    // Comando SQL para inserir uma nova linha na tabela 'tasks'
    connection.query("INSERT INTO tasks (id_user, task_title, task_status, task_prior, task_prazo, task_respon, task_text, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, NOW(), NOW())",
        [idUser, inputTitle, statusSpan, prioSpan, inputData, inputRespon, descricao],
        (err, results) => {
            if (err) {
                console.error('MySQL Connection error:', err);
                res.status(500).send('MySQL Connection error');
            } else {
                res.json({ message: 'Task criada com sucesso!', taskId: results.insertId });
            }
        }
    );
});

// -------------------------------------
app.delete("/user/:id/tasks/:taskId", (req, res) => {
    const { taskId } = req.params;

    connection.query("DELETE FROM tasks WHERE id = ?", [taskId], (err, results) => {
        if (err) {
            console.error("Erro ao deletar a tarefa:", err);
            res.status(500).send("Erro ao deletar a tarefa.");
        } else if (results.affectedRows === 0) { // O affectedRows é uma propriedade do objeto results retornado pelo método query do MySQL em Node.js. Ele indica o número de linhas que foram afetadas por uma consulta SQL no banco de dados. Essa propriedade é útil para verificar o impacto de comandos como UPDATE, DELETE, ou INSERT.
            res.status(404).send("Tarefa não encontrada.");
        } else {
            res.json({ message: "Tarefa deletada com sucesso!" });
        }
    });
});





