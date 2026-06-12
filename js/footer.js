const footerHTML = `
<footer class="site-footer">
  <div class="footer-inner">
    <div class="footer-brand">
      <a href="/" class="logo" aria-label="Number Picker Home">
        <span class="logo-icon">🎯</span>
        <span class="logo-text">Number<span class="logo-dot">Picker</span></span>
      </a>
      <p class="footer-tagline">The smartest free random number picker on the web — spin a wheel or go digital, instantly.</p>
    </div>
    <div class="footer-links">
      <div class="footer-col">
        <h4>Tool</h4>
        <ul>
          <li><a href="/#app">Spin the Wheel</a></li>
          <li><a href="/#app">Digital Picker</a></li>
          <li><a href="/#features">All Features</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h4>Learn</h4>
        <ul>
          <li><a href="/#how-it-works">How It Works</a></li>
          <li><a href="/#use-cases">Use Cases</a></li>
          <li><a href="/#faq">FAQ</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h4>Info</h4>
        <ul>
          <li><a href="/about">About</a></li>
          <li><a href="/contact">Contact</a></li>
          <li><a href="/privacy">Privacy Policy</a></li>
          <li><a href="/terms">Terms of Use</a></li>
          <li><a href="/cookies">Cookies Policy</a></li>
        </ul>
      </div>
    </div>
  </div>
  <div class="footer-bottom">
    <p>© ${new Date().getFullYear()} NumberPicker.io — Free Random Number Generator & Wheel Spinner</p>
  </div>
</footer>
`;

document.getElementById('footer-placeholder').innerHTML = footerHTML;
