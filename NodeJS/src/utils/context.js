// PLUGINS IMPORTS //
const { PubSub } = require("apollo-server")
const jwt = require("jsonwebtoken")
const secret = "catpack"

// COMPONENTS IMPORTS //
const { models } = require("../db")
const db = require("../db")

/////////////////////////////////////////////////////////////////////////////

const pubsub = new PubSub()
const context = async (req, connection) => {
  let token
  if (req && req.headers.authorization) {
    token = req.headers.authorization
  } else if (connection && connection.context.Authorization) {
    token = connection.context.Authorization
  }

  if (token) {
    let user = await getUserFromToken(token)
    return { pubsub, user, ...db }
  } else {
    return {}
  }
}

const createToken = ({ id, role }) => jwt.sign({ id, role }, secret)

const getUserFromToken = (token) => {
  try {
    const user = jwt.verify(token, secret)
    return models.User.findOne({ id: user.id })
  } catch (e) {
    return null
  }
}

module.exports = { context, createToken, getUserFromToken }
