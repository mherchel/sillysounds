(function() {
  var keys = [];
  var sounds = [];

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

  function processData(data) {
    keys = data;

    // Create Drums HTML and audio objects.
    var drumsHTML = '';

    for (key in keys) {
      drumsHTML += '<div data-sound="' + keys[key]['wavFile'] + '" class="key key-' + keys[key]['letter'] + '">' +
          '<div class="key-letter">' + keys[key]['letter'] + '</div>' +
          '<label class="key-label">' + keys[key]['label'] + '</label>' +
          '</div>';

      var drumSoundFile = 'sounds/' + keys[key]['wavFile'] + '.wav';
      var isAudioLoaded;
      var soundKey = keys[key]['wavFile'];
      sounds[soundKey] = new Audio(drumSoundFile);
      sounds[soundKey].oncanplaythrough = isAudioLoaded; // Preload audio
    }

    document.querySelector('.keys-wrapper').innerHTML = drumsHTML;

    document.addEventListener('click', clickEvent);
    document.addEventListener('keydown', keydownEvent); // @todo move to keypress instead of keydown.
  }

  function clickEvent(e) {
    if (e.target.matches('.key, .key *')) {
      var drumElement = e.target.getAttribute('data-sound') ? e.target : e.target.parentNode;
      var sound = sounds[drumElement.getAttribute('data-sound')];
      playSound(sound, drumElement);
    }
  }

  function keydownEvent(e) {
    if (keys.hasOwnProperty(e.keyCode)) {
      var drumLetter = keys[e.keyCode]['letter'];
      var drumLabel = keys[e.keyCode]['label'];
      var wavFile = keys[e.keyCode]['wavFile'];
      var drumSound = sounds[wavFile];
      var drumElement = document.querySelector('.key-' + drumLetter);
      playSound(drumSound, drumElement);
    }

    // Log stuff to the console stuff
    keyLog = (typeof drumLetter !== 'undefined') ? drumLetter + ' ' + e.keyCode + ' ' + drumLabel : e.keyCode;
    console.info(keyLog);
  }

  // Play the sound and add CSS class to element
  function playSound(drumSound, drumElement) {
    drumSound.currentTime = 0;
    drumSound.play();
    drumElement.classList.add('js-active');

    window.setTimeout(function() {
      drumElement.classList.remove('js-active');
    }, 100);
  }

})();
