/* ═══════════════════════════════════════════════════════
   LAS BANDURRIAS - Music Player
   Full-featured audio player with playlist
   ═══════════════════════════════════════════════════════ */

(function () {
  'use strict';

  // ─── Playlist Data ───
  var playlistData = [
    {
      title: 'Abril en Futrono',
      album: 'Las Bandurrias',
      year: '2024',
      duration: '4:15',
      durationSec: 255,
      cover: 'assets/images/albums/las-bandurrias.jpg',
      src: ''
    },
    {
      title: 'La Última Carta',
      album: 'Las Bandurrias',
      year: '2024',
      duration: '5:02',
      durationSec: 302,
      cover: 'assets/images/albums/las-bandurrias.jpg',
      src: ''
    },
    {
      title: 'Rossi',
      album: 'Las Bandurrias',
      year: '2024',
      duration: '3:48',
      durationSec: 228,
      cover: 'assets/images/albums/las-bandurrias.jpg',
      src: ''
    },
    {
      title: 'La Kantauria',
      album: 'Las Bandurrias',
      year: '2024',
      duration: '4:55',
      durationSec: 295,
      cover: 'assets/images/albums/las-bandurrias.jpg',
      src: ''
    }
  ];

  // ─── State ───
  var state = {
    currentIndex: -1,
    isPlaying: false,
    isShuffle: false,
    repeatMode: 0, // 0: off, 1: all, 2: one
    volume: 0.8,
    isMuted: false,
    currentTime: 0,
    duration: 0
  };

  // ─── DOM Elements ───
  var audio = document.getElementById('audio-element');
  var btnPlay = document.getElementById('btn-play');
  var btnPrev = document.getElementById('btn-prev');
  var btnNext = document.getElementById('btn-next');
  var btnShuffle = document.getElementById('btn-shuffle');
  var btnRepeat = document.getElementById('btn-repeat');
  var btnVolume = document.getElementById('btn-volume');
  var iconPlay = document.getElementById('icon-play');
  var iconPause = document.getElementById('icon-pause');
  var iconVolume = document.getElementById('icon-volume');
  var iconMuted = document.getElementById('icon-muted');
  var progressEl = document.getElementById('player-progress');
  var progressFill = document.getElementById('player-progress-fill');
  var progressHandle = document.getElementById('player-progress-handle');
  var currentTimeEl = document.getElementById('player-current-time');
  var durationEl = document.getElementById('player-duration');
  var trackNameEl = document.getElementById('player-track-name');
  var trackAlbumEl = document.getElementById('player-track-album');
  var trackYearEl = document.getElementById('player-track-year');
  var artworkInner = document.getElementById('player-artwork-inner');
  var playerEq = document.getElementById('player-eq');
  var playlistList = document.getElementById('playlist-list');
  var playlistCount = document.getElementById('playlist-count');
  var volumeSlider = document.getElementById('volume-slider');
  var volumeFill = document.getElementById('volume-fill');
  var volumeHandle = document.getElementById('volume-handle');

  // ─── Format Time ───
  function formatTime(seconds) {
    if (isNaN(seconds) || seconds === 0) return '0:00';
    var m = Math.floor(seconds / 60);
    var s = Math.floor(seconds % 60);
    return m + ':' + (s < 10 ? '0' : '') + s;
  }

  // ─── Render Playlist ───
  function renderPlaylist() {
    if (!playlistList) return;

    playlistList.innerHTML = '';
    playlistCount.textContent = playlistData.length + ' canciones';

    playlistData.forEach(function (track, index) {
      var item = document.createElement('div');
      item.className = 'playlist__item';
      item.setAttribute('role', 'listitem');
      item.setAttribute('tabindex', '0');
      item.setAttribute('aria-label', track.title + ' - ' + track.album);

      if (index === state.currentIndex) {
        item.classList.add('active');
        if (state.isPlaying) item.classList.add('playing');
      }

      item.innerHTML =
        '<div class="playlist__item-cover">' +
          '<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="3"/></svg>' +
        '</div>' +
        '<div class="playlist__item-info">' +
          '<p class="playlist__item-title">' + track.title + '</p>' +
          '<p class="playlist__item-album">' + track.album + ' · ' + track.year + '</p>' +
        '</div>' +
        '<span class="playlist__item-duration">' + track.duration + '</span>' +
        '<div class="playlist__item-eq">' +
          '<span></span><span></span><span></span>' +
        '</div>';

      item.addEventListener('click', function () {
        playTrack(index);
      });

      item.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          playTrack(index);
        }
      });

      playlistList.appendChild(item);
    });
  }

  // ─── Play Track ───
  function playTrack(index) {
    if (index < 0 || index >= playlistData.length) return;

    var track = playlistData[index];
    state.currentIndex = index;

    // Update UI
    trackNameEl.textContent = track.title;
    trackAlbumEl.textContent = track.album;
    trackYearEl.textContent = track.year;

    if (track.src) {
      audio.src = track.src;
      audio.load();
    }

    state.currentTime = 0;
    state.duration = track.durationSec;
    durationEl.textContent = track.duration;
    currentTimeEl.textContent = '0:00';
    progressFill.style.width = '0%';
    progressHandle.style.left = '0%';

    // Start playing
    if (track.src) {
      audio.play().then(function () {
        setPlayingState(true);
      }).catch(function () {
        setPlayingState(true);
      });
    } else {
      setPlayingState(true);
      simulatePlayback();
    }

    renderPlaylist();
  }

  // ─── Simulate Playback (no audio files) ───
  var simulationInterval = null;

  function simulatePlayback() {
    if (simulationInterval) clearInterval(simulationInterval);

    simulationInterval = setInterval(function () {
      if (!state.isPlaying) return;

      state.currentTime += 0.5;
      if (state.currentTime >= state.duration) {
        handleTrackEnd();
        return;
      }

      updateProgress();
    }, 500);
  }

  function updateProgress() {
    var pct = (state.currentTime / state.duration) * 100;
    progressFill.style.width = pct + '%';
    progressHandle.style.left = pct + '%';
    currentTimeEl.textContent = formatTime(state.currentTime);
  }

  // ─── Play / Pause ───
  function togglePlay() {
    if (state.currentIndex === -1) {
      playTrack(0);
      return;
    }

    if (state.isPlaying) {
      pause();
    } else {
      play();
    }
  }

  function play() {
    setPlayingState(true);
    if (audio.src && audio.src !== window.location.href) {
      audio.play().catch(function () {});
    } else {
      simulatePlayback();
    }
  }

  function pause() {
    setPlayingState(false);
    audio.pause();
  }

  function setPlayingState(playing) {
    state.isPlaying = playing;

    if (playing) {
      iconPlay.style.display = 'none';
      iconPause.style.display = 'block';
      btnPlay.setAttribute('aria-label', 'Pausar');
      btnPlay.setAttribute('title', 'Pausar');
      artworkInner.classList.add('playing');
      playerEq.classList.add('active');
    } else {
      iconPlay.style.display = 'block';
      iconPause.style.display = 'none';
      btnPlay.setAttribute('aria-label', 'Reproducir');
      btnPlay.setAttribute('title', 'Reproducir');
      artworkInner.classList.remove('playing');
      playerEq.classList.remove('active');
    }

    renderPlaylist();
  }

  // ─── Track End ───
  function handleTrackEnd() {
    if (state.repeatMode === 2) {
      // Repeat one
      state.currentTime = 0;
      play();
    } else if (state.repeatMode === 1) {
      // Repeat all
      nextTrack();
    } else {
      // No repeat
      if (state.currentIndex < playlistData.length - 1) {
        nextTrack();
      } else {
        pause();
        state.currentTime = 0;
        updateProgress();
      }
    }
  }

  // ─── Next / Prev ───
  function nextTrack() {
    var next;
    if (state.isShuffle) {
      next = Math.floor(Math.random() * playlistData.length);
      while (next === state.currentIndex && playlistData.length > 1) {
        next = Math.floor(Math.random() * playlistData.length);
      }
    } else {
      next = (state.currentIndex + 1) % playlistData.length;
    }
    playTrack(next);
  }

  function prevTrack() {
    if (state.currentTime > 3) {
      state.currentTime = 0;
      updateProgress();
      return;
    }
    var prev;
    if (state.isShuffle) {
      prev = Math.floor(Math.random() * playlistData.length);
    } else {
      prev = (state.currentIndex - 1 + playlistData.length) % playlistData.length;
    }
    playTrack(prev);
  }

  // ─── Shuffle ───
  function toggleShuffle() {
    state.isShuffle = !state.isShuffle;
    btnShuffle.classList.toggle('active', state.isShuffle);
  }

  // ─── Repeat ───
  function toggleRepeat() {
    state.repeatMode = (state.repeatMode + 1) % 3;
    btnRepeat.classList.toggle('active', state.repeatMode > 0);

    if (state.repeatMode === 2) {
      btnRepeat.style.position = 'relative';
      if (!btnRepeat.querySelector('.repeat-one-badge')) {
        var badge = document.createElement('span');
        badge.className = 'repeat-one-badge';
        badge.textContent = '1';
        badge.style.cssText = 'position:absolute;font-size:9px;font-weight:700;color:var(--color-gold);top:50%;left:50%;transform:translate(-50%,-50%);pointer-events:none;';
        btnRepeat.appendChild(badge);
      }
    } else {
      var badge = btnRepeat.querySelector('.repeat-one-badge');
      if (badge) badge.remove();
    }
  }

  // ─── Volume ───
  function setVolume(val) {
    state.volume = Math.max(0, Math.min(1, val));
    state.isMuted = false;
    audio.volume = state.volume;

    var pct = state.volume * 100;
    volumeFill.style.width = pct + '%';
    volumeHandle.style.left = pct + '%';

    iconVolume.style.display = 'block';
    iconMuted.style.display = 'none';
  }

  function toggleMute() {
    state.isMuted = !state.isMuted;
    if (state.isMuted) {
      audio.volume = 0;
      iconVolume.style.display = 'none';
      iconMuted.style.display = 'block';
    } else {
      audio.volume = state.volume;
      iconVolume.style.display = 'block';
      iconMuted.style.display = 'none';
    }
  }

  // ─── Progress Seek ───
  function seekProgress(e) {
    if (state.currentIndex === -1) return;
    var rect = progressEl.getBoundingClientRect();
    var pct = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    state.currentTime = pct * state.duration;
    updateProgress();
  }

  // ─── Volume Seek ───
  function seekVolume(e) {
    var rect = volumeSlider.getBoundingClientRect();
    var pct = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    setVolume(pct);
  }

  // ─── Event Listeners ───
  if (btnPlay) btnPlay.addEventListener('click', togglePlay);
  if (btnNext) btnNext.addEventListener('click', nextTrack);
  if (btnPrev) btnPrev.addEventListener('click', prevTrack);
  if (btnShuffle) btnShuffle.addEventListener('click', toggleShuffle);
  if (btnRepeat) btnRepeat.addEventListener('click', toggleRepeat);
  if (btnVolume) btnVolume.addEventListener('click', toggleMute);

  if (progressEl) {
    var isDraggingProgress = false;

    progressEl.addEventListener('mousedown', function (e) {
      isDraggingProgress = true;
      seekProgress(e);
    });

    document.addEventListener('mousemove', function (e) {
      if (isDraggingProgress) seekProgress(e);
    });

    document.addEventListener('mouseup', function () {
      isDraggingProgress = false;
    });

    // Touch
    progressEl.addEventListener('touchstart', function (e) {
      isDraggingProgress = true;
      seekProgress(e.touches[0]);
    }, { passive: true });

    document.addEventListener('touchmove', function (e) {
      if (isDraggingProgress) seekProgress(e.touches[0]);
    }, { passive: true });

    document.addEventListener('touchend', function () {
      isDraggingProgress = false;
    });
  }

  if (volumeSlider) {
    var isDraggingVolume = false;

    volumeSlider.addEventListener('mousedown', function (e) {
      isDraggingVolume = true;
      seekVolume(e);
    });

    document.addEventListener('mousemove', function (e) {
      if (isDraggingVolume) seekVolume(e);
    });

    document.addEventListener('mouseup', function () {
      isDraggingVolume = false;
    });
  }

  // ─── Keyboard Shortcuts ───
  document.addEventListener('keydown', function (e) {
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || e.target.tagName === 'SELECT') return;

    switch (e.key) {
      case ' ':
        e.preventDefault();
        togglePlay();
        break;
      case 'ArrowRight':
        if (e.ctrlKey || e.metaKey) {
          e.preventDefault();
          nextTrack();
        }
        break;
      case 'ArrowLeft':
        if (e.ctrlKey || e.metaKey) {
          e.preventDefault();
          prevTrack();
        }
        break;
      case 'ArrowUp':
        e.preventDefault();
        setVolume(state.volume + 0.05);
        break;
      case 'ArrowDown':
        e.preventDefault();
        setVolume(state.volume - 0.05);
        break;
    }
  });

  // ─── Audio Element Events ───
  if (audio) {
    audio.addEventListener('timeupdate', function () {
      if (audio.duration) {
        state.currentTime = audio.currentTime;
        state.duration = audio.duration;
        durationEl.textContent = formatTime(audio.duration);
        updateProgress();
      }
    });

    audio.addEventListener('ended', function () {
      handleTrackEnd();
    });

    audio.volume = state.volume;
  }

  // ─── Init ───
  document.addEventListener('DOMContentLoaded', function () {
    renderPlaylist();
    setVolume(state.volume);
  });

})();