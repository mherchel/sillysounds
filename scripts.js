{
  const keys = {};
  const sounds = [];

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
    let drumsHTML = '';
    Object.assign(keys, data);

    for (key in keys) {
      drumsHTML += `
        <button data-sound="${keys[key]['audioFile']}" class="key">
          <span class="key-letter">${keys[key]['letter']}</span>
          <label class="key-label">${keys[key]['label']}</label>
        </button>`;

      // Preload the audio files for quicker playback.
      const drumSoundFile = 'sounds/' + keys[key]['audioFile'] + '.mp3';
      const isAudioLoaded = '';
      const soundKey = keys[key]['audioFile'];
      sounds[soundKey] = new Audio(drumSoundFile);
      sounds[soundKey].oncanplaythrough = isAudioLoaded;
    }

    document.querySelector('.keys-wrapper').innerHTML = drumsHTML;
  }

  function clickEvent(e) {
    if (e.target.matches('.key, .key *')) {
      const drumElement = e.target.getAttribute('data-sound') ? e.target : e.target.parentNode;
      const sound = sounds[drumElement.getAttribute('data-sound')];
      playSound(sound, drumElement);
    }
  }

  function keydownEvent(e) {
    if (keys.hasOwnProperty(e.keyCode)) {
      const audioFile = keys[e.keyCode]['audioFile'];
      const drumSound = sounds[audioFile];
      const drumElement = document.querySelector('.key[data-sound="' + audioFile + '"]');
      playSound(drumSound, drumElement);
    }
  }

  // Play the sound and add CSS class to element
  function playSound(drumSound, drumElement) {
    drumSound.currentTime = 0;
    drumSound.play();
    drumElement.classList.add('js-active');

    setTimeout(function() {
      drumElement.classList.remove('js-active');
    }, 100);
  }

  document.addEventListener('click', clickEvent);
  document.addEventListener('keydown', keydownEvent); // @todo move to keypress instead of keydown.
}
