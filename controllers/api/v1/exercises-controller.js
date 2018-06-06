const Exercise = require('../../../models/exercise')

class ExercisesController {

  static index(req, res, next) {
    return Exercise.all()
      .then((exercises) => {
        res.json(exercises)
      })
      .catch(error => console.error({error}))
  }

  static async show(req, res, next) {
    let exercise = await Exercise.find(req.params.id)
    if (exercise === undefined) {
      res.sendStatus(404)
    } else {
      res.json(exercise)
    }
  }

}

module.exports = ExercisesController
