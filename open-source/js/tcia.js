// Card toggle
function toggleCard(card) {
  const isOpen = card.classList.contains('open');
  // close all others
  document.querySelectorAll('.card.open').forEach(c => {
    c.classList.remove('open');
    c.querySelectorAll('.panel.open').forEach(p => p.classList.remove('open'));
  });
  if (!isOpen) {
    card.classList.add('open');
    // animate impact bars
    setTimeout(() => {
      card.querySelectorAll('.impact-bar-fill').forEach(bar => {
        const w = bar.style.width;
        bar.style.width = '0';
        requestAnimationFrame(() => { bar.style.width = w; });
      });
    }, 50);
  }
}

// Panel accordion
function togglePanel(head) {
  event.stopPropagation();
  const panel = head.parentElement;
  panel.classList.toggle('open');
}

// Scroll reveal
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.row, .branch-header, .year-badge').forEach(el => {
  observer.observe(el);
});

// Wrap timeline content
document.addEventListener('DOMContentLoaded', () => {
  const body = document.body;
  const nav  = document.getElementById('page-nav');
  const rp   = document.getElementById('resource-page');

  // Gather everything except nav & resource-page into timeline-page div
  const tl = document.createElement('div');
  tl.id = 'timeline-page';
  tl.style.paddingTop = '54px';

  const nodes = [...body.childNodes].filter(n =>
    n !== nav && n !== rp &&
    !(n.nodeName === 'SCRIPT') &&
    !(n.nodeName === 'STYLE') &&
    !(n.nodeName === '#comment')
  );
  nodes.forEach(n => tl.appendChild(n));
  body.insertBefore(tl, rp);
});

function showPage(page) {
  document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
  if (page === 'timeline') {
    document.getElementById('timeline-page').style.display = 'block';
    document.getElementById('resource-page').style.display  = 'none';
    document.querySelectorAll('.nav-btn')[0].classList.add('active');
  } else {
    document.getElementById('timeline-page').style.display = 'none';
    document.getElementById('resource-page').style.display  = 'block';
    document.querySelectorAll('.nav-btn')[1].classList.add('active');
    // trigger score bar animations
    setTimeout(animateScores, 100);
  }
}

function animateScores() {
  document.querySelectorAll('.score-fill[data-w]').forEach(el => {
    el.style.width = el.dataset.w;
  });
}

function filterCat(btn, cat) {
  document.querySelectorAll('.cat-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  document.querySelectorAll('.sol-card').forEach(c => {
    if (cat === 'all' || c.dataset.cat === cat) {
      c.classList.remove('hidden');
    } else {
      c.classList.add('hidden');
    }
  });
}

