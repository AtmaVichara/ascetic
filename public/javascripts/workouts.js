$(document).ready(() => {
  $(".workoutHeader").on("click", (event) => {
    $(event.currentTarget).nextUntil('ul').toggle(() => {
      $(this).show('fast')
    })
  })
  $("button").click((event) => {
    var workoutInfo = $(event.currentTarget).attr("id")
    var sets = $(`input#${workoutInfo}-sets`).val()
    var reps = $(`input#${workoutInfo}-reps`).val()
    let exerciseId = workoutInfo.split("-")[1]
    let workoutId = workoutInfo.split("-")[3]
    updateSetsReps(sets, reps, workoutId, exerciseId)
  })

  $(".remove").on("click", (event) => {
    var workoutId = $(event.currentTarget).attr("id")
    deleteWorkout(workoutId)
  })
})


const updateSetsReps = (exSets, exReps, workoutId, exerciseId) => {

  fetch(`/workouts/${workoutId}/exercises/${exerciseId}`, {
    body: JSON.stringify({
      sets: exSets,
      reps: exReps,
    }),
    headers:{
      'Content-Type': 'application/json'
    },
    method: "PATCH"
  })
  .then((response) => response.json())
  .then((response) => {
    if (response.hasOwnProperty("success")) {
      alert(response.success)
    } else if (response.hasOwnProperty("error")){
      alert(response.error)
    } else {
      alert("Error Occured With Update")
    }
  })
  .catch((error) => console.error({error}))

}

const deleteWorkout = (workoutId) => {
  fetch(`/workouts/${workoutId}`, {
    headers:{
      'Content-Type': 'application/json'
    },
    method: "DELETE"
  })
  .then((response) => response.json())
  .then((response) => {
    if (response.hasOwnProperty("success")) {
      $(`#workout-${workoutId}`).remove()
    } else if (response.hasOwnProperty("error")) {
      alert(response.error)
    } else {
      alert("Something wrong with deleting the workout.")
    }
  })
  .catch((error) => console.error({error}))
}
