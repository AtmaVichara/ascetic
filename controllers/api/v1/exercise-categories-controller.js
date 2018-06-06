const ExerciseCategory = require('../../../models/exercise-category')

class ExerciseCategoriesController {

  static index(req, res, next) {
    return ExerciseCategory.allWithExercises()
      .then((exerciseCategories) => {
        res.json(exerciseCategories)
      })
      .catch(error => console.error({error}))
  }

  static async show(req, res, next) {
    let exerciseCategory = await ExerciseCategory.find(req.params.id)
    if (exerciseCategory === undefined) {
      res.sendStatus(404)
    } else {
      res.json(exerciseCategory)
    }
  }

}

module.exports = ExerciseCategoriesController
