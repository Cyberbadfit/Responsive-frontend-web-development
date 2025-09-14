// Small interactive scripts: menu toggle, year, CTA micro-animations
document.addEventListener('DOMContentLoaded', function (){
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  const yearEl = document.getElementById('year');
  const heroImg = document.getElementById('heroImg');
  const getNow = document.getElementById('getNow');
  const ctaPrimary = document.getElementById('ctaPrimary');
  const ctaSecondary = document.getElementById('ctaSecondary');

  yearEl.textContent = new Date().getFullYear();

  hamburger.addEventListener('click', () => {
    const open = mobileMenu.hasAttribute('hidden') ? false : true;
    if(open){
      mobileMenu.setAttribute('hidden', '');
      hamburger.classList.remove('open');
    } else {
      mobileMenu.removeAttribute('hidden');
      hamburger.classList.add('open');
    }
  });

  // tiny hover tilt effect on the image for desktop
  function tilt(e){
    const rect = heroImg.getBoundingClientRect();
    const x = (e.clientX - rect.left) - rect.width/2;
    const y = (e.clientY - rect.top) - rect.height/2;
    heroImg.style.transform = `perspective(600px) rotateX(${(-y/20)}deg) rotateY(${(x/20)}deg)`;
  }
  function resetTilt(){ heroImg.style.transform = 'translateZ(0)'; }
  if(window.innerWidth > 980){
    heroImg.addEventListener('mousemove', tilt);
    heroImg.addEventListener('mouseleave', resetTilt);
  }

  getNow.addEventListener('click', ()=> alert('This is a demo site. No real services provided.'));

  ctaPrimary.addEventListener('click', ()=> {
    ctaPrimary.animate([{ transform: 'translateY(0)' },{ transform: 'translateY(-6px)' },{ transform: 'translateY(0)'}], { duration: 350, easing: 'ease-out' });
    setTimeout(()=> alert('Contact flow (demo)'), 420);
  });
  ctaSecondary.addEventListener('click', ()=> {
    ctaSecondary.animate([{ transform: 'scale(1)' },{ transform: 'scale(.98)' },{ transform: 'scale(1)'}], { duration: 220 });
    setTimeout(()=> alert('Pricing information (demo)'), 300);
  });
});