const escapeHTML = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const safeURL = value => { if (!value) return ''; try {const u = new URL(value, location.href); return ['https:','http:','file:'].includes(u.protocol) ? escapeHTML(value) : '';} catch {return '';}};
const tags = p => p.tags.map(t => `<span>${escapeHTML(t)}</span>`).join('');
const diagram = p => `<div class="diagram-title"><span>PROCESS / ${p.number}</span><span>TECHNICAL OVERVIEW</span></div><ol class="flow">${p.flow.map((f,i)=>`<li><span class="step">0${i+1}</span><span>${escapeHTML(f)}</span></li>`).join('')}</ol><p class="diagram-caption">${escapeHTML(p.caption)}</p>`;
const track = document.querySelector('#projects');
const dialog = document.querySelector('#project-dialog');
const detail = document.querySelector('#project-detail');
const previous = document.querySelector('#previous-project');
const next = document.querySelector('#next-project');
let activeIndex = 0;
let opener;
track.innerHTML = portfolio.projects.map((p,i) => `<article class="project-card" id="${p.id}" aria-label="${i+1} of ${portfolio.projects.length}"><button class="project-open" type="button" data-project="${i}" aria-haspopup="dialog" aria-label="Explore ${escapeHTML(p.title)}"><span class="card-category">${p.number} / ${escapeHTML(p.category)}</span>${safeURL(p.image) ? `<div class="card-cover"><img src="${safeURL(p.image)}" alt="${escapeHTML(p.imageAlt)}" loading="lazy" width="1975" height="1252">${safeURL(p.video) ? `<video class="hover-video" muted loop playsinline preload="none" data-src="${safeURL(p.video)}" aria-hidden="true" tabindex="-1"></video>` : ''}</div>` : `<div class="card-diagram visual-${p.id}">${diagram(p)}</div>`}<div class="card-copy"><h3>${escapeHTML(p.title)}</h3><p>${escapeHTML(p.subtitle)}</p><span class="card-role">${escapeHTML(p.role)}</span><div class="tags">${tags(p)}</div><span class="card-cta">Explore project <span><svg class="ui-icon" aria-hidden="true" focusable="false"><use href="#icon-external"/></svg></span></span></div></button>${p.paper !== null ? `<a class="card-publication" href="#paper-${p.paper}">Related publication <svg class="ui-icon" aria-hidden="true" focusable="false"><use href="#icon-external"/></svg></a>` : ''}</article>`).join('');
function updatePosition() {
 const cards = [...track.children];
 const left = track.getBoundingClientRect().left;
 activeIndex = cards.reduce((best,card,i) => Math.abs(card.getBoundingClientRect().left-left) < Math.abs(cards[best].getBoundingClientRect().left-left) ? i : best,0);
 document.querySelector('#project-position').textContent = `${String(activeIndex+1).padStart(2,'0')} / ${String(cards.length).padStart(2,'0')}`;
 previous.disabled = activeIndex === 0;
 next.disabled = activeIndex === cards.length-1;
}
function moveProject(delta) {
 const index = Math.max(0, Math.min(track.children.length-1,activeIndex+delta));
 const card = track.children[index];
 track.scrollTo({left:track.scrollLeft+card.getBoundingClientRect().left-track.getBoundingClientRect().left,behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});
}
previous.addEventListener('click',()=>moveProject(-1));
next.addEventListener('click',()=>moveProject(1));
track.addEventListener('scroll',updatePosition,{passive:true});
window.addEventListener('resize',updatePosition);
track.addEventListener('keydown',event=>{if(event.key==='ArrowRight'||event.key==='ArrowLeft'){event.preventDefault();moveProject(event.key==='ArrowRight'?1:-1);}});
track.addEventListener('click',event=>{
 const button = event.target.closest('[data-project]');
 if (!button) return;
 const p = portfolio.projects[Number(button.dataset.project)];
 opener = button;
 const paper = p.paper === null ? null : portfolio.papers[p.paper];
 detail.innerHTML = `<div class="detail-heading"><p class="eyebrow">${escapeHTML(p.category)}</p><h2 id="dialog-title">${escapeHTML(p.title)}</h2><p class="subtitle">${escapeHTML(p.subtitle)}</p><p class="meta">${escapeHTML(p.role)}${p.date ? ` · ${escapeHTML(p.date)}` : ''}</p></div>${safeURL(p.video) ? `<figure class="detail-cover"><video class="detail-video" controls muted playsinline preload="metadata" poster="${safeURL(p.image)}" aria-label="${escapeHTML(p.title)} demonstration"><source src="${safeURL(p.video)}" type="video/mp4">Your browser cannot play this video.</video></figure>` : safeURL(p.image) ? `<figure class="detail-cover"><img src="${safeURL(p.image)}" alt="${escapeHTML(p.imageAlt)}" width="1975" height="1252">${p.imageCaption ? `<figcaption class="cover-caption">${escapeHTML(p.imageCaption)}</figcaption>` : ''}</figure>` : ''}<div class="detail-grid"><div><h3>Overview</h3><p>${escapeHTML(p.description)}</p><h3>My contribution</h3><p>${escapeHTML(p.contribution)}</p><h3>Technology</h3><div class="tags">${tags(p)}</div>${p.technicalDetails ? `<div class="technical-details">${p.technicalDetails.map((t,i)=>`<div class="technical-topic"><h3>${escapeHTML(t.title)}</h3><p>${escapeHTML(t.text)}</p>${p.gallery && (Number.isInteger(t.figure) || (p.id==='touchdesigner' && (i===0 || i===2))) ? inlineFigure(p.gallery[Number.isInteger(t.figure) ? t.figure : i===0 ? 0 : 1]) : ''}</div>`).join('')}</div>` : ''}${paper ? `<div class="related-paper"><h3>Related research</h3><p>${escapeHTML(paper.title)}</p><p class="meta">${escapeHTML(paper.venue)} ${paper.year} · ${escapeHTML(paper.author)}</p><a class="text-link" href="#paper-${p.paper}" data-paper-link>View publication entry <svg class="ui-icon" aria-hidden="true" focusable="false"><use href="#icon-external"/></svg></a></div>`:''}</div><div><figure class="project-visual visual-${p.id}">${diagram(p)}${p.image || p.video ? '' : '<div class="video-note">Demo video coming soon</div>'}</figure></div></div>`;
 stopAllPreviews();
 dialog.showModal();
 document.body.classList.add('modal-open');
 const player = dialog.querySelector('.detail-video');
 if (player) { player.muted = true; player.play().catch(()=>{}); }
});
document.querySelector('#close-project').addEventListener('click',()=>dialog.close());
dialog.addEventListener('click',event=>{if(event.target===dialog){const r=dialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)dialog.close();}});
dialog.addEventListener('close',()=>{dialog.querySelectorAll('video').forEach(v=>v.pause());document.body.classList.remove('modal-open');opener?.focus({preventScroll:true});});
detail.addEventListener('click',event=>{const link=event.target.closest('[data-paper-link]');if(link){event.preventDefault();const target=document.querySelector(link.getAttribute('href'));dialog.close();target.setAttribute('tabindex','-1');target.focus({preventScroll:true});target.scrollIntoView({block:'start'});}});
document.querySelector('#papers').innerHTML = portfolio.papers.map((p,i)=>`<article class="paper" id="paper-${i}"><div class="venue">${escapeHTML(p.venue)}<span>${p.year}</span></div><div><h3>${safeURL(p.url) ? `<a href="${safeURL(p.url)}" target="_blank" rel="noopener noreferrer">${escapeHTML(p.title)} <svg class="ui-icon" aria-hidden="true" focusable="false"><use href="#icon-external"/></svg></a>`:escapeHTML(p.title)}</h3><p>${escapeHTML(p.author)}</p></div><span class="paper-type">${i===4?'POSTER':'PAPER'}</span></article>`).join('');
updatePosition();

