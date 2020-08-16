const { fetchOne, fetchAll } = require('./pool')

const SQL1 = `SELECT now()`

const MESSAGES = `SELECT * FROM messages`

;(async () => {

  console.log( await fetchAll(MESSAGES))

})()