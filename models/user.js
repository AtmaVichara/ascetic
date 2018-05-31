const environment     = process.env.NODE_ENV || 'development';
const configuration   = require('../knexfile')[environment];
const database        = require('knex')(configuration);
const bcrypt          = require('bcrypt')
const crypto          = require('crypto')

class User {

  static signUp(req, res, next) {
    const user = req.body

    return this.hashPassword(user.password)
      .then((hashedPassword) => {
        delete user.password
        delete user.action
        user.password_digest = hashedPassword
      })
      .then(() => this.createToken())
      .then((token) => user.token = token)
      .then(() => this.create(user))
      .then((user) => {
        delete user.password_digest
        req.session.user = user;
        res.status(200).redirect('/dashboard')
      })
      .catch((error) => console.error({error}))
  }

  static logIn(req, res, next) {
    const userReq = req.body
    let user

    return this.findByUsername(userReq)
      .then((foundUser) => {
        user = foundUser
        return this.checkPassword(userReq.password, foundUser)
      })
      .then((res) => this.createToken())
      .then(token => this.updateToken(user, token))
      .then(() => {
        delete user.password_digest
        req.session.user = user;
        res.status(200).redirect('/dashboard')
      })
      .catch((error) => console.error({error}))
  }

  static hashPassword(password) {
    return new Promise((resolve, reject) => {
      bcrypt.hash(password, 10, (err, hash) => {
        err ? reject(err) : resolve(hash)
      })
    })
  }

  static createToken() {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, data) => {
        err ? reject(err) : resolve(data.toString('base64'))
      })
    })
  }

  static updateToken(user, newToken) {
    return database("users")
      .where('id', user.id)
      .update('token', newToken)
      .returning("*")
  }

  static checkPassword(password, foundUser) {
    return new Promise((resolve, reject) => {
      bcrypt.compare(password, foundUser.password_digest, (err, response) => {
        if (err) {
          reject(err)
        } else if (response) {
          resolve(response)
        } else {
          reject(new Error('Passwords do not match!'))
        }
      })
    })
  }

  static create(user) {
    return database("users")
      .insert(user)
      .returning('*')
  }

  static findByUsername(user) {
    return database("users")
      .where('username', user.username)
      .then((user) => user[0])
  }

}

module.exports = User
