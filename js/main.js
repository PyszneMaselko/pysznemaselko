/* ─── Nav scroll ──────────────────────── */
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

/* ─── Reviews strip ───────────────────── */
const reviews = [
  { text: '"Świetna obsługa, polecam całej rodzinie!"', name: '— Anna K.' },
  { text: '"Najlepszy optyk w Brwinowie"', name: '— Marek W.' },
  { text: '"Okulary gotowe następnego dnia, super!"', name: '— Ewa N.' },
  { text: '"Profesjonalne badanie wzroku, miła atmosfera"', name: '— Piotr Z.' },
  { text: '"Wreszcie znalazłam oprawki idealne dla mnie"', name: '— Kasia M.' },
  { text: '"Polecam każdemu, doskonały serwis"', name: '— Tomasz L.' },
];
const track = document.getElementById('reviews-track');
[...reviews, ...reviews].forEach(r => {
  const el = document.createElement('div');
  el.className = 'review-item';
  el.innerHTML = `<span class="review-stars">★★★★★</span><span class="review-text">${r.text}</span><span class="review-name">${r.name}</span>`;
  track.appendChild(el);
});

/* ─── Face shapes ─────────────────────── */
const faces = [
  {
    shape: 'Owalna',
    caption: 'Twarz owalna jest zrównoważona i delikatnie zaokrąglona — czoło nieco szersze od szczęki, wyraźne kości policzkowe.',
    desc: 'Postaw na <strong>duże, oversizowe kształty</strong> z grubego acetatu: <strong>retro-kwadratowe lub okrągłe</strong>. Detale na zausznikach podkreślą rysy. Dla subtelności — <strong>duże metalowe oprawki</strong> z zaokrągloną ramką. Kobiecy <strong>koci kształt</strong> doskonale dopełni naturalne linie twarzy.',
    photo: 'assets/images/faces/owalna.png',
    frames: [
      {name:'Evelyn Sun', sub:'okulary przeciwsłoneczne', price:'890 zł', img:(window.__resources&&window.__resources.frameEvelyn)||'assets/images/frameEvelyn.webp'},
      {name:'Koenig', sub:'oprawki korekcyjne', price:'750 zł', img:(window.__resources&&window.__resources.frameKoenig)||'assets/images/frameKoenig.webp'},
      {name:'Vivienne Sun', sub:'okulary przeciwsłoneczne', price:'920 zł', img:(window.__resources&&window.__resources.frameVivienne)||'assets/images/frameVivienne.webp'},
      {name:'Maui Jim', sub:'okulary sportowe', price:'1 050 zł', img:(window.__resources&&window.__resources.frameMaui)||'assets/images/frameMaui.webp'},
      {name:'Tomlin', sub:'oprawki korekcyjne', price:'680 zł', img:(window.__resources&&window.__resources.frameTomlin)||'assets/images/frameTomlin.webp'},
    ]
  },
  {
    shape: 'Okrągła',
    caption: 'Twarz okrągła jest krótka i szeroka, z pełnymi policzkami i zaokrąglonym podbródkiem.',
    desc: 'Ostre krawędzie tworzą kąty i optycznie wysmuklają — <strong>klasyczne kwadratowe oprawki</strong> są tu idealne. Wyraźna linia brwi balansuje rysy: sprawdź <strong>półrimlessy</strong>. <strong>Gruba, kanciasta oprawka</strong> to mocna opcja dla mężczyzn. <strong>Koci kształt</strong> wydłuża twarz i jest naturalnym wyborem dla kobiet.',
    photo: 'assets/images/faces/okragla.png',
    frames: [
      {name:'Koenig', sub:'oprawki korekcyjne', price:'750 zł', img:(window.__resources&&window.__resources.frameKoenig)||'assets/images/frameKoenig.webp'},
      {name:'Tomlin', sub:'oprawki korekcyjne', price:'680 zł', img:(window.__resources&&window.__resources.frameTomlin)||'assets/images/frameTomlin.webp'},
      {name:'Evelyn Sun', sub:'okulary przeciwsłoneczne', price:'890 zł', img:(window.__resources&&window.__resources.frameEvelyn)||'assets/images/frameEvelyn.webp'},
      {name:'Maui Jim', sub:'okulary sportowe', price:'1 050 zł', img:(window.__resources&&window.__resources.frameMaui)||'assets/images/frameMaui.webp'},
      {name:'Vivienne Sun', sub:'okulary przeciwsłoneczne', price:'920 zł', img:(window.__resources&&window.__resources.frameVivienne)||'assets/images/frameVivienne.webp'},
    ]
  },
  {
    shape: 'Kwadratowa',
    caption: 'Twarz kwadratowa ma szerokie czoło, wyraźną linię szczęki i kwadratowy podbródek.',
    desc: 'Unikaj <strong>cienkich i kanciastych oprawek</strong> — podkreślają podbródek. <strong>Duże okrągłe oprawki z acetatu</strong> świetnie balansują rysy. <strong>Owalne kształty</strong> łagodzą kąty i dodają miękkości. Kobiecą opcją jest <strong>koci kształt</strong> — złagodzi ostre linie i doda charakteru.',
    photo: 'assets/images/faces/Kwadratowa.png',
    frames: [
      {name:'Vivienne Sun', sub:'okulary przeciwsłoneczne', price:'920 zł', img:(window.__resources&&window.__resources.frameVivienne)||'assets/images/frameVivienne.webp'},
      {name:'Maui Jim', sub:'okulary sportowe', price:'1 050 zł', img:(window.__resources&&window.__resources.frameMaui)||'assets/images/frameMaui.webp'},
      {name:'Evelyn Sun', sub:'okulary przeciwsłoneczne', price:'890 zł', img:(window.__resources&&window.__resources.frameEvelyn)||'assets/images/frameEvelyn.webp'},
      {name:'Koenig', sub:'oprawki korekcyjne', price:'750 zł', img:(window.__resources&&window.__resources.frameKoenig)||'assets/images/frameKoenig.webp'},
      {name:'Tomlin', sub:'oprawki korekcyjne', price:'680 zł', img:(window.__resources&&window.__resources.frameTomlin)||'assets/images/frameTomlin.webp'},
    ]
  },
];

