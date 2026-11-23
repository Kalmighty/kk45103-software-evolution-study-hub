'use strict';

const paths = {
  home:'M3 10 12 3l9 7v10H3z M9 20v-7h6v7', layers:'m12 2 10 5-10 5L2 7z M2 12l10 5 10-5 M2 17l10 5 10-5',
  grid:'M3 3h7v7H3z M14 3h7v7h-7z M3 14h7v7H3z M14 14h7v7h-7z',
  repeat:'M20 7H6l3-3 M4 17h14l-3 3 M20 7l-3 3 M4 17l3-3 M20 7v6 M4 17v-6',
  workflow:'M8 3h8v5H8z M3 16h7v5H3z M14 16h7v5h-7z M12 8v4 M6 16v-4h12v4',
  brain:'M12 5C10 1 6 3 6 6 2 7 2 12 5 14c-2 4 2 7 5 5l2-2 2 2c3 2 7-1 5-5 3-2 3-7-1-8 0-3-4-5-6-1z M12 5v12 M5 14c2 0 3-1 3-3 M19 14c-2 0-3-1-3-3',
  code:'m8 6-6 6 6 6 M16 6l6 6-6 6 M14 4l-4 16', blocks:'M3 4h8v8H3z M13 4h8v8h-8z M8 14h8v8H8z',
  users:'M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2 M22 21v-2a4 4 0 0 0-3-4 M13 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0z M17 3a4 4 0 0 1 0 8',
  book:'M2 4h6a4 4 0 0 1 4 4v13a5 5 0 0 0-4-2H2z M22 4h-6a4 4 0 0 0-4 4v13a5 5 0 0 1 4-2h6z',
  quiz:'M8 3H5v18h14V3h-3 M8 2h8v4H8z M8 12l2 2 5-5 M8 17h7', cards:'M4 6h15v13H4z M7 3h15v13',
  exam:'M5 3h14v18H5z M8 8h8 M8 12h8 M8 16h5', chart:'M3 3v18h18 M8 16v-4 M13 16V8 M18 16V5',
  bookmark:'M6 3h12v18l-6-4-6 4z', search:'M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0z m-2 5 6 6',
  arrow:'M4 12h15m-6-6 6 6-6 6', left:'M20 12H5m6-6-6 6 6 6', check:'m4 12 5 5L20 6',
  menu:'M3 6h18 M3 12h18 M3 18h18', clock:'M22 12a10 10 0 1 1-20 0 10 10 0 1 1 20 0z M12 6v6l4 2',
  target:'M22 12a10 10 0 1 1-20 0 10 10 0 0 1 20 0z M18 12a6 6 0 1 1-12 0 6 6 0 0 1 12 0z M14 12a2 2 0 1 1-4 0 2 2 0 0 1 4 0z',
  bulb:'M9 18h6 M10 22h4 M8 15c0-2-3-2-3-6a7 7 0 0 1 14 0c0 4-3 4-3 6z',
  chevron:'m9 5 7 7-7 7', shuffle:'M3 6h3c4 0 6 12 10 12h5 m-4-4 4 4-4 4 M3 18h3c4 0 6-12 10-12h5 m-4-4 4 4-4 4'
};
const icon = name => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="${paths[name]}"/></svg>`;
const esc = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const main = document.querySelector('#main');
const sidebar = document.querySelector('#sidebar');
const search = document.querySelector('#search');
const searchResults = document.querySelector('#search-results');
const storageKey = 'kk45103-study-v1';
const defaults = () => ({opened:{}, sections:{}, completed:{}, attempts:[], cards:{}, last:null, bookmarks:{}, activity:[], tabs:{}});
let state;
try { state = {...defaults(), ...JSON.parse(localStorage.getItem(storageKey))}; } catch { state = defaults(); }
let route, quiz, deck, lastRendered, statusTimer;
const tabs = [['notes','Notes','book'],['exam-focus','Exam Focus','target'],['quiz','Quiz','quiz'],['flashcards','Flashcards','cards'],['mind-map','Mind Map','workflow']];
const tools = [['practice','Practice Quiz','quiz'],['recall','Quick Recall / Flashcards','cards'],['mixed','Mixed Exam','exam'],['progress','Progress & History','chart']];
const allQuestions = topics.flatMap(t => t.quizQuestions);
const topic = id => topics[id - 1];
const noteKey = (id, n) => id + ':' + n;
const topicLink = (id, tab = '', anchor = '') => '#topic/' + id + (tab ? '/' + tab : '') + (anchor ? '/' + anchor : '');
const automotiveLink = topicLink(8, 'notes', 'automotive-case');
const casePracticeLink = topicLink(8, 'notes', 'case-practice');
const pct = (a, b) => b ? Math.round(a / b * 100) : 0;
const progress = t => state.completed[t.id] ? 100 : pct(t.sections.filter(s => state.sections[noteKey(t.id,s.id)]).length, t.sections.length);
const overall = () => pct(topics.reduce((sum, t) => sum + progress(t), 0), topics.length * 100);
const pad = n => String(n).padStart(2,'0');
const progressbar = (value, label) => `<div class="meter" role="progressbar" aria-label="${esc(label)}" aria-valuenow="${value}" aria-valuemin="0" aria-valuemax="100"><span style="width:${value}%"></span></div>`;
const button = (label, href, symbol, style = '') => `<a class="button ${style}" href="${href}">${symbol ? icon(symbol) : ''}${label}</a>`;
const pill = (text, style = '') => `<span class="pill ${style}">${text}</span>`;

function announce(message) {
  const status = document.querySelector('#status');
  status.textContent = message;
  status.classList.add('show');
  clearTimeout(statusTimer);
  statusTimer = setTimeout(() => status.classList.remove('show'), 2800);
}
function save(activity) {
  if (activity) state.activity = [{text:activity, at:Date.now()}, ...state.activity].slice(0,30);
  try { localStorage.setItem(storageKey, JSON.stringify(state)); } catch { announce('Browser storage is unavailable. Progress lasts for this session.'); }
}
function shuffled(items) {
  const result = [...items];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}
function parseRoute() {
  const [page, id, tab, anchor] = location.hash.slice(1).split('/');
  if (page === 'topic' && topic(Number(id))) {
    const remembered = state.tabs[id] || 'notes';
    return {page, id:Number(id), tab:tabs.some(([key]) => key === tab) ? tab : remembered, anchor};
  }
  return {page: ['practice','recall','mixed','progress','bookmarks'].includes(page) ? page : 'home'};
}
function renderSidebar() {
  const active = (isActive) => isActive ? ' class="selected" aria-current="page"' : '';
  sidebar.innerHTML = `
    <a class="brand" href="#home"><span class="brand-mark">${icon('layers')}</span><span><strong>KK45103</strong><small>Software Evolution Management</small><small class="brand-sub">Study Hub</small></span></a>
    <nav class="side-nav">
      <a href="#home"${active(route.page === 'home')}>${icon('home')}<span>Overview</span></a>
      <div class="nav-label">Course Topics</div>
      ${topics.map(t => `<a href="${topicLink(t.id)}"${active(route.id === t.id)}><span class="nav-number">${pad(t.id)}</span><span>${esc(t.short)}</span><span class="nav-progress" aria-label="${progress(t)}% complete">${state.completed[t.id] ? icon('check') : progress(t) ? progress(t) + '%' : '<i></i>'}</span></a>`).join('')}
      <div class="nav-label">Study Tools</div>
      ${tools.map(([key,label,symbol]) => `<a href="#${key}"${active(route.page === key)}>${icon(symbol)}<span>${label}</span></a>`).join('')}
    </nav>
    <div class="side-footer"><div><strong>Course progress</strong><strong>${overall()}%</strong></div>${progressbar(overall(),'Overall course progress')}<small>${Object.keys(state.completed).length} of ${topics.length} topics marked complete</small></div>`;
}
function stats() {
  return [
    ['target',overall()+'%','Course progress','violet'], ['book',Object.keys(state.completed).length+' / 8','Topics marked complete','blue'],
    ['quiz',state.attempts.filter(attempt => attempt.topic !== null).length,'Quizzes completed','teal'],['cards',Object.keys(state.cards).length,'Flashcards reviewed','amber']
  ].map(([symbol,value,label,color]) => `<div class="stat panel"><span class="tile ${color}">${icon(symbol)}</span><div><strong>${value}</strong><small>${label}</small></div></div>`).join('');
}
function topicCard(t) {
  const value = progress(t);
  return `<article class="topic-card panel palette-${(t.id - 1) % 4}">
      <div class="card-top"><span class="tile">${icon(t.icon)}</span><span class="topic-number">TOPIC ${pad(t.id)}</span></div>
      <h3>${esc(t.title)}</h3><p>${esc(t.description)}</p>
      <div class="card-progress"><small>${state.completed[t.id] ? 'Complete' : value ? 'In progress' : state.opened[t.id] ? 'Opened' : 'Not started'}</small><small>${value}%</small></div>
      ${progressbar(value,t.short)}
      <a class="open-link" href="${topicLink(t.id)}">Open topic ${icon('arrow')}</a>
    </article>`;
}
function date(at) { return new Date(at).toLocaleString(undefined,{dateStyle:'medium',timeStyle:'short'}); }
function activity() {
  return state.activity.length ? `<ul class="activity-list">${state.activity.slice(0,5).map(a => `<li>${icon('clock')}<span>${esc(a.text)}</span><time>${esc(date(a.at))}</time></li>`).join('')}</ul>` : '<p>Your study activity will appear here after you open a topic or use a study tool.</p>';
}
function home() {
  const resume = topic(state.last) || topics[0];
  return `<div class="page dashboard">
    <div class="breadcrumbs">${icon('home')} <span>Overview</span></div>
    <section class="hero">
      <div class="hero-art" aria-hidden="true"><i></i><i></i><i></i><b></b><b></b><b></b><span>${icon('layers')}</span></div>
      <div class="hero-content"><div class="eyebrow"><i></i> KK45103 · UNIVERSITI MALAYSIA SABAH</div>
      <h1>Software Evolution<br>Management</h1>
      <p>Understand software change, maintenance, evolution and management step by step.</p>
      <div class="hero-actions">${button(state.last ? 'Continue notes' : 'Start studying',topicLink(resume.id,'notes'),'arrow','primary')}${button('Practice quiz','#practice','quiz')}</div></div>
    </section>
    <section class="stats-grid" aria-label="Study overview">${stats()}</section>
    <section class="continue panel"><div class="tile violet">${icon('book')}</div><div><div class="eyebrow">${state.last ? 'CONTINUE STUDYING' : 'START HERE'} · TOPIC ${pad(resume.id)}</div><h2>${esc(resume.title)}</h2></div>${button('Continue',topicLink(resume.id),'arrow','secondary')}</section>
    <section class="topic-list"><div class="section-title"><div><h2>Course topics</h2><p>Work through the eight topics at your own pace.</p></div>${pill('8 topics')}</div><div class="topic-grid">${topics.map(topicCard).join('')}</div></section>
    <div class="home-bottom"><section class="panel content-panel"><h2>Quick actions</h2><div class="quick-links">${button('Continue Notes',topicLink(resume.id,'notes'),'book')}${button('Practice Quiz','#practice','quiz')}${button('Flashcards','#recall','cards')}${button('Mixed Exam','#mixed','exam')}</div></section><section class="panel content-panel"><h2>Recent study activity</h2>${activity()}</section></div>
  </div>`;
}
const bookmark = (key, label) => `<button class="button bookmark ${state.bookmarks[key] ? 'on' : ''}" data-action="bookmark" data-key="${key}" aria-pressed="${Boolean(state.bookmarks[key])}" aria-label="${esc(label)}">${icon('bookmark')}<span>${state.bookmarks[key] ? 'Saved' : 'Bookmark'}</span></button>`;

function processDiagram(t) {
  if (!t.process) return '';
  const [title,...steps] = t.process;
  const concept = {1:7, 2:2, 5:4, 7:4, 8:7}[t.id];
  return `<section class="panel content-panel process"><h2>${title}</h2><ol>${steps.map((step,i) => `<li><span>${pad(i+1)}</span><a href="${topicLink(t.id,'notes','note-'+(t.id === 2 && i >= 3 ? 7 : concept))}">${step}</a></li>`).join('')}</ol>${t.id === 5 ? '<p>Move between documentation, code and execution as new clues become available.</p>' : ''}</section>`;
}
function comparisonTables(t) {
  return `<section class="panel content-panel"><h2>Comparisons</h2>${t.compare.map(([headers,...rows],i) => `<details class="comparison" ${i === 0 ? 'open' : ''}><summary>${rows.length > 4 ? 'Maintenance process models' : rows.map(row => esc(row[0])).join(' / ')}</summary><div class="table-scroll" tabindex="0" role="region" aria-label="Comparison table ${i + 1}"><table><thead><tr>${headers.map(h => `<th scope="col">${esc(h)}</th>`).join('')}</tr></thead><tbody>${rows.map(([label,...cells])=> `<tr><th scope="row">${esc(label)}</th>${cells.map(c => `<td>${esc(c)}</td>`).join('')}</tr>`).join('')}</tbody></table></div></details>`).join('')}</section>`;
}
const source = (t,s) => `<details class="source"><summary>View source</summary><p>${esc(t.source)} · ${t.id <= 2 ? 'PDF pages' : 'Slides'} ${esc(s.reference)}</p></details>`;
function caseStudy() {
  const {title, source, situation, problems, interventions, results, outcome, connections, practice} = automotiveCase;
  const list = items => `<ul>${items.map(item => `<li>${esc(item)}</li>`).join('')}</ul>`;
  return `
    <article class="panel content-panel case-study" id="automotive-case" aria-labelledby="automotive-title" tabindex="-1">
      <h2 id="automotive-title">${esc(title)}</h2>
      <p class="case-source">${esc(source)}</p>
      <section><h3>Situation</h3><p>${esc(situation)}</p></section>
      <section><h3>Problems</h3><p>${esc(problems)}</p></section>
      <section><h3>Intervention</h3>${list(interventions)}</section>
      <section><h3 id="case-results">Results</h3>
        <div class="table-scroll" tabindex="0" role="region" aria-labelledby="case-results">
          <table>
            <caption>Critical conveyors · PDF page 3</caption>
            <thead><tr><th scope="col">Measure</th><th scope="col">Before</th><th scope="col">After</th><th scope="col">Change</th></tr></thead>
            <tbody>${results.map(([measure, before, after, change]) => `<tr><th scope="row">${esc(measure)}</th><td>${before}</td><td>${after}</td><td>${change}</td></tr>`).join('')}</tbody>
          </table>
        </div>
        <p>${esc(outcome)}</p>
      </section>
      <section class="info example">
        <h3>Connection to Software Maintenance</h3>
        <p>These are software analogies for the factory’s maintenance decisions.</p>
        ${list(connections)}
      </section>
      <a class="open-link" href="${casePracticeLink}">Try the practice questions ${icon('arrow')}</a>
    </article>
    <section class="panel content-panel case-practice" id="case-practice" aria-labelledby="case-practice-title" tabindex="-1">
      <h2 id="case-practice-title">Case Study Practice</h2>
      <p>Try each answer before opening its explanation. These five questions are unscored.</p>
      ${practice.map((item, index) => `<details class="more">
        <summary>${index + 1}. ${esc(item.prompt)}</summary>
        <div class="info definition">
          <strong>Model answer</strong>
          <p>${esc(item.answer)} ${esc(item.explanation)}</p>
          <a class="open-link" href="${topicLink(item.topic, 'notes', 'note-' + item.note)}">${esc(item.label)} ${icon('arrow')}</a>
        </div>
      </details>`).join('')}
    </section>`;
}
function conceptNotes(t) {
  const isTopicEight = t.id === 8;
  return `<div class="notes-layout"><div class="note-stack">
    ${isTopicEight ? `<div class="case-links">${button('Automotive case study', automotiveLink, 'book', 'secondary')}${button('Case study practice', casePracticeLink, 'target')}</div>` : ''}
    ${t.sections.map(s => {
    const done = Boolean(state.sections[noteKey(t.id,s.id)]);
    const definition = definitions[noteKey(t.id,s.id)];
    return `<article class="panel content-panel concept" id="note-${s.id}" tabindex="-1">
      <div class="concept-head"><div><div class="eyebrow">CONCEPT ${pad(s.id)}</div><h2>${esc(s.title)}</h2></div>${bookmark('note:'+t.id+':'+s.id,'Bookmark '+s.title)}</div>
      <div class="info definition"><strong>${icon('book')} Simple meaning</strong><p>${esc(s.meaning)}</p></div>
      <div class="note-pair"><div class="info example"><strong>${icon('code')} Study example</strong><p>${esc(s.example)}</p></div><div class="info remember"><strong>${icon('bulb')} Remember</strong><p>${esc(s.remember)}</p></div></div>
      <div class="exam-words"><strong>Exam words</strong><div>${examTerms[t.id-1][s.id-1].split(', ').map(term=>pill(esc(term))).join(' ')}</div></div>
      <details class="more"><summary>More details</summary>${definition ? `<div class="info source-definition"><strong>Lecture definition</strong><p>${esc(definition)}</p></div>` : ''}<p>${esc(s.detail)}</p></details>
      <div class="note-footer">${source(t,s)}<button class="button ${done ? 'on' : ''}" data-action="section" data-section="${s.id}" aria-pressed="${done}">${icon('check')}${done ? 'Reviewed' : 'Mark reviewed'}</button></div>
    </article>`;
  }).join('')}${isTopicEight ? caseStudy() : ''}${processDiagram(t)}${comparisonTables(t)}</div>
  <aside class="panel outline"><h2>In this topic</h2>${t.sections.map(s => `<a href="${topicLink(t.id,'notes','note-'+s.id)}"><span>${pad(s.id)}</span>${esc(s.title)}</a>`).join('')}</aside></div>`;
}
function examFocus(t) {
  const [first,second] = t.sections;
  const applied = t.quizQuestions.filter(q => /[?.] .*[?]$/.test(q.prompt));
  const scenarios = [...new Set([...applied, ...t.quizQuestions])].slice(0,3);
  const examBlock = (title, style, body) => `<section class="panel content-panel ${style}"><h2>${title}</h2>${body}</section>`;
  return `<div class="study-intro"><div class="eyebrow">REVISION GUIDE</div><h2>Exam focus</h2><p>Use these prompts to practise recalling and applying the lecture. They are revision activities.</p></div>
  ${t.id === 8 ? button('Case study practice', casePracticeLink, 'target', 'secondary') : ''}
  <div class="exam-grid">
    ${examBlock('Must Know','',t.sections.map(s => `<div class="exam-point" id="exam-${s.id}" tabindex="-1"><div><a href="${topicLink(t.id,'notes','note-'+s.id)}">${esc(s.title)}</a><p>${esc(s.meaning)}</p></div>${bookmark('exam:'+t.id+':'+s.id,'Bookmark exam point '+s.title)}</div>`).join(''))}
    <div class="note-stack">
      ${examBlock('Must Understand','',`<div class="info remember"><strong>${icon('target')} High-priority revision point</strong><p>Explain ${esc(first.title.toLowerCase())} in your own words and justify when it matters.</p></div><div class="info example"><strong>Common mistake</strong><p>Using an example by itself without naming the concept or explaining why it applies.</p></div>`)}
      ${examBlock('Scenario Questions','',scenarios.map(q => `<details class="more"><summary>${esc(q.prompt)}</summary><p><strong>${esc(q.correct)}</strong> · ${esc(q.explanation)}</p></details>`).join(''))}
      ${examBlock('Short Answer Practice','',`<details class="more"><summary>Explain ${esc(second.title.toLowerCase())} and give an example.</summary><p>${esc(second.meaning)} ${esc(second.example)}</p></details>`)}
      ${examBlock('Possible Structured Question','',`<p>Choose a software system you know. Apply two concepts from this topic, justify each choice and explain one practical implication.</p><details class="more"><summary>Answer structure</summary><p>Name each concept, explain it, identify the evidence in the scenario, and connect it to the maintenance decision.</p></details>`)}
    </div></div>${comparisonTables(t)}`;
}
function mindMap(t) {
  return `<section class="panel content-panel map"><div class="study-intro"><div class="eyebrow">TOPIC OVERVIEW</div><h2>Mind map</h2><p>Expand a branch to recall the concept, then open the full note to review it.</p></div><div class="map-root">${icon(t.icon)} ${esc(t.short)}</div><div class="map-grid">${t.sections.map(s => `<details class="map-node"><summary>${esc(s.title)}</summary><p>${esc(s.meaning)}</p><a class="open-link" href="${topicLink(t.id,'notes','note-'+s.id)}">Open note ${icon('arrow')}</a></details>`).join('')}</div></section>${processDiagram(t)}`;
}
function topicPage(t) {
  const value = progress(t);
  const isDone = Boolean(state.completed[t.id]);
  const body = {notes:()=>conceptNotes(t), 'exam-focus':()=>examFocus(t), quiz:()=>quizView(t), flashcards:()=>flashView(t), 'mind-map':()=>mindMap(t)};
  return `<div class="page">
    <div class="breadcrumbs"><a href="#home">Overview</a>${icon('chevron')}<span>Topic ${pad(t.id)}</span></div>
    <section class="topic-header panel palette-${(t.id-1)%4}"><div class="tile">${icon(t.icon)}</div><div><div class="eyebrow">TOPIC ${pad(t.id)} / 08</div><h1>${esc(t.title)}</h1><p>${esc(t.description)}</p></div>
    <div class="topic-actions">${bookmark('topic:'+t.id,'Bookmark topic')}<button class="button primary" data-action="complete" aria-pressed="${isDone}">${icon('check')}${isDone ? 'Completed' : 'Mark complete'}</button></div>
    <div class="topic-meter"><small>${value}% reviewed</small>${progressbar(value,t.short)}</div></section>
    <div class="topic-nav"><div>${t.id > 1 ? button('Previous topic',topicLink(t.id-1),'left') : ''}</div><div>${t.id < topics.length ? button('Next topic',topicLink(t.id+1),'arrow') : ''}</div></div>
    <div class="tabs" role="tablist" aria-label="Topic study tools">${tabs.map(([id,label,symbol]) => `<button id="tab-${id}" role="tab" aria-selected="${route.tab===id}" aria-controls="topic-panel" tabindex="${route.tab===id ? 0 : -1}" data-tab="${id}">${icon(symbol)}${label}</button>`).join('')}</div>
    <div id="topic-panel" role="tabpanel" aria-labelledby="tab-${route.tab}" tabindex="0">${body[route.tab]()}</div>
  </div>`;
}

function toolHeader(title, subtitle, symbol) {
  return `<div class="breadcrumbs"><a href="#home">Overview</a>${icon('chevron')}<span>${title}</span></div><div class="tool-title"><div class="tile violet">${icon(symbol)}</div><div><h1>${title}</h1><p>${subtitle}</p></div></div>`;
}
function toolPage() {
  if (route.page === 'progress') return `<div class="page">${toolHeader('Progress & History','See what you’ve covered and decide what to study next.','chart')}${historyView()}</div>`;
  if (route.page === 'bookmarks') return `<div class="page">${toolHeader('Bookmarks','Return to saved topics, notes and exam points.','bookmark')}${bookmarksView()}</div>`;
  if (route.page === 'mixed') return `<div class="page">${toolHeader('Mixed Exam','Combine questions from all eight topics in a revision test.','exam')}${quizView(null,true)}</div>`;
  const isQuiz = route.page === 'practice';
  return `<div class="page">${toolHeader(isQuiz ? 'Practice Quiz' : 'Quick Recall / Flashcards',isQuiz ? 'Select a topic and choose when to receive feedback.' : 'Review all topics or open a topic-specific deck.',isQuiz ? 'quiz' : 'cards')}
  ${isQuiz ? '' : flashView()}<div class="topic-grid tool-topics">${topics.map(t => `<article class="panel content-panel"><h2>${esc(t.title)}</h2><p>${isQuiz ? t.quizQuestions.length+' questions' : t.sections.length+' flashcards'}</p>${button(isQuiz ? 'Open quiz' : 'Open deck',topicLink(t.id,isQuiz ? 'quiz' : 'flashcards'),'arrow','secondary')}</article>`).join('')}</div></div>`;
}
function startQuiz(t, mode, amount) {
  const selected = t ? shuffled(t.quizQuestions) : shuffled(topics.flatMap(item => {
    const base = Math.floor(amount/topics.length);
    return shuffled(item.quizQuestions).slice(0,base);
  }));
  const selectedIds = new Set(selected.map(q => q.id));
  const questions = t ? selected : shuffled([...selected,...shuffled(allQuestions.filter(q => !selectedIds.has(q.id))).slice(0,amount-selected.length)]);
  quiz = {mode, questions:questions.map(q => ({...q,choices:shuffled(q.choices)})), index:0, answers:{}, submitted:false};
}
function quizView(t, mixed = false) {
  if (!quiz) return `<section class="panel content-panel study-tool"><span class="tile violet">${icon(mixed?'exam':'quiz')}</span><h2>${mixed ? 'Choose exam length' : 'Choose a quiz mode'}</h2><p>${mixed ? 'See your score and topic breakdown after submission.' : t.quizQuestions.length+' questions cover key terms, lecture concepts and applied scenarios.'}</p><div class="choice-grid">
    ${mixed ? [10,20,40,allQuestions.length].map(n => `<button class="button choice" data-action="start-quiz" data-mode="test" data-size="${n}"><strong>${n===allQuestions.length?'Full Revision Exam':n+' questions'}</strong><small>${n===allQuestions.length?n+' questions across all topics':'Balanced across all eight topics'}</small></button>`).join('') :
    '<button class="button choice" data-action="start-quiz" data-mode="practice"><strong>Practice Mode</strong><small>Feedback after each answer</small></button><button class="button choice" data-action="start-quiz" data-mode="test"><strong>Test Mode</strong><small>Feedback after submission</small></button>'}</div></section>`;
  if (quiz.submitted) return quizResults(mixed);
  const q = quiz.questions[quiz.index];
  const answer = quiz.answers[q.id];
  const revealed = quiz.mode === 'practice' && answer !== undefined;
  return `<section class="panel content-panel study-tool"><div class="study-labels">${pill(quiz.mode === 'practice' ? 'Practice Mode' : 'Test Mode','violet')}<span>${quiz.index+1} / ${quiz.questions.length}</span></div>
    ${progressbar(pct(Object.keys(quiz.answers).length,quiz.questions.length),'Questions answered')}
    <fieldset><legend id="question" tabindex="-1">${esc(q.prompt)}</legend><div class="answers">${q.choices.map((choice,i) => `<label class="answer ${revealed&&choice===q.correct?'correct':''} ${revealed&&answer===choice&&choice!==q.correct?'incorrect':''}"><input type="radio" name="answer" value="${i}" ${answer===choice?'checked':''} ${revealed?'disabled':''}><span class="answer-letter">${String.fromCharCode(65+i)}</span><span>${esc(choice)}</span>${revealed&&choice===q.correct?icon('check'):''}</label>`).join('')}</div></fieldset>
    ${revealed ? `<div class="info ${answer===q.correct?'definition':'remember'}"><strong>${answer===q.correct?'Correct':'Correct answer: '+esc(q.correct)}</strong><p>${esc(q.explanation)}</p>${related(q)}</div>` : ''}
    <div class="tool-controls"><button class="button" data-action="quiz-prev" ${quiz.index===0?'disabled':''}>${icon('left')} Previous</button><div>${quiz.index < quiz.questions.length-1 ? '<button class="button" data-action="quiz-next">Next '+icon('arrow')+'</button>' : ''}<button class="button primary" data-action="submit-quiz" ${Object.keys(quiz.answers).length?'':'disabled'}>Submit quiz</button></div></div>
    <small>${Object.keys(quiz.answers).length} of ${quiz.questions.length} answered</small></section>`;
}
const related = q => `<a class="open-link" href="${topicLink(q.topic,'notes','note-'+q.section)}">${esc(topic(q.topic).sections[q.section-1].title)} ${icon('arrow')}</a>`;
function grade() {
  const scored = quiz.questions.map(q => ({...q, answer:quiz.answers[q.id], passed:quiz.answers[q.id]===q.correct}));
  return {scored, score:scored.filter(q => q.passed).length, total:scored.length};
}
function breakdown(scored) {
  return topics.map(t => {
    const subset = scored.filter(q => q.topic === t.id);
    const correct = subset.filter(q => q.passed).length;
    return {t, total:subset.length, correct, percent:pct(correct,subset.length)};
  }).filter(row => row.total);
}
function quizResults(mixed) {
  const {scored,score,total} = grade();
  const rows = breakdown(scored);
  const weak = rows.filter(row => row.correct<row.total).sort((a,b)=>a.percent-b.percent || b.total-a.total);
  return `<div class="note-stack"><section class="panel content-panel study-tool"><div class="study-labels">${pill('Submission complete','teal')}<button class="button secondary" data-action="retry">Retry</button></div><h2 id="result-title" tabindex="-1">${score} / ${total} correct · ${pct(score,total)}%</h2>
    ${mixed ? `<h3>Topic performance</h3><div class="breakdown">${rows.map(({t,correct,total,percent}) => `<div><a href="${topicLink(t.id,'notes')}">${esc(t.short)}</a><span>${correct}/${total} · ${percent}%${correct<total ? ' · Review' : ''}</span>${progressbar(percent,t.short)}</div>`).join('')}</div><p>${weak.length ? 'Recommended next topic: <a href="'+topicLink(weak[0].t.id,'notes')+'">'+esc(weak[0].t.title)+'</a>' : 'You answered every question correctly.'}</p>` : ''}
    </section><section class="panel content-panel"><h2>Answer review</h2>${[...scored].sort((a,b)=>Number(a.passed)-Number(b.passed)).map(q => `<details class="more answer-review" ${q.passed?'':'open'}><summary>${q.passed?'Correct': 'Needs review'} · ${esc(q.prompt)}</summary><p>Your answer: <strong>${esc(q.answer ?? 'Unanswered')}</strong><br>Correct answer: <strong>${esc(q.correct)}</strong></p><p>${esc(q.explanation)}</p>${related(q)}</details>`).join('')}</section></div>`;
}
function flashView(t) {
  if (!deck) deck = {items:(t ? [t] : topics).flatMap(t => t.sections.map(s => ({t,s,key:noteKey(t.id,s.id)}))),index:0, flipped:false};
  const {items,index,flipped} = deck;
  const {t:owner,s,key} = items[index];
  const known = items.filter(item => state.cards[item.key] === 'known').length;
  const review = items.filter(item => state.cards[item.key] === 'review').length;
  return `<section class="panel content-panel study-tool"><div class="study-labels">${pill('Quick recall','violet')}<span>Card ${index+1} / ${items.length}</span></div><h2>Flashcards</h2>
    <div class="flash-meta"><span>${known} known · ${review} to review</span><button class="button" data-action="flash-shuffle">${icon('shuffle')} Shuffle</button></div>${progressbar(pct(known,items.length),'Known flashcards')}
    <button class="flashcard ${flipped?'flipped':''}" data-action="flash-flip" aria-label="${flipped?'Answer: '+esc(s.meaning)+' Flip to term.':'Term: '+esc(s.title)+'. Flip to answer.'}">
    <span class="flash-inner"><span class="flash-face front" aria-hidden="true"><small>${esc(owner.short)}</small><strong>${esc(s.title)}</strong><span>Click or press Enter to flip</span></span><span class="flash-face back" aria-hidden="true"><small>ANSWER</small><strong>${esc(s.meaning)}</strong><span>${esc(s.remember)}</span></span></span></button>
    <div class="tool-controls flash-controls"><button class="button" data-action="flash-prev">${icon('left')} Previous</button><div><button class="button ${state.cards[key]==='review'?'on':''}" data-action="flash-review" aria-pressed="${state.cards[key]==='review'}">Review again</button><button class="button ${state.cards[key]==='known'?'on':'secondary'}" data-action="flash-known" aria-pressed="${state.cards[key]==='known'}">${icon('check')} Known</button></div><button class="button" data-action="flash-next">Next ${icon('arrow')}</button></div>
  </section>`;
}
function weaknesses() {
  const perConcept = new Map();
  state.attempts.forEach(a => a.answers.forEach(({id,passed}) => {
    const q = allQuestions.find(q => q.id === id);
    if (!q) return;
    const key = noteKey(q.topic,q.section);
    const row = perConcept.get(key) || {q,missed:0,total:0};
    row.total++;
    if (!passed) row.missed++;
    perConcept.set(key,row);
  }));
  return [...perConcept.values()].filter(row=>row.missed).sort((a,b) => b.missed/b.total-a.missed/a.total || b.missed-a.missed);
}
function historyView() {
  const weak = weaknesses();
  const next = topic(weak[0]?.q.topic) || topics.find(t=>!state.completed[t.id]);
  const best = [['Mixed Exam',null],...topics.map(t=>[t.short,t.id])].map(([name,id]) => {
    const attempts = state.attempts.filter(a=>a.topic===id);
    const score = attempts.length ? Math.max(...attempts.map(a=>pct(a.score,a.total)))+'%' : '—';
    return `<li><span>${esc(name)}</span><strong>${score}</strong></li>`;
  }).join('');
  return `<div class="stats-grid">${stats()}</div><div class="history-grid"><section class="panel content-panel"><h2>Topic completion</h2><div class="breakdown">${topics.map(t=>`<div><a href="${topicLink(t.id)}">${esc(t.short)}</a><span>${progress(t)}%</span>${progressbar(progress(t),t.short)}</div>`).join('')}</div></section>
    <section class="panel content-panel"><h2>Recommended next study</h2><p>${next ? esc(next.title) : 'All topics are marked complete.'}</p>${next ? button('Open topic',topicLink(next.id,'notes',weak[0]?'note-'+weak[0].q.section:''),'arrow','secondary') : ''}<h3 class="subheading">Needs review</h3>${weak.length ? `<ul class="weak-list">${weak.slice(0,6).map(({q,missed,total})=>`<li>${related(q)} <small>${missed}/${total} missed</small></li>`).join('')}</ul>` : '<p>Missed quiz concepts will appear here.</p>'}</section></div>
    <div class="history-grid"><section class="panel content-panel"><h2>Quiz history</h2>${state.attempts.length ? `<div class="table-scroll" tabindex="0" role="region" aria-label="Quiz history table"><table><thead><tr><th>Topic</th><th>Date</th><th>Score</th><th>%</th></tr></thead><tbody>${state.attempts.map(a=>`<tr><td>${a.topic ? esc(topic(a.topic).short) : 'Mixed Exam'}</td><td>${esc(date(a.at))}</td><td>${a.score}/${a.total}</td><td>${pct(a.score,a.total)}%</td></tr>`).join('')}</tbody></table></div>` : '<p>Your submitted quizzes will appear here.</p>'}</section><section class="panel content-panel"><h2>Best scores</h2><ul class="score-list">${best}</ul></section></div>
    <section class="panel content-panel reset"><div><h2>Reset progress</h2><p>Clear study activity, quiz history, flashcard ratings and bookmarks stored in this browser.</p></div><button class="button danger" data-action="reset">Reset progress</button></section>`;
}
function bookmarksView() {
  const saved = Object.keys(state.bookmarks);
  return `<section class="panel content-panel"><h2>Saved items</h2>${saved.length ? saved.map(key => {
    const [kind,id,n] = key.split(':');
    const t = topic(Number(id));
    const s = t.sections[Number(n)-1];
    const url = kind === 'topic' ? topicLink(t.id) : kind === 'note' ? topicLink(t.id,'notes','note-'+n) : topicLink(t.id,'exam-focus','exam-'+n);
    return `<div class="exam-point"><div>${pill(kind==='topic'?'Topic':kind==='note'?'Note':'Exam point')}<p><a href="${url}">${esc(s?.title || t.title)}</a></p></div><button class="button" data-action="bookmark" data-key="${key}" aria-label="Remove bookmark ${esc(s?.title || t.title)}">Remove</button></div>`;
  }).join('') : '<p>Save a topic, note or exam point to find it here.</p>'}</section>`;
}

document.querySelector('.skip').addEventListener('click', event => {
  event.preventDefault();
  main.focus();
  main.scrollIntoView();
});
function setDrawer(open) {
  sidebar.classList.toggle('drawer-open',open);
  document.querySelector('#overlay').hidden = !open;
  document.querySelector('#menu').setAttribute('aria-expanded',String(open));
}
function render({navigation = false, selector, preserve = false} = {}) {
  const openDetails = preserve ? [...main.querySelectorAll('details')].map(el=>el.open) : [];
  renderSidebar();
  main.innerHTML = route.page === 'home' ? home() : route.id ? topicPage(topic(route.id)) : toolPage();
  if (preserve) [...main.querySelectorAll('details')].forEach((el,i)=>{el.open=Boolean(openDetails[i]);});
  if (selector) main.querySelector(selector)?.focus({preventScroll:true});
  if (navigation) {
    const target = route.anchor && document.getElementById(route.anchor);
    if (target && main.contains(target)) {
      target.focus({preventScroll:true});
      target.scrollIntoView({block:'start'});
    } else {
      window.scrollTo(0,0);
      if (lastRendered) main.focus({preventScroll:true});
    }
  }
}
function navigate() {
  const next = parseRoute();
  const signature = [next.page,next.id,next.tab].join('/');
  const samePane = lastRendered === signature;
  if (!samePane) { quiz = null; deck = null; }
  route = next;
  if (route.id) {
    const newTopic = state.last !== route.id || !state.opened[route.id];
    state.last = route.id;
    state.opened[route.id] = true;
    state.tabs[route.id] = route.tab;
    save(newTopic ? 'Opened '+topic(route.id).short : undefined);
  }
  setDrawer(false);
  render({navigation:true});
  lastRendered = signature;
}

let tabFocus = false;
window.addEventListener('hashchange',()=>{
  navigate();
  if (tabFocus) {
    tabFocus = false;
    document.querySelector('#tab-'+route.tab)?.focus();
  }
});
document.querySelector('#menu').innerHTML = icon('menu');
document.querySelector('#search-icon').innerHTML = icon('search');
document.querySelector('#saved-link').innerHTML = icon('bookmark');
document.querySelector('#menu').addEventListener('click',()=>setDrawer(!sidebar.classList.contains('drawer-open')));
document.querySelector('#overlay').addEventListener('click',()=>{setDrawer(false);document.querySelector('#menu').focus();});
sidebar.addEventListener('click',event=>{
  if (event.target.closest('a')) setDrawer(false);
});
main.addEventListener('click', event => {
  const selected = event.target.closest('[data-tab]');
  if (selected) {
    if (selected.dataset.tab !== route.tab) { tabFocus = true; location.hash = topicLink(route.id,selected.dataset.tab); }
    return;
  }
  const el = event.target.closest('[data-action]');
  if (!el) return;
  const {action,key,section,mode,size} = el.dataset;
  let selector = '[data-action="'+action+'"]';
  let preserve = true;
  const current = topic(route.id);
  switch (action) {
    case 'bookmark':
      if (state.bookmarks[key]) {delete state.bookmarks[key]; announce('Bookmark removed');}
      else {state.bookmarks[key]=true; announce('Bookmark saved');}
      save();
      selector += '[data-key="'+key+'"]';
      if (route.page==='bookmarks') selector = '[data-action="bookmark"]';
      break;
    case 'section': {
      const id = noteKey(route.id,section);
      if (state.sections[id]) delete state.sections[id];
      else state.sections[id] = true;
      save(state.sections[id] ? 'Reviewed '+current.sections[Number(section)-1].title : undefined);
      selector += '[data-section="'+section+'"]';
      break;
    }
    case 'complete':
      if (state.completed[route.id]) {delete state.completed[route.id];save();}
      else {state.completed[route.id]=true;save('Completed '+current.short);}
      break;
    case 'start-quiz':
      startQuiz(current,mode,Number(size));
      selector = '#question';
      break;
    case 'quiz-prev': case 'quiz-next':
      quiz.index += action === 'quiz-prev' ? -1 : 1;
      selector = '#question';
      break;
    case 'submit-quiz': {
      if (Object.keys(quiz.answers).length < quiz.questions.length && !confirm('Submit with unanswered questions? They will count as incorrect.')) return;
      const {score,total,scored} = grade();
      quiz.submitted = true;
      state.attempts.unshift({at:Date.now(),topic:route.id || null,score,total,answers:scored.map(({id,passed})=>({id,passed}))});
      save('Submitted '+(current?.short || 'Mixed Exam')+' · '+score+'/'+total);
      selector = '#result-title';
      preserve = false;
      break;
    }
    case 'retry': quiz=null; selector='[data-action="start-quiz"]'; break;
    case 'flash-flip':
      deck.flipped=!deck.flipped;
      el.classList.toggle('flipped',deck.flipped);
      {
        const {s} = deck.items[deck.index];
        el.setAttribute('aria-label',deck.flipped?'Answer: '+s.meaning+' Flip to term.':'Term: '+s.title+'. Flip to answer.');
        announce(deck.flipped?s.meaning:s.title);
      }
      return;
    case 'flash-prev': case 'flash-next':
      deck.index = (deck.index+deck.items.length+(action==='flash-prev'?-1:1))%deck.items.length;
      deck.flipped=false;
      announce('Card '+(deck.index+1)+': '+deck.items[deck.index].s.title);
      break;
    case 'flash-shuffle':
      deck.items=shuffled(deck.items); deck.index=0; deck.flipped=false;
      announce('Flashcards shuffled');
      break;
    case 'flash-known': case 'flash-review': {
      const item=deck.items[deck.index];
      state.cards[item.key]=action==='flash-known'?'known':'review';
      save('Reviewed flashcard: '+item.s.title);
      announce(action==='flash-known'?'Marked known':'Marked for review');
      break;
    }
    case 'reset':
      if (!confirm('Reset all progress and bookmarks in this browser?')) return;
      state=defaults(); quiz=null; deck=null; save(); announce('Progress reset'); break;
    default: return;
  }
  render({selector,preserve});
});
main.addEventListener('change',event=>{
  if (event.target.name !== 'answer' || !quiz) return;
  const q = quiz.questions[quiz.index];
  quiz.answers[q.id] = q.choices[Number(event.target.value)];
  if (quiz.mode === 'practice') render({selector:'[data-action="quiz-next"]:not([disabled]), [data-action="submit-quiz"]:not([disabled])'});
  else {
    main.querySelector('[data-action="submit-quiz"]').disabled = false;
    main.querySelector('.study-tool > small').textContent = Object.keys(quiz.answers).length+' of '+quiz.questions.length+' answered';
    const bar = main.querySelector('.study-tool .meter');
    const value=pct(Object.keys(quiz.answers).length,quiz.questions.length);
    bar.setAttribute('aria-valuenow',value);
    bar.firstElementChild.style.width=value+'%';
  }
});
main.addEventListener('keydown',event=>{
  const tab = event.target.closest('[data-tab]');
  const keys=['ArrowLeft','ArrowRight','Home','End'];
  if (!tab || !keys.includes(event.key)) return;
  event.preventDefault();
  const index=tabs.findIndex(([key])=>key===tab.dataset.tab);
  const nextIndex=event.key==='Home'?0:event.key==='End'?tabs.length-1:(index+tabs.length+(event.key==='ArrowLeft'?-1:1))%tabs.length;
  main.querySelector('#tab-'+tabs[nextIndex][0]).click();
});

const searchIndex = [
  ...tools.map(([key,label])=>({label, meta:'Study tool', url:'#'+key})),
  {label:'Bookmarks',meta:'Study tool',url:'#bookmarks'},
  {label:automotiveCase.title,meta:'Topic 08 · Notes',url:automotiveLink,body:[automotiveCase.source,automotiveCase.situation,automotiveCase.problems,...automotiveCase.interventions,...automotiveCase.results.flat(),automotiveCase.outcome].join(' ')},
  {label:'Case Study Practice',meta:'Topic 08 · Notes',url:casePracticeLink,body:'Automotive plant maintenance'},
  ...topics.flatMap(t=>[
    {label:t.title,meta:'Topic '+pad(t.id),url:topicLink(t.id,'notes'),body:t.description},
    ...t.sections.map(s=>({label:s.title,meta:'Topic '+pad(t.id)+' · Notes',url:topicLink(t.id,'notes','note-'+s.id),body:[s.meaning,s.detail,s.example,s.remember,examTerms[t.id-1][s.id-1]].join(' ')}))
  ])
];
function closeSearch() {searchResults.hidden=true;}
function runSearch() {
  const query=search.value.trim().toLowerCase();
  if (!query) {closeSearch();return;}
  const parts=query.split(/\s+/);
  const results=searchIndex.filter(item=>parts.every(word=>(item.label+' '+(item.body||'')).toLowerCase().includes(word)))
    .sort((a,b)=>Number(b.label.toLowerCase().includes(query))-Number(a.label.toLowerCase().includes(query))).slice(0,9);
  searchResults.hidden=false;
  searchResults.innerHTML=results.length ? results.map(r=>`<a href="${r.url}"><strong>${esc(r.label)}</strong><small>${esc(r.meta)}</small></a>`).join('') : '<p>No matching notes or study tools.</p>';
}
search.addEventListener('input',runSearch);
search.addEventListener('focus',runSearch);
searchResults.addEventListener('click',event=>{
  const link=event.target.closest('a');
  if (!link) return;
  if (link.hash===location.hash) navigate();
  search.value='';closeSearch();
});
document.addEventListener('click',event=>{if (!event.target.closest('.search-wrap')) closeSearch();});
document.addEventListener('keydown',event=>{
  if (event.key==='/' && !event.target.matches('input,textarea,[contenteditable]') && !event.metaKey && !event.ctrlKey && !event.altKey) {event.preventDefault();search.focus();}
  if (event.key==='Escape') {
    if (!searchResults.hidden) {closeSearch();search.focus();closeSearch();}
    if (sidebar.classList.contains('drawer-open')) {setDrawer(false);document.querySelector('#menu').focus();}
  }
  if (event.key==='ArrowDown' && event.target===search && !searchResults.hidden) {event.preventDefault();searchResults.querySelector('a')?.focus();}
  if (event.key==='Enter' && event.target===search && !searchResults.hidden) searchResults.querySelector('a')?.click();
});
navigate();
