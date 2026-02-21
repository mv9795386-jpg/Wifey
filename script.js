// ====== FINAL SETTINGS (Fixed) ======
const RIYA_NAME = "Wifey";
const YOUR_NAME = "Mukul";
const MEET_DATE = "2026-12-01"; // December fixed (change only if you want)
const REASONS_TARGET = 101;

// Love letter (typed)
const LOVE_LETTER = `
Wifey (Sohna)…
abhi hum mile nahi hain, par tumhari jagah meri life me already fixed hai.

Reels se shuru hua tha… par feelings bilkul real hain.
Main December ka wait kar raha hoon —
aur jis din hum milenge, main tumhe sirf words nahi,
actions me feel karaunga ki tum kitni special ho.

Main tumhe respect karta hoon.
Main tumhe safe rakhna chahta hoon.
Main tumhari happiness choose karta hoon — har din.

Future wife… main ready hoon.
Bas tum mil jao. ♡
`;

// DM: cinematic, emotional, “No.1”
const DM_SEQUENCE = [
  { from:"me",   text:"Wifey… (Sohna) suno na 🥺" },
  { from:"riya", text:"Haan bolo 🙂" },
  { from:"me",   text:"Hum abhi mile nahi… but tum meri day ki sabse best feeling ban chuki ho." },
  { from:"me",   text:"Reels pe dekhta hoon tumhe… aur dil bolta hai: ‘yeh meri hai’ 💗" },
  { from:"riya", text:"Awww 😳❤️" },
  { from:"me",   text:"Main December ka wait kar raha hoon… us din main pehle hug me hi keh dunga: ‘Welcome home’ 🫂" },
  { from:"me",   text:"Sohna, main tumhe impress nahi— protect & respect karna chahta hoon. Always." },
  { from:"me",   text:"Tum gussa bhi karo, main handle kar lunga. Tum royo, main sambhal lunga." },
  { from:"me",   text:"Aur tum hanso… toh meri duniya set ho jaati hai." },
  { from:"riya", text:"Tum itne cute kyu ho 😭💖" },
  { from:"me",   text:"Kyuki main tumhara Mukul hoon… aur tum meri Wifey." },
  { from:"me",   text:"Ek promise: main tumhe har din choose karunga — online bhi, real life bhi. 💍✨" },
  { from:"riya", text:"Stoppp 😭❤️" },
  { from:"me",   text:"Last line… ready? 🥺" },
  { from:"me",   text:"Wifey… I love you. And I’m not going anywhere. ♾️💗" },
];

// Promises list (beautiful)
const PROMISES = [
  "Main tumhe <b>respect</b> dunga — hamesha.",
  "Main tumhari <b>feelings</b> ko kabhi chhota nahi samjhunga.",
  "Main tumhare saath <b>honest</b> rahunga — always.",
  "Main tumhe <b>safe</b> feel karaunga — har waqt.",
  "Main tumhari <b>happiness</b> choose karunga — daily.",
  "Main tumhe <b>listen</b> karunga, sirf reply nahi.",
  "Main tumhare sapno me <b>support</b> banunga.",
  "Main tumhe <b>forever</b> choose karunga. ♾️",
];

// ====== Helpers ======
const qs = (s) => document.querySelector(s);
const el = (tag, cls) => { const e=document.createElement(tag); if(cls) e.className=cls; return e; };

function daysUntil(dateStr){
  const target = new Date(dateStr + "T00:00:00");
  const now = new Date();
  return Math.ceil((target - now) / (1000*60*60*24));
}

function formatMeetLine(){
  const d = new Date(MEET_DATE + "T00:00:00");
  return d.toLocaleDateString(undefined, { year:"numeric", month:"long", day:"numeric" });
}

function typeLetter(node, text, speed=13){
  node.textContent = "";
  let i=0;
  const timer=setInterval(()=>{
    node.textContent += text[i++] || "";
    if(i>=text.length) clearInterval(timer);
  }, speed);
}

