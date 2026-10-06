const invitation = {
  // Replace this object with the client's approved names, dates, venues, and event details.
  couple: ['Aanya', 'Vihaan'],
  dates: '14–16 November 2026',
  city: 'Jaipur, Rajasthan',
  venue: 'The Garden Courtyard',
  rsvpBy: '1 November 2026',
  events: [
    {
      key: 'mehndi',
      label: 'The first gathering',
      title: 'Mehndi',
      body: 'An afternoon of henna, music, and the people we love.',
      date: 'Saturday, 14 November',
      time: '4:00 in the afternoon',
      venue: '{{venue}} · {{city}}',
      note: 'Dress: garden colours'
    },
    {
      key: 'sangeet',
      label: 'An evening together',
      title: 'Sangeet',
      body: 'Come ready for good music, dancing, and a little celebration.',
      date: 'Sunday, 15 November',
      time: '7:00 in the evening',
      venue: '{{venue}} · {{city}}',
      note: 'Dress: festive attire'
    },
    {
      key: 'ceremony',
      label: 'The wedding ceremony',
      title: 'The Wedding',
      body: 'Join us as we begin this next chapter, surrounded by family and friends.',
      date: 'Monday, 16 November',
      time: '5:00 in the evening',
      venue: '{{venue}} · {{city}}',
      note: 'Dinner and celebrations to follow'
    }
  ],
  pages: [
    {
      key: 'cover',
      image: 'assets/cover.webp',
      label: 'Together with our families',
      title: '{{couple}}',
      titleClass: 'names',
      body: 'invite you to celebrate their wedding',
      details: ['{{dates}}', '{{city}}'],
      button: 'Open invitation',
      interaction: {
        prompt: 'Touch the glowing blossom to open your invitation.',
        complete: 'The garden opens. Let the celebration begin.',
        action: 'bloom', x: 80, y: 61
      },
      botanicals: [
        { image: 'assets/jasmine-branch.webp', position: 'left', phase: 0.4 },
        { image: 'assets/leaf-spray.webp', position: 'right', phase: 2.3, flip: true }
      ]
    },
    {
      key: 'invitation',
      image: 'assets/invitation.webp',
      label: 'With full hearts',
      title: 'You are invited',
      body: 'Join us for a celebration of love, family, and all the moments that bring us together.',
      details: ['{{dates}}', '{{city}}'],
      note: 'We would be delighted to celebrate with you.',
      revealDetailsOnAction: true,
      interaction: {
        prompt: 'Tap the cranes to reveal when and where we’ll celebrate.',
        complete: '{{city}}, {{dates}}. We can’t wait to see you.',
        action: 'reveal', x: 78, y: 51
      },
      characters: [
        { image: 'assets/flying-cranes.webp', kind: 'cranes', position: 'flight', phase: 1.2 }
      ],
      botanicals: [
        { image: 'assets/blossom-branch.webp', position: 'right', phase: 1.1 },
        { image: 'assets/leaf-spray.webp', position: 'upper-left', phase: 3.4, flip: true }
      ]
    },
    {
      event: 'mehndi', image: 'assets/mehndi.webp',
      interaction: {
        prompt: 'Touch the flower to wake the garden and start the festivities.',
        complete: 'The garden is alive with celebration.',
        action: 'gather', x: 54, y: 68
      },
      botanicals: [
        { image: 'assets/jasmine-branch.webp', position: 'left', phase: 2.7 },
        { image: 'assets/blossom-branch.webp', position: 'upper-right', phase: 4.3, flip: true }
      ]
    },
    {
      event: 'sangeet', image: 'assets/sangeet.webp', tone: 'dark',
      interaction: {
        prompt: 'Tap the dancers to bring the music and movement to life.',
        complete: 'Let’s dance beneath the garden lights.',
        action: 'dance', x: 55, y: 72
      },
      characters: [
        { image: 'assets/dancing-couple.webp', kind: 'dancers', position: 'dance-floor', phase: 2.6 }
      ],
      botanicals: [
        { image: 'assets/blossom-branch.webp', position: 'left', phase: 1.8 },
        { image: 'assets/jasmine-branch.webp', position: 'upper-right', phase: 3.8, flip: true }
      ]
    },
    {
      event: 'ceremony', image: 'assets/ceremony.webp',
      interaction: {
        prompt: 'Touch the little flame to light the wedding mandap.',
        complete: 'A warm light for the beginning of a new chapter.',
        action: 'light', x: 73, y: 66
      },
      botanicals: [
        { image: 'assets/leaf-spray.webp', position: 'left', phase: 1.6 },
        { image: 'assets/blossom-branch.webp', position: 'right', phase: 3.1, flip: true }
      ]
    },
    {
      key: 'rsvp',
      image: 'assets/rsvp.webp',
      label: 'With love,',
      title: 'Please join us',
      titleClass: 'compact',
      body: 'Your presence is the greatest gift. We can’t wait to celebrate together.',
      details: ['{{dates}}', '{{venue}} · {{city}}', 'Kindly reply by {{rsvpBy}}'],
      revealDetailsOnAction: true,
      interaction: {
        prompt: 'Tap the flower one last time to send your good wishes.',
        complete: 'We’ll save you a place in the garden. See you soon!',
        action: 'farewell', x: 54, y: 67
      },
      botanicals: [
        { image: 'assets/jasmine-branch.webp', position: 'right', phase: 1.3, flip: true },
        { image: 'assets/blossom-branch.webp', position: 'left', phase: 3.6 }
      ]
    }
  ]
};

