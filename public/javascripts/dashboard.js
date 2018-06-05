$(document).ready(() => {
  $(".workoutHeader").on("click", (event) => {
    $(event.currentTarget).nextUntil('ul').toggle(() => {
      $(this).show('fast')
    })
  })
  $('input').on("change", (event) => {
    var workoutInfo = $(event.currentTarget).attr("id")
    var weight = $(event.currentTarget).val()
    let exerciseId = workoutInfo.split("-")[1]
    let workoutId = workoutInfo.split("-")[3]
    updateWeights(weight, workoutId, exerciseId)
  })
})


const updateWeights = (exWeight, workoutId, exerciseId) => {
  fetch(`/workouts/${workoutId}/exercises/${exerciseId}`, {
    body: JSON.stringify({weight: exWeight}),
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'PATCH'
  })
  .then((response) => response.json())
  .then((response) => {
    if (response.hasOwnProperty("error")){
      alert(response.error)
    }
  })
  .catch((error) => console.error({error}))
}
