'use strict';

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

{
  var processData = function processData(data) {
    keys.push.apply(keys, _toConsumableArray(data));

    // Generate the markup.
    var drumsHTML = keys.map(function (key) {
      return '<button data-sound="' + key.audioFile + '" class="key">\n         <span class="key-letter">' + key.letter + '</span>\n         <label class="key-label">' + key.label + '</label>\n       </button>';
    }).join('');

    // Preload the audio files for quicker playback.
    keys.forEach(function (key) {
      var drumSoundFile = 'sounds/' + key.audioFile + '.mp3';
      var isAudioLoaded = '';
      var soundKey = key.audioFile;
      sounds[soundKey] = new Audio(drumSoundFile);
      sounds[soundKey].oncanplaythrough = isAudioLoaded;
    });

    document.querySelector('.keys-wrapper').innerHTML = drumsHTML;
  };

  // Play the sound and add temporary CSS class.


  var playSound = function playSound(drumSound, drumElement) {
    var sound = drumSound;
    sound.currentTime = 0;
    sound.play();
    drumElement.classList.add('js-active');

    setTimeout(function () {
      drumElement.classList.remove('js-active');
    }, 100);
  };

  var clickEvent = function clickEvent(e) {
    if (e.target.matches('.key, .key *')) {
      var drumElement = e.target.getAttribute('data-sound') ? e.target : e.target.parentNode;
      var sound = sounds[drumElement.getAttribute('data-sound')];
      playSound(sound, drumElement);
    }
  };

  var keydownEvent = function keydownEvent(e) {
    var drum = keys.filter(function (item) {
      return item.keycode === e.keyCode;
    })[0];
    if (drum === undefined) return;
    var audioFile = drum.audioFile;
    var drumSound = sounds[audioFile];
    var drumSelector = '.key[data-sound="' + audioFile + '"]';
    var drumElement = document.querySelector(drumSelector);
    playSound(drumSound, drumElement);
  };

  var keys = [];
  var sounds = [];

  fetch('sounds.json').then(function (response) {
    return response.json();
  }).then(function (data) {
    return processData(data);
  }).catch(function (err) {
    return console.error(err);
  });

  document.addEventListener('click', clickEvent);
  document.addEventListener('keydown', keydownEvent); // @todo move to keypress instead of keydown.
}
//# sourceMappingURL=_build.js.map