const viewport = document.querySelector('#viewport');
const inviteFrame = document.querySelector('.invite');
const ambient = document.querySelector('.stage__ambient');
const dots = document.querySelector('#dots');
const previous = document.querySelector('#previous');
const next = document.querySelector('#next');
const count = document.querySelector('#count');
const petalLayer = document.querySelector('#petals');
const musicButton = document.querySelector('#music-toggle');
const musicLabel = document.querySelector('#music-label');
const motionSetting = window.matchMedia('(prefers-reduced-motion: reduce)');
const curtainIntro = document.querySelector('#curtain-intro');
const openCurtainButton = document.querySelector('#open-curtain');
const curtainVideo = document.querySelector('#curtain-video');
let current = 0;
let unlockedMax = 0;
let touchStart = null;
let transitionTimer;
let guideTimer;
let actionTimer;
let windFrame = 0;
let audioContext;
let musicGain;
let musicOn = false;
let userMutedMusic = false;
let melodyTimer;
let chordTimer;
let melodyIndex = 0;
let droneOscillators = [];
let curtainOpened = false;
let curtainFinishTimer;

const eventByKey = Object.fromEntries(invitation.events.map((event) => [event.key, event]));
const coupleTitle = invitation.couple.join(' & ');
document.title = `${coupleTitle} — Wedding Invitation`;
document.querySelector('meta[name="description"]').content = `A garden wedding invitation for ${coupleTitle}.`;
inviteFrame.setAttribute('aria-label', `${coupleTitle}'s wedding invitation`);

