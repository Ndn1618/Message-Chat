const { Pool } = require('pg')

const pool = new Pool ({
  host: 'localhost',
  user: 'postgres',
  password: '1618',
  database: 'dilbar',
  port: 5432,
})

async function fetchOne (SQL, ...params) {

  const client = await pool.connect()

  try {
    const { rows: [row] } = await client.query(SQL, params.length ? params : null)
    return row
  }
  finally {
    client.release()
  }
}

async function fetchAll (SQL, ...params) {

  const client = await pool.connect()

  try {
    const { rows } = await client.query(SQL, params.length ? params : null)
    return rows
  }
  finally {
    client.release()
  }
}

module.exports.fetchOne = fetchOne
module.exports.fetchAll = fetchAll