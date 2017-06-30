(function() {
  var keys = [];
  var sounds = [];

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
    var drumsHTML = '';
    keys = data;

    for (key in keys) {
      drumsHTML += '<button data-sound="' + keys[key]['audioFile'] + '" class="key">' +
          '<span class="key-letter">' + keys[key]['letter'] + '</span>' +
          '<label class="key-label">' + keys[key]['label'] + '</label>' +
          '</button>';

      // Preload the audio files for quicker playback.
      var drumSoundFile = 'sounds/' + keys[key]['audioFile'] + '.mp3';
      var isAudioLoaded;
      var soundKey = keys[key]['audioFile'];
      sounds[soundKey] = new Audio(drumSoundFile);
      sounds[soundKey].oncanplaythrough = isAudioLoaded;
    }

    document.querySelector('.keys-wrapper').innerHTML = drumsHTML;
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
      var audioFile = keys[e.keyCode]['audioFile'];
      var drumSound = sounds[audioFile];
      var drumElement = document.querySelector('.key[data-sound="' + audioFile + '"]');
      playSound(drumSound, drumElement);
    }
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

  document.addEventListener('click', clickEvent);
  document.addEventListener('keydown', keydownEvent); // @todo move to keypress instead of keydown.
})();