function escapeText(value) {
  return String(value).replace(/[&<>"']/g, (character) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  })[character]);
}

function plainCopy(value) {
  return String(value).replace(/\{\{(\w+)\}\}/g, (_match, key) => {
    const data = invitation[key];
    return Array.isArray(data) ? data.join(' & ') : String(data ?? '');
  });
}

function copy(value) { return escapeText(plainCopy(value)); }

function pageContent(page) {
  if (page.event) return eventByKey[page.event];
  return page;
}

function botanicalMarkup(items = []) {
  return items.map((item) => `
    <span class="botanical botanical--${escapeText(item.position)}" data-wind data-phase="${Number(item.phase) || 0}">
      <img class="botanical__image${item.flip ? ' botanical__image--flip' : ''}" src="${escapeText(item.image)}" alt="" draggable="false" />
    </span>`).join('');
}

function detailKind(line) {
  const text = line.toLowerCase();
  if (/\b(mon|tue|wed|thu|fri|sat|sun|january|february|march|april|may|june|july|august|september|october|november|december|\d{1,2}–\d{1,2})\b/.test(text)) return 'date';
  if (/\b(\d{1,2}:\d{2}|morning|afternoon|evening|noon)\b/.test(text)) return 'time';
  if (/jaipur|rajasthan|courtyard|venue|garden/i.test(text)) return 'place';
  return 'detail';
}

function detailIcon(kind) {
  if (kind === 'date') return '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3.5" y="5.5" width="17" height="15" rx="2"/><path d="M7.5 3.5v4m9-4v4M4 9.5h16"/></svg>';
  if (kind === 'time') return '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="8.5"/><path d="M12 7v5l3.5 2"/></svg>';
  if (kind === 'place') return '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M19 10c0 5-7 11-7 11S5 15 5 10a7 7 0 1 1 14 0Z"/><circle cx="12" cy="10" r="2.2"/></svg>';
  return '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m12 3 1.6 6.4L20 11l-6.4 1.6L12 19l-1.6-6.4L4 11l6.4-1.6L12 3Z"/></svg>';
}

function characterMarkup(items = []) {
  return items.map((item) => `
    <span class="living-figure living-figure--${escapeText(item.position)}" data-life="${escapeText(item.kind)}" data-phase="${Number(item.phase) || 0}">
      <img src="${escapeText(item.image)}" alt="" draggable="false" />
    </span>`).join('');
}

function glimmerMarkup() {
  return Array.from({ length: 12 }, (_item, index) => {
    const left = 8 + ((index * 31) % 84);
    const top = 42 + ((index * 19) % 47);
    const delay = -((index * 0.83) % 8);
    const duration = 6 + (index % 5) * 0.9;
    return `<i class="garden-glimmer" style="left:${left}%;top:${top}%;animation-delay:${delay}s;animation-duration:${duration}s"></i>`;
  }).join('');
}

function guideMarkup(interaction) {
  if (!interaction) return '';
  const steps = invitation.pages.map((_page, index) => `<i${index === current ? ' class="is-current"' : ''}></i>`).join('');
  return `
    <div class="story-guide" role="status" aria-live="polite">
      <span class="story-guide__step">A little story · ${String(current + 1).padStart(2, '0')} / ${String(invitation.pages.length).padStart(2, '0')}</span>
      <p data-guide-message>${copy(interaction.prompt)}</p>
      <span class="story-guide__progress" aria-hidden="true">${steps}</span>
    </div>
    <button class="guided-target" type="button" data-guided-action disabled aria-label="${copy(interaction.prompt)}" style="--target-x:${Number(interaction.x)}%;--target-y:${Number(interaction.y)}%"><span aria-hidden="true"></span></button>`;
}

function syncNavigation() {
  previous.disabled = current === 0;
  next.disabled = current >= unlockedMax || current === invitation.pages.length - 1;
  count.textContent = `${String(current + 1).padStart(2, '0')} / ${String(invitation.pages.length).padStart(2, '0')}`;
  [...dots.children].forEach((dot, dotIndex) => {
    dot.disabled = dotIndex > unlockedMax;
    if (dotIndex === current) dot.setAttribute('aria-current', 'step');
    else dot.removeAttribute('aria-current');
  });
}

function render(index, animate = true) {
  current = Math.max(0, Math.min(index, invitation.pages.length - 1));
  const previousScene = viewport.querySelector('.scene:not(.scene--leaving)');
  clearTimeout(transitionTimer);
  clearTimeout(guideTimer);
  clearTimeout(actionTimer);
  const page = invitation.pages[current];
  const content = pageContent(page);
  const interaction = page.interaction;
  const isDark = page.tone === 'dark';
  const classes = ['scene', `scene--${page.key || page.event}`];
  if (page.tone) classes.push(`scene--${page.tone}`);
  if (animate) classes.push('scene--entering');

  const details = content.details || [content.date, content.time, content.venue].filter(Boolean);
  const detailMarkup = details.length
    ? `<p class="scene__details${page.revealDetailsOnAction ? ' is-concealed' : ''}">${details.map((line, index) => {
      const kind = detailKind(line);
      return `<span class="scene__detail scene__detail--${kind}" style="--detail-index:${index}"><span class="scene__detail-icon">${detailIcon(kind)}</span>${copy(line)}</span>`;
    }).join('')}</p>`
    : '';
  const noteMarkup = content.note ? `<p class="scene__note">${copy(content.note)}</p>` : '';
  const buttonMarkup = content.button
    ? `<button class="scene__button" type="button" data-open-invitation>${copy(content.button)}</button>`
    : '';
  const titleClass = content.titleClass ? ` scene__title--${escapeText(content.titleClass)}` : '';

  const sceneMarkup = `
      <article class="${classes.join(' ')}" aria-label="Page ${current + 1} of ${invitation.pages.length}: ${copy(content.title)}">
      <div class="scene__art"><img src="${escapeText(page.image)}" alt="" draggable="false" /></div>
      <div class="scene__wash" aria-hidden="true"></div>
      <div class="garden-glimmers" aria-hidden="true">${glimmerMarkup()}</div>
      ${botanicalMarkup(page.botanicals)}
      ${characterMarkup(page.characters)}
      <div class="scene__copy">
        <p class="scene__eyebrow">${copy(content.label || '')}</p>
        <h1 class="scene__title${titleClass}">${copy(content.title)}</h1>
        <span class="scene__divider" aria-hidden="true"></span>
        ${content.body ? `<p class="scene__body">${copy(content.body)}</p>` : ''}
        ${detailMarkup}${noteMarkup}${buttonMarkup}
      </div>
      ${animate ? '<div class="petal-burst" aria-hidden="true"><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span></div>' : ''}
      ${guideMarkup(interaction)}
      <p class="story-finish" aria-live="polite">${interaction ? copy(interaction.complete) : ''}</p>
    </article>`;

  if (animate && previousScene) {
    previousScene.classList.add('scene--leaving');
    viewport.insertAdjacentHTML('beforeend', sceneMarkup);
  } else {
    viewport.innerHTML = sceneMarkup;
  }
  const activeScene = viewport.querySelector('.scene:not(.scene--leaving)');

  inviteFrame.classList.toggle('invite--dark', isDark);
  ambient.style.setProperty('--ambient-image', `url("${page.image}")`);
  syncNavigation();

  if (animate) {
    transitionTimer = setTimeout(() => {
      viewport.querySelectorAll('.scene--leaving').forEach((scene) => scene.remove());
      activeScene?.classList.remove('scene--entering');
    }, motionSetting.matches ? 40 : 980);
  }

  animateWind();

  const openButton = activeScene?.querySelector('[data-open-invitation]');
  openButton?.addEventListener('click', (event) => {
    event.stopPropagation();
    triggerInteraction(event);
  });
  activeScene?.querySelector('[data-guided-action]')?.addEventListener('click', triggerInteraction);

  if (interaction) {
    const guideDelay = motionSetting.matches ? 250 : 1450;
    guideTimer = setTimeout(() => {
      if (current === index && (index !== 0 || curtainIntro.hidden)) {
        activeScene?.classList.add('is-guiding');
        activeScene?.querySelector('[data-guided-action]')?.removeAttribute('disabled');
      }
    }, guideDelay);
  }
}

function goTo(index) {
  if (index < 0 || index >= invitation.pages.length || index === current || index > unlockedMax) return;
  if (!userMutedMusic) startMusic();
  render(index);
}

function triggerInteraction(event) {
  event.stopPropagation();
  const page = invitation.pages[current];
  const interaction = page.interaction;
  const scene = viewport.querySelector('.scene');
  if (!interaction || !scene || scene.classList.contains('has-acted')) return;

  scene.classList.remove('is-guiding');
  scene.classList.add('has-acted', `scene--action-${interaction.action}`);
  const target = scene.querySelector('[data-guided-action]');
  if (target) target.disabled = true;
  const message = scene.querySelector('[data-guide-message]');
  if (message) message.textContent = plainCopy(interaction.complete);

  if (interaction.action === 'reveal' || interaction.action === 'farewell') {
    scene.querySelector('.scene__details')?.classList.remove('is-concealed');
  }
  scatterPetals(event, interaction.action === 'dance' ? 28 : 20);
  if (!userMutedMusic) startMusic();

  actionTimer = setTimeout(() => {
    if (current !== invitation.pages.indexOf(page)) return;
    if (current < invitation.pages.length - 1) {
      unlockedMax = Math.max(unlockedMax, current + 1);
      render(current + 1);
    } else {
      scene.classList.add('is-complete');
      const finish = scene.querySelector('.story-finish');
      if (finish) finish.textContent = `See you in ${invitation.city}, ${invitation.dates}.`;
      scatterPetals(null, 44);
    }
  }, motionSetting.matches ? 420 : interaction.action === 'reveal' ? 2300 : 1850);
}

function animateWind() {
  cancelAnimationFrame(windFrame);
  const branches = [...viewport.querySelectorAll('[data-wind], [data-life]')];
  if (!branches.length || motionSetting.matches) {
    branches.forEach((branch) => { branch.style.transform = ''; });
    return;
  }

  function sway(time) {
    if (!branches.some((branch) => branch.isConnected)) return;
    if (!document.hidden) {
      const scene = viewport.querySelector('.scene');
      const actionBoost = scene?.classList.contains('has-acted') ? 1.9 : 1;
      branches.forEach((branch) => {
        const phase = Number(branch.dataset.phase) || 0;
        const motion = branch.dataset.life;
        if (motion) {
          const dance = motion === 'dancers';
          const flight = motion === 'cranes';
          const rhythm = time * (dance ? 0.0028 : 0.0011) + phase;
          const isActive = (scene?.classList.contains('scene--action-dance') && dance)
            || (scene?.classList.contains('scene--action-reveal') && flight);
          const vertical = dance ? Math.abs(Math.sin(rhythm)) * (isActive ? 9 : 5) : Math.sin(rhythm) * (isActive ? 5 : 3.5);
          const lateral = Math.sin(time * (flight ? 0.00055 : 0.0009) + phase) * (flight ? (isActive ? 24 : 14) : 2.5);
          const rotation = Math.sin(rhythm) * (dance ? (isActive ? 6 : 3.5) : 2.1);
          branch.style.transform = `translate3d(${lateral}px, ${vertical}px, 0) rotate(${rotation}deg)`;
          return;
        }
        const breeze = 0.68 + Math.sin(time * 0.00025 + phase) * 0.24;
        const rotation = (Math.sin(time * 0.00105 + phase) * 1.65 + Math.sin(time * 0.00042 + phase * 1.7) * 0.7) * breeze * actionBoost;
        const driftX = Math.sin(time * 0.00068 + phase) * 1.8 * actionBoost;
        const driftY = Math.cos(time * 0.00049 + phase) * 1.2 * actionBoost;
        branch.style.transform = `translate3d(${driftX}px, ${driftY}px, 0) rotate(${rotation}deg)`;
      });
    }
    windFrame = requestAnimationFrame(sway);
  }

  windFrame = requestAnimationFrame(sway);
}

motionSetting.addEventListener?.('change', () => {
  if (motionSetting.matches) {
    cancelAnimationFrame(windFrame);
    viewport.querySelectorAll('[data-wind], [data-life]').forEach((branch) => { branch.style.transform = ''; });
  } else animateWind();
});

function scatterPetals(event, requestedAmount) {
  const rect = inviteFrame.getBoundingClientRect();
  const originX = event?.clientX ? event.clientX - rect.left : rect.width * 0.5;
  const originY = event?.clientY ? event.clientY - rect.top : rect.height * 0.38;
  const reduced = motionSetting.matches;
  const amount = reduced ? Math.min(7, requestedAmount || 5) : (requestedAmount || 24);

  for (let index = 0; index < amount; index += 1) {
    const petal = document.createElement('span');
    const duration = reduced ? 750 : 3000 + Math.random() * 2100;
    const delay = Math.random() * 380;
    petal.className = `falling-petal falling-petal--${index % 5}`;
    petal.style.left = `${originX + (Math.random() - 0.5) * 38}px`;
    petal.style.top = `${originY + (Math.random() - 0.5) * 24}px`;
    petal.style.setProperty('--drift-x', `${(Math.random() - 0.5) * 190}px`);
    petal.style.setProperty('--fall-y', `${Math.max(90, rect.height - originY + Math.random() * 220)}px`);
    petal.style.setProperty('--spin', `${(Math.random() - 0.5) * 900}deg`);
    petal.style.animationDuration = `${duration}ms`;
    petal.style.animationDelay = `${delay}ms`;
    petalLayer.append(petal);
    if (petalLayer.childElementCount > 96) petalLayer.firstElementChild?.remove();
    window.setTimeout(() => petal.remove(), duration + delay + 120);
  }
}

const melody = [587.33, 698.46, 783.99, 880, 783.99, 698.46, 523.25, 659.25, 783.99, 1046.5, 880, 698.46];
const chordProgression = [
  [146.83, 220, 293.66],
  [130.81, 196, 261.63],
  [116.54, 174.61, 233.08],
  [130.81, 196, 261.63]
];

function playBell(frequency) {
  if (!audioContext || audioContext.state !== 'running') return;
  const now = audioContext.currentTime;
  const oscillator = audioContext.createOscillator();
  const envelope = audioContext.createGain();
  const tone = audioContext.createBiquadFilter();
  oscillator.type = 'sine';
  oscillator.frequency.setValueAtTime(frequency, now);
  tone.type = 'lowpass';
  tone.frequency.setValueAtTime(2800, now);
  envelope.gain.setValueAtTime(0.0001, now);
  envelope.gain.exponentialRampToValueAtTime(0.075, now + 0.035);
  envelope.gain.exponentialRampToValueAtTime(0.0001, now + 2.8);
  oscillator.connect(tone);
  tone.connect(envelope);
  envelope.connect(musicGain);
  oscillator.start(now);
  oscillator.stop(now + 2.9);
}

function beginMusicLoop() {
  if (!audioContext || melodyTimer) return;
  const playNextNote = () => {
    playBell(melody[melodyIndex % melody.length]);
    melodyIndex += 1;
  };
  playNextNote();
  melodyTimer = window.setInterval(playNextNote, 3400);

  let chordIndex = 0;
  const changeChord = () => {
    const chord = chordProgression[chordIndex % chordProgression.length];
    droneOscillators.forEach((oscillator, index) => oscillator.frequency.setTargetAtTime(chord[index], audioContext.currentTime, 2.2));
    chordIndex += 1;
  };
  changeChord();
  chordTimer = window.setInterval(changeChord, 14000);
}

async function startMusic() {
  if (!window.AudioContext && !window.webkitAudioContext) {
    musicLabel.textContent = 'No audio';
    musicButton.setAttribute('aria-label', 'Background music is not supported by this browser');
    return;
  }
  if (!audioContext) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    audioContext = new AudioContextClass();
    musicGain = audioContext.createGain();
    musicGain.gain.value = 0;
    musicGain.connect(audioContext.destination);
    const echo = audioContext.createDelay(1.5);
    const feedback = audioContext.createGain();
    const echoLevel = audioContext.createGain();
    echo.delayTime.value = 0.72;
    feedback.gain.value = 0.16;
    echoLevel.gain.value = 0.12;
    musicGain.connect(echo);
    echo.connect(feedback);
    feedback.connect(echo);
    echo.connect(echoLevel);
    echoLevel.connect(audioContext.destination);
    const frequencies = chordProgression[0];
    const levels = [0.16, 0.09, 0.035];
    droneOscillators = frequencies.map((frequency, index) => {
      const oscillator = audioContext.createOscillator();
      const layer = audioContext.createGain();
      oscillator.type = index === 2 ? 'triangle' : 'sine';
      oscillator.frequency.value = frequency;
      layer.gain.value = levels[index];
      oscillator.connect(layer);
      layer.connect(musicGain);
      oscillator.start();
      return oscillator;
    });
    beginMusicLoop();
  }
  try {
    await audioContext.resume();
    musicGain.gain.setTargetAtTime(0.62, audioContext.currentTime, 1.25);
    musicOn = true;
    musicButton.classList.add('is-playing');
    musicButton.setAttribute('aria-pressed', 'true');
    musicButton.setAttribute('aria-label', 'Turn off background music');
    musicLabel.textContent = 'Music on';
  } catch (_error) {
    musicLabel.textContent = 'Tap for music';
  }
}

function stopMusic() {
  userMutedMusic = true;
  if (audioContext && musicGain) musicGain.gain.setTargetAtTime(0.0001, audioContext.currentTime, 0.25);
  musicOn = false;
  musicButton.classList.remove('is-playing');
  musicButton.setAttribute('aria-pressed', 'false');
  musicButton.setAttribute('aria-label', 'Turn on background music');
  musicLabel.textContent = 'Music off';
}

musicButton.addEventListener('click', (event) => {
  event.stopPropagation();
  scatterPetals(event);
  if (musicOn) stopMusic();
  else {
    userMutedMusic = false;
    startMusic();
  }
});

inviteFrame.addEventListener('click', (event) => {
  scatterPetals(event);
  if (!userMutedMusic) startMusic();
});

function makeNavigation() {
  invitation.pages.forEach((page, index) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'controls__dot';
    button.setAttribute('aria-label', `Go to page ${index + 1}: ${plainCopy(pageContent(page).title)}`);
    button.addEventListener('click', () => goTo(index));
    dots.append(button);
  });
}