function stopPreview(card) {
 const video=card.querySelector('.hover-video');
 if(!video)return;
 card.dataset.previewWanted='false';video.pause();
 if(video.readyState>0)video.currentTime=0;
 card.classList.remove('preview-playing');
}
function stopAllPreviews(){track.querySelectorAll('.project-card').forEach(stopPreview);}
track.querySelectorAll('.project-card').forEach(card=>{
 const video=card.querySelector('.hover-video');if(!video)return;
 const start=()=>{
  if(dialog.open)return;
  card.dataset.previewWanted='true';video.muted=true;
  if(!video.getAttribute('src'))video.src=video.dataset.src;
  video.play().then(()=>{if(card.dataset.previewWanted==='true'&&!dialog.open)card.classList.add('preview-playing');else stopPreview(card);}).catch(()=>card.classList.remove('preview-playing'));
 };
 card.addEventListener('pointerenter',e=>{if(e.pointerType!=='touch')start();});
 card.addEventListener('pointerleave',()=>stopPreview(card));
 card.addEventListener('focusin',start);
 card.addEventListener('focusout',e=>{if(!card.contains(e.relatedTarget))stopPreview(card);});
 video.addEventListener('error',()=>stopPreview(card));
});
track.addEventListener('scroll',stopAllPreviews,{passive:true});
document.addEventListener('visibilitychange',()=>{if(document.hidden){stopAllPreviews();dialog.querySelectorAll('video').forEach(v=>v.pause());}});

function inlineFigure(g) {
 if(!g)return '';
 return `<figure class="inline-project-figure"><a href="${safeURL(g.src)}" target="_blank" rel="noopener noreferrer" aria-label="Open ${escapeHTML(g.title)} at full size"><img src="${safeURL(g.src)}" alt="${escapeHTML(g.alt)}" loading="lazy"></a><figcaption>${escapeHTML(g.title)}${g.caption ? `<br>${escapeHTML(g.caption)}` : ''}${safeURL(g.source) ? ` <a href="${safeURL(g.source)}" target="_blank" rel="noopener noreferrer">Paper <svg class="ui-icon" aria-hidden="true" focusable="false"><use href="#icon-external"/></svg></a>` : ''} · <a href="${safeURL(g.src)}" target="_blank" rel="noopener noreferrer">View full size <svg class="ui-icon" aria-hidden="true" focusable="false"><use href="#icon-external"/></svg></a></figcaption></figure>`;
}
