$(document).ready(() => {
  $('#workoutHeader').on('click', () => {
    $('.exerciseShow').toggle(() => {
      $(this).show('fast', 'swing');
    })
    event.preventDefault();
  })
})
