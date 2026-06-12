const headerHTML = `
<header class="site-header" id="site-header">
  <div class="header-inner">
    <a href="/" class="logo" aria-label="Number Picker Home">
      <span class="logo-icon">🎯</span>
      <span class="logo-text">NumberPicker<span class="logo-dot">.io</span></span>
    </a>
    <nav class="main-nav" aria-label="Main navigation">
      <ul>
        <li><a href="#app">Spin Wheel</a></li>
        <li><a href="#how-it-works">How It Works</a></li>
        <li><a href="#features">Features</a></li>
        <li><a href="#use-cases">Use Cases</a></li>
        <li><a href="#faq">FAQ</a></li>
      </ul>
    </nav>
    <button class="hamburger" id="hamburger" aria-label="Open menu" aria-expanded="false">
      <span></span><span></span><span></span>
    </button>
  </div>
  <div class="mobile-nav" id="mobile-nav" aria-hidden="true">
    <ul>
      <li><a href="#app">Spin Wheel</a></li>
      <li><a href="#how-it-works">How It Works</a></li>
      <li><a href="#features">Features</a></li>
      <li><a href="#use-cases">Use Cases</a></li>
      <li><a href="#faq">FAQ</a></li>
    </ul>
  </div>
</header>
`;

document.getElementById('header-placeholder').innerHTML = headerHTML;

// Sticky header on scroll
const header = document.getElementById('site-header');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 50);
});

// Mobile hamburger
const hamburger = document.getElementById('hamburger');
const mobileNav = document.getElementById('mobile-nav');
hamburger.addEventListener('click', () => {
  const open = mobileNav.classList.toggle('open');
  hamburger.classList.toggle('active', open);
  hamburger.setAttribute('aria-expanded', open);
  mobileNav.setAttribute('aria-hidden', !open);
});

// Close mobile nav on link click
mobileNav.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    mobileNav.classList.remove('open');
    hamburger.classList.remove('active');
    hamburger.setAttribute('aria-expanded', false);
    mobileNav.setAttribute('aria-hidden', true);
  });
});
