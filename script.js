// JavaScript Document

/////////////////////////////////////////////////////////////////
var zombieAnimationFrameId; // Use a more specific name to avoid potential conflicts

function zombie_move() {
  var zombieElement = document.getElementById("zombie_size");
  var startTime = null;
  var duration = 30000; // 30 seconds in milliseconds
  var height = 15;

  function increaseHeight(timestamp) {
    if (!startTime) {
      startTime = timestamp;
    }

    var elapsed = timestamp - startTime;
    var progress = elapsed / duration;

    if (progress < 1) {
      height = Math.min(50, 15 + progress * 35); // Adjusted to reach 50vmin in 30 seconds
      zombieElement.style.height = height + 'vmin';
      zombieAnimationFrameId = requestAnimationFrame(increaseHeight); // Use a specific variable
    }
  }

  zombieAnimationFrameId = requestAnimationFrame(increaseHeight);
}

document.addEventListener('DOMContentLoaded', function() {
  setTimeout(function() {
    zombie_move();
  }, 2000); // 2000 milliseconds (2 seconds)
});

function zombie_stop() {
  cancelAnimationFrame(zombieAnimationFrameId);
}

function zombie_fall() {
  var zombieElement = document.getElementById("zombie");
  var startTime = null;
  var duration = 2000; // Adjust the duration as needed
  var startPosition = parseFloat(zombieElement.style.top) || 44; // Initial top position in percentage
  var endPosition = 300; // Fall to the bottom of the screen

  function fall(timestamp) {
    if (!startTime) {
      startTime = timestamp;
    }

    var elapsed = timestamp - startTime;
    var progress = elapsed / duration;

    if (progress < 1) {
      var newPosition = startPosition + progress * (endPosition - startPosition);
      zombieElement.style.top = newPosition + '%';
      zombieAnimationFrameId = requestAnimationFrame(fall);
    }
  }

  zombieAnimationFrameId = requestAnimationFrame(fall);
}

function zombie_jump() {
  var zombieElement = document.getElementById("zombie_size");
  var startHeight = parseFloat(zombieElement.style.height) || 15; // Get current height or default to 15
  var startTime = null;
  var jumpDuration = 500; // 0.5 seconds in milliseconds
  var jumpHeight = 200; // Height to jump to

  function jump(timestamp) {
    if (!startTime) {
      startTime = timestamp;
    }

    var elapsed = timestamp - startTime;
    var progress = elapsed / jumpDuration;

    if (progress < 1) {
      var newHeight = startHeight + progress * (jumpHeight - startHeight);
      zombieElement.style.height = newHeight + 'vmin';
      requestAnimationFrame(jump);
    } else {
      // Add a fade-out animation
      zombieElement.style.transition = 'opacity 0.5s ease-out'; // Adjust the duration and timing function as needed
      zombieElement.style.opacity = '0';

      // Optionally, you can perform additional actions after the animation completes
      setTimeout(function () {
        zombieElement.style.display = 'none';
      }, 500); // 0.5 seconds, should match the transition duration
    }
  }

  requestAnimationFrame(jump);
}

function gun_fire() {
  var gunImage = document.querySelector(".gun_size");
  
    if (gunImage.src.endsWith("gun_hold.png")) {
      gunImage.src = "Image/gun_fire.png";
    } else {
      gunImage.src = "Image/gun_hold.png";
    }

    setTimeout(function() {
      gunImage.src = "Image/gun_hold.png";
    }, 1000);
}

function Correct_Answer() {
  zombie_stop();
  setTimeout(function() {
    gun_fire();
    setTimeout(function() {
      zombie_fall();
      // Redirect to another page after zombie_fall() is done
      setTimeout(function() {
        window.location.href = 'Stage2.html';
      }, 2000);
    }, 1500); // 2 second delay before calling zombie_fall
  }, 1000); // 1 second delay before calling gun_fire
}

function Wrong_Answer() {
  zombie_stop();
  setTimeout(function() {
    zombie_jump();
    // Redirect to another page after zombie_jump() is done
    setTimeout(function() {
      window.location.href = 'Gameover.html';
    }, 1000);
  }, 1500); // delay
}

setTimeout(Wrong_Answer, 35000);