const faceShapeEl = document.getElementById('face-shapes');
const faceDescEl = document.getElementById('face-desc');
const framesRowEl = document.getElementById('frames-row');

const faceSVGs = [
  `<ellipse cx="20" cy="24" rx="13" ry="19" stroke="currentColor" stroke-width="1.5" fill="none"/>`,
  `<ellipse cx="20" cy="24" rx="17" ry="19" stroke="currentColor" stroke-width="1.5" fill="none"/>`,
  `<rect x="4" y="5" width="32" height="38" rx="3" stroke="currentColor" stroke-width="1.5" fill="none"/>`,
];

let activeface = 0;

function renderFaceFrames(idx) {
  framesRowEl.innerHTML = '';
  faces[idx].frames.forEach(f => {
    const card = document.createElement('div');
    card.className = 'frame-card';
    card.style.cssText = 'width:190px;padding:0;overflow:hidden;border:1px solid var(--ink-10);border-radius:3px;background:white;cursor:pointer;transition:transform .25s var(--ease-out),box-shadow .25s var(--ease-out),border-color .25s;';
    card.innerHTML = `
      <div style="height:150px;overflow:hidden;background:#f8f6f2;display:flex;align-items:center;justify-content:center;">
        <img src="${f.img}" alt="${f.name}" style="width:100%;height:100%;object-fit:contain;padding:12px;transition:transform .4s cubic-bezier(0.22,1,0.36,1);">
      </div>
      <div style="padding:12px 14px 14px;">
        <div style="font-size:15px;font-family:var(--serif);color:var(--ink);margin-bottom:8px;">${f.name}</div>
        <div style="display:inline-block;padding:3px 10px;border:1px solid var(--ink-10);border-radius:2px;font-size:11px;font-weight:400;letter-spacing:.04em;color:var(--ink-60);font-family:var(--sans);">${f.price}</div>
      </div>`;
    const img = card.querySelector('img');
    card.addEventListener('mouseenter', () => {
      card.style.transform = 'translateY(-3px)';
      card.style.boxShadow = '0 12px 32px rgba(28,25,23,.1)';
      card.style.borderColor = 'rgba(28,25,23,.2)';
      if (img) img.style.transform = 'scale(1.06)';
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
      card.style.boxShadow = '';
      card.style.borderColor = '';
      if (img) img.style.transform = '';
    });
    framesRowEl.appendChild(card);
  });
}

function setFace(idx) {
  activeface = idx;
  faceDescEl.innerHTML = faces[idx].desc;
  renderFaceFrames(idx);
  document.querySelectorAll('.face-btn').forEach((b, i) => {
    b.classList.toggle('active', i === idx);
    b.querySelector('svg').style.stroke = i === idx ? 'var(--cream)' : 'var(--ink)';
  });
  const photoEl = document.getElementById('face-photo');
  const captionEl = document.getElementById('face-caption');
  if (photoEl && faces[idx].photo) {
    photoEl.style.opacity = '0';
    setTimeout(() => {
      photoEl.src = faces[idx].photo;
      photoEl.style.opacity = '1';
    }, 200);
  }
  if (captionEl) captionEl.textContent = faces[idx].caption;
}

faces.forEach((f, i) => {
  const btn = document.createElement('button');
  btn.className = 'face-btn' + (i === 0 ? ' active' : '');
  btn.innerHTML = `
    <svg width="40" height="48" viewBox="0 0 40 48" fill="none" style="stroke:${i===0?'var(--cream)':'var(--ink)'}">
      ${faceSVGs[i]}
    </svg>
    ${f.shape}`;
  btn.addEventListener('click', () => setFace(i));
  faceShapeEl.appendChild(btn);
});
setFace(0);

