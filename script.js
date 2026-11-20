
// ==========================================================================
// THEME ĐÀ LẠT - NÚI MỜ SƯƠNG, ĐỒI THÔNG & CÀ PHÊ SÁNG
// Script Tương Tác: Chuyển màn hình, Đổi video thước phim, Lightbox, Điều ước
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
  // DOM Elements
  const coverScreen = document.getElementById('coverScreen');
  const mainScreen = document.getElementById('mainScreen');
  const openMainBtn = document.getElementById('openMainBtn');
  const backToCoverBtn = document.getElementById('backToCoverBtn');

  // Video Reel Elements
  const tapeButtons = document.querySelectorAll('.tape-tab-btn');
  const birthdayVideo = document.getElementById('birthdayVideo');
  const cinemaFilmTitle = document.getElementById('cinemaFilmTitle');

  // Lightbox Elements
  const lightboxModal = document.getElementById('lightboxModal');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxCaption = document.getElementById('lightboxCaption');
  const lightboxCloseBtn = document.getElementById('lightboxCloseBtn');
  const lightboxBackdrop = document.getElementById('lightboxBackdrop');
  const photoCards = document.querySelectorAll('.moodboard-card, .polaroid-card');

  // Wish Elements
  const makeWishBtn = document.getElementById('makeWishBtn');
  const wishResult = document.getElementById('wishResult');

  // ==========================================================================
  // 1. CHUYỂN MÀN HÌNH (COVER -> MAIN & BACK)
  // ==========================================================================
  openMainBtn.addEventListener('click', () => {
    coverScreen.classList.add('fade-out');
    mainScreen.classList.remove('hidden');

    initMistyMountainParticles();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // Chỉ gắn sự kiện nếu nút quay lại tồn tại trong HTML.
  if (backToCoverBtn) {
    backToCoverBtn.addEventListener('click', () => {
      coverScreen.classList.remove('fade-out');
      initCoverParticles();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ==========================================================================
  // 2. CHUYỂN ĐỔI THƯỚC PHIM KỶ NIỆM
  // ==========================================================================
  tapeButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      tapeButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const newSrc = btn.getAttribute('data-src');
      const newPoster = btn.getAttribute('data-poster');
      const newTitle = btn.getAttribute('data-title');

      if (birthdayVideo && newSrc) {
        birthdayVideo.pause();

        const sourceEl = birthdayVideo.querySelector('source');
        if (sourceEl) {
          sourceEl.src = newSrc;
        }

        birthdayVideo.src = newSrc;

        if (newPoster) {
          birthdayVideo.poster = newPoster;
        }

        birthdayVideo.load();
        birthdayVideo.play().catch(err => {
          console.log('Video play was prevented or waiting for interaction:', err);
        });
      }

      if (cinemaFilmTitle && newTitle) {
        cinemaFilmTitle.textContent = `${newTitle} • TAM_ANH_MEMORIES.MP4`;
      }
    });
  });

  // ==========================================================================
  // 3. LIGHTBOX XEM ẢNH KỶ NIỆM
  // ==========================================================================
  photoCards.forEach(card => {
    card.addEventListener('click', () => {
      const img = card.querySelector('img');
      const captionEl = card.querySelector('.moodboard-caption, .polaroid-caption');
      const captionText = card.getAttribute('data-caption') || (captionEl ? captionEl.textContent : '');

      if (img) {
        lightboxImg.src = img.src;

        if (captionText) {
          lightboxCaption.textContent = captionText;
          lightboxCaption.style.display = 'block';
        } else {
          lightboxCaption.textContent = '';
          lightboxCaption.style.display = 'none';
        }

        lightboxModal.classList.remove('hidden');
      }
    });
  });

  function closeLightbox() {
    lightboxModal.classList.add('hidden');
  }

  lightboxCloseBtn.addEventListener('click', closeLightbox);
  lightboxBackdrop.addEventListener('click', closeLightbox);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !lightboxModal.classList.contains('hidden')) {
      closeLightbox();
    }
  });

  // ==========================================================================
  // 4. LỜI CHÚC SINH NHẬT & HIỆU ỨNG ẢNH RƠI
  // ==========================================================================
  makeWishBtn.addEventListener('click', () => {
    wishResult.textContent = '🙏 Namaste 🙏 Điều ước sắp thành hiện thực ròi! ✨';
    wishResult.classList.remove('hidden');

    // Tung hiệu ứng lấp lánh
    triggerMistyBurstParticles();

    // Cho ảnh hah.jpg rơi từ phía trên xuống.
    const fallingImage = document.createElement('img');
    fallingImage.src = 'images/hah.jpg';
    fallingImage.alt = 'Surprise!';
    fallingImage.className = 'falling-surprise-image';

    // Xóa ảnh sau khi hiệu ứng kết thúc.
    fallingImage.addEventListener('animationend', () => {
      fallingImage.remove();
    }, { once: true });

    // Báo lỗi nếu không tìm thấy ảnh.
    fallingImage.addEventListener('error', () => {
      console.error('Không tìm thấy hah.jpg. Hãy kiểm tra đường dẫn ảnh.');
      fallingImage.remove();
    }, { once: true });

    document.body.appendChild(fallingImage);

    makeWishBtn.textContent = '🕯️ Ước thêm điii ✨';
  });

  // ==========================================================================
  // 5. HIỆU ỨNG CANVAS: SƯƠNG MỜ & BỤI THÔNG
  // ==========================================================================
  const canvas = document.getElementById('ambientCanvas');
  const ctx = canvas.getContext('2d');

  let width, height;
  let particles = [];

  function resizeCanvas() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }

  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();

  class AmbientParticle {
    constructor(type = 'light') {
      this.type = type;
      this.reset();
    }

    reset() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;

      if (this.type === 'mist') {
        this.size = Math.random() * 28 + 12;
        this.speedX = Math.random() * 0.4 + 0.1;
        this.speedY = (Math.random() - 0.5) * 0.15;
        this.alpha = Math.random() * 0.12 + 0.05;
        this.color = '220, 238, 248';
      } else {
        this.size = Math.random() * 2.5 + 0.8;
        this.speedX = (Math.random() - 0.5) * 0.3;
        this.speedY = -(Math.random() * 0.5 + 0.2);
        this.alpha = Math.random() * 0.6 + 0.2;
        this.fadeSpeed = (Math.random() * 0.008 + 0.003) * (Math.random() > 0.5 ? 1 : -1);
        this.color = Math.random() > 0.4 ? '235, 175, 110' : '255, 235, 160';
      }
    }

    update() {
      this.x += this.speedX;
      this.y += this.speedY;

      if (this.type === 'light') {
        this.alpha += this.fadeSpeed;

        if (this.alpha > 0.8 || this.alpha < 0.15) {
          this.fadeSpeed = -this.fadeSpeed;
        }
      }

      if (this.x > width + 40) this.x = -40;
      if (this.x < -40) this.x = width + 40;
      if (this.y < -30) this.y = height + 30;
      if (this.y > height + 30) this.y = -30;
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${this.color}, ${Math.max(0, this.alpha)})`;

      if (this.type === 'light') {
        ctx.shadowBlur = 6;
        ctx.shadowColor = `rgba(${this.color}, 0.6)`;
      } else {
        ctx.shadowBlur = 0;
      }

      ctx.fill();
      ctx.shadowBlur = 0;
    }
  }

  function initMistyMountainParticles() {
    particles = [];

    const MIST_COUNT = 15;
    const LIGHT_COUNT = 30;

    for (let i = 0; i < MIST_COUNT; i++) {
      particles.push(new AmbientParticle('mist'));
    }

    for (let i = 0; i < LIGHT_COUNT; i++) {
      particles.push(new AmbientParticle('light'));
    }
  }

  function initCoverParticles() {
    particles = [];

    for (let i = 0; i < 30; i++) {
      const p = new AmbientParticle('light');
      p.speedY = -(Math.random() * 0.6 + 0.2);
      particles.push(p);
    }
  }

  initCoverParticles();

  function animate() {
    ctx.clearRect(0, 0, width, height);

    for (let p of particles) {
      p.update();
      p.draw();
    }

    requestAnimationFrame(animate);
  }

  animate();

  function triggerMistyBurstParticles() {
    for (let i = 0; i < 28; i++) {
      const p = new AmbientParticle('light');

      p.x = width / 2;
      p.y = height * 0.65;
      p.speedX = (Math.random() - 0.5) * 7;
      p.speedY = (Math.random() - 0.7) * 8;
      p.size = Math.random() * 3.5 + 1.5;
      p.alpha = 1;

      particles.push(p);
    }

    if (particles.length > 80) {
      particles.splice(45, particles.length - 45);
    }
  }
});
