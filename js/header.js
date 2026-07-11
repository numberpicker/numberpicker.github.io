// ============ HEADER COMPONENT ============
(function () {
  const headerHTML = `
  <header class="site-header" id="site-header-inner">
    <div class="container header-inner">
      <a class="logo" href="#main-content" aria-label="Random Number Picker home">
        <svg width="30" height="30" viewBox="0 0 40 40" aria-hidden="true">
          <rect x="2" y="2" width="36" height="36" rx="10" fill="#12141A"/>
          <text x="20" y="27" text-anchor="middle" font-family="JetBrains Mono, monospace" font-weight="700" font-size="18" fill="#ffffff">#7</text>
        </svg>
        <span>number<strong>picker</strong></span>
      </a>

      <nav class="main-nav" aria-label="Primary">
        <a href="/#picker">Picker</a>
        <a href="/#how-it-works">How it works</a>
        <a href="/#features">Features</a>
        <a href="/#number-wheel">Wheel</a>
        <a href="/#use-cases">Use cases</a>
        <a href="/#faq">FAQ</a>
      </nav>

      <a class="header-cta" href="#picker">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M13 2 3 14h7l-1 8 10-12h-7l1-8Z" fill="currentColor"/></svg>
        Pick a number
      </a>

      <button class="nav-toggle" id="nav-toggle" aria-label="Toggle navigation menu" aria-expanded="false">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M4 7h16M4 12h16M4 17h16" stroke="#12141A" stroke-width="2" stroke-linecap="round"/></svg>
      </button>
    </div>
  </header>`;

  const mount = document.getElementById("site-header");
  if (mount) mount.outerHTML = headerHTML;

  const toggle = document.getElementById("nav-toggle");
  const nav = document.querySelector(".main-nav");
  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      const isOpen = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(isOpen));
    });
    nav.querySelectorAll("a").forEach((link) =>
      link.addEventListener("click", () => {
        nav.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      })
    );
  }

  // header CSS injected once here so the component is fully self-contained
  const style = document.createElement("style");
  style.textContent = `
    .site-header{
      position:sticky;top:0;z-index:100;
      background:rgba(255,255,255,.88);
      backdrop-filter:blur(10px);
      border-bottom:1.5px solid #e7e9f0;
    }
    .header-inner{
      display:flex;align-items:center;gap:28px;
      padding:14px 24px;
    }
    .logo{display:flex;align-items:center;gap:10px;font-family:'Space Grotesk',sans-serif;font-weight:600;font-size:1.02rem;color:#12141A;flex-shrink:0;}
    .logo strong{color:#2E5EFF;}
    .main-nav{display:flex;gap:22px;margin-left:auto;font-size:.92rem;font-weight:500;}
    .main-nav a{color:#4b5063;transition:color .15s ease;white-space:nowrap;}
    .main-nav a:hover{color:#2E5EFF;}
    .header-cta{
      display:flex;align-items:center;gap:6px;
      background:#12141A;color:#fff;
      padding:9px 16px;border-radius:10px;
      font-size:.88rem;font-weight:600;
      flex-shrink:0;transition:background .2s ease;
    }
    .header-cta:hover{background:#2E5EFF;}
    .nav-toggle{
      display:none;background:none;border:1.5px solid #e7e9f0;border-radius:8px;
      padding:8px;margin-left:auto;cursor:pointer;
    }
    @media (max-width:860px){
      .main-nav{
        display:none;position:absolute;top:100%;left:0;right:0;
        background:#fff;border-bottom:1.5px solid #e7e9f0;
        flex-direction:column;padding:16px 24px;gap:14px;
      }
      .main-nav.open{display:flex;}
      .header-cta{display:none;}
      .nav-toggle{display:flex;}
    }
  `;
  document.head.appendChild(style);
})();
