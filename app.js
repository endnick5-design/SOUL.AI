const form=document.getElementById('chatForm');
const input=document.getElementById('promptInput');
const messages=document.getElementById('messages');
const typing=document.getElementById('typing');
const orbCaption=document.getElementById('orbCaption');
const statusText=document.getElementById('statusText');

function addMessage(text,who){
  const item=document.createElement('div'); item.className=`message ${who==='user'?'user-message':'soul-message'}`;
  const avatar=document.createElement('div'); avatar.className='avatar'; avatar.textContent=who==='user'?'A':'S';
  const bubble=document.createElement('div'); bubble.className='bubble';
  const sender=document.createElement('span'); sender.className='sender'; sender.textContent=who==='user'?'YOU':'SOUL';
  const p=document.createElement('p'); p.textContent=text;
  bubble.append(sender,p); item.append(avatar,bubble); messages.append(item); messages.scrollTop=messages.scrollHeight;
}
function replyFor(text){
  const q=text.toLowerCase();
  if(/hello|hi\b|hey/.test(q)) return "Hello! I'm SOUL AI. I'm ready to help. What are we working on?";
  if(/who are you|your name/.test(q)) return "I'm SOUL AI — your personal assistant, created as a project by Adinath.";
  if(/time|date|today/.test(q)) return `Your device says it is ${new Date().toLocaleString()}.`;
  if(/help|what can you do/.test(q)) return "I can chat, listen to your voice, speak replies, and help you plan or learn. This starter version is in demo mode; connect an AI provider to enable full AI answers.";
  if(/plan|schedule/.test(q)) return "Let's make a simple plan: choose your three most important tasks, estimate the time for each, and add short breaks between them. Tell me your tasks and I'll help organize them.";
  return "I received your message. SOUL's interface is working, but live AI is not connected yet. Choose an AI provider and add its API key securely in Vercel Environment Variables to enable intelligent replies.";
}
function speak(text){
  if(!('speechSynthesis' in window)) return;
  window.speechSynthesis.cancel();
  const utterance=new SpeechSynthesisUtterance(text);
  utterance.rate=.96; utterance.pitch=.88; utterance.volume=1;
  window.speechSynthesis.speak(utterance);
}
function send(text){
  text=text.trim(); if(!text) return;
  addMessage(text,'user'); input.value=''; typing.hidden=false; orbCaption.textContent='PROCESSING REQUEST';
  setTimeout(()=>{
    typing.hidden=true;
    const answer=replyFor(text); addMessage(answer,'soul');
    orbCaption.textContent='READY WHEN YOU ARE';
    statusText.textContent='SYSTEM ONLINE';
    speak(answer);
  },650);
}
form.addEventListener('submit',e=>{e.preventDefault();send(input.value)});
document.querySelectorAll('.quick').forEach(b=>b.addEventListener('click',()=>send(b.dataset.prompt)));
document.getElementById('clearBtn').addEventListener('click',()=>{
  messages.replaceChildren(); addMessage("Conversation cleared. What would you like to do next?",'soul');
});
const micBtn=document.getElementById('micBtn');
const SpeechRecognition=window.SpeechRecognition||window.webkitSpeechRecognition;
if(SpeechRecognition){
  const recognition=new SpeechRecognition(); recognition.lang='en-IN'; recognition.interimResults=false;
  micBtn.addEventListener('click',()=>{
    try{recognition.start();micBtn.classList.add('listening');orbCaption.textContent='LISTENING';statusText.textContent='VOICE ACTIVE';}
    catch(e){statusText.textContent='VOICE BUSY';}
  });
  recognition.onresult=e=>{input.value=e.results[0][0].transcript;send(input.value)};
  recognition.onend=()=>{micBtn.classList.remove('listening');orbCaption.textContent='READY WHEN YOU ARE';statusText.textContent='SYSTEM ONLINE'};
  recognition.onerror=()=>{micBtn.classList.remove('listening');statusText.textContent='VOICE UNAVAILABLE'};
}else{
  micBtn.title='Voice input is not supported in this browser';
  micBtn.addEventListener('click',()=>{addMessage('Voice input is not supported in this browser. Try a recent version of Chrome.','soul')});
}
