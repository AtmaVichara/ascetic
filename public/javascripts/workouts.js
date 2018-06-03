$(document).ready(() => {
  $("button").click((event) => {
    var workoutInfo = $(event.currentTarget).attr("id")
    var sets = $(`input#${workoutInfo}-sets`).val()
    var reps = $(`input#${workoutInfo}-reps`).val()
    let exerciseId = workoutInfo.split("-")[1]
    let workoutId = workoutInfo.split("-")[3]
    updateSetsReps(sets, reps, workoutId, exerciseId)
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
      alert("Reps and Sets Were Not Saved")
    }
  })
  .catch((error) => console.error({error}))
  
}