previous.addEventListener('click', () => goTo(current - 1));
next.addEventListener('click', () => goTo(current + 1));

function revealCoverAfterCurtain() {
  clearTimeout(curtainFinishTimer);
  curtainIntro.hidden = true;
  const scene = viewport.querySelector('.scene:not(.scene--leaving)');
  if (!scene || scene.classList.contains('is-guiding')) return;
  guideTimer = setTimeout(() => {
    if (current !== 0 || !curtainIntro.hidden) return;
    scene.classList.add('is-guiding');
    scene.querySelector('[data-guided-action]')?.removeAttribute('disabled');
  }, motionSetting.matches ? 0 : 620);
}

openCurtainButton.addEventListener('click', () => {
  if (curtainOpened) return;
  curtainOpened = true;
  curtainIntro.classList.add('curtain-intro--opening');
  scatterPetals(null, 24);
  if (!userMutedMusic) startMusic();
  if (motionSetting.matches) {
    revealCoverAfterCurtain();
    return;
  }
  curtainVideo.addEventListener('ended', revealCoverAfterCurtain, { once: true });
  curtainVideo.play().then(() => {
    curtainIntro.classList.add('curtain-intro--playing');
  }).catch(() => {
    curtainIntro.classList.add('curtain-intro--fallback');
    curtainFinishTimer = window.setTimeout(revealCoverAfterCurtain, motionSetting.matches ? 80 : 1650);
  });
});

