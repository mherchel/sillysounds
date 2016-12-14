(function() {

  var keys = {
    65: {
      letter: "a",
      label: "a",
      wavFile: "a"
    },
    83: {
      letter: "s",
      label: "socks",
      wavFile: "socks"
    },
    68: {
      letter: "d",
      label: "Daddy",
      wavFile: "daddy"
    },
    78: {
      letter: "n",
      label: "And",
      wavFile: "and"
    },
    80: {
      letter: "p",
      label: "Pee",
      wavFile: "pee"
    },
    66: {
      letter: "b",
      label: "Stinky",
      wavFile: "stinky"
    },
    81: {
      letter: "q",
      label: "Butt",
      wavFile: "butt"
    },
    79: {
      letter: "o",
      label: "Poop",
      wavFile: "poop"
    },
    73: {
      letter:"i",
      label: "Is",
      wavFile: "is"
    }
  };

  // Loop through the object and add drum html
  var drumsHTML = '';
  for (key in keys) {
    drumsHTML += '<div class="key key-' + keys[key]['letter'] + '">' +
        '<div class="key-letter">' + keys[key]['letter'] + '</div>' +
        '<label class="key-label">' + keys[key]['label'] + '</label>' +
        '</div>';
  }
  document.querySelector('.keys-wrapper').innerHTML = drumsHTML;

  // Loop through again to add click event listeners for each drum element
  for (key in keys) {
    var drumSelector = document.querySelector('.key-' + keys[key]['letter']);
    var drumSoundFile = 'sounds/' + keys[key]['wavFile'] + '.wav';

    drumSelector.onclick = (function(drumSoundFile, drumSelector) {
      return function() {
        playSound(drumSoundFile, drumSelector);
      }
    })(drumSoundFile, drumSelector);
  }

  // Handle keypress events
  document.onkeydown = function(e) {
    if (keys.hasOwnProperty(e.keyCode)) {
      var drumLetter = keys[e.keyCode]['letter'];
      var drumLabel = keys[e.keyCode]['label'];
      var drumSoundFile = 'sounds/' + keys[e.keyCode]['wavFile'] + '.wav';
      var drumSelector = document.querySelector('.key-' + drumLetter);
      playSound(drumSoundFile, drumSelector);
    }

    keyLog = (typeof drumLetter !== 'undefined') ? drumLetter + ' ' + e.keyCode + ' ' + drumLabel : e.keyCode;
    console.log(keyLog);
  }

  // Play the sound and add CSS class to element
  function playSound(drumSoundFile, drumSelector) {
    var drumSound = new Audio(drumSoundFile);
    drumSound.play();
    drumSelector.classList.add('js-active');

    window.setTimeout(function() {
      drumSelector.classList.remove('js-active');
    }, 100);
  }
})();
