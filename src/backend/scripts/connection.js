const { Client } = require('pg')

const { database } = require('../connection.json')

const client = new Client({
    user: database.login,
    host: database.address,
    database: 'rss_hook',
    password: database.password,
    port: database.port,
  })

client.connect()

module.exports = { client }