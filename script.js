let step = 0;
let musicPlayed = false;

function showMessage() {
  if (!musicPlayed) {
    document.getElementById('birthday-audio').play();
    launchFireworks();
    musicPlayed = true;
  }

  step++;
  if (step === 1) document.getElementById('msg1').classList.remove('hidden');
  if (step === 2) document.getElementById('msg2').classList.remove('hidden');
  if (step === 3) document.getElementById('msg3').classList.remove('hidden');
  if (step === 4) document.getElementById('gift').classList.remove('hidden');
}

function launchFireworks() {
  const canvas = document.getElementById('fireworks');
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  let particles = [];

  function createFirework(x, y) {
    for (let i = 0; i < 60; i++) {
      particles.push({
        x: x,
        y: y,
        vx: Math.cos((Math.PI * 2) * i / 60) * (Math.random() * 4 + 2),
        vy: Math.sin((Math.PI * 2) * i / 60) * (Math.random() * 4 + 2),
        alpha: 1,
        radius: Math.random() * 2 + 1,
        color: `hsl(${Math.random() * 360}, 100%, 70%)`
      });
    }
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach((p, i) => {
      p.x += p.vx;
      p.y += p.vy;
      p.alpha -= 0.01;
      if (p.alpha <= 0) particles.splice(i, 1);
      ctx.beginPath();
      ctx.globalAlpha = p.alpha;
      ctx.fillStyle = p.color;
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fill();
    });
    ctx.globalAlpha = 1;
    requestAnimationFrame(animate);
  }

  setInterval(() => {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height / 2;
    createFirework(x, y);
  }, 600);

  animate();
}
