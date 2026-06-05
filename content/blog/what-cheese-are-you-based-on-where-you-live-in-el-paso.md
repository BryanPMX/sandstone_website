---
title: What Cheese Are You Based on Where You Live in El Paso?
date: 2026-06-05T14:28:00.000-06:00
excerpt: |-
  What Cheese Are You
  Based on Where You Live
  in El Paso?
seoTitle: What Cheese Are You Based on Where You Live in El Paso?
metaDescription: What Cheese Are You Based on Where You Live in El Paso?
coverImage: /uploads/chihuahuas-ep.jpeg
coverImageAlt: What Cheese Are You Based on Where You Live in El Paso?
---
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>What Cheese Are You? — El Paso Edition</title>
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=DM+Sans:wght@400;500;600&display=swap" rel="stylesheet">
<style>
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --gold: #D4A017;
    --cream: #FDF6E3;
    --orange: #C8620A;
    --brown: #6B3A1F;
    --dark: #2A1A08;
    --muted: #8A6A44;
    --white: #FFFDF7;
    --border: rgba(180,130,60,0.25);
  }

  body {
    background: var(--cream);
    font-family: 'DM Sans', sans-serif;
    color: var(--dark);
    min-height: 100vh;
    padding: 0;
  }

  .hero {
    background: var(--dark);
    color: var(--cream);
    text-align: center;
    padding: 3rem 1.5rem 2.5rem;
    position: relative;
    overflow: hidden;
  }

  .hero::before {
    content: '';
    position: absolute;
    inset: 0;
    background: repeating-linear-gradient(
      45deg,
      transparent,
      transparent 40px,
      rgba(212,160,23,0.04) 40px,
      rgba(212,160,23,0.04) 80px
    );
  }

  .badge {
    display: inline-block;
    background: var(--gold);
    color: var(--dark);
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    padding: 5px 14px;
    border-radius: 20px;
    margin-bottom: 1.2rem;
  }

  .hero h1 {
    font-family: 'Playfair Display', serif;
    font-size: clamp(2rem, 6vw, 3.2rem);
    font-weight: 900;
    line-height: 1.1;
    margin-bottom: 0.7rem;
    position: relative;
  }

  .hero h1 span { color: var(--gold); }

  .hero p {
    font-size: 1rem;
    color: rgba(253,246,227,0.7);
    max-width: 480px;
    margin: 0 auto;
    position: relative;
  }

  .cheese-emoji {
    font-size: 3rem;
    margin-bottom: 0.8rem;
    display: block;
  }

  .quiz-wrap {
    max-width: 660px;
    margin: 0 auto;
    padding: 2rem 1.25rem 4rem;
  }

  .progress-bar {
    height: 4px;
    background: rgba(180,130,60,0.15);
    border-radius: 2px;
    margin-bottom: 2rem;
    overflow: hidden;
  }

  .progress-fill {
    height: 100%;
    background: var(--gold);
    border-radius: 2px;
    transition: width 0.4s ease;
  }

  .step { display: none; animation: fadeUp 0.35s ease; }
  .step.active { display: block; }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(14px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  .q-number {
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.1em;
    color: var(--gold);
    text-transform: uppercase;
    margin-bottom: 0.5rem;
  }

  .q-text {
    font-family: 'Playfair Display', serif;
    font-size: clamp(1.2rem, 3.5vw, 1.55rem);
    font-weight: 700;
    line-height: 1.3;
    color: var(--dark);
    margin-bottom: 1.6rem;
  }

  .options {
    display: grid;
    gap: 10px;
  }

  .option-btn {
    display: flex;
    align-items: center;
    gap: 14px;
    background: var(--white);
    border: 1.5px solid var(--border);
    border-radius: 14px;
    padding: 1rem 1.2rem;
    cursor: pointer;
    text-align: left;
    font-family: 'DM Sans', sans-serif;
    font-size: 0.95rem;
    color: var(--dark);
    transition: border-color 0.18s, background 0.18s, transform 0.15s;
    width: 100%;
  }

  .option-btn:hover {
    border-color: var(--gold);
    background: #FFFBF0;
    transform: translateY(-2px);
  }

  .option-btn.selected {
    border-color: var(--orange);
    background: #FFF4E6;
  }

  .opt-icon {
    font-size: 1.6rem;
    flex-shrink: 0;
  }

  .opt-text strong {
    display: block;
    font-weight: 600;
    margin-bottom: 2px;
  }

  .opt-text span {
    font-size: 0.82rem;
    color: var(--muted);
  }

  .next-btn {
    margin-top: 1.5rem;
    background: var(--dark);
    color: var(--cream);
    border: none;
    border-radius: 12px;
    padding: 0.85rem 2rem;
    font-family: 'DM Sans', sans-serif;
    font-size: 0.95rem;
    font-weight: 600;
    cursor: pointer;
    display: none;
    transition: background 0.18s, transform 0.15s;
  }

  .next-btn:hover { background: var(--orange); transform: translateY(-1px); }
  .next-btn.visible { display: inline-flex; align-items: center; gap: 8px; }

  .result-card {
    background: var(--white);
    border: 1.5px solid var(--border);
    border-radius: 20px;
    padding: 2rem 1.75rem;
    text-align: center;
  }

  .result-emoji { font-size: 4.5rem; margin-bottom: 0.5rem; }

  .result-tag {
    display: inline-block;
    background: var(--gold);
    color: var(--dark);
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    padding: 4px 14px;
    border-radius: 20px;
    margin-bottom: 1rem;
  }

  .result-name {
    font-family: 'Playfair Display', serif;
    font-size: 2rem;
    font-weight: 900;
    color: var(--dark);
    margin-bottom: 0.4rem;
  }

  .result-subtitle {
    font-size: 0.9rem;
    color: var(--gold);
    font-weight: 600;
    margin-bottom: 1.1rem;
    text-transform: uppercase;
    letter-spacing: 0.08em;
  }

  .result-desc {
    font-size: 1rem;
    color: var(--dark);
    line-height: 1.7;
    margin-bottom: 1.3rem;
  }

  .result-hood {
    font-size: 0.85rem;
    color: var(--muted);
    background: var(--cream);
    border-radius: 10px;
    padding: 0.6rem 1rem;
    margin-bottom: 1.5rem;
    display: inline-block;
  }

  .result-hood strong { color: var(--brown); }

  .fun-fact {
    background: #FFF4E6;
    border-left: 3px solid var(--gold);
    border-radius: 8px;
    padding: 0.9rem 1.1rem;
    text-align: left;
    font-size: 0.88rem;
    color: var(--brown);
    margin-bottom: 1.5rem;
    line-height: 1.6;
  }

  .fun-fact strong { color: var(--orange); }

  .restart-btn {
    background: transparent;
    border: 1.5px solid var(--dark);
    color: var(--dark);
    border-radius: 12px;
    padding: 0.75rem 1.8rem;
    font-family: 'DM Sans', sans-serif;
    font-size: 0.9rem;
    font-weight: 600;
    cursor: pointer;
    transition: background 0.18s, color 0.18s;
  }

  .restart-btn:hover { background: var(--dark); color: var(--cream); }

  .national-day-note {
    text-align: center;
    font-size: 0.78rem;
    color: var(--muted);
    margin-top: 2.5rem;
    letter-spacing: 0.05em;
  }

  @media (max-width: 480px) {
    .hero { padding: 2rem 1rem 1.8rem; }
    .result-card { padding: 1.5rem 1.1rem; }
  }
</style>
</head>
<body>

<div class="hero">
  <span class="cheese-emoji">🧀</span>
  <div class="badge">National Cheese Day · June 4</div>
  <h1>What Cheese Are You<br><span>Based on Where You Live</span><br>in El Paso?</h1>
  <p>6 questions · 100% fromage · El Paso's neighborhoods decoded through dairy</p>
</div>

<div class="quiz-wrap">
  <div class="progress-bar"><div class="progress-fill" id="progress" style="width:0%"></div></div>

  <!-- Q1 -->
  <div class="step active" data-q="0">
    <p class="q-number">Question 1 of 6</p>
    <p class="q-text">Where in El Paso do you spend most of your time?</p>
    <div class="options">
      <button class="option-btn" data-value="a" onclick="pick(this,0)">
        <span class="opt-icon">🌵</span>
        <span class="opt-text"><strong>West Side / Westside Hills</strong><span>Near UTEP, Kern Place, Mesa Hills</span></span>
      </button>
      <button class="option-btn" data-value="b" onclick="pick(this,0)">
        <span class="opt-icon">🏜️</span>
        <span class="opt-text"><strong>East Side / Far East</strong><span>Eastwood, Zaragoza, Lee Treviño area</span></span>
      </button>
      <button class="option-btn" data-value="c" onclick="pick(this,0)">
        <span class="opt-icon">🌆</span>
        <span class="opt-text"><strong>Downtown / Central</strong><span>Historic Union Plaza, Segundo Barrio, Cincinnati Ave</span></span>
      </button>
      <button class="option-btn" data-value="d" onclick="pick(this,0)">
        <span class="opt-icon">🏔️</span>
        <span class="opt-text"><strong>Northeast / Upper Valley</strong><span>Transmountain, Horizon City, Montana Vista</span></span>
      </button>
    </div>
    <button class="next-btn" id="next-0" onclick="nextQ(1)">Next →</button>
  </div>

  <!-- Q2 -->
  <div class="step" data-q="1">
    <p class="q-number">Question 2 of 6</p>
    <p class="q-text">What's your Sunday morning look?</p>
    <div class="options">
      <button class="option-btn" data-value="a" onclick="pick(this,1)">
        <span class="opt-icon">☕</span>
        <span class="opt-text"><strong>Artisan coffee and a good book</strong><span>Probably at Trident Booksellers & Café</span></span>
      </button>
      <button class="option-btn" data-value="b" onclick="pick(this,1)">
        <span class="opt-icon">🌮</span>
        <span class="opt-text"><strong>Family breakfast tacos, big table</strong><span>L&J Cafe or a taquería near the house</span></span>
      </button>
      <button class="option-btn" data-value="c" onclick="pick(this,1)">
        <span class="opt-icon">🏃</span>
        <span class="opt-text"><strong>Morning hike up Franklin Mountains</strong><span>Ranger Peak or Mundy's Gap trail</span></span>
      </button>
      <button class="option-btn" data-value="d" onclick="pick(this,1)">
        <span class="opt-icon">😴</span>
        <span class="opt-text"><strong>Sleep in, errands by noon</strong><span>Walmart run, meal prep, chill mode</span></span>
      </button>
    </div>
    <button class="next-btn" id="next-1" onclick="nextQ(2)">Next →</button>
  </div>

  <!-- Q3 -->
  <div class="step" data-q="2">
    <p class="q-number">Question 3 of 6</p>
    <p class="q-text">Your go-to El Paso dining experience is…</p>
    <div class="options">
      <button class="option-btn" data-value="a" onclick="pick(this,2)">
        <span class="opt-icon">🔥</span>
        <span class="opt-text"><strong>Green chile cheese burger at H&H Car Wash</strong><span>Iconic, no-frills, legendary</span></span>
      </button>
      <button class="option-btn" data-value="b" onclick="pick(this,2)">
        <span class="opt-icon">🫕</span>
        <span class="opt-text"><strong>Brisket at Cattleman's Steakhouse</strong><span>Out in Fabens, worth the drive</span></span>
      </button>
      <button class="option-btn" data-value="c" onclick="pick(this,2)">
        <span class="opt-icon">🍽️</span>
        <span class="opt-text"><strong>New spot with a wine list and a view</strong><span>Something opening in the arts district</span></span>
      </button>
      <button class="option-btn" data-value="d" onclick="pick(this,2)">
        <span class="opt-icon">🌯</span>
        <span class="opt-text"><strong>Gordita from a neighborhood taquería</strong><span>No name on the sign, best food in the city</span></span>
      </button>
    </div>
    <button class="next-btn" id="next-2" onclick="nextQ(3)">Next →</button>
  </div>

  <!-- Q4 -->
  <div class="step" data-q="3">
    <p class="q-number">Question 4 of 6</p>
    <p class="q-text">How do you feel about Juárez being right across the border?</p>
    <div class="options">
      <button class="option-btn" data-value="a" onclick="pick(this,3)">
        <span class="opt-icon">🌉</span>
        <span class="opt-text"><strong>I cross regularly — it's one big binational city</strong><span>Dentist, dinner, shopping, familia</span></span>
      </button>
      <button class="option-btn" data-value="b" onclick="pick(this,3)">
        <span class="opt-icon">🇲🇽</span>
        <span class="opt-text"><strong>It defines us — El Paso wouldn't be El Paso without it</strong><span>The culture, language, and food are deeply connected</span></span>
      </button>
      <button class="option-btn" data-value="c" onclick="pick(this,3)">
        <span class="opt-icon">📍</span>
        <span class="opt-text"><strong>I appreciate it but don't cross much</strong><span>Part of the identity, beautiful from the mountain view</span></span>
      </button>
      <button class="option-btn" data-value="d" onclick="pick(this,3)">
        <span class="opt-icon">🗺️</span>
        <span class="opt-text"><strong>Makes us unique in all of Texas and the US</strong><span>No other American city has this kind of relationship</span></span>
      </button>
    </div>
    <button class="next-btn" id="next-3" onclick="nextQ(4)">Next →</button>
  </div>

  <!-- Q5 -->
  <div class="step" data-q="4">
    <p class="q-number">Question 5 of 6</p>
    <p class="q-text">What's your El Paso personality trait?</p>
    <div class="options">
      <button class="option-btn" data-value="a" onclick="pick(this,4)">
        <span class="opt-icon">🤝</span>
        <span class="opt-text"><strong>Warm and welcoming to everyone</strong><span>Strangers become friends fast here</span></span>
      </button>
      <button class="option-btn" data-value="b" onclick="pick(this,4)">
        <span class="opt-icon">💪</span>
        <span class="opt-text"><strong>Hardworking and no-nonsense</strong><span>El Paso grit is real — military town energy</span></span>
      </button>
      <button class="option-btn" data-value="c" onclick="pick(this,4)">
        <span class="opt-icon">🎨</span>
        <span class="opt-text"><strong>Creative and culturally curious</strong><span>Murals, music, dual heritage — it all inspires me</span></span>
      </button>
      <button class="option-btn" data-value="d" onclick="pick(this,4)">
        <span class="opt-icon">😎</span>
        <span class="opt-text"><strong>Laid-back and community-rooted</strong><span>I know my neighbors, I know my neighborhood</span></span>
      </button>
    </div>
    <button class="next-btn" id="next-4" onclick="nextQ(5)">Next →</button>
  </div>

  <!-- Q6 -->
  <div class="step" data-q="5">
    <p class="q-number">Question 6 of 6</p>
    <p class="q-text">When someone asks "where are you from?" you say…</p>
    <div class="options">
      <button class="option-btn" data-value="a" onclick="pick(this,5)">
        <span class="opt-icon">🌵</span>
        <span class="opt-text"><strong>"El Paso, Texas — the 915."</strong><span>Loud and proud, no further explanation needed</span></span>
      </button>
      <button class="option-btn" data-value="b" onclick="pick(this,5)">
        <span class="opt-icon">🌐</span>
        <span class="opt-text"><strong>"The borderland — it's complicated."</strong><span>Two countries, one city, rich history</span></span>
      </button>
      <button class="option-btn" data-value="c" onclick="pick(this,5)">
        <span class="opt-icon">🏔️</span>
        <span class="opt-text"><strong>"West Texas, the Franklins are my backyard."</strong><span>Desert and mountains define me</span></span>
      </button>
      <button class="option-btn" data-value="d" onclick="pick(this,5)">
        <span class="opt-icon">🙂</span>
        <span class="opt-text"><strong>"El Paso — you should visit sometime."</strong><span>Humble, inviting, genuinely proud</span></span>
      </button>
    </div>
    <button class="next-btn" id="next-5" onclick="showResult()">See My Cheese! 🧀</button>
  </div>

  <!-- Result -->
  <div class="step" id="result-step" data-q="6">
    <div class="result-card" id="result-content"></div>
    <div style="text-align:center; margin-top:1.5rem;">
      <button class="restart-btn" onclick="restart()">← Take It Again</button>
    </div>
  </div>

  <p class="national-day-note">🧀 Happy National Cheese Day — celebrated every June 4th in the USA</p>
</div>

<script>
const answers = [null, null, null, null, null, null];

const results = [
  {
    emoji: "🧀",
    name: "Queso Chihuahua",
    subtitle: "West Side Royalty",
    hood: "Westside · Kern Place · Mesa Hills",
    desc: "Smooth, melty, and deeply rooted in the borderland — you're Queso Chihuahua (also called Queso Menonita). Named after the state just across the bridge, this cheese is the backbone of every great dish in El Paso. You're cultured, well-traveled between two worlds, and you make everything better just by being there. UTEP would be proud.",
    fact: "🧀 <strong>Fun fact:</strong> Queso Chihuahua comes from Mennonite communities in Chihuahua, Mexico — communities that have shaped the cheese culture of the entire El Paso–Juárez region for over a century.",
  },
  {
    emoji: "🫕",
    name: "Pepper Jack",
    subtitle: "East Side Heat",
    hood: "Eastwood · Zaragoza · Far East El Paso",
    desc: "You've got a kick. Pepper Jack is bold, dependable, and doesn't need a fancy setting to shine — it shows up and delivers every time. East El Paso is the heart of family life and real community, and so are you. You melt well under pressure, spice things up without trying, and pair perfectly with green chile anything.",
    fact: "🧀 <strong>Fun fact:</strong> Pepper Jack is one of America's fastest-growing cheese varieties. Like the East Side, it's gained major recognition while staying true to its roots.",
  },
  {
    emoji: "🏺",
    name: "Aged Manchego",
    subtitle: "Downtown Soul",
    hood: "Downtown · Segundo Barrio · Historic District",
    desc: "Rich in history, complex in flavor, and better appreciated the longer you know it — you're Aged Manchego. Downtown El Paso has survived, been rediscovered, and risen again. You appreciate murals, know your neighborhood's stories, and you've got that quiet confidence that comes from knowing where things come from.",
    fact: "🧀 <strong>Fun fact:</strong> Manchego has roots in Spain but thrives in Mexico — perfectly reflecting Downtown El Paso's layered Spanish colonial, Mexican, and American heritage all on one street.",
  },
  {
    emoji: "🌿",
    name: "Oaxacan String Cheese (Quesillo)",
    subtitle: "Northeast Desert Dreamer",
    hood: "Transmountain · Horizon City · Upper Valley",
    desc: "You're Quesillo — flexible, stretchy, and surprisingly deep once you pull back the layers. Northeast El Paso is wide open, growing fast, and full of families building something new. You're adaptable, you love the outdoors, and you probably have the best view of the Franklins from your front porch. Don't take that for granted.",
    fact: "🧀 <strong>Fun fact:</strong> Quesillo (Oaxacan string cheese) is made by hand-pulling curds in hot water — a labor of love. Like Northeast El Paso, it's all about building something from the ground up.",
  }
];

function pick(btn, qIndex) {
  const group = btn.closest('.step').querySelectorAll('.option-btn');
  group.forEach(b => b.classList.remove('selected'));
  btn.classList.add('selected');
  answers[qIndex] = btn.dataset.value;
  const nextBtn = document.getElementById('next-' + qIndex);
  nextBtn.classList.add('visible');
}

function nextQ(n) {
  document.querySelectorAll('.step').forEach(s => s.classList.remove('active'));
  document.querySelector(`[data-q="${n}"]`).classList.add('active');
  const pct = Math.round((n / 6) * 100);
  document.getElementById('progress').style.width = pct + '%';
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function showResult() {
  const scores = { a: 0, b: 0, c: 0, d: 0 };
  answers.forEach(a => { if (a) scores[a]++; });
  const top = Object.entries(scores).sort((x, y) => y[1] - x[1])[0][0];
  const idx = { a: 0, b: 1, c: 2, d: 3 }[top];
  const r = results[idx];

  document.getElementById('result-content').innerHTML = `
    <div class="result-emoji">${r.emoji}</div>
    <div class="result-tag">You are...</div>
    <h2 class="result-name">${r.name}</h2>
    <p class="result-subtitle">${r.subtitle}</p>
    <p class="result-desc">${r.desc}</p>
    <div class="result-hood">📍 Your El Paso zone: <strong>${r.hood}</strong></div>
    <div class="fun-fact">${r.fact}</div>
  `;

  nextQ(6);
  document.getElementById('progress').style.width = '100%';
}

function restart() {
  answers.fill(null);
  document.querySelectorAll('.option-btn').forEach(b => b.classList.remove('selected'));
  document.querySelectorAll('.next-btn').forEach(b => b.classList.remove('visible'));
  nextQ(0);
  document.getElementById('progress').style.width = '0%';
}
</script>
</body>
</html>
