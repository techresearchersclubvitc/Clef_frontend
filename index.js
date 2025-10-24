// Smooth navigation to feature pages
function navigateToFeature(page) {
  window.location.href = page;
}

$(document).ready(function() {
  $("body").css("display", "none").fadeIn(400);

  $(".feature-card").on("click", function() {
    let targetPage = $(this).data("page");
    $("body").fadeOut(400, function() {
      window.location.href = targetPage;
    });
  });
});