// ── COMMUNITY CONTEXT INJECTION ──────────────────
const communityContext = {
  mobile: {
    best:   { label: 'For organizers & advocates', text: 'GrapheneOS and LineageOS remove corporate surveillance from your device entirely. TCIA can train your team in a 90-minute workshop.' },
    better: { label: 'Good starting point', text: 'Brave blocks most trackers out of the box — a meaningful first step for community members upgrading their privacy without technical expertise.' },
    good:   { label: 'Accessible entry point', text: 'Stock Android is where most people start. Add Firefox + uBlock Origin to immediately reduce data exposure while you build toward stronger alternatives.' },
    worst:  { label: 'Community warning', text: 'Bloatware OEM phones sold in low-income markets often include pre-installed data harvesting. This is targeted extraction of community data.' }
  },
  browser: {
    best:   { label: 'TCIA recommends', text: 'Firefox + uBlock Origin is TCIA\'s recommended starting point for every community member. One install, five minutes, immediate privacy protection. We teach this in workshops.' },
    better: { label: 'Strong choice', text: 'Brave offers built-in privacy with less setup than Firefox. Good for community members who want protection without configuring extensions.' },
    worst:  { label: 'Community warning', text: 'Chrome\'s Manifest V3 changes weakened ad-blocking. Google\'s business model depends on tracking your community\'s behavior. Every Chrome user funds that model.' }
  },
  maps: {
    best:   { label: 'Data sovereignty tool', text: 'OsmAnd keeps your location entirely on your device. No corporation tracks where your community goes, organizes, or worships. Zero data leaves your phone.' },
    better: { label: 'TCIA recommends for most', text: 'Organic Maps is the easiest privacy-respecting map for everyday use. Download your city, navigate freely — no account, no tracking.' },
    worst:  { label: 'Community warning', text: 'Google Maps\' location history has been subpoenaed in criminal cases. Activists, organizers, and community members should be aware that their movement data is stored and accessible.' }
  },
  messaging: {
    best:   { label: 'TCIA recommends — organizer safety', text: 'Signal is non-negotiable for community organizing. Surveillance of social movements is documented. TCIA offers Signal setup workshops for organizations.' },
    better: { label: 'For teams needing self-hosting', text: 'Matrix/Element lets organizations run their own communication server — total data control. French government uses it. Your nonprofit can too.' },
    worst:  { label: 'Community warning', text: 'WhatsApp\'s metadata — who contacts whom, when, how often — is shared with Meta\'s advertising and data infrastructure. The message content may be encrypted; the social graph is not.' }
  },
  productivity: {
    best:   { label: 'Budget justice argument', text: 'Every school paying for Microsoft 365 is spending community tax dollars on corporate subscriptions. LibreOffice is a policy ask TCIA can bring to any school board.' },
    better: { label: 'For data-sovereign organizations', text: 'Nextcloud lets nonprofits and community orgs store files on their own servers — completely outside Google and Microsoft\'s reach. TCIA can help set this up.' },
    worst:  { label: 'Community warning', text: 'Google Docs scans document content. Sensitive community strategy, legal documents, and organizing plans stored in Google Drive are accessible to Google — and potentially to law enforcement via subpoena.' }
  },
  media: {
    best:   { label: 'Cultural sovereignty tool', text: 'PeerTube lets community media organizations publish video without an algorithm deciding who sees it. No demonetization, no shadow-banning, no corporate terms of service.' },
    worst:  { label: 'Community warning', text: 'YouTube\'s recommendation algorithm has amplified extremist content targeting communities of color. Your viewing data funds an advertising infrastructure built on behavioral prediction.' }
  },
  knowledge: {
    best:   { label: 'TCIA hosts edit-a-thons', text: 'Wikipedia is only as complete as its editors. TCIA organizes community edit-a-thons to put Black Twin Cities history, Somali community leaders, and Indigenous voices on the permanent public record.' }
  },
  health: {
    best:   { label: 'Algorithmic accountability tool', text: 'Open health records systems are auditable. Proprietary EHRs are black boxes. TCIA\'s data justice work fights algorithmic bias in public health — open source is the foundation.' },
    worst:  { label: 'Community warning', text: 'The Change Healthcare breach (2024) exposed 100M records from a proprietary EHR. Closed source means communities cannot audit the security of systems that hold their most intimate data.' }
  }
};

// Inject community framing into each sol-card
document.querySelectorAll('.sol-card').forEach(card => {
  const cat = card.dataset.cat;
  const tierEl = card.querySelector('.sol-tier');
  if (!cat || !tierEl) return;

  let tier = 'good';
  if (tierEl.classList.contains('best')) tier = 'best';
  else if (tierEl.classList.contains('better')) tier = 'better';
  else if (tierEl.classList.contains('worst')) tier = 'worst';

  const ctx = communityContext[cat] && communityContext[cat][tier];
  if (!ctx) return;

  const coversDiv = card.querySelector('.sol-covers');
  if (!coversDiv) return;

  const ul = coversDiv.querySelector('.covers-list');
  if (!ul) return;

  const li = document.createElement('li');
  li.innerHTML = `<span class="ci">✊</span><span><span class="cv" style="color:#c9a84c">${ctx.label}:</span> ${ctx.text}</span>`;
  ul.appendChild(li);
});
