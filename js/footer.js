// ============ FOOTER COMPONENT ============
(function () {
  const year = new Date().getFullYear();

  const footerHTML = `
  <footer class="site-footer" id="site-footer-inner">
    <div class="container footer-inner">
      <div class="footer-brand">
        <a class="logo" href="#main-content" aria-label="Random Number Picker home">
          <svg width="26" height="26" viewBox="0 0 40 40" aria-hidden="true">
            <rect x="2" y="2" width="36" height="36" rx="10" fill="#12141A"/>
            <text x="20" y="27" text-anchor="middle" font-family="JetBrains Mono, monospace" font-weight="700" font-size="18" fill="#ffffff">#7</text>
          </svg>
          <span>number<strong>picker</strong></span>
        </a>
        <p>A free random number picker and number wheel for games, raffles, classrooms, and every fair
        decision in between.</p>
        <div class="footer-social" aria-label="Social links">
          <a href="#" aria-label="X / Twitter">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M3 3l7.5 9.5L3.6 21H6l6-6.9 4.7 6.9H21l-8-10.1L20.4 3H18l-5.6 6.4L8 3H3Z" fill="#12141A"/></svg>
          </a>
          <a href="#" aria-label="GitHub">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.46-1.16-1.11-1.47-1.11-1.47-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.53 2.36 1.09 2.93.83.09-.65.35-1.09.63-1.34-2.22-.25-4.56-1.11-4.56-4.93 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.03a9.4 9.4 0 0 1 5 0c1.91-1.3 2.75-1.03 2.75-1.03.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.83-2.35 4.68-4.58 4.92.36.31.68.92.68 1.86v2.76c0 .27.18.58.69.48A10 10 0 0 0 12 2Z" fill="#12141A"/></svg>
          </a>
        </div>
      </div>

      <nav class="footer-col" aria-label="Tool links">
        <h4>Tool</h4>
        <a href="/#picker">Random number picker</a>
        <a href="/#number-wheel">Number picker wheel</a>
        <a href="/#features">Features</a>
        <a href="/#how-it-works">How it works</a>
      </nav>

      <nav class="footer-col" aria-label="Use case links">
        <h4>Use cases</h4>
        <a href="/#use-cases">Games &amp; dice</a>
        <a href="/#use-cases">Raffles &amp; giveaways</a>
        <a href="/#use-cases">Classrooms</a>
        <a href="/#use-cases">Research sampling</a>
      </nav>

      <nav class="footer-col" aria-label="Company links">
        <h4>More</h4>
        <a href="/privacy">Privacy Policy</a>
        <a href="/terms">Terms of Use</a>
        <a href="/about">About</a>
        <a href="/contact">Contact</a>
        <a href="/cookies">Cookies Policy</a>
      </nav>
    </div>

    <div class="container footer-bottom">
      <p>© ${year} numberpicker.github.io — Random Number Picker. All picks generated locally in your browser.</p>
    </div>
  </footer>`;

  const mount = document.getElementById("site-footer");
  if (mount) mount.outerHTML = footerHTML;

  const style = document.createElement("style");
  style.textContent = `
    .site-footer{
      background:#12141A;color:#c7cbe0;
      padding:64px 0 0;
    }
    .footer-inner{
      display:grid;grid-template-columns:1.6fr 1fr 1fr 1fr;gap:36px;
      padding-bottom:48px;border-bottom:1px solid #262a38;
    }
    @media (max-width:860px){.footer-inner{grid-template-columns:1fr 1fr;}}
    @media (max-width:520px){.footer-inner{grid-template-columns:1fr;}}
    .footer-brand .logo{display:flex;align-items:center;gap:10px;font-family:'Space Grotesk',sans-serif;font-weight:600;color:#fff;margin-bottom:14px;}
    .footer-brand .logo strong{color:#5C8AFF;}
    .footer-brand p{max-width:280px;font-size:.9rem;color:#9498ad;}
    .footer-social{display:flex;gap:10px;margin-top:16px;}
    .footer-social a{
      width:34px;height:34px;border-radius:8px;background:#1c2030;
      display:flex;align-items:center;justify-content:center;transition:background .2s ease;
    }
    .footer-social a svg path{fill:#c7cbe0;}
    .footer-social a:hover{background:#2E5EFF;}
    .footer-col h4{
      font-family:'Space Grotesk',sans-serif;color:#fff;font-size:.85rem;
      text-transform:uppercase;letter-spacing:.04em;margin-bottom:14px;
    }
    .footer-col{display:flex;flex-direction:column;gap:10px;font-size:.9rem;}
    .footer-col a{color:#9498ad;transition:color .15s ease;}
    .footer-col a:hover{color:#fff;}
    .footer-bottom{padding:22px 24px;font-size:.8rem;color:#6d7189;font-family:'JetBrains Mono',monospace;}
  `;
  document.head.appendChild(style);
})();
