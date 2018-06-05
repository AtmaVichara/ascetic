$(document).ready(() => {
  $(".categoryHeader").on("click", (event) => {
    let currentHeader = event.currentTarget
    $(currentHeader).nextUntil('ul').toggle(() => {
      $(this).show('fast')
    })
  })
})
