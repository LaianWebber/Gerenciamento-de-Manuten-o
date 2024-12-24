const express = require('express');
const mysql = require('mysql');

// Opções de conexão com o MySQL

const app = new express();
app.listen(3000, () => {
    console.log('Servidor iniciado.');
})

// Rotas
app.get("/", (req, res) => {
    res.send('Ola Mundo!');
});

