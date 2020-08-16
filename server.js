const express = require('express')
const { fetchAll, fetchOne } = require('./pool')

const PORT = 4000

const server = express()

server.use(express.json())

server.all('/*', function(request, response, next) {
  response.header('Access-Control-Allow-Origin', '*')
  response.header('Access-Control-Allow-Headers', '*')
  response.header('Access-Control-Allow-Methods', '*')
  next()
})

const users = [
  { user_id: 1, username: 'ndn', name: 'Norqobulova Dilbar', },
  { user_id: 2, username: 'roseprincess', name: 'Norqobulova Ziyoda', },
]

server.get('/messages', async (req, res) => {
  const messages = await fetchAll(`SELECT * FROM messages`)
  res.send(messages)
})

server.post('/messages', async (req, res) => {

  const user_id = req.body.user_id
  const body = req.body.body

  const newMessage = await fetchOne(
    `
      INSERT INTO messages (user_id, body)
      VALUES ($1, $2)
      RETURNING message_id, user_id, body
    `,

    user_id, body
  )

  if (newMessage) {
    res.send(newMessage)
  }
  else {
    res.status(503).end('Error')
  }
})

server.listen(PORT, () => console.log(PORT))