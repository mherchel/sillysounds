(function() {

// Get JSON data
fetch('sounds.json')
  .then(function(response) {
    return response.json();
  })
  .then(function(data) {
    processData(data);
  })
  .catch(function(err) {
    console.error(err);
  });

  function processData(keys) {
    // Loop through the object and add drum html
    var drumsHTML = '';
    for (key in keys) {
      drumsHTML += '<div class="key key-' + keys[key]['letter'] + '">' +
          '<div class="key-letter">' + keys[key]['letter'] + '</div>' +
          '<label class="key-label">' + keys[key]['label'] + '</label>' +
          '</div>';
    }
    document.querySelector('.keys-wrapper').innerHTML = drumsHTML;

    // Sounds array to hold audio objects
    sounds = [];

    // Loop through again to create audio object and add click event listeners for each drum element
    for (key in keys) {
      var drumSelector = document.querySelector('.key-' + keys[key]['letter']);
      var drumSoundFile = 'sounds/' + keys[key]['wavFile'] + '.wav';
      var isAudioLoaded;

      // Create audio objects in sounds array
      soundKey = keys[key]['wavFile'];
      sounds[soundKey] = new Audio(drumSoundFile);
      sounds[soundKey].oncanplaythrough = isAudioLoaded; // Preload audio

      drumSelector.onclick = (function(drumSound, drumSelector) {
        return function() {
          playSound(drumSound, drumSelector);
        }
      })(sounds[soundKey], drumSelector);
    }

    // Handle keypress events
    document.onkeydown = function(e) {
      if (keys.hasOwnProperty(e.keyCode)) {
        var drumLetter = keys[e.keyCode]['letter'];
        var drumLabel = keys[e.keyCode]['label'];
        var wavFile = keys[e.keyCode]['wavFile'];
        var drumSound = sounds[wavFile];
        var drumSelector = document.querySelector('.key-' + drumLetter);
        playSound(drumSound, drumSelector);
      }

      keyLog = (typeof drumLetter !== 'undefined') ? drumLetter + ' ' + e.keyCode + ' ' + drumLabel : e.keyCode;
      console.log(keyLog);
    }

    // Play the sound and add CSS class to element
    function playSound(drumSound, drumSelector) {
      drumSound.currentTime = 0;
      drumSound.play();
      drumSelector.classList.add('js-active');

      window.setTimeout(function() {
        drumSelector.classList.remove('js-active');
      }, 100);
    }
  }
})();