/* ─── Frames row: wheel + drag scroll ── */
framesRowEl.addEventListener('wheel', (e) => {
  if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
    e.preventDefault();
    framesRowEl.scrollLeft += e.deltaY;
  }
}, { passive: false });

let dragActive = false, dragStartX = 0, dragScrollStart = 0;
framesRowEl.addEventListener('mousedown', (e) => {
  dragActive = true;
  dragStartX = e.clientX;
  dragScrollStart = framesRowEl.scrollLeft;
  framesRowEl.classList.add('is-dragging');
  e.preventDefault();
});
document.addEventListener('mouseup', () => {
  dragActive = false;
  framesRowEl.classList.remove('is-dragging');
});
document.addEventListener('mousemove', (e) => {
  if (!dragActive) return;
  framesRowEl.scrollLeft = dragScrollStart - (e.clientX - dragStartX);
});

/* ─── Brands track ────────────────────── */
const brands = [
  { name: 'Ray-Ban',         bg: 'assets/images/brands_themes/rayban_bg.webp',               logo: 'assets/images/brands/Rayban-white.webp' },
  { name: 'Gucci',           bg: 'assets/images/brands_themes/gucci_bg.webp',                logo: 'assets/images/brands/Logogucci.svg' },
  { name: 'Dolce & Gabbana', bg: 'assets/images/brands_themes/DG_bg.jpg',                   logo: 'assets/images/brands/DG_LogoHeader.svg' },
  { name: 'Emporio Armani',  bg: 'assets/images/brands_themes/Emporio_Armani_eyewear.webp',  logo: 'assets/images/brands/emporio-armani-2.svg' },
];
const brandsTrack = document.getElementById('brands-track');
[...brands, ...brands, ...brands, ...brands].forEach(b => {
  const card = document.createElement('div');
  card.className = 'brand-card';
  const bgStyle = b.bg ? `background-image:url('${b.bg}');background-size:cover;background-position:center;` : '';
  const logoHtml = b.logo
    ? `<img src="${b.logo}" alt="${b.name}" style="max-width:110px;max-height:36px;object-fit:contain;filter:brightness(0) invert(1);opacity:.9;">`
    : `<span>${b.name}</span>`;
  card.innerHTML = `
    <div class="brand-card-photo" style="${bgStyle}"></div>
    <div class="brand-card-overlay"></div>
    <div class="brand-card-logo">${logoHtml}</div>`;
  brandsTrack.appendChild(card);
});

/* ─── FAQ ─────────────────────────────── */
const faqs = [
  { q: 'Jak długo trwa badanie wzroku?', a: 'Kompleksowe badanie wzroku trwa około 30–45 minut. Obejmuje badanie ostrości wzroku, ciśnienia wewnątrzgałkowego oraz dobór odpowiedniej korekcji.' },
  { q: 'Czy przyjmujecie NFZ?', a: 'Tak, realizujemy zlecenia na okulary wydane przez lekarza okulistę w ramach NFZ. Prosimy o przyniesienie aktualnego zlecenia.' },
  { q: 'Jak wybrać oprawki do kształtu twarzy?', a: 'Nasi optycy chętnie pomogą Ci dobrać oprawki dopasowane do kształtu Twojej twarzy, kolorytu skóry i stylu życia. Skorzystaj też z naszego interaktywnego dobieraka powyżej.' },
  { q: 'Czy mogę zamówić soczewki kontaktowe?', a: 'Oczywiście — mamy w ofercie szeroki wybór soczewek kontaktowych dziennych, miesięcznych i torycznych. Skontaktuj się z nami, aby sprawdzić dostępność.' },
  { q: 'Ile kosztuje naprawa oprawek?', a: 'Koszt naprawy zależy od rodzaju uszkodzenia. Drobne regulacje i wymiana nóżek są często bezpłatne lub w bardzo niskiej cenie. Zapraszamy do wyceny na miejscu.' },
  { q: 'Czy serwis wykonywany jest na miejscu?', a: 'Tak — większość napraw, regulacji i wymian zauszników realizujemy na miejscu, w dniu wizyty. Tylko poważniejsze uszkodzenia wymagają dłuższego czasu.' },
];

const faqList = document.getElementById('faq-list');
faqs.forEach(f => {
  const item = document.createElement('div');
  item.className = 'faq-item';
  item.innerHTML = `
    <div class="faq-q">
      <span>${f.q}</span>
      <span class="faq-q-icon">+</span>
    </div>
    <div class="faq-a">${f.a}</div>`;
  item.querySelector('.faq-q').addEventListener('click', () => {
    const isOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item.open').forEach(el => el.classList.remove('open'));
    if (!isOpen) item.classList.add('open');
  });
  faqList.appendChild(item);
});

/* ─── Scroll reveal ───────────────────── */
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('in');
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));