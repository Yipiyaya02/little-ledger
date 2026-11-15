/* Little Ledger — Hammy's Little World
   Add this file beside index.html, then include:
   <script src="./game-upgrade.js"></script>
   immediately after the app's existing inline script.
*/
(() => {
  'use strict';

  const $ = (id) => document.getElementById(id);
  if (!$('savingsScene') || typeof render !== 'function' || typeof game === 'undefined') {
    console.warn('Little Ledger game upgrade: the original app elements were not found.');
    return;
  }

  const style = document.createElement('style');
  style.textContent = `
    .ll-note{display:flex;align-items:center;gap:12px;padding:13px 15px;margin:0 0 13px;border-radius:17px;background:linear-gradient(135deg,#fff5e9,#fff0f3);color:#765746;border:1px solid #f3e3d7}
    .ll-note .ll-note-face{font-size:34px;flex:0 0 auto}
    .ll-note strong{display:block;font-size:14px;margin-bottom:3px}
    .ll-note p{font-size:13px;line-height:1.45;margin:0}
    .ll-world{position:relative;isolation:isolate;min-height:330px;border-radius:20px;overflow:hidden;padding:14px;box-sizing:border-box;color:#594c43}
    .ll-world *{box-sizing:border-box}
    .ll-world.cozy{background:linear-gradient(#f8e8d8 0 68%,#c99d79 68% 100%)}
    .ll-world.sunny{background:linear-gradient(#9edcf4 0 57%,#a8d88c 57% 100%)}
    .ll-world.forest{background:linear-gradient(#b9d9c4 0 54%,#6f9e70 54% 100%)}
    .ll-world.pastel{background:linear-gradient(#f7dce9 0 65%,#d8c7e9 65% 100%)}
    .ll-world .ll-sun{position:absolute;right:25px;top:22px;width:42px;height:42px;border-radius:50%;background:#ffe59a;box-shadow:0 0 0 10px #ffe59a33}
    .ll-world .ll-window{position:absolute;left:7%;top:13%;width:100px;height:105px;border:7px solid #fff8ec;border-radius:13px;background:linear-gradient(#a9dff2 0 55%,#d8efc9 55%);box-shadow:0 4px 10px #80634a22}
    .ll-world .ll-window:before,.ll-world .ll-window:after{content:"";position:absolute;background:#fff8ec}
    .ll-world .ll-window:before{width:5px;height:100%;left:50%}
    .ll-world .ll-window:after{height:5px;width:100%;top:50%}
    .ll-world .ll-rug{position:absolute;bottom:8%;left:25%;width:50%;height:45px;border-radius:50%;background:#f5d5bcaa;border:3px solid #fff1df}
    .ll-world .ll-bed{position:absolute;bottom:17%;left:6%;width:29%;height:62px;border-radius:12px 12px 6px 6px;background:#e8b5a9;border-bottom:9px solid #b87f70;box-shadow:0 5px 0 #8f6657}
    .ll-world .ll-bed:before{content:"";position:absolute;left:8px;top:-12px;width:40%;height:24px;border-radius:9px;background:#fff2e5}
    .ll-world .ll-shelf{position:absolute;right:7%;top:32%;width:75px;height:12px;background:#a97853;box-shadow:0 30px 0 #a97853,0 60px 0 #a97853}
    .ll-world .ll-shelf:before{content:"📚  🪴";position:absolute;top:-27px;left:4px;font-size:19px;white-space:nowrap}
    .ll-world .ll-lamp{position:absolute;right:17%;bottom:18%;font-size:35px}
    .ll-world .ll-tree{position:absolute;bottom:22%;font-size:74px;filter:drop-shadow(0 4px 2px #315d3340)}
    .ll-world .ll-tree.left{left:1%}.ll-world .ll-tree.right{right:0%;font-size:88px}
    .ll-world .ll-bush{position:absolute;bottom:12%;font-size:38px}
    .ll-world .ll-slide{position:absolute;right:12%;bottom:19%;font-size:75px;transform:rotate(-8deg)}
    .ll-world .ll-swing{position:absolute;left:23%;top:22%;font-size:56px}
    .ll-world .ll-bench{position:absolute;right:7%;bottom:13%;font-size:39px}
    .ll-world .ll-log{position:absolute;left:12%;bottom:15%;font-size:43px}
    .ll-world .ll-mushrooms{position:absolute;right:13%;bottom:17%;font-size:34px}
    .ll-world .ll-tent{position:absolute;left:7%;bottom:15%;font-size:76px}
    .ll-world .ll-toys{position:absolute;right:8%;bottom:19%;font-size:43px}
    .ll-world .ll-cushion{position:absolute;left:38%;bottom:12%;font-size:43px}
    .ll-world .ll-sprite{position:absolute;z-index:4;left:50%;bottom:17%;transform:translateX(-50%);border:0;background:transparent;padding:0;cursor:pointer;text-align:center;animation:ll-bob 2.8s ease-in-out infinite}
    .ll-world .ll-sprite .ll-animal{display:block;font-size:75px;line-height:1.1;filter:drop-shadow(0 5px 2px #594c4325)}
    .ll-world .ll-sprite small{display:inline-block;margin-top:3px;padding:3px 9px;border-radius:20px;background:#ffffffd9;color:#69564b;font-size:11px;font-weight:700}
    .ll-world .ll-plant{position:absolute;z-index:4;left:50%;bottom:15%;transform:translateX(-50%);font-size:85px;filter:drop-shadow(0 4px 2px #594c4325);animation:ll-sway 3.5s ease-in-out infinite}
    .ll-world .ll-topline{position:relative;z-index:5;display:flex;justify-content:space-between;gap:8px;font-size:12px;font-weight:700}
    .ll-world .ll-pill{background:#ffffffd9;border-radius:20px;padding:6px 9px}
    .ll-world .ll-object{position:absolute;z-index:6;border:0;background:#ffffffd9;border-radius:15px;padding:6px 9px;font-size:12px;color:#655348;cursor:pointer;box-shadow:0 3px 8px #55412a18}
    .ll-world .ll-object:active,.ll-game-btn:active{transform:scale(.96)}
    .ll-world .ll-o1{left:7%;bottom:5%}.ll-world .ll-o2{right:7%;bottom:5%}
    .ll-world .ll-sparkle{position:absolute;z-index:3;font-size:20px;animation:ll-twinkle 2s ease-in-out infinite}
    .ll-world .ll-sp1{left:43%;top:24%}.ll-world .ll-sp2{right:25%;top:44%}
    @keyframes ll-bob{0%,100%{margin-bottom:0}50%{margin-bottom:8px}}
    @keyframes ll-sway{0%,100%{transform:translateX(-50%) rotate(-3deg)}50%{transform:translateX(-50%) rotate(3deg)}}
    @keyframes ll-twinkle{0%,100%{opacity:.45;transform:scale(.8)}50%{opacity:1;transform:scale(1.15)}}
    .ll-needs{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:8px;margin:12px 0}
    .ll-need{background:var(--card,#fff);border:1px solid var(--border,#eee);border-radius:12px;padding:8px 10px;font-size:11px}
    .ll-need-head{display:flex;justify-content:space-between;gap:5px;margin-bottom:5px}
    .ll-meter{height:6px;border-radius:8px;background:#eee;overflow:hidden}
    .ll-meter span{display:block;height:100%;border-radius:8px;background:linear-gradient(90deg,#9bc9a0,#e5c98a)}
    .ll-actions{display:flex;flex-wrap:wrap;gap:7px;margin:10px 0}
    .ll-game-btn{border:1px solid var(--border,#eadfd6);border-radius:20px;background:var(--card,#fff);color:var(--text,#594c43);padding:8px 12px;font-size:12px;cursor:pointer}
    .ll-shop{border:1px solid var(--border,#eee);border-radius:15px;padding:12px;margin-top:12px;background:var(--card,#fff)}
    .ll-shop-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:8px;margin-top:8px}
    .ll-shop-item{border:1px solid var(--border,#eee);border-radius:12px;padding:9px;font-size:12px}
    .ll-shop-item button{margin-top:6px;border:0;border-radius:14px;padding:5px 9px;background:#f4e7d8;color:#71543e;font-size:11px}
    .ll-small-muted{font-size:11px;opacity:.72}
    @media(min-width:600px){.ll-needs{grid-template-columns:repeat(3,minmax(0,1fr))}}
  `;
  document.head.appendChild(style);

  const notes = [
    ['Hey, how are you today?','I’m here with you! 🐹'],
    ['Have you eaten yet?','A little tummy needs a little happiness too.'],
    ['Ding dong!','It’s time for a sip of water. 💧'],
    ['Drive safe, okay?','I’ll be right here when you get back.'],
    ['How was your day?','Tell me everything. I’m a very good listener.'],
    ['Rest up, little human.','You deserve a soft and peaceful evening.'],
    ['Get yourself a cocoa milk!','A tiny treat can brighten an ordinary day. ☕'],
    ['I love you.','That’s the whole message. ❤️'],
    ['Psst…','You’re doing better than you think.'],
    ['Today’s forecast:','A 100% chance of hamster cuteness.'],
    ['Why did I sit on the clock?','I wanted to be on time. ⏰'],
    ['What do hamsters eat for breakfast?','Ham-and-eggs. Hehe.'],
    ['I tried to run a marathon…','But my wheel kept moving with me.'],
    ['Knock knock!','Who’s there? Hammy. Hammy who? Hammy glad you’re here!'],
    ['I have a cheesy joke…','But it’s a little too mature. 🧀'],
    ['Breaking news!','The cutest human has opened the app.'],
    ['You don’t have to do everything today.','One little step is enough.'],
    ['Small steps still count.','Keep going at your own pace. 🌱'],
    ['Your dreams matter.','Make a little space for them today.'],
    ['慢慢来，不用急。','我会一直在这里陪着你。❤️'],
    ['今天也辛苦啦！','记得好好吃饭，照顾自己。'],
    ['你已经很棒了。','别忘了给自己一点掌声。'],
    ['累了就休息一下吧。','休息不是偷懒，是照顾自己。'],
    ['今天也要开心一点哦！','送你一个大大的抱抱。'],
    ['一步一步来。','你正在慢慢靠近想要的生活。'],
    ['记得喝水！','叮咚～小小补水时间 💧'],
    ['我爱你！','今天、明天，还有每一天。'],
    ['别忘了微笑。','你的笑容很珍贵。'],
    ['You are allowed to begin again.','There is no need to rush.'],
    ['I’m proud of you.','Even for the little things nobody else sees.'],
    ['Take a breath.','You’re right where you need to be for this moment.'],
    ['A little reminder:','You deserve the same kindness you give others.']
  ];

  let currentNote = notes[Math.floor(Math.random() * notes.length)];
  let lastNoteIndex = -1;

  function safeName(value, fallback) {
    const s = String(value || '').trim().slice(0, 22);
    return s || fallback;
  }
  function normaliseGame() {
    const defaults = {
      pet: '🐹', plant: '🌻', room: 'cozy',
      petName: 'Hammy', plantName: 'Sunny',
      hunger: 72, happiness: 78, energy: 80, cleanliness: 85, affection: 75,
      water: 72, sunlight: 75, plantHealth: 80, growth: 1,
      inventory: []
    };
    Object.keys(defaults).forEach(k => {
      if (game[k] === undefined || game[k] === null) game[k] = defaults[k];
    });
    if (!Array.isArray(game.inventory)) game.inventory = [];
    if (!['cozy','sunny','forest','pastel'].includes(game.room)) game.room = 'cozy';
    if (!game.pet || game.pet === '🐼') game.pet = '🐹';
    if (!game.petName || game.petName === 'Panda') game.petName = 'Hammy';
  }
  function saveGame() {
    try { localStorage.setItem('littleLedger_game', JSON.stringify(game)); } catch (e) {}
  }
  function pickNote() {
    if (notes.length < 2) return;
    let i = Math.floor(Math.random() * notes.length);
    if (i === lastNoteIndex) i = (i + 1) % notes.length;
    lastNoteIndex = i;
    currentNote = notes[i];
    paintNote();
  }
  function paintNote() {
    const html = `<div class="ll-note" id="llNote"><div class="ll-note-face">🐹💌</div><div><strong>${currentNote[0]}</strong><p>${currentNote[1]}</p></div></div>`;
    const home = $('homePage');
    if (home) {
      let target = home.querySelector('.ll-note');
      if (!target) {
        target = document.createElement('div');
        target.className = 'll-note';
        const firstPanel = home.querySelector('.panel');
        if (firstPanel) home.insertBefore(target, firstPanel);
        else home.insertBefore(target, home.firstChild);
      }
      target.innerHTML = `<div class="ll-note-face">🐹💌</div><div><strong>${currentNote[0]}</strong><p>${currentNote[1]}</p></div>`;
    }
  }

  function need(label, value, icon) {
    const n = Math.max(0, Math.min(100, Number(value) || 0));
    return `<div class="ll-need"><div class="ll-need-head"><span>${icon} ${label}</span><b>${n}%</b></div><div class="ll-meter"><span style="width:${n}%"></span></div></div>`;
  }
  function buildWorld() {
    normaliseGame();
    const scene = $('savingsScene');
    if (!scene) return;
    const room = game.room;
    const zoo = savingsMode !== 'garden';
    const name = safeName(zoo ? game.petName : game.plantName, zoo ? 'Hammy' : 'Sunny');
    scene.className = `gamepet ll-world ${room}`;
    const decorations = {
      cozy: `<div class="ll-window"></div><div class="ll-bed"></div><div class="ll-rug"></div><div class="ll-shelf"></div><div class="ll-lamp">🛋️</div><div class="ll-sparkle ll-sp1">✨</div>`,
      sunny: `<div class="ll-sun"></div><div class="ll-swing">🛝</div><div class="ll-slide">🛝</div><div class="ll-bench">🪑</div><div class="ll-bush" style="left:4%">🌼</div><div class="ll-bush" style="left:70%">🌷</div><div class="ll-sparkle ll-sp1">🦋</div>`,
      forest: `<div class="ll-tree left">🌳</div><div class="ll-tree right">🌲</div><div class="ll-log">🪵</div><div class="ll-mushrooms">🍄</div><div class="ll-bush" style="left:72%">🌿</div><div class="ll-sparkle ll-sp1">✨</div>`,
      pastel: `<div class="ll-tent">⛺</div><div class="ll-toys">🧸🪀</div><div class="ll-cushion">🛋️</div><div class="ll-shelf"></div><div class="ll-sparkle ll-sp1">⭐</div>`
    };
    const top = `<div class="ll-topline"><span class="ll-pill">${room === 'cozy' ? '🏡 Cozy Room' : room === 'sunny' ? '☀️ Sunny Playground' : room === 'forest' ? '🌳 Forest Hideaway' : '🎀 Pastel Playroom'}</span><span class="ll-pill">${zoo ? '🐹 My little friend' : '🌻 My little garden'}</span></div>`;
    const character = zoo
      ? `<button class="ll-sprite" type="button" data-world-action="pet" aria-label="Give ${name} a little love"><span class="ll-animal">${game.pet || '🐹'}</span><small>${name} · tap to say hello</small></button>`
      : `<div class="ll-plant" aria-label="${name}">${game.plant || '🌻'}</div><div class="ll-sparkle ll-sp2">🦋</div>`;
    const object1 = zoo
      ? `<button class="ll-object ll-o1" data-world-action="play">🧸 Play with me</button><button class="ll-object ll-o2" data-world-action="rest">🛏️ Cozy rest</button>`
      : `<button class="ll-object ll-o1" data-world-action="water">💧 Water me</button><button class="ll-object ll-o2" data-world-action="sun">☀️ Sunshine</button>`;
    scene.innerHTML = `${decorations[room]}${top}${character}${object1}`;
    const actions = $('gameActions');
    if (actions) {
      actions.innerHTML = zoo
        ? `<div class="ll-actions"><button class="ll-game-btn" data-world-action="feed">🥕 Feed</button><button class="ll-game-btn" data-world-action="play">🧸 Play</button><button class="ll-game-btn" data-world-action="rest">💤 Rest</button><button class="ll-game-btn" data-world-action="clean">🫧 Tidy up</button><button class="ll-game-btn" data-world-action="pet">❤️ Cuddle</button></div>`
        : `<div class="ll-actions"><button class="ll-game-btn" data-world-action="water">💧 Water</button><button class="ll-game-btn" data-world-action="sun">☀️ Sunlight</button><button class="ll-game-btn" data-world-action="feedplant">🌱 Feed plant</button><button class="ll-game-btn" data-world-action="weed">🍃 Tidy garden</button><button class="ll-game-btn" data-world-action="talk">💗 Talk to plant</button></div>`;
      actions.insertAdjacentHTML('beforeend', `
        <div class="ll-actions">
          <button class="ll-game-btn" id="llRename">${zoo ? '✏️ Name your friend' : '✏️ Name your plant'}</button>
          <button class="ll-game-btn" id="llNewNote">💌 Another little note</button>
        </div>
        <div class="ll-needs">
          ${zoo
            ? need('Tummy',game.hunger,'🥕')+need('Happiness',game.happiness,'😊')+need('Energy',game.energy,'⚡')+need('Freshness',game.cleanliness,'🫧')+need('Love',game.affection,'❤️')
            : need('Water',game.water,'💧')+need('Sunshine',game.sunlight,'☀️')+need('Wellbeing',game.plantHealth,'🌱')}
        </div>
        <div class="ll-shop">
          <strong>✨ Little Stars Shop</strong>
          <div class="ll-small-muted">You have ${typeof availableTokens === 'function' ? availableTokens() : 0} Little Stars. Spend them on tiny treats and decorations — your real savings are never used.</div>
          <div class="ll-shop-grid">
            ${shopItem('🥕','Hammy snack',1,'snack',zoo)}
            ${shopItem('🛏️','Soft little bed',2,'bed',zoo)}
            ${shopItem('🧸','Cute toy',2,'toy',zoo)}
            ${shopItem('🪴','Pretty pot',2,'pot',!zoo)}
          </div>
          <div class="ll-small-muted" style="margin-top:8px">Your little collection: ${(game.inventory || []).length ? game.inventory.join(', ') : 'A new world starts with a little love.'}</div>
        </div>`);
    }
    const rename = $('llRename');
    if (rename) rename.onclick = () => {
      const next = prompt(zoo ? 'What would you like to name your little friend?' : 'What would you like to name your plant?', name);
      if (next && next.trim()) {
        if (zoo) game.petName = next.trim().slice(0,22);
        else game.plantName = next.trim().slice(0,22);
        saveGame(); render();
      }
    };
    const noteButton = $('llNewNote');
    if (noteButton) noteButton.onclick = pickNote;
  }

  function shopItem(emoji, label, cost, id, relevant) {
    if (!relevant) return `<div class="ll-shop-item" style="opacity:.55">${emoji} ${label}<div class="ll-small-muted">For the other world</div></div>`;
    return `<div class="ll-shop-item">${emoji} ${label}<div class="ll-small-muted">${cost} ⭐</div><button type="button" data-buy="${id}" data-cost="${cost}">Bring home</button></div>`;
  }

  function adjust(key, amount) {
    game[key] = Math.max(0, Math.min(100, (Number(game[key]) || 0) + amount));
  }
  function act(action) {
    normaliseGame();
    const zoo = savingsMode !== 'garden';
    const actions = zoo ? {
      feed: () => { adjust('hunger',18); adjust('happiness',3); return 'Yum yum! Hammy is happily munching. 🥕'; },
      play: () => { adjust('happiness',16); adjust('energy',-5); return 'Wheeee! That was fun! 🧸'; },
      rest: () => { adjust('energy',20); return 'A peaceful little nap. Zzz…'; },
      clean: () => { adjust('cleanliness',18); return 'All fresh and fluffy again!'; },
      pet: () => { adjust('affection',12); adjust('happiness',7); return 'Hammy sends you a tiny cuddle. ❤️'; }
    } : {
      water: () => { adjust('water',20); adjust('plantHealth',5); return 'A refreshing drink for your little plant. 💧'; },
      sun: () => { adjust('sunlight',18); adjust('plantHealth',4); return 'A little sunshine makes the day brighter. ☀️'; },
      feedplant: () => { adjust('plantHealth',15); game.growth = Math.min(4,(Number(game.growth)||1)+0.1); return 'Your plant is growing gently. 🌱'; },
      weed: () => { adjust('plantHealth',5); return 'Your little garden looks lovely and tidy. 🍃'; },
      talk: () => { adjust('plantHealth',3); return 'Your plant loves your company. 💗'; }
    };
    if (!actions[action]) return;
    const message = actions[action]();
    game.careCount = (Number(game.careCount) || 0) + 1;
    saveGame();
    render();
    if (typeof showToast === 'function') showToast(message);
    else if (typeof toast === 'function') toast(message);
  }

  function buy(item, cost) {
    const stars = typeof availableTokens === 'function' ? availableTokens() : 0;
    if (stars < cost) {
      alert(`You need ${cost} Little Stars for this treat. Keep enjoying your little world — no rush. ⭐`);
      return;
    }
    game.spentTokens = (Number(game.spentTokens) || 0) + cost;
    game.inventory = Array.isArray(game.inventory) ? game.inventory : [];
    const names = {snack:'Hammy snack',bed:'Soft little bed',toy:'Cute toy',pot:'Pretty pot'};
    game.inventory.push(names[item] || item);
    saveGame();
    render();
    alert(`${names[item] || 'Your new item'} is yours! A little happiness for your world. 💗`);
  }

  const oldRender = render;
  render = function(...args) {
    normaliseGame();
    const result = oldRender.apply(this, args);
    buildWorld();
    paintNote();
    return result;
  };

  const scene = $('savingsScene');
  scene.addEventListener('click', (event) => {
    const target = event.target.closest('[data-world-action]');
    if (target) act(target.getAttribute('data-world-action'));
  });
  document.addEventListener('click', (event) => {
    const target = event.target.closest('[data-world-action]');
    if (target && !scene.contains(target)) act(target.getAttribute('data-world-action'));
    const buyButton = event.target.closest('[data-buy]');
    if (buyButton) buy(buyButton.getAttribute('data-buy'), Number(buyButton.getAttribute('data-cost')) || 1);
  });

  const oldSetView = typeof setView === 'function' ? setView : null;
  if (oldSetView) {
    setView = function(view, ...args) {
      const result = oldSetView.call(this, view, ...args);
      if (String(view).toLowerCase().includes('savings')) pickNote();
      return result;
    };
  }

  normaliseGame();
  if (game.pet === '🐼') game.pet = '🐹';
  if (!game.petName || game.petName === 'Panda') game.petName = 'Hammy';
  saveGame();
  render();
  paintNote();
})();