function animateCounter(node, target, duration=900){
  const t0=performance.now();
  function tick(t){
    const p=Math.min(1,(t-t0)/duration);
    const val=Math.floor(target*(1-Math.pow(1-p,3)));
    node.textContent=val;
    if(p<1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}

// Floating hearts (premium)
function burstHearts(n=26){
  const hearts = ["💖","💗","💞","💕","💓","✨","🫶"];
  for(let i=0;i<n;i++){
    const h=el("div","fh");
    h.textContent = hearts[Math.floor(Math.random()*hearts.length)];
    h.style.left = (Math.random()*100) + "vw";
    h.style.top  = (60 + Math.random()*30) + "vh";
    h.style.fontSize = (14 + Math.random()*18) + "px";
    h.style.opacity = "1";
    document.body.appendChild(h);

    requestAnimationFrame(()=>{
      h.style.transform = `translateY(-${200+Math.random()*280}px) scale(${0.8+Math.random()*0.8})`;
      h.style.opacity = "0";
    });

    setTimeout(()=>h.remove(), 1300);
  }
}

// ====== Init ======
qs("#yourName").textContent = YOUR_NAME;
qs("#dateStamp").textContent = new Date().toDateString();

qs("#subText").innerHTML = `
Jab tum ye website khologe, bas itna samajh lena—
<b>Mukul tumhe hadd se zyada pyar karta hai.</b>
Tum meri choice nahi, meri dua ho.
<br/><br/>
<span style="opacity:.85">December meet planned: <b>${formatMeetLine()}</b> ✨</span>
`;

typeLetter(qs("#letterText"), LOVE_LETTER.trim(), 12);
animateCounter(qs("#loveCounter"), REASONS_TARGET, 950);

const dLeft = daysUntil(MEET_DATE);
qs("#daysCounter").textContent = dLeft > 0 ? dLeft : 0;
qs("#daysLabel").textContent = "Days Until We Meet";

// Promises render
const ul = qs("#promiseList");
PROMISES.forEach(p=>{
  const li=document.createElement("li");
  li.innerHTML = "💗 " + p;
  ul.appendChild(li);
});

// Scroll buttons
qs("#openGallery").addEventListener("click", ()=>scrollToId("gallerySection"));
qs("#openPromises").addEventListener("click", ()=>scrollToId("promises"));
function scrollToId(id){ document.getElementById(id).scrollIntoView({behavior:"smooth", block:"start"}); }

// Music
const bgm = qs("#bgm");
let musicOn=false;
qs("#musicBtn").addEventListener("click", async ()=>{
  try{
    if(!musicOn){ await bgm.play(); musicOn=true; qs("#musicBtn").textContent="❚❚"; }
    else{ bgm.pause(); musicOn=false; qs("#musicBtn").textContent="♫"; }
  }catch(e){
    alert("Optional: assets/love.mp3 add kar do (music ke liye).");
  }
});

// Surprise
qs("#surpriseBtn").addEventListener("click", ()=>{
  burstHearts(34);
  scrollToId("letter");
  setTimeout(openDM, 650);
});

// Promise Boom
qs("#promiseBoom").addEventListener("click", ()=>{
  burstHearts(50);
  qs("#finalMsg").textContent = "Promises sealed, Wifey. Mukul is yours. 💍💖";
  scrollToId("final");
});

// ====== DM Modal (No.1) ======
const dmModal=qs("#dmModal");
const dmChat=qs("#dmChat");
const typing=qs("#typing");
let dmIndex=0;

qs("#openDM").addEventListener("click", openDM);
qs("#closeDM").addEventListener("click", closeDM);
qs("#nextMsg").addEventListener("click", pushNextMsg);

// Close on ESC
document.addEventListener("keydown",(e)=>{ if(e.key==="Escape") closeDM(); });

function openDM(){
  dmModal.classList.add("show");
  dmModal.setAttribute("aria-hidden","false");
  if(dmChat.childElementCount===0){
    dmIndex=0;
    pushNextMsg();
  }
}

function closeDM(){
  dmModal.classList.remove("show");
  dmModal.setAttribute("aria-hidden","true");
}

function pushNextMsg(){
  if(dmIndex>=DM_SEQUENCE.length){
    typing.textContent = "Wifey is smiling… 😊";
    burstHearts(18);
    return;
  }

  const msg = DM_SEQUENCE[dmIndex++];
  typing.textContent = msg.from==="me" ? "Mukul is typing…" : "Wifey is typing…";

  // typing delay depends on message length
  const delay = Math.min(1400, 500 + msg.text.length * 18);

  setTimeout(()=>{
    typing.textContent = "";
    dmChat.appendChild(makeBubble(msg.from, msg.text));
    dmChat.scrollTop = dmChat.scrollHeight;

    // auto heart burst on special lines
    if(/hug|home|love|forever|Wifey|Sohna|💍|♾️/i.test(msg.text)) burstHearts(8);
  }, delay);
}

function makeBubble(who, text){
  const b=el("div","bubble "+(who==="me"?"me":"riya"));
  b.textContent=text;

  const meta=el("div","meta");
  const time=el("span");
  time.textContent=new Date().toLocaleTimeString([], {hour:"2-digit", minute:"2-digit"});
  const seen=el("span","seen");
  seen.textContent = who==="me" ? "seen ✓✓" : "";
  meta.appendChild(time); meta.appendChild(seen);
  b.appendChild(meta);

  return b;
}

// ====== Gallery Lightbox ======
const lightbox=qs("#lightbox");
const lightboxImg=qs("#lightboxImg");

document.querySelectorAll(".gallery img").forEach(img=>{
  img.addEventListener("click", ()=>{
    lightbox.classList.add("show");
    lightbox.setAttribute("aria-hidden","false");
    lightboxImg.src=img.src;
  });
});
lightbox.addEventListener("click", ()=>{
  lightbox.classList.remove("show");
  lightbox.setAttribute("aria-hidden","true");
});

// ====== Final buttons ======
qs("#yesBtn").addEventListener("click", ()=>{
  qs("#finalMsg").textContent = "Yay! Wifey forever. December meet ke baad main tumhara officially forever hoon 💍💖";
  burstHearts(60);
});

let noCount=0;
qs("#noBtn").addEventListener("click", ()=>{
  noCount++;
  const msgs=[
    "Nahi chalega 🙈",
    "Wifey please 😭",
    "Main mana nahi sun sakta 🥺",
    "Okay… December meet pe hug then YES? 😌💗",
    "Wifey… ab toh YES hi hoga 😤💖"
  ];
  qs("#finalMsg").textContent = msgs[Math.min(noCount-1, msgs.length-1)];
  moveButton(qs("#noBtn"));
});

function moveButton(btn){
  const x=(Math.random()*240)-120;
  const y=(Math.random()*120)-60;
  btn.style.transform=`translate(${x}px, ${y}px)`;
  }
