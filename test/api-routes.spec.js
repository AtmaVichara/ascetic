const environment = process.env.NODE_ENV || 'test'
const configuration = require('../knexfile')[environment]
const database = require('knex')(configuration)
const expect = require('chai').expect;
const app = require('../app');
const chai = require('chai')
const should = chai.should();
const chaiHttp = require('chai-http');

chai.use(chaiHttp);

describe('API Routes', () => {
  before((done) => {
    database.migrate.latest()
    .then(() => done())
    .catch((error) => {
      throw error;
    })
    .done();
  })

  beforeEach((done) => {
    database.seed.run()
      .then(() => done())
      .catch((error) => {
        throw error;
      })
      .done()
  })


  describe("GET /api/v1/exercises", () => {
    it("should return all exercises", () => {
      return chai.request(app)
        .get("/api/v1/exercises")
        .then((response) => {
          response.should.have.status(200)
          response.body.should.have.lengthOf(142)
          response.body[0].name.should.eq('ab crunch machine')
        })
      })

    })

  describe("GET /api/v1/exercises/:id", () => {
    it("should return exercise by id", () => {
      return chai.request(app)
        .get("/api/v1/exercises/1")
        .then((response) => {
          response.should.have.status(200)
          response.body.name.should.eq('ab crunch machine')
        })
      })

    it("should return 404 for exercise not found", () => {
      return chai.request(app)
        .get("/api/v1/exercises/232")
        .then((response) => {
          response.should.have.status(404)
        })
      })

    })

})
