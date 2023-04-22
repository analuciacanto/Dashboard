const express = require('express')
const { resolve } = require('path')
const path = require('path');
const app = express()

//Estáticos -> Roteamento dos Componentes
app.use('/',
  express.static(
    resolve(
      './build'
    )
  )
) 

 app.get('/*', (req, res) => {
  res.sendFile('index.js');
})

app.listen(process.env.PORT || 3000, (err) => {
  err ? console.log("err", err) : console.log("It works!")
});