document.addEventListener('keydown', (event) => {
  if (event.altKey || event.ctrlKey || event.metaKey || event.defaultPrevented) return;
  if (event.target.closest?.('button, a, input, textarea, select, [contenteditable="true"]')) return;
  if (event.key === 'ArrowLeft') {
    event.preventDefault();
    goTo(current - 1);
  }
  if (event.key === 'ArrowRight') {
    event.preventDefault();
    goTo(current + 1);
  }
});

viewport.addEventListener('pointerdown', (event) => {
  if (event.pointerType === 'mouse') return;
  touchStart = { x: event.clientX, y: event.clientY };
});

viewport.addEventListener('pointerup', (event) => {
  if (!touchStart) return;
  const deltaX = event.clientX - touchStart.x;
  const deltaY = event.clientY - touchStart.y;
  touchStart = null;
  if (Math.abs(deltaX) > 42 && Math.abs(deltaX) > Math.abs(deltaY) * 1.2) {
    goTo(current + (deltaX < 0 ? 1 : -1));
  }
});

viewport.addEventListener('pointercancel', () => { touchStart = null; });

makeNavigation();
render(0, false);

// Decode the remaining illustrations before guests reach them.
invitation.pages.slice(1).forEach((page) => {
  const image = new Image();
  image.src = page.image;
});
