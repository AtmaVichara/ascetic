$(document).ready(() => {
  $(".categoryHeader").on("click", (event) => {
    let currentHeader = event.currentTarget
    $(currentHeader).nextUntil().toggle(() => {
      $(this).show('fast')
    })
  })
})
