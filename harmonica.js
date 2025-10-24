$(document).ready(function() {
  // Define notes for each of the 12 holes
 const harmonicaNotes = {
  1: { blow: "C", draw: "D" },
  2: { blow: "E", draw: "F" },
  3: { blow: "G", draw: "A" },
  4: { blow: "C", draw: "B" },
  5: { blow: "E", draw: "G" },
  6: { blow: "A", draw: "B" },
  7: { blow: "C", draw: "D" },
  8: { blow: "E", draw: "F" },
  9: { blow: "G", draw: "A" },
  10: { blow: "C", draw: "B" },
  11: { blow: "E", draw: "F" },
  12: { blow: "G", draw: "A" }
};


  // Load or simulate sounds (place your real MP3 files in /sounds/)
  const sounds = {};
  Object.values(harmonicaNotes).forEach(({ blow, draw }) => {
    sounds[blow] = new Audio(`sounds/${blow}.mp3`);
    sounds[draw] = new Audio(`sounds/${draw}.mp3`);
  });

  function playSound(note) {
    if (sounds[note]) {
      sounds[note].currentTime = 0;
      sounds[note].play();
    } else {
      console.log(`Note: ${note}`);
    }
  }

  // Left click = Blow
  $(".hole").on("click", function() {
    const holeNum = $(this).data("hole");
    const note = harmonicaNotes[holeNum].blow;
    $(this).addClass("active-blow");
    playSound(note);
    setTimeout(() => $(this).removeClass("active-blow"), 200);
  });

  // Right click = Draw
  $(".hole").on("contextmenu", function(e) {
    e.preventDefault();
    const holeNum = $(this).data("hole");
    const note = harmonicaNotes[holeNum].draw;
    $(this).addClass("active-draw");
    playSound(note);
    setTimeout(() => $(this).removeClass("active-draw"), 200);
  });

  // Keyboard control
  $(document).on("keydown", function(e) {
    const key = e.key.toUpperCase();
    $(".hole").each(function() {
      if ($(this).data("key") === key) {
        const holeNum = $(this).data("hole");
        const note = e.shiftKey
          ? harmonicaNotes[holeNum].draw
          : harmonicaNotes[holeNum].blow;
        $(this).addClass(e.shiftKey ? "active-draw" : "active-blow");
        playSound(note);
        setTimeout(() => $(this).removeClass("active-draw active-blow"), 200);
      }
    });
  });
});
