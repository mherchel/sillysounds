{
  const keys = [];
  const sounds = [];

  function processData(data) {
    keys.push(...data);

    // Generate the markup.
    const drumsHTML = keys.map(key =>
      `<button data-sound="${key.audioFile}" class="key">
         <span class="key-letter">${key.letter}</span>
         <label class="key-label">${key.label}</label>
       </button>`,
    ).join('');

    // Preload the audio files for quicker playback.
    keys.forEach((key) => {
      const drumSoundFile = `sounds/${key.audioFile}.mp3`;
      const isAudioLoaded = '';
      const soundKey = key.audioFile;
      sounds[soundKey] = new Audio(drumSoundFile);
      sounds[soundKey].oncanplaythrough = isAudioLoaded;
    });

    document.querySelector('.keys-wrapper').innerHTML = drumsHTML;
  }

  // Play the sound and add temporary CSS class.
  function playSound(drumSound, drumElement) {
    const sound = drumSound;
    sound.currentTime = 0;
    sound.play();
    drumElement.classList.add('js-active');

    setTimeout(() => {
      drumElement.classList.remove('js-active');
    }, 100);
  }

  function clickEvent(e) {
    if (e.target.matches('.key, .key *')) {
      const drumElement = e.target.getAttribute('data-sound') ? e.target : e.target.parentNode;
      const sound = sounds[drumElement.getAttribute('data-sound')];
      playSound(sound, drumElement);
    }
  }

  function keydownEvent(e) {
    const drum = keys.find(item => (item.keycode === e.keyCode));
    if (drum === undefined) return;
    const audioFile = drum.audioFile;
    const drumSound = sounds[audioFile];
    const drumSelector = `.key[data-sound="${audioFile}"]`;
    const drumElement = document.querySelector(drumSelector);
    playSound(drumSound, drumElement);
  }

  fetch('sounds.json')
    .then(response => response.json())
    .then(data => processData(data))
    .catch(err => console.error(err));

  document.addEventListener('click', clickEvent);
  document.addEventListener('keydown', keydownEvent); // @todo move to keypress instead of keydown.
}
