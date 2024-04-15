const express = require("express")
const uuid = require("uuid")
const port = 3000
const app = express() // comando pra faciliar o acesso ao express //
app.use(express.json()) // avisar que a informação vai chegar em json //

// ROTA QUERY PARAMS//
// app.get("/users", (request, response) => {
// const {name, age} = request.query
// return response.json({name, age})
// })

// ROTA ROUTE PARAMS//
// app.get("/users/:id", (request, response) => {

// const { id } = request.params

// console.log(id)

// return response.json({id})
// })

// // ROTA BODY PARAMS//
// app.get("/users", (request, response) => {

// const { name, age, adress } = request.body

// return response.json({name, age})
// })

const users = []

//MIDDLEWARE//
const checkUserId = (request, response, next) => {
  const { id } = request.params //informar o id na URL//
  
  //   //variável pra encontrar o usuário dentro do arrey
  //   //o nome index é opcional, vai dizer em qual posição do arrey que está o usuário procurado//
  // // ele vai olhar todos os id e ver se existe algum ID igual o ID mencionado na URL (ROTA)//
  const index = users.findIndex(user => user.id === id)

  //quando não acha o valor retornado vai ser -1: avisar quando não encontrou nada//
  if (index < 0) {
    return response.status(404).json({ Error: "User not found" })
  }
  request.userIndex = index
  request.userId= id

  next ()
}

app.get("/users", (request, response) => {
  return response.json(users)
})

app.post("/users", (request, response) => {
  const { name, age } = request.body

  const user = { id: uuid.v4(), name, age }

  users.push(user)

  return response.status(201).json(users)
})

app.put("/users/:id", checkUserId, (request, response) => {
  const { name, age } = request.body //infos que quer atualizar//
  const index = request.userIndex
const id = request.userId

  const updateUser = { id, name, age } //usuário atualizado//

    // const index = users.findIndex(user => user.id === id)//

  // atualizar informações do usuário na posição do arrey que foi encontrado o usuário//
  users[index] = updateUser

  //vai retornar já o usuário atualizado//
  return response.json(updateUser)
})

app.delete("/users/:id", checkUserId, (request, response) => {
  const index = request.userIndex

  //como deletar um usuário do array//
  users.splice(index, 1)

  return response.status(204).json()
})










// // // PORTA //
app.listen(port, () => {
  console.log(`🚀 Server started on port ${port}`)
})