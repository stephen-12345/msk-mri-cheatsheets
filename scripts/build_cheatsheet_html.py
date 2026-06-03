#!/usr/bin/env python3
"""
Build dark-mode, readable HTML cheat sheets from the *-mri-cheatsheet.md sources.

This produces a clean *document* rendering of each cheat sheet (the same content
as the PDF), NOT the interactive dictation template. The structured click-to-build
templates live in /templates/ and are intentionally left untouched.

Output overwrites {joint}/{joint}-mri-cheatsheet.html for every joint.

Markdown handled:
  # Title              -> banner heading
  ## Section           -> teal section header
  ### Subsection       -> underlined subheading
  | table |            -> HTML table (first row header, --- separator skipped)
  **Name**             -> diagnosis name heading (whole-line bold)
  **F:** text          -> Findings line
  **I:** text          -> Impression line
  - bullet             -> unordered list
  plain text           -> paragraph
  [bracketed]          -> highlighted "replace-me" placeholder
  **inline bold**      -> <b>
"""
from __future__ import annotations

import html
import re
from pathlib import Path
from urllib.parse import quote

ROOT = Path("/Users/jarviscore/Downloads/msk-mri-dictation-cheatsheets-webapp")
JOINTS = ["shoulder", "knee", "elbow", "hip", "ankle", "foot", "finger", "wrist"]

# Obsidian deep-link target: the synced copies live in this vault/folder.
OBSIDIAN_VAULT = "Obsidian Vault"
OBSIDIAN_DIR = "Medical/Radiology/MSK/MRI Dictation Cheatsheets"


def obsidian_uri(note: str) -> str:
    """Build an obsidian://open deep link for a note (basename, no extension)."""
    return (
        "obsidian://open?vault=" + quote(OBSIDIAN_VAULT, safe="")
        + "&file=" + quote(f"{OBSIDIAN_DIR}/{note}", safe="")
    )

CSS = """
:root{
  --bg:#0c0f15; --panel:#141925; --panel2:#1a2030; --bdr:#27303f;
  --tx:#e6eaf2; --tx2:#aab4c5; --tx3:#7c8699;
  --h1bg:#0b3a52; --h2bg:#11556f; --h3tx:#6cc6e6;
  --findings:#f4a86a; --impression:#7fd29a;
  --ph-bg:rgba(244,168,106,0.16); --ph-tx:#f4c89a; --ph-bd:rgba(244,168,106,0.4);
  --th-bg:#16384a; --th-tx:#cfe7f2;
}
*{box-sizing:border-box;margin:0;padding:0}
html{background:var(--bg);color-scheme:dark;
  -webkit-print-color-adjust:exact; print-color-adjust:exact;}
body{
  font-family:-apple-system,BlinkMacSystemFont,"SF Pro Text","Segoe UI",system-ui,sans-serif;
  background:var(--bg); color:var(--tx);
  font-size:18px; line-height:1.62;
  max-width:1120px; margin:0 auto; padding:0 32px 64px;
  -webkit-font-smoothing:antialiased;
}

.topbar{
  position:sticky; top:0; z-index:10;
  display:flex; align-items:center; gap:10px; flex-wrap:wrap;
  margin:0 -32px 22px;
  padding:11px 32px;
  padding-top:calc(11px + env(safe-area-inset-top, 0px));
  padding-left:calc(32px + env(safe-area-inset-left, 0px));
  padding-right:calc(32px + env(safe-area-inset-right, 0px));
  background:rgba(12,15,21,0.94); backdrop-filter:blur(10px);
  border-bottom:1px solid var(--bdr);
}
.topbar .crumb{font-weight:700;color:#fff;font-size:15px;margin-right:auto}
.topbar a{
  display:inline-flex; align-items:center;
  border:1px solid var(--bdr); border-radius:999px;
  padding:5px 12px; color:#9fdcf0; text-decoration:none;
  font-size:13px; font-weight:600; background:#0d1a26;
}
.topbar a:hover{border-color:var(--h3tx); color:#fff}
.topbar a.tmpl{border-color:rgba(244,168,106,0.55);background:rgba(244,168,106,0.12);color:#ffe0c8}
.topbar a.cases{border-color:rgba(121,212,155,0.55);background:rgba(121,212,155,0.12);color:#bdeccf}
.topbar a.obs{border-color:rgba(167,139,250,0.55);background:rgba(167,139,250,0.12);color:#cbbdf5}
.topbar a.trainer{border-color:rgba(95,198,230,0.6);background:rgba(95,198,230,0.14);color:#cdeffb;font-weight:700}
.topbar a.homebtn{font-size:16px;padding:4px 9px;line-height:1}

.fontctl{
  display:inline-flex; align-items:center; gap:4px;
  margin-left:6px; padding-left:10px; border-left:1px solid var(--bdr);
}
.fontctl button{
  cursor:pointer; border:1px solid var(--bdr); border-radius:6px;
  background:#0d1a26; color:#9fdcf0; font-weight:700;
  font-family:inherit; line-height:1; padding:5px 9px;
}
.fontctl button:hover{border-color:var(--h3tx); color:#fff}
.fontctl #fs-dec{font-size:12px}
.fontctl #fs-rst{font-size:13px; min-width:30px}
.fontctl #fs-inc{font-size:16px}

h1{
  margin:6px 0 8px; padding:16px 22px;
  background:linear-gradient(135deg,var(--h1bg),#0a2c40);
  color:#fff; border-radius:10px; border-left:5px solid var(--h3tx);
  font-size:30px; line-height:1.18; letter-spacing:0.2px;
}
.subtitle{color:var(--tx2); font-size:16px; margin:0 0 22px; line-height:1.5}
/* static fallback; JS refines scroll-padding-top to the exact sticky-bar height */
html{scroll-padding-top:calc(116px + env(safe-area-inset-top, 0px));}

h2.group{
  margin:40px 0 16px; padding:13px 18px;
  background:linear-gradient(135deg,#241a3a,#1a2030);
  color:#fff; border-radius:9px; border-left:5px solid #a78bfa;
  font-size:24px; line-height:1.2; letter-spacing:0.6px;
  text-transform:uppercase; scroll-margin-top:0;
}
h2{
  margin:34px 0 14px; padding:11px 16px;
  background:var(--h2bg); color:#fff; border-radius:8px;
  font-size:21px; line-height:1.25; letter-spacing:0.2px;
  scroll-margin-top:0;
}
h3{
  margin:22px 0 9px; color:var(--h3tx);
  font-size:18.5px; line-height:1.3; font-weight:700;
  border-bottom:1px solid #2c3a48; padding-bottom:5px;
  scroll-margin-top:0;
}

p{margin:9px 0}
.dx{
  margin:18px 0 4px; font-weight:800; color:#fff;
  font-size:18.5px; line-height:1.3;
}
.f, .i{margin:5px 0; padding-left:14px; border-left:2px solid #25303e}
.f b{color:var(--findings)}
.i b{color:var(--impression)}

ul{margin:10px 0 14px 26px}
li{margin:6px 0}

table{
  width:100%; border-collapse:collapse; margin:14px 0 18px;
  font-size:16px; line-height:1.45; background:var(--panel);
  border-radius:8px; overflow:hidden;
}
th{
  background:var(--th-bg); color:var(--th-tx);
  text-align:left; font-weight:700; padding:9px 12px;
  border-bottom:1px solid #2c3a48;
}
td{padding:8px 12px; border-bottom:1px solid #232c39; color:var(--tx2); vertical-align:top}
tr:last-child td{border-bottom:none}
tr:nth-child(even) td{background:rgba(255,255,255,0.015)}

.to-top{
  position:fixed; z-index:20;
  right:calc(22px + env(safe-area-inset-right, 0px));
  bottom:calc(22px + env(safe-area-inset-bottom, 0px));
  width:46px; height:46px; border-radius:50%;
  display:flex; align-items:center; justify-content:center;
  border:1px solid var(--bdr); background:rgba(17,85,111,0.92);
  color:#fff; font-size:22px; line-height:1; cursor:pointer;
  box-shadow:0 6px 20px rgba(0,0,0,0.45); backdrop-filter:blur(6px);
  opacity:0; visibility:hidden; transform:translateY(8px);
  transition:opacity .18s, transform .18s, visibility .18s;
}
.to-top.show{opacity:1; visibility:visible; transform:translateY(0)}
.to-top:hover{background:#16638a; border-color:var(--h3tx)}
@media print{ .to-top{display:none} }

.ph{
  background:var(--ph-bg); color:var(--ph-tx);
  border:1px solid var(--ph-bd); border-radius:4px;
  padding:0 4px; font-size:0.92em; white-space:nowrap;
}

.section-card{
  background:var(--panel); border:1px solid var(--bdr);
  border-radius:10px; padding:4px 20px 16px; margin:0 0 18px;
}

/* ── Teaching callout boxes ── */
.callout{
  border:1px solid var(--bdr); border-left:4px solid var(--c-acc,#6cc6e6);
  background:var(--c-bg,#101a22); border-radius:9px;
  padding:12px 18px 13px; margin:14px 0;
}
.callout .c-title{
  display:flex; align-items:baseline; gap:9px;
  font-weight:800; font-size:14px; letter-spacing:0.6px;
  text-transform:uppercase; color:var(--c-acc,#6cc6e6); margin:0 0 7px;
}
.callout .c-title .ico{font-size:15px; line-height:1}
.callout .c-title .lbl{opacity:0.78; font-size:11px; font-weight:700}
.callout .c-title .ttl{color:var(--tx); text-transform:none; letter-spacing:0; font-size:16px}
.callout p{margin:7px 0; color:var(--tx)}
.callout ul{margin:7px 0 7px 22px}
.callout li{margin:5px 0; color:var(--tx)}
.callout b{color:#fff}
.callout.find{--c-acc:#5fc6e6; --c-bg:#0d1c25}
.callout.landmark{--c-acc:#b69cf0; --c-bg:#16132a}
.callout.pearl{--c-acc:#79d49b; --c-bg:#0e1f17}
.callout.pitfall{--c-acc:#f3ad63; --c-bg:#231910}
.callout.measure{--c-acc:#7fb2ea; --c-bg:#101826}
.callout.note{--c-acc:#9fb4c6; --c-bg:#141a22}
.callout.tip{--c-acc:#5fd0c0; --c-bg:#0c1f1d}
.callout.key{--c-acc:#ffd166; --c-bg:#221d0f}
.callout.quiz{--c-acc:#b69cf0; --c-bg:#16132a}
.callout.quiz .c-title .ttl{font-weight:700;}
.quiz-ans{margin-top:6px;}
.quiz-ans > summary{
  cursor:pointer; list-style:none; display:inline-flex; align-items:center; gap:7px;
  color:#b69cf0; font-weight:700; font-size:13.5px; border:1px solid rgba(167,139,250,0.45);
  background:rgba(167,139,250,0.12); border-radius:999px; padding:5px 13px; user-select:none;
}
.quiz-ans > summary::-webkit-details-marker{display:none;}
.quiz-ans > summary::before{content:"▸ "; font-size:11px;}
.quiz-ans[open] > summary::before{content:"▾ ";}
.quiz-ans[open] > summary{color:#cbbdf5;}
.quiz-ans .ans{margin-top:9px; padding-top:9px; border-top:1px solid #2a2440; color:var(--tx);}
mark, .callout mark, p mark, li mark{ background:rgba(255,209,102,0.2); color:#ffe6ad; border-radius:3px; padding:0 3px; }
mark.hl{ background:rgba(95,198,230,0.2); color:#cdeffb; }

/* inline 'On this page' TOC */
.inline-toc{ background:var(--panel); border:1px solid var(--bdr); border-radius:10px; padding:11px 15px; margin:14px 0 22px; }
.inline-toc > summary{ cursor:pointer; font-weight:800; font-size:12px; letter-spacing:1px; text-transform:uppercase; color:var(--tx2); list-style:none; }
.inline-toc > summary::-webkit-details-marker{ display:none; }
.inline-toc > summary::before{ content:"▸ "; color:var(--tx3); }
.inline-toc[open] > summary::before{ content:"▾ "; }
.itoc-links{ display:flex; flex-wrap:wrap; gap:7px 9px; margin-top:11px; align-items:baseline; }
.itoc-links a{ text-decoration:none; font-size:13.5px; }
.itoc-links a.itoc-group{ width:100%; color:#c9b6f5; font-weight:800; text-transform:uppercase; font-size:11.5px; letter-spacing:.5px; margin-top:5px; }
.itoc-links a.itoc-h2{ color:#9fdcf0; border:1px solid var(--bdr); border-radius:999px; padding:3px 11px; background:#0d1a26; }
.itoc-links a.itoc-h2:hover{ border-color:var(--h3tx); color:#fff; }
@media print{
  .inline-toc{ display:none; }
  details.quiz-ans > summary{ display:none; }
  details.quiz-ans .ans{ display:block !important; border-top:none; padding-top:0; }
}

/* ── Anatomy diagrams (inline SVG) ── */
.diagram{
  margin:18px 0; padding:14px 16px 10px;
  background:#0b131d; border:1px solid var(--bdr); border-radius:10px;
}
.diagram svg{ display:block; width:100%; height:auto; max-width:560px; margin:0 auto; }
.diagram figcaption{
  margin:10px auto 2px; max-width:620px; text-align:center;
  font-size:13.5px; color:var(--tx2); line-height:1.5;
}
@media print{ .diagram{ break-inside:avoid; } }

/* "Review in cheat sheet" cross-link after each case */
.review{ margin:10px 0 4px; }
.review a{
  display:inline-flex; align-items:center; gap:6px; max-width:100%;
  text-decoration:none; font-size:13.5px; font-weight:650; line-height:1.3;
  color:#9be4b5; border:1px solid rgba(121,212,155,0.45);
  background:rgba(121,212,155,0.10); border-radius:999px; padding:5px 13px;
}
.review a:hover{ border-color:#9be4b5; color:#cdebd8; background:rgba(121,212,155,0.18); }
@media print{ .review{ display:none; } }

/* ── Table-of-contents drawer (overlay; never resizes the page) ── */
.toc-toggle{
  display:inline-flex; align-items:center; gap:5px;
  border:1px solid var(--bdr); border-radius:7px; background:#0d1a26;
  color:#9fdcf0; font-weight:700; font-size:13px; padding:5px 11px;
  cursor:pointer; font-family:inherit; margin-right:4px;
}
.toc-toggle:hover{ border-color:var(--h3tx); color:#fff; }
.toc-backdrop{
  position:fixed; inset:0; z-index:55; background:rgba(0,0,0,0.5);
  opacity:0; visibility:hidden; transition:opacity .2s;
}
.toc-backdrop.show{ opacity:1; visibility:visible; }
.toc-drawer{
  position:fixed; top:0; left:0; height:100vh; width:316px; max-width:86vw; z-index:60;
  background:#0b121d; border-right:1px solid var(--bdr);
  box-shadow:3px 0 28px rgba(0,0,0,0.55);
  transform:translateX(-104%); transition:transform .22s ease;
  display:flex; flex-direction:column;
}
.toc-drawer.open{ transform:translateX(0); }
.toc-head{
  display:flex; align-items:center; justify-content:space-between;
  padding:13px 16px;
  padding-top:calc(13px + env(safe-area-inset-top, 0px));
  border-bottom:1px solid var(--bdr); flex:0 0 auto;
}
.toc-head .t{ font-weight:800; color:#fff; font-size:15px; letter-spacing:.5px; }
.toc-close{ background:none; border:none; color:var(--tx2); font-size:24px; line-height:1; cursor:pointer; padding:0 4px; }
.toc-close:hover{ color:#fff; }
.toc-list{ overflow-y:auto; padding:8px 8px 28px; flex:1; }
.toc-node.leaf{ }
.toc-row{ display:flex; align-items:flex-start; }
.toc-tog{
  flex:0 0 auto; width:20px; height:26px; margin-top:1px;
  background:none; border:none; cursor:pointer; padding:0;
  color:var(--tx3); font-size:11px;
}
.toc-tog::before{ content:"▸"; display:inline-block; transition:transform .15s; }
.toc-node.open > .toc-row > .toc-tog::before{ transform:rotate(90deg); }
.toc-node.leaf .toc-row{ padding-left:20px; }
.toc-children{ display:none; }
.toc-node.open > .toc-children{ display:block; }
.toc-link{
  flex:1; display:block; text-decoration:none; color:var(--tx2);
  padding:5px 9px; border-radius:6px; font-size:13.5px; line-height:1.35;
  border-left:2px solid transparent;
}
.toc-link:hover{ background:#13212f; color:#fff; }
.toc-link.active{ border-left-color:var(--h3tx); background:#13212f; color:#fff; }
.toc-link.lvl-group{ color:#c9b6f5; font-weight:800; text-transform:uppercase; font-size:12px; letter-spacing:.5px; }
.toc-link.lvl-h2{ color:#e6eaf2; font-weight:600; }
.toc-link.lvl-h3{ color:var(--tx2); font-size:12.5px; }
.toc-children .toc-children .toc-link{ padding-left:18px; }
@media print{ .toc-toggle, .toc-drawer, .toc-backdrop{ display:none !important; } }

/* Left-edge floating handle — thumb-reach access to the TOC from anywhere */
.toc-handle{
  position:fixed; left:0; top:64%; transform:translateY(-50%);
  z-index:54; display:flex; align-items:center; justify-content:center;
  width:27px; height:74px; padding:0;
  background:rgba(17,85,111,0.9); color:#d6f0fb;
  border:1px solid var(--bdr); border-left:none; border-radius:0 13px 13px 0;
  box-shadow:3px 0 16px rgba(0,0,0,0.5);
  -webkit-backdrop-filter:blur(6px); backdrop-filter:blur(6px);
  font-size:16px; line-height:1; cursor:pointer;
  -webkit-tap-highlight-color:transparent;
  transition:opacity .18s, background .15s, visibility .18s;
}
.toc-handle:hover{ background:#16638a; color:#fff; }
.toc-handle:active{ background:#1d7aa8; }
.toc-handle .chev{ font-size:11px; opacity:.75; }
body.toc-open .toc-handle{ opacity:0; visibility:hidden; }
@media print{ .toc-handle{ display:none; } }
@media (min-width:901px) and (hover:hover){ .toc-handle{ display:none; } }

@media (max-width:680px){
  body{font-size:17px; padding:0 16px 48px}
  .topbar{
    margin:0 -16px 18px;
    padding:8px 14px;
    padding-top:calc(8px + env(safe-area-inset-top, 0px));
    padding-left:calc(14px + env(safe-area-inset-left, 0px));
    padding-right:calc(14px + env(safe-area-inset-right, 0px));
    gap:7px;
  }
  .topbar .crumb{ display:none; }            /* title already shown in the h1 banner */
  .topbar a{ font-size:12px; padding:5px 9px; min-height:36px; }
  .toc-toggle{ font-size:12.5px; padding:6px 11px; min-height:36px; }
  .fontctl{ margin-left:2px; padding-left:8px; }
  .fontctl button{ padding:6px 9px; }
  h1{font-size:24px;padding:13px 16px}
  h2{font-size:19px}
  h1,h2,h2.group,h3{ scroll-margin-top:0; }
}

/* Dark-mode PDF (Chrome --print-to-pdf). Backgrounds preserved via
   print-color-adjust:exact on html above. */
@page{ size:Letter; margin:0.5in; }
@media print{
  body{ background:var(--bg); max-width:none; margin:0; padding:0; font-size:13px; line-height:1.5; }
  .topbar{ display:none; }
  h1{ font-size:21px; padding:11px 14px; }
  h2,h2.group{ font-size:15px; break-after:avoid; }
  h3,.dx{ break-after:avoid; }
  .f,.i{ break-inside:avoid; }
  table,tr{ break-inside:avoid; }
  table{ font-size:11.5px; }
}
"""


SCRIPT = """
(function(){
  // keep in-page anchor jumps (TOC, review links) clear of the sticky top bar
  var __bar=document.querySelector('.topbar');
  function __pad(){ if(__bar) document.documentElement.style.scrollPaddingTop=(__bar.offsetHeight+14)+'px'; }
  __pad();
  window.addEventListener('resize', __pad);
  window.addEventListener('orientationchange', __pad);
  window.addEventListener('load', __pad);
  var KEY='cheatsheet-font-scale', MIN=0.7, MAX=1.8, STEP=0.1;
  var scale=parseFloat(localStorage.getItem(KEY));
  if(!scale||isNaN(scale)) scale=1;
  function apply(){ document.body.style.zoom=scale; }
  function set(s){
    scale=Math.min(MAX, Math.max(MIN, Math.round(s*10)/10));
    localStorage.setItem(KEY, scale);
    apply();
  }
  apply();
  var dec=document.getElementById('fs-dec'),
      inc=document.getElementById('fs-inc'),
      rst=document.getElementById('fs-rst');
  if(dec) dec.onclick=function(){ set(scale-STEP); };
  if(inc) inc.onclick=function(){ set(scale+STEP); };
  if(rst) rst.onclick=function(){ set(1); };
  // back-to-top button
  var top=document.getElementById('to-top');
  function goTop(){ window.scrollTo({top:0, behavior:'smooth'}); }
  function onScroll(){
    if(!top) return;
    if(window.scrollY>320) top.classList.add('show');
    else top.classList.remove('show');
  }
  if(top){ top.onclick=goTop; window.addEventListener('scroll', onScroll, {passive:true}); onScroll(); }

  // ── Table of contents drawer ──
  var drawer=document.getElementById('toc-drawer'),
      backdrop=document.getElementById('toc-backdrop'),
      tocToggle=document.getElementById('toc-toggle'),
      tocClose=document.getElementById('toc-close'),
      tocHandle=document.getElementById('toc-handle');
  function tocOpen(){ if(drawer){ drawer.classList.add('open'); backdrop.classList.add('show'); document.body.classList.add('toc-open'); } }
  function tocCloseFn(){ if(drawer){ drawer.classList.remove('open'); backdrop.classList.remove('show'); document.body.classList.remove('toc-open'); } }
  function tocToggleFn(){ drawer && (drawer.classList.contains('open')?tocCloseFn():tocOpen()); }
  if(tocToggle) tocToggle.onclick=tocToggleFn;
  if(tocHandle) tocHandle.onclick=tocOpen;
  if(tocClose) tocClose.onclick=tocCloseFn;
  if(backdrop) backdrop.onclick=tocCloseFn;
  // swipe-left on the open drawer to close it
  var swX=null, swY=null;
  document.addEventListener('touchstart', function(e){
    if(drawer && drawer.classList.contains('open')){ var t=e.touches[0]; swX=t.clientX; swY=t.clientY; }
    else swX=null;
  }, {passive:true});
  document.addEventListener('touchmove', function(e){
    if(swX===null) return; var t=e.touches[0];
    if(t.clientX-swX < -45 && Math.abs(t.clientY-swY) < 70){ tocCloseFn(); swX=null; }
  }, {passive:true});
  document.addEventListener('touchend', function(){ swX=null; }, {passive:true});
  if(drawer){
    drawer.addEventListener('click', function(e){
      var tog=e.target.closest('.toc-tog');
      if(tog){ e.preventDefault(); tog.closest('.toc-node').classList.toggle('open'); return; }
      if(e.target.closest('a')){ tocCloseFn(); }   // jump (href) + close
    });
  }
  // scroll-spy: highlight current section, open its ancestors
  var links={}, heads=[];
  if(drawer){
    [].forEach.call(drawer.querySelectorAll('a[href^="#"]'), function(a){
      var id=a.getAttribute('href').slice(1); links[id]=a;
      var h=document.getElementById(id); if(h) heads.push(h);
    });
    heads.sort(function(a,b){ return a.offsetTop-b.offsetTop; });
  }
  var spyT=null;
  function spy(){
    if(!heads.length) return;
    var y=window.scrollY+96, cur=null;
    for(var k=0;k<heads.length;k++){ if(heads[k].offsetTop<=y) cur=heads[k].id; else break; }
    for(var id in links) links[id].classList.remove('active');
    if(cur && links[cur]){
      var a=links[cur]; a.classList.add('active');
      var node=a.closest('.toc-node');
      while(node){ node.classList.add('open'); node=node.parentElement&&node.parentElement.closest('.toc-node'); }
    }
  }
  window.addEventListener('scroll', function(){ if(spyT) return; spyT=setTimeout(function(){ spyT=null; spy(); },120); }, {passive:true});
  spy();

  document.addEventListener('keydown', function(e){
    if(e.metaKey||e.ctrlKey||e.altKey) return;            // leave native zoom alone
    var t=e.target;
    if(t && (t.tagName==='INPUT'||t.tagName==='TEXTAREA'||t.isContentEditable)) return;
    if(e.key==='+'||e.key==='='){ set(scale+STEP); e.preventDefault(); }
    else if(e.key==='-'||e.key==='_'){ set(scale-STEP); e.preventDefault(); }
    else if(e.key==='0'){ set(1); e.preventDefault(); }
    else if(e.key==='Home'){ goTop(); e.preventDefault(); }
    else if(e.key==='c'||e.key==='C'){ tocToggleFn(); e.preventDefault(); }
    else if(e.key==='Escape'){ tocCloseFn(); }
  });
})();
"""


CALLOUT_TYPES = {
    "FIND": ("find", "🔍", "How to find it"),
    "LANDMARK": ("landmark", "📍", "Landmark"),
    "PEARL": ("pearl", "💡", "Pearl"),
    "PITFALL": ("pitfall", "⚠️", "Pitfall"),
    "MEASURE": ("measure", "📏", "Measure"),
    "TIP": ("tip", "💡", "Tip"),
    "KEY": ("key", "🔑", "Key points"),
    "QUIZ": ("quiz", "❓", "Quiz"),
    "NOTE": ("note", "📝", "Note"),
}


def callout_meta(block: list[str]) -> tuple:
    """Return (type_key, title) for a callout block, or (None, '')."""
    for ln in block:
        if ln.strip():
            m = re.match(r"^\[!(\w+)\]\s*(.*)$", ln.strip())
            if m:
                return m.group(1).upper(), m.group(2).strip()
            return None, ""
    return None, ""


def render_callout(block: list[str], cid: str | None = None) -> str:
    """Render a blockquote admonition block into a styled callout.
    block: lines already stripped of the leading '>' marker."""
    # detect [!TYPE] optional-title on the first non-empty line
    cls, ico, label, title = "note", "📝", "Note", ""
    body = list(block)
    for idx, ln in enumerate(block):
        if ln.strip():
            m = re.match(r"^\[!(\w+)\]\s*(.*)$", ln.strip())
            if m:
                key = m.group(1).upper()
                cls, ico, label = CALLOUT_TYPES.get(key, ("note", "📝", key.title()))
                title = m.group(2).strip()
                body = block[idx + 1:]
            break

    # build body: paragraphs + bullet lists
    out: list[str] = []
    buf: list[str] = []
    blist: list[str] = []

    def flush_p():
        if buf:
            out.append("<p>" + inline(" ".join(buf).strip()) + "</p>")
            buf.clear()

    def flush_b():
        if blist:
            out.append("<ul>" + "".join(f"<li>{inline(x)}</li>" for x in blist) + "</ul>")
            blist.clear()

    for ln in body:
        s = ln.strip()
        if not s:
            flush_p()
            flush_b()
        elif s.startswith("- "):
            flush_p()
            blist.append(s[2:].strip())
        else:
            flush_b()
            buf.append(s)
    flush_p()
    flush_b()

    ttl = f'<span class="ttl">{inline(title)}</span>' if title else ""
    head = (
        '<div class="c-title">'
        f'<span class="ico">{ico}</span>'
        f'<span class="lbl">{html.escape(label)}</span>'
        f"{ttl}</div>"
    )
    idattr = f' id="{cid}"' if cid else ""
    if cls == "quiz":
        body_html = "".join(out)
        inner = (
            head
            + '<details class="quiz-ans"><summary>Show answer</summary>'
            + f'<div class="ans">{body_html}</div></details>'
        )
        return f'<div class="callout {cls}"{idattr}>{inner}</div>'
    return f'<div class="callout {cls}"{idattr}>{head}{"".join(out)}</div>'


SVG_ANKLE_TENDONS_AXIAL = '''<svg viewBox="0 0 560 600" role="img" aria-label="Axial cross-section showing the arrangement of ankle tendons" xmlns="http://www.w3.org/2000/svg" font-family="-apple-system,Segoe UI,Arial,sans-serif">
  <text x="280" y="26" text-anchor="middle" fill="#9fb4c6" font-size="15" font-weight="700" letter-spacing="2">ANTERIOR</text>
  <text x="280" y="434" text-anchor="middle" fill="#9fb4c6" font-size="15" font-weight="700" letter-spacing="2">POSTERIOR</text>
  <text x="14" y="214" text-anchor="start" fill="#9fb4c6" font-size="15" font-weight="700" letter-spacing="2">MEDIAL</text>
  <text x="546" y="214" text-anchor="end" fill="#9fb4c6" font-size="15" font-weight="700" letter-spacing="2">LATERAL</text>
  <ellipse cx="250" cy="202" rx="86" ry="70" fill="#29323f" stroke="#47576c" stroke-width="2"/>
  <ellipse cx="180" cy="238" rx="30" ry="30" fill="#29323f" stroke="#47576c" stroke-width="2"/>
  <ellipse cx="394" cy="198" rx="28" ry="38" fill="#29323f" stroke="#47576c" stroke-width="2"/>
  <text x="252" y="206" text-anchor="middle" fill="#8593a6" font-size="13" letter-spacing="1">TIBIA</text>
  <text x="394" y="202" text-anchor="middle" fill="#8593a6" font-size="11">FIB</text>
  <text x="166" y="250" text-anchor="middle" fill="#74839a" font-size="9">med. mall.</text>
  <circle cx="176" cy="108" r="14" fill="#79d49b" stroke="#0e1f17" stroke-width="1.5"/>
  <text x="176" y="112" text-anchor="middle" fill="#0c1410" font-size="10" font-weight="700">TA</text>
  <circle cx="236" cy="96" r="14" fill="#79d49b" stroke="#0e1f17" stroke-width="1.5"/>
  <text x="236" y="100" text-anchor="middle" fill="#0c1410" font-size="9" font-weight="700">EHL</text>
  <circle cx="298" cy="104" r="14" fill="#79d49b" stroke="#0e1f17" stroke-width="1.5"/>
  <text x="298" y="108" text-anchor="middle" fill="#0c1410" font-size="9" font-weight="700">EDL</text>
  <circle cx="104" cy="166" r="14" fill="#5fc6e6" stroke="#0d2530" stroke-width="1.5"/>
  <text x="104" y="170" text-anchor="middle" fill="#06151c" font-size="9" font-weight="700">TP</text>
  <circle cx="92" cy="214" r="14" fill="#5fc6e6" stroke="#0d2530" stroke-width="1.5"/>
  <text x="92" y="218" text-anchor="middle" fill="#06151c" font-size="9" font-weight="700">FDL</text>
  <circle cx="104" cy="262" r="13" fill="#e2737a" stroke="#2a0e10" stroke-width="1.5"/>
  <text x="104" y="266" text-anchor="middle" fill="#1c0708" font-size="9" font-weight="700">NV</text>
  <circle cx="148" cy="304" r="14" fill="#5fc6e6" stroke="#0d2530" stroke-width="1.5"/>
  <text x="148" y="308" text-anchor="middle" fill="#06151c" font-size="9" font-weight="700">FHL</text>
  <circle cx="440" cy="238" r="14" fill="#f3ad63" stroke="#231406" stroke-width="1.5"/>
  <text x="440" y="242" text-anchor="middle" fill="#1a1206" font-size="9" font-weight="700">PB</text>
  <circle cx="464" cy="282" r="14" fill="#f3ad63" stroke="#231406" stroke-width="1.5"/>
  <text x="464" y="286" text-anchor="middle" fill="#1a1206" font-size="9" font-weight="700">PL</text>
  <ellipse cx="252" cy="372" rx="52" ry="27" fill="#b69cf0" stroke="#211934" stroke-width="1.5"/>
  <text x="252" y="376" text-anchor="middle" fill="#160f24" font-size="12" font-weight="700">Achilles</text>
  <circle cx="196" cy="350" r="8" fill="#b69cf0" stroke="#211934" stroke-width="1.5"/>
  <text x="196" y="353" text-anchor="middle" fill="#160f24" font-size="7" font-weight="700">pl</text>
  <line x1="24" y1="452" x2="536" y2="452" stroke="#27303f" stroke-width="1"/>
  <circle cx="36" cy="474" r="8" fill="#79d49b"/>
  <text x="52" y="478" font-size="12" fill="#cdd6e2"><tspan font-weight="700" fill="#9be4b5">Anterior</tspan> — TA &#183; EHL &#183; EDL  (anterior to the tibia)</text>
  <circle cx="36" cy="503" r="8" fill="#5fc6e6"/>
  <text x="52" y="507" font-size="12" fill="#cdd6e2"><tspan font-weight="700" fill="#8fe0f5">Medial</tspan> (post. to med. malleolus) — <tspan font-weight="700">Tom</tspan>&#183;TP, <tspan font-weight="700">Dick</tspan>&#183;FDL, <tspan font-weight="700">aNd</tspan>&#183;NV, <tspan font-weight="700">Harry</tspan>&#183;FHL</text>
  <circle cx="36" cy="532" r="8" fill="#f3ad63"/>
  <text x="52" y="536" font-size="12" fill="#cdd6e2"><tspan font-weight="700" fill="#f7c389">Lateral</tspan> (post. to fibula) — peroneus Brevis (deep, on bone) &#183; Longus (superficial)</text>
  <circle cx="36" cy="561" r="8" fill="#b69cf0"/>
  <text x="52" y="565" font-size="12" fill="#cdd6e2"><tspan font-weight="700" fill="#c9b6f5">Posterior</tspan> — Achilles tendon (+ plantaris, anteromedial border)</text>
</svg>'''

SVG_ANKLE_9ZONE = '''<svg viewBox="0 0 470 372" role="img" aria-label="Talar dome 9-zone grid" xmlns="http://www.w3.org/2000/svg" font-family="-apple-system,Segoe UI,Arial,sans-serif">
  <text x="175" y="56" text-anchor="middle" fill="#9fb4c6" font-size="13" font-weight="700">MEDIAL</text>
  <text x="265" y="56" text-anchor="middle" fill="#9fb4c6" font-size="13" font-weight="700">CENTRAL</text>
  <text x="355" y="56" text-anchor="middle" fill="#9fb4c6" font-size="13" font-weight="700">LATERAL</text>
  <text x="120" y="120" text-anchor="end" fill="#9fb4c6" font-size="13" font-weight="700">ANTERIOR</text>
  <text x="120" y="210" text-anchor="end" fill="#9fb4c6" font-size="13" font-weight="700">MIDDLE</text>
  <text x="120" y="300" text-anchor="end" fill="#9fb4c6" font-size="13" font-weight="700">POSTERIOR</text>
  <rect x="130" y="250" width="90" height="90" fill="rgba(121,212,155,0.18)"/>
  <rect x="310" y="160" width="90" height="90" fill="rgba(243,173,99,0.18)"/>
  <rect x="130" y="70" width="270" height="270" fill="none" stroke="#46566b" stroke-width="2"/>
  <line x1="220" y1="70" x2="220" y2="340" stroke="#324053" stroke-width="1"/>
  <line x1="310" y1="70" x2="310" y2="340" stroke="#324053" stroke-width="1"/>
  <line x1="130" y1="160" x2="400" y2="160" stroke="#324053" stroke-width="1"/>
  <line x1="130" y1="250" x2="400" y2="250" stroke="#324053" stroke-width="1"/>
  <text x="175" y="291" text-anchor="middle" fill="#9be4b5" font-size="12" font-weight="700">atraumatic</text>
  <text x="175" y="307" text-anchor="middle" fill="#9be4b5" font-size="10">(most common)</text>
  <text x="355" y="203" text-anchor="middle" fill="#f7c389" font-size="12" font-weight="700">traumatic</text>
  <text x="265" y="364" text-anchor="middle" fill="#8593a6" font-size="11">medial dome &#8594; deeper / cup-shaped &#183; lateral dome &#8594; shallower / wafer</text>
</svg>'''

SVG_SHOULDER_ROTATOR_INTERVAL = '''<svg viewBox="0 0 560 380" role="img" aria-label="Rotator interval anatomy" xmlns="http://www.w3.org/2000/svg" font-family="-apple-system,Segoe UI,Arial,sans-serif">
  <ellipse cx="430" cy="200" rx="105" ry="120" fill="#29323f" stroke="#47576c" stroke-width="2"/>
  <text x="446" y="205" text-anchor="middle" fill="#8593a6" font-size="12">humeral head</text>
  <path d="M70 150 Q 130 120 150 175 Q 120 150 70 150 Z" fill="#29323f" stroke="#47576c" stroke-width="2"/>
  <text x="92" y="138" text-anchor="middle" fill="#8593a6" font-size="11">coracoid</text>
  <path d="M150 120 L 360 90 L 360 120 L 160 160 Z" fill="#79d49b" opacity="0.85"/>
  <text x="250" y="78" text-anchor="middle" fill="#9be4b5" font-size="13" font-weight="700">Supraspinatus (superior border)</text>
  <path d="M150 280 L 360 310 L 360 280 L 160 240 Z" fill="#5fc6e6" opacity="0.85"/>
  <text x="250" y="332" text-anchor="middle" fill="#8fe0f5" font-size="13" font-weight="700">Subscapularis (inferior border)</text>
  <text x="150" y="208" fill="#cfe7f2" font-size="13" font-weight="700">ROTATOR INTERVAL</text>
  <circle cx="330" cy="200" r="24" fill="#b69cf0" stroke="#211934" stroke-width="1.5"/>
  <text x="330" y="204" text-anchor="middle" fill="#160f24" font-size="11" font-weight="700">LHB</text>
  <path d="M300 178 Q 330 158 360 178" fill="none" stroke="#f3ad63" stroke-width="5" stroke-linecap="round"/>
  <text x="330" y="150" text-anchor="middle" fill="#f7c389" font-size="12" font-weight="700">CHL</text>
  <path d="M300 222 Q 330 244 360 222" fill="none" stroke="#5fd0c0" stroke-width="5" stroke-linecap="round"/>
  <text x="330" y="266" text-anchor="middle" fill="#7fded0" font-size="12" font-weight="700">SGHL</text>
  <text x="280" y="358" text-anchor="middle" fill="#8593a6" font-size="11">CHL + SGHL form the biceps pulley sling around the LHB</text>
</svg>'''

SVG_SHOULDER_FOOTPRINTS = '''<svg viewBox="0 0 540 380" role="img" aria-label="Rotator cuff footprints" xmlns="http://www.w3.org/2000/svg" font-family="-apple-system,Segoe UI,Arial,sans-serif">
  <text x="270" y="26" text-anchor="middle" fill="#9fb4c6" font-size="13" font-weight="700" letter-spacing="1">PROXIMAL HUMERUS (top-down)</text>
  <ellipse cx="250" cy="210" rx="130" ry="120" fill="#29323f" stroke="#47576c" stroke-width="2"/>
  <text x="250" y="214" text-anchor="middle" fill="#7d8a9c" font-size="12">articular surface</text>
  <path d="M362 130 A130 120 0 0 1 380 210 L 332 210 A82 75 0 0 0 322 158 Z" fill="#79d49b" opacity="0.85"/>
  <text x="430" y="150" text-anchor="middle" fill="#9be4b5" font-size="12" font-weight="700">Supraspinatus</text>
  <text x="430" y="166" text-anchor="middle" fill="#8593a6" font-size="10">(superior facet)</text>
  <path d="M380 210 A130 120 0 0 1 360 292 L 320 262 A82 75 0 0 0 332 210 Z" fill="#5fc6e6" opacity="0.85"/>
  <text x="446" y="232" text-anchor="middle" fill="#8fe0f5" font-size="12" font-weight="700">Infraspinatus</text>
  <text x="446" y="248" text-anchor="middle" fill="#8593a6" font-size="10">(middle facet)</text>
  <path d="M360 292 A130 120 0 0 1 300 326 L 290 280 A82 75 0 0 0 320 262 Z" fill="#f3ad63" opacity="0.85"/>
  <text x="400" y="318" text-anchor="middle" fill="#f7c389" font-size="11" font-weight="700">Teres minor</text>
  <text x="400" y="333" text-anchor="middle" fill="#8593a6" font-size="10">(inferior facet)</text>
  <text x="455" y="206" fill="#cfe7f2" font-size="11" font-weight="700">Greater</text>
  <text x="455" y="220" fill="#cfe7f2" font-size="11" font-weight="700">tuberosity</text>
  <path d="M138 130 A130 120 0 0 0 120 210 L 168 210 A82 75 0 0 1 178 158 Z" fill="#b69cf0" opacity="0.85"/>
  <text x="70" y="150" text-anchor="middle" fill="#c9b6f5" font-size="12" font-weight="700">Subscap.</text>
  <text x="58" y="166" text-anchor="middle" fill="#8593a6" font-size="10">(lesser tub.)</text>
  <rect x="236" y="92" width="28" height="40" rx="6" fill="#1a2230" stroke="#47576c" stroke-width="1.5"/>
  <text x="250" y="84" text-anchor="middle" fill="#8593a6" font-size="10">bicipital groove (LHB)</text>
</svg>'''

SVG_KNEE_MENISCUS = '''<svg viewBox="0 0 560 360" role="img" aria-label="Meniscus map and bowtie" xmlns="http://www.w3.org/2000/svg" font-family="-apple-system,Segoe UI,Arial,sans-serif">
  <text x="160" y="24" text-anchor="middle" fill="#9fb4c6" font-size="12" font-weight="700">TIBIAL PLATEAU (top-down)</text>
  <text x="160" y="40" text-anchor="middle" fill="#7d8a9c" font-size="10">anterior ↑</text>
  <ellipse cx="160" cy="200" rx="135" ry="120" fill="#10161f" stroke="#2c3a48" stroke-width="1.5"/>
  <path d="M150 95 C 95 100 80 175 100 250 C 110 290 140 300 150 300" fill="none" stroke="#5fc6e6" stroke-width="16" stroke-linecap="round"/>
  <text x="62" y="200" text-anchor="middle" fill="#8fe0f5" font-size="12" font-weight="700">Medial</text>
  <path d="M170 95 C 225 100 240 175 220 250 C 210 290 180 300 170 300" fill="none" stroke="#f3ad63" stroke-width="13" stroke-linecap="round"/>
  <text x="262" y="200" text-anchor="middle" fill="#f7c389" font-size="12" font-weight="700">Lateral</text>
  <text x="160" y="92" text-anchor="middle" fill="#cdd6e2" font-size="10">anterior horns / roots</text>
  <text x="160" y="320" text-anchor="middle" fill="#cdd6e2" font-size="10">posterior horns / roots</text>
  <line x1="320" y1="60" x2="320" y2="320" stroke="#27303f" stroke-width="1"/>
  <text x="440" y="36" text-anchor="middle" fill="#9fb4c6" font-size="12" font-weight="700">SAGITTAL "BOWTIE"</text>
  <path d="M370 150 L 510 150 L 460 195 Z" fill="#5fc6e6" opacity="0.85"/>
  <path d="M370 245 L 510 245 L 420 200 Z" fill="#5fc6e6" opacity="0.85"/>
  <text x="440" y="135" text-anchor="middle" fill="#8593a6" font-size="10">peripheral slice = bowtie</text>
  <text x="440" y="300" text-anchor="middle" fill="#cdd6e2" font-size="10.5">≥2 bowties = intact body</text>
  <text x="440" y="316" text-anchor="middle" fill="#cdd6e2" font-size="10.5">tear if signal reaches surface ×2 slices</text>
</svg>'''

SVG_HIP_ALPHA = '''<svg viewBox="0 0 540 360" role="img" aria-label="Alpha angle for cam FAI" xmlns="http://www.w3.org/2000/svg" font-family="-apple-system,Segoe UI,Arial,sans-serif">
  <text x="270" y="26" text-anchor="middle" fill="#9fb4c6" font-size="12.5" font-weight="700" letter-spacing=".5">ALPHA ANGLE — femoral head-neck junction</text>
  <rect x="150" y="250" width="300" height="90" rx="10" fill="#29323f" stroke="#47576c" stroke-width="2"/>
  <text x="380" y="300" fill="#8593a6" font-size="12">femoral neck</text>
  <circle cx="230" cy="170" r="92" fill="#29323f" stroke="#47576c" stroke-width="2"/>
  <circle cx="230" cy="170" r="92" fill="none" stroke="#9be4b5" stroke-width="2" stroke-dasharray="5 5"/>
  <text x="230" y="175" text-anchor="middle" fill="#8593a6" font-size="11">best-fit circle</text>
  <path d="M300 110 Q 322 150 318 196 L 300 196 Q 300 150 286 122 Z" fill="#f3ad63" opacity="0.9"/>
  <text x="350" y="120" fill="#f7c389" font-size="11.5" font-weight="700">cam bump</text>
  <text x="350" y="135" fill="#8593a6" font-size="10">(asphericity)</text>
  <line x1="230" y1="170" x2="455" y2="285" stroke="#cdd6e2" stroke-width="2"/>
  <text x="430" y="270" fill="#cdd6e2" font-size="10">neck axis</text>
  <line x1="230" y1="170" x2="300" y2="108" stroke="#5fc6e6" stroke-width="2"/>
  <text x="300" y="100" fill="#8fe0f5" font-size="10">head exits circle here</text>
  <path d="M285 200 A 60 60 0 0 0 296 150" fill="none" stroke="#ffd166" stroke-width="2.5"/>
  <text x="262" y="240" fill="#ffd166" font-size="15" font-weight="800">α</text>
  <text x="150" y="354" text-anchor="middle" fill="#9be4b5" font-size="11.5" font-weight="700">α &gt; 55° = cam morphology</text>
</svg>'''

SVG_WRIST_COMPARTMENTS = '''<svg viewBox="0 0 560 470" role="img" aria-label="Six dorsal extensor compartments of the wrist" xmlns="http://www.w3.org/2000/svg" font-family="-apple-system,Segoe UI,Arial,sans-serif">
  <text x="280" y="24" text-anchor="middle" fill="#9fb4c6" font-size="13" font-weight="700" letter-spacing="2">DORSAL (axial, distal radius/ulna)</text>
  <ellipse cx="225" cy="250" rx="120" ry="70" fill="#29323f" stroke="#47576c" stroke-width="2"/>
  <text x="225" y="255" text-anchor="middle" fill="#8593a6" font-size="13">RADIUS</text>
  <ellipse cx="400" cy="250" rx="48" ry="42" fill="#29323f" stroke="#47576c" stroke-width="2"/>
  <text x="400" y="254" text-anchor="middle" fill="#8593a6" font-size="11">ULNA</text>
  <rect x="247" y="183" width="14" height="20" rx="3" fill="#1a2230" stroke="#5fc6e6" stroke-width="2"/>
  <text x="254" y="172" text-anchor="middle" fill="#8fe0f5" font-size="10">Lister</text>
  <g font-family="-apple-system,Segoe UI,Arial,sans-serif">
    <circle cx="120" cy="232" r="15" fill="#5fc6e6"/><text x="120" y="236" text-anchor="middle" fill="#06151c" font-size="11" font-weight="700">1</text>
    <circle cx="200" cy="186" r="15" fill="#79d49b"/><text x="200" y="190" text-anchor="middle" fill="#0c1410" font-size="11" font-weight="700">2</text>
    <circle cx="270" cy="180" r="15" fill="#f3ad63"/><text x="270" y="184" text-anchor="middle" fill="#1a1206" font-size="11" font-weight="700">3</text>
    <circle cx="320" cy="196" r="15" fill="#b69cf0"/><text x="320" y="200" text-anchor="middle" fill="#160f24" font-size="11" font-weight="700">4</text>
    <circle cx="372" cy="206" r="14" fill="#e2737a"/><text x="372" y="210" text-anchor="middle" fill="#1c0708" font-size="11" font-weight="700">5</text>
    <circle cx="430" cy="218" r="15" fill="#ffd166"/><text x="430" y="222" text-anchor="middle" fill="#231d05" font-size="11" font-weight="700">6</text>
  </g>
  <line x1="24" y1="330" x2="536" y2="330" stroke="#27303f" stroke-width="1"/>
  <g font-family="-apple-system,Segoe UI,Arial,sans-serif" font-size="13" fill="#cdd6e2">
    <circle cx="40" cy="352" r="7" fill="#5fc6e6"/><text x="54" y="356"><tspan font-weight="700" fill="#8fe0f5">1</tspan> &#8212; APL + EPB (de Quervain)</text>
    <circle cx="40" cy="378" r="7" fill="#79d49b"/><text x="54" y="382"><tspan font-weight="700" fill="#9be4b5">2</tspan> &#8212; ECRL + ECRB</text>
    <circle cx="40" cy="404" r="7" fill="#f3ad63"/><text x="54" y="408"><tspan font-weight="700" fill="#f7c389">3</tspan> &#8212; EPL (hooks around Lister tubercle)</text>
    <circle cx="300" cy="352" r="7" fill="#b69cf0"/><text x="314" y="356"><tspan font-weight="700" fill="#c9b6f5">4</tspan> &#8212; EDC + EIP</text>
    <circle cx="300" cy="378" r="7" fill="#e2737a"/><text x="314" y="382"><tspan font-weight="700" fill="#ec969b">5</tspan> &#8212; EDM</text>
    <circle cx="300" cy="404" r="7" fill="#ffd166"/><text x="314" y="408"><tspan font-weight="700" fill="#ffd166">6</tspan> &#8212; ECU (ulnar groove)</text>
  </g>
</svg>'''

SVG_ELBOW_UCL = '''<svg viewBox="0 0 540 350" role="img" aria-label="UCL anterior bundle and the T-sign" xmlns="http://www.w3.org/2000/svg" font-family="-apple-system,Segoe UI,Arial,sans-serif">
  <text x="270" y="24" text-anchor="middle" fill="#9fb4c6" font-size="12.5" font-weight="700" letter-spacing=".5">MEDIAL ELBOW (coronal)</text>
  <path d="M120 50 L 200 50 L 200 150 Q 200 185 165 188 L 120 188 Z" fill="#29323f" stroke="#47576c" stroke-width="2"/>
  <text x="160" y="100" text-anchor="middle" fill="#8593a6" font-size="12">humerus</text>
  <text x="150" y="205" text-anchor="middle" fill="#8593a6" font-size="10">medial epicondyle</text>
  <circle cx="165" cy="185" r="7" fill="#3a4658"/>
  <path d="M150 230 L 250 230 L 250 320 L 150 320 Z" fill="#29323f" stroke="#47576c" stroke-width="2"/>
  <text x="200" y="300" text-anchor="middle" fill="#8593a6" font-size="12">ulna</text>
  <circle cx="172" cy="234" r="7" fill="#3a4658"/>
  <text x="120" y="250" text-anchor="middle" fill="#8593a6" font-size="9.5">sublime tubercle</text>
  <path d="M165 188 L 172 234" stroke="#5fc6e6" stroke-width="9" stroke-linecap="round"/>
  <text x="250" y="212" fill="#8fe0f5" font-size="12.5" font-weight="700">UCL anterior bundle</text>
  <path d="M172 234 L 172 280" stroke="#ffd166" stroke-width="4" stroke-linecap="round"/>
  <path d="M150 236 L 196 236" stroke="#ffd166" stroke-width="4" stroke-linecap="round"/>
  <text x="300" y="270" fill="#ffd166" font-size="13" font-weight="800">T-sign</text>
  <text x="300" y="288" fill="#cdd6e2" font-size="10.5">fluid tracking distal to the ligament</text>
  <text x="300" y="303" fill="#cdd6e2" font-size="10.5">= partial undersurface tear</text>
</svg>'''

SVG_FINGER_PULLEYS = '''<svg viewBox="0 0 560 300" role="img" aria-label="Flexor pulley system of the finger" xmlns="http://www.w3.org/2000/svg" font-family="-apple-system,Segoe UI,Arial,sans-serif">
  <text x="280" y="24" text-anchor="middle" fill="#9fb4c6" font-size="12.5" font-weight="700" letter-spacing=".5">FLEXOR PULLEY SYSTEM (lateral finger)</text>
  <rect x="60" y="92" width="70" height="34" rx="8" fill="#29323f" stroke="#47576c" stroke-width="2"/><text x="95" y="114" text-anchor="middle" fill="#8593a6" font-size="11">MC</text>
  <rect x="150" y="92" width="130" height="34" rx="8" fill="#29323f" stroke="#47576c" stroke-width="2"/><text x="215" y="114" text-anchor="middle" fill="#8593a6" font-size="11">proximal phalanx</text>
  <rect x="300" y="92" width="95" height="34" rx="8" fill="#29323f" stroke="#47576c" stroke-width="2"/><text x="347" y="114" text-anchor="middle" fill="#8593a6" font-size="11">middle</text>
  <rect x="415" y="92" width="70" height="34" rx="8" fill="#29323f" stroke="#47576c" stroke-width="2"/><text x="450" y="114" text-anchor="middle" fill="#8593a6" font-size="10">distal</text>
  <path d="M70 175 Q 280 168 480 175" fill="none" stroke="#cdd6e2" stroke-width="7" stroke-linecap="round"/>
  <text x="500" y="179" fill="#8593a6" font-size="10">flexor tendon</text>
  <g font-weight="700" font-size="12">
    <path d="M128 135 Q 140 158 128 180" fill="none" stroke="#5fc6e6" stroke-width="4"/><text x="120" y="205" text-anchor="middle" fill="#8fe0f5">A1</text>
    <path d="M205 132 Q 215 156 205 178" fill="none" stroke="#f3ad63" stroke-width="6"/><text x="205" y="205" text-anchor="middle" fill="#f7c389">A2</text>
    <path d="M285 135 Q 295 157 285 179" fill="none" stroke="#5fc6e6" stroke-width="4"/><text x="290" y="205" text-anchor="middle" fill="#8fe0f5">A3</text>
    <path d="M345 134 Q 355 157 345 179" fill="none" stroke="#f3ad63" stroke-width="6"/><text x="350" y="205" text-anchor="middle" fill="#f7c389">A4</text>
    <path d="M418 137 Q 426 158 418 179" fill="none" stroke="#5fc6e6" stroke-width="4"/><text x="425" y="205" text-anchor="middle" fill="#8fe0f5">A5</text>
  </g>
  <text x="280" y="245" text-anchor="middle" fill="#f7c389" font-size="12.5" font-weight="700">A2 (proximal phalanx) &amp; A4 (middle phalanx) = critical pulleys</text>
  <text x="280" y="266" text-anchor="middle" fill="#cdd6e2" font-size="11.5">rupture → bowstringing = increased tendon–bone distance</text>
</svg>'''

SVG_FOOT_LISFRANC = '''<svg viewBox="0 0 540 360" role="img" aria-label="Lisfranc tarsometatarsal complex" xmlns="http://www.w3.org/2000/svg" font-family="-apple-system,Segoe UI,Arial,sans-serif">
  <text x="270" y="24" text-anchor="middle" fill="#9fb4c6" font-size="12.5" font-weight="700" letter-spacing=".5">LISFRANC (tarsometatarsal) COMPLEX — dorsal</text>
  <rect x="70" y="150" width="70" height="40" rx="6" fill="#29323f" stroke="#47576c" stroke-width="2"/><text x="105" y="175" text-anchor="middle" fill="#8593a6" font-size="11">C1</text>
  <rect x="70" y="120" width="62" height="28" rx="6" fill="#29323f" stroke="#47576c" stroke-width="2"/><text x="101" y="139" text-anchor="middle" fill="#8593a6" font-size="10">C2</text>
  <rect x="70" y="92" width="58" height="26" rx="6" fill="#29323f" stroke="#47576c" stroke-width="2"/><text x="99" y="110" text-anchor="middle" fill="#8593a6" font-size="10">C3</text>
  <rect x="70" y="196" width="64" height="50" rx="6" fill="#29323f" stroke="#47576c" stroke-width="2"/><text x="102" y="225" text-anchor="middle" fill="#8593a6" font-size="10">cuboid</text>
  <rect x="170" y="150" width="40" height="80" rx="6" fill="#29323f" stroke="#47576c" stroke-width="2"/><text x="190" y="250" text-anchor="middle" fill="#8593a6" font-size="11">M1</text>
  <rect x="158" y="116" width="36" height="78" rx="6" fill="#3a4658" stroke="#6cc6e6" stroke-width="2"/><text x="176" y="250" text-anchor="middle" fill="#8593a6" font-size="11">M2</text>
  <rect x="150" y="90" width="34" height="72" rx="6" fill="#29323f" stroke="#47576c" stroke-width="2"/><text x="167" y="250" text-anchor="middle" fill="#8593a6" font-size="11">M3</text>
  <rect x="146" y="196" width="34" height="50" rx="6" fill="#29323f" stroke="#47576c" stroke-width="2"/><text x="163" y="262" text-anchor="middle" fill="#8593a6" font-size="11">M4</text>
  <rect x="118" y="220" width="36" height="46" rx="6" fill="#29323f" stroke="#47576c" stroke-width="2"/><text x="136" y="280" text-anchor="middle" fill="#8593a6" font-size="11">M5</text>
  <line x1="138" y1="168" x2="160" y2="150" stroke="#ffd166" stroke-width="6" stroke-linecap="round"/>
  <text x="250" y="150" fill="#ffd166" font-size="13" font-weight="700">Lisfranc ligament</text>
  <text x="250" y="168" fill="#cdd6e2" font-size="11">medial cuneiform (C1) → base of 2nd MT (M2)</text>
  <text x="250" y="208" fill="#8fe0f5" font-size="11.5" font-weight="700">M2 base is recessed = keystone</text>
  <text x="250" y="226" fill="#cdd6e2" font-size="11">align medial M2 with medial C2; medial M4 with medial cuboid</text>
  <text x="250" y="250" fill="#f7c389" font-size="11">"fleck sign" = avulsion in the C1–M2 interval</text>
</svg>'''

SVG_SHOULDER_LABRAL_CLOCK = '''<svg viewBox="0 0 400 380" role="img" aria-label="Glenoid labral clock-face" xmlns="http://www.w3.org/2000/svg" font-family="-apple-system,Segoe UI,Arial,sans-serif">
  <text x="200" y="22" text-anchor="middle" fill="#9fb4c6" font-size="12.5" font-weight="700">GLENOID CLOCK-FACE (right, en-face)</text>
  <circle cx="200" cy="200" r="120" fill="#10161f" stroke="#3a4658" stroke-width="2"/>
  <path d="M200 80 A120 120 0 0 1 200 80" fill="none"/>
  <path d="M152 88 A120 120 0 0 1 248 88" fill="none" stroke="#b69cf0" stroke-width="9" stroke-linecap="round"/>
  <path d="M 312 248 A120 120 0 0 0 200 320" fill="none" stroke="#5fc6e6" stroke-width="9" stroke-linecap="round"/>
  <path d="M 320 200 A120 120 0 0 0 312 248" fill="none" stroke="#5fc6e6" stroke-width="9" stroke-linecap="round"/>
  <line x1="80" y1="200" x2="320" y2="200" stroke="#4a5870" stroke-width="1" stroke-dasharray="5 5"/>
  <text x="200" y="70" text-anchor="middle" fill="#c9b6f5" font-size="12" font-weight="700">12 — biceps anchor (SLAP)</text>
  <text x="338" y="200" text-anchor="start" fill="#8593a6" font-size="12" font-weight="700">3</text>
  <text x="200" y="345" text-anchor="middle" fill="#8593a6" font-size="12" font-weight="700">6</text>
  <text x="50" y="200" text-anchor="start" fill="#8593a6" font-size="12" font-weight="700">9</text>
  <text x="356" y="270" text-anchor="end" fill="#8fe0f5" font-size="11.5" font-weight="700">3–6 anteroinferior</text>
  <text x="352" y="286" text-anchor="end" fill="#8fe0f5" font-size="11">= Bankart zone</text>
  <text x="200" y="222" text-anchor="middle" fill="#7d8a9c" font-size="10">equator (3↔9)</text>
  <text x="36" y="150" fill="#9fb4c6" font-size="11" font-weight="700">ANT →</text>
  <text x="330" y="150" fill="#9fb4c6" font-size="11" font-weight="700">← POST</text>
</svg>'''

DIAGRAMS = {
    "finger-flexor-pulleys": (SVG_FINGER_PULLEYS,
        "**Flexor pulley system.** Annular pulleys A1–A5 hold the flexor tendons against the phalanges. **A2 (proximal phalanx) and A4 (middle phalanx) are the critical pulleys** — rupture causes bowstringing (increased tendon–bone distance), the climber's injury."),
    "foot-lisfranc": (SVG_FOOT_LISFRANC,
        "**Lisfranc complex.** The Lisfranc ligament runs from the medial cuneiform (C1) to the base of the 2nd metatarsal (M2), which is recessed as a keystone. Check medial-M2/medial-C2 alignment; a **fleck sign** (avulsion in the C1–M2 interval) signals injury."),
    "shoulder-labral-clock": (SVG_SHOULDER_LABRAL_CLOCK,
        "**Glenoid clock-face.** 12 o'clock = biceps anchor (**SLAP** lesions); the **3–6 o'clock anteroinferior** quadrant is the **Bankart** zone. Localize every labral finding to a clock position and state laterality."),
    "shoulder-rotator-interval": (SVG_SHOULDER_ROTATOR_INTERVAL,
        "**Rotator interval.** The triangular gap between the **supraspinatus** (superior) and **subscapularis** (inferior); the **CHL + SGHL** form the pulley sling that stabilizes the long head of biceps (LHB) entering the groove."),
    "shoulder-cuff-footprints": (SVG_SHOULDER_FOOTPRINTS,
        "**Rotator cuff footprints.** Greater tuberosity facets — **supraspinatus** (superior), **infraspinatus** (middle), **teres minor** (inferior); **subscapularis** on the lesser tuberosity, with the bicipital groove between."),
    "knee-meniscus-map": (SVG_KNEE_MENISCUS,
        "**Meniscus map.** Medial and lateral menisci on the tibial plateau (anterior/posterior horns + roots). On sagittal, the body appears as a **bowtie** — ≥2 bowties = intact body; call a tear only when signal reaches a surface on ≥2 slices."),
    "hip-alpha-angle": (SVG_HIP_ALPHA,
        "**Alpha angle.** Fit a circle to the femoral head; the angle between the neck axis and the point where the head exits the circle (the cam bump). **α > 55° = cam morphology.**"),
    "wrist-extensor-compartments": (SVG_WRIST_COMPARTMENTS,
        "**Six dorsal extensor compartments**, counted radial→ulnar. **Lister tubercle** separates compartment 2 from 3; the EPL (3) hooks around it."),
    "elbow-ucl-tsign": (SVG_ELBOW_UCL,
        "**UCL anterior bundle** runs from the medial epicondyle to the **sublime tubercle**. Fluid tracking distal to the ligament = the **T-sign** of a partial undersurface tear."),
    "ankle-tendons-axial": (
        SVG_ANKLE_TENDONS_AXIAL,
        "**Ankle tendons in cross-section (axial).** Four groups wrap the joint: "
        "**anterior** extensors, **medial** flexors behind the medial malleolus "
        "(*Tom, Dick, aNd Harry*), **lateral** peroneals behind the fibula, and the "
        "**posterior** Achilles. The neurovascular bundle (NV) sits between FDL and FHL.",
    ),
    "ankle-talar-dome-9zone": (
        SVG_ANKLE_9ZONE,
        "**Talar dome 9-zone grid.** Map every osteochondral lesion to one of the nine "
        "cells. Classic locations: **medial-posterior** (atraumatic, deeper) and "
        "**lateral-central** (traumatic, shallower).",
    ),
}


def render_diagram(did: str, caption: str | None = None) -> str:
    entry = DIAGRAMS.get(did)
    if not entry:
        return (
            '<div class="callout note"><div class="c-title"><span class="ico">📝</span>'
            f'<span class="lbl">Diagram</span></div><p>[missing diagram: {html.escape(did)}]</p></div>'
        )
    svg, default_cap = entry
    cap = caption if caption else default_cap
    figcap = f"<figcaption>{inline(cap)}</figcaption>" if cap else ""
    return f'<figure class="diagram">{svg}{figcap}</figure>'


def plain(text: str) -> str:
    """Strip markdown emphasis/brackets for TOC labels."""
    t = text.replace("**", "")
    t = re.sub(r"\[([^\]]*)\]", r"\1", t)
    return html.escape(t.strip())


def slugify(text: str, used: set) -> str:
    s = re.sub(r"\*\*", "", text)
    s = re.sub(r"[\[\]]", "", s).lower()
    s = re.sub(r"[^a-z0-9]+", "-", s).strip("-") or "section"
    base, n, sid = s, 2, s
    while sid in used:
        sid = f"{base}-{n}"
        n += 1
    used.add(sid)
    return sid


REVIEW_STOP = set("""
case tear tears torn sprain rupture ruptured tendinosis tendinopathy tenosynovitis
paratenonitis peritendinitis bursitis fracture fractures contusion edema syndrome
syndromes lesion lesions dysfunction impingement instability dislocation subluxation
avulsion degeneration degenerative arthritis arthrosis osteoarthritis acute chronic
partial complete full thickness high low grade mild moderate severe stable unstable
with without and the of or a an is are non advanced early late primary secondary
tendon tendons ligament ligaments joint joints bone bony marrow cartilage chondral
sheath complex muscle insertion origin proximal distal anterior posterior medial
lateral superior inferior central dorsal volar radial ulnar deep superficial mri
normal sign type left right injury injuries pattern recess process body band
""".split())

REVIEW_SHORT_OK = {
    "acl", "pcl", "mcl", "lcl", "ucl", "rcl", "lucl", "fhl", "fdl", "ptt", "ecu",
    "ecrl", "ecrb", "apl", "epb", "epl", "edc", "eip", "slap", "tfcc", "olt", "sl",
    "lt", "dip", "pip", "mcp", "mtp", "tmt", "druj", "fai", "avn", "ocd", "sonk",
    "sifk", "hagl", "glad", "alpsa", "fdp", "fds", "ais", "aiis", "atfl", "cfl",
    "ptfl", "spr", "pin", "ac", "lhb",
}

# expand common abbreviations <-> full terms so cases match cheat-sheet sections
REVIEW_SYN = {
    "acl": "cruciate", "pcl": "cruciate", "ucl": "collateral",
    "atfl": "talofibular", "ptfl": "talofibular", "cfl": "calcaneofibular",
    "tfcc": "fibrocartilage", "ptt": "tibialis", "fhl": "hallucis",
    "fdl": "digitorum", "lhb": "biceps", "slap": "labrum", "olt": "osteochondral",
    "ocd": "osteochondral", "avn": "necrosis",
}


def _rtoks(s: str) -> set:
    s = s.lower().replace("(", " ").replace(")", " ")
    out = set()
    for t in re.split(r"[^a-z0-9]+", s):
        if not t or t in REVIEW_STOP:
            continue
        if len(t) >= 4 or t in REVIEW_SHORT_OK:
            out.add(t)
            if t in REVIEW_SYN:
                out.add(REVIEW_SYN[t])
            # light stemming so tendinosis/tendinopathy and sesamoiditis/sesamoid match
            for suf in ("opathy", "itis", "osis"):
                if t.endswith(suf) and len(t) - len(suf) >= 4:
                    out.add(t[: -len(suf)])
                    break
    return out


def best_review(concept: str, anchors: list):
    """Pick the best-matching cheat-sheet anchor (slug,label,kind) for a case concept."""
    ct = _rtoks(concept)
    if not ct or not anchors:
        return None
    kind_rank = {"dx": 0, "callout": 1, "head": 2}
    best, best_key = None, (0,)
    for slug, label, kind in anchors:
        sc = len(ct & _rtoks(label))
        if sc == 0:
            continue
        kr = kind_rank.get(kind, 3)
        if kind == "dx" and label.strip().lower().startswith("normal"):
            kr = 3   # deprioritize normal-template entries as review targets
        key = (sc, -kr, -len(label))
        if key > best_key:
            best_key, best = key, (slug, label)
    return best


def inline(text: str) -> str:
    """Escape, then apply ==highlight==, **bold**, and [placeholder] formatting."""
    text = html.escape(text)
    # ==highlight==  (before bold; non-greedy)
    text = re.sub(r"==(.+?)==", r'<mark class="hl">\1</mark>', text)
    # bold
    text = re.sub(r"\*\*(.+?)\*\*", r"<b>\1</b>", text)
    # bracketed placeholders -> highlighted spans (handle nested-free [..])
    text = re.sub(r"\[([^\[\]]+?)\]", r'<span class="ph">[\1]</span>', text)
    return text


def build_inline_toc(toc: list) -> str:
    """Compact, collapsible 'On this page' TOC listing groups + h2 sections."""
    items = [t for t in toc if t[0] in ("group", "h2")]
    if len(items) < 3:
        return ""
    links = "".join(
        '<a href="#%s" class="itoc-%s">%s</a>' % (sid, lvl, label) for (lvl, sid, label) in items
    )
    return (
        '<details class="inline-toc" open><summary>On this page</summary>'
        f'<div class="itoc-links">{links}</div></details>'
    )


def parse_table(rows: list[str]) -> str:
    cells = []
    for r in rows:
        r = r.strip()
        if r.startswith("|"):
            r = r[1:]
        if r.endswith("|"):
            r = r[:-1]
        cells.append([c.strip() for c in r.split("|")])
    # drop the |---|---| separator row if present
    body = [c for c in cells if not all(re.fullmatch(r":?-{2,}:?", x or "-") for x in c)]
    if not body:
        return ""
    head, *rest = body
    out = ["<table>", "<thead><tr>"]
    out += [f"<th>{inline(c)}</th>" for c in head]
    out.append("</tr></thead><tbody>")
    for row in rest:
        out.append("<tr>" + "".join(f"<td>{inline(c)}</td>" for c in row) + "</tr>")
    out.append("</tbody></table>")
    return "".join(out)


def md_to_html(md: str, review_base: str | None = None, review_anchors: list | None = None):
    """Return (title, body_html, toc, anchors).
    toc = list of (level, id, label) for headings; anchors = (id,label,kind) for
    headings + diagnoses + callouts. If review_base is given (cases mode), append a
    'Review in cheat sheet' link after each case, pointing to the best-matching anchor."""
    lines = md.split("\n")
    title = ""
    out: list[str] = []
    i = 0
    n = len(lines)
    bullets: list[str] = []
    used_ids: set = set()
    toc: list = []
    anchors: list = []
    pending_review = [None]   # (slug, label) for the current case, flushed at its end

    def flush_bullets():
        nonlocal bullets
        if bullets:
            out.append("<ul>" + "".join(f"<li>{inline(b)}</li>" for b in bullets) + "</ul>")
            bullets = []

    case_category = [""]

    def flush_review():
        if pending_review[0] is not None:
            slug, label = pending_review[0]
            if slug:
                href = f"{review_base}#{slug}"
                txt = f"Review in cheat sheet: {label} →"   # label already escaped by plain()
            else:
                href = review_base
                txt = "Open this joint's cheat sheet →"
            out.append(f'<p class="review"><a href="{href}">{txt}</a></p>')
            pending_review[0] = None

    while i < n:
        line = lines[i]
        stripped = line.strip()

        if not stripped:
            flush_bullets()
            i += 1
            continue

        # anatomy diagram token: {{diagram:id}} or {{diagram:id|caption}}
        mdg = re.match(r"^\{\{diagram:([a-z0-9\-]+)(?:\s*\|\s*(.*?))?\}\}$", stripped)
        if mdg:
            flush_bullets()
            out.append(render_diagram(mdg.group(1), mdg.group(2)))
            i += 1
            continue

        # blockquote callout (admonition)
        if stripped.startswith(">"):
            flush_bullets()
            block = []
            while i < n and lines[i].lstrip().startswith(">"):
                raw = lines[i].lstrip()[1:]          # drop leading '>'
                if raw.startswith(" "):
                    raw = raw[1:]                     # drop one space after '>'
                block.append(raw)
                i += 1
            _, ctitle = callout_meta(block)
            cid = None
            if ctitle:
                cid = slugify(ctitle, used_ids)
                anchors.append((cid, plain(ctitle), "callout"))
            out.append(render_callout(block, cid))
            continue

        # table block
        if stripped.startswith("|"):
            flush_bullets()
            block = []
            while i < n and lines[i].strip().startswith("|"):
                block.append(lines[i])
                i += 1
            out.append(parse_table(block))
            continue

        # headings
        if stripped.startswith("# "):
            flush_bullets()
            text = stripped[2:].strip()
            if not title:
                # first H1 = page title banner
                title = text
                out.append(f"<h1>{inline(title)}</h1>")
                i += 1
                # an immediate non-heading, non-blank line after the title = subtitle
                if i < n and lines[i].strip() and not lines[i].strip().startswith(("#", "|", "-", "**")):
                    out.append(f'<p class="subtitle">{inline(lines[i].strip())}</p>')
                    i += 1
            else:
                # subsequent H1 = anatomical group divider
                flush_review()
                sid = slugify(text, used_ids)
                out.append(f'<h2 class="group" id="{sid}">{inline(text)}</h2>')
                toc.append(("group", sid, plain(text)))
                anchors.append((sid, plain(text), "head"))
                i += 1
            continue
        if stripped.startswith("### "):
            flush_bullets()
            htext = stripped[4:].strip()
            # cases mode: a new "### Case N — concept" heading starts a new case;
            # flush the PREVIOUS case's review link BEFORE emitting this heading
            cm = re.match(r"^Case\s+\d+\s*[—\-:]\s*(.*)$", htext) if review_base else None
            if cm:
                flush_review()
            sid = slugify(htext, used_ids)
            out.append(f'<h3 id="{sid}">{inline(htext)}</h3>')
            toc.append(("h3", sid, plain(htext)))
            anchors.append((sid, plain(htext), "head"))
            if cm:
                match = best_review(cm.group(1), review_anchors)
                if not match and case_category[0]:
                    match = best_review(case_category[0], review_anchors)
                pending_review[0] = match if match else ("", "")
            i += 1
            continue
        if stripped.startswith("## "):
            flush_bullets()
            flush_review()
            htext = stripped[3:].strip()
            sid = slugify(htext, used_ids)
            out.append(f'<h2 id="{sid}">{inline(htext)}</h2>')
            toc.append(("h2", sid, plain(htext)))
            anchors.append((sid, plain(htext), "head"))
            case_category[0] = htext
            i += 1
            continue

        # bullets
        if stripped.startswith("- "):
            bullets.append(stripped[2:].strip())
            i += 1
            continue

        # F: / I: lines
        m = re.match(r"^\*\*(F|I):\*\*\s*(.*)$", stripped)
        if m:
            flush_bullets()
            kind = "f" if m.group(1) == "F" else "i"
            label = m.group(1)
            out.append(f'<p class="{kind}"><b>{label}:</b> {inline(m.group(2))}</p>')
            i += 1
            continue

        # whole-line bold = diagnosis name
        if stripped.startswith("**") and stripped.endswith("**") and stripped.count("**") == 2:
            flush_bullets()
            name = stripped[2:-2].strip()
            sid = slugify(name, used_ids)
            anchors.append((sid, plain(name), "dx"))
            out.append(f'<div class="dx" id="{sid}">{inline(name)}</div>')
            i += 1
            continue

        # plain paragraph
        flush_bullets()
        out.append(f"<p>{inline(stripped)}</p>")
        i += 1

    flush_bullets()
    flush_review()
    return title, "\n".join(out), toc, anchors


def build_toc(toc: list) -> str:
    """Build a nested, collapsible TOC drawer from (level, id, label) entries."""
    if not toc:
        return ""
    rank = {"group": 1, "h2": 2, "h3": 3}
    root = {"lvl": "root", "L": 0, "children": []}
    stack = [root]
    for lvl, sid, label in toc:
        L = rank[lvl]
        node = {"lvl": lvl, "L": L, "sid": sid, "label": label, "children": []}
        while len(stack) > 1 and stack[-1]["L"] >= L:
            stack.pop()
        stack[-1]["children"].append(node)
        stack.append(node)

    def render(node: dict) -> str:
        link = f'<a class="toc-link lvl-{node["lvl"]}" href="#{node["sid"]}">{node["label"]}</a>'
        if node["children"]:
            kids = "".join(render(c) for c in node["children"])
            return (
                '<div class="toc-node">'
                '<div class="toc-row">'
                '<button class="toc-tog" aria-label="expand section"></button>'
                f"{link}</div>"
                f'<div class="toc-children">{kids}</div>'
                "</div>"
            )
        return f'<div class="toc-node leaf"><div class="toc-row">{link}</div></div>'

    items = "".join(render(c) for c in root["children"])
    return (
        '<div id="toc-backdrop" class="toc-backdrop"></div>'
        '<nav id="toc-drawer" class="toc-drawer" aria-label="Table of contents">'
        '<div class="toc-head"><span class="t">Contents</span>'
        '<button id="toc-close" class="toc-close" aria-label="Close contents">&times;</button></div>'
        f'<div class="toc-list">{items}</div>'
        "</nav>"
    )


def topbar(joint: str, title: str, has_template: bool, kind: str = "cheatsheet", has_cases: bool = False) -> str:
    if kind == "cases":
        links = [
            '<a href="../index.html">← All regions</a>',
            f'<a href="{joint}-mri-cheatsheet.html">Cheat sheet</a>',
            f'<a href="{joint}-mri-cases-dark.pdf">PDF (dark)</a>',
            f'<a class="obs" href="{obsidian_uri(joint + "-mri-cases")}">⬡ Obsidian</a>',
        ]
        if has_template:
            links.insert(2, f'<a class="tmpl" href="../templates/{joint}.html">\U0001F4CB Dictation template</a>')
    else:
        links = [
            '<a href="../index.html">← All regions</a>',
            f'<a href="{joint}-mri-cheatsheet.pdf">PDF (print)</a>',
            f'<a href="{joint}-mri-cheatsheet-dark.pdf">PDF (dark)</a>',
            f'<a class="obs" href="{obsidian_uri(joint + "-mri-cheatsheet")}">⬡ Obsidian</a>',
        ]
        if has_cases:
            links.insert(1, f'<a class="cases" href="{joint}-mri-cases.html">\U0001F4DA 30 cases</a>')
        if has_template:
            links.insert(1, f'<a class="tmpl" href="../templates/{joint}.html">\U0001F4CB Dictation template</a>')
    crumb = title.split(" - ")[0].split(" — ")[0]
    fontctl = (
        '<span class="fontctl" title="Font size — shortcuts: -, +, 0 to reset">'
        '<button id="fs-dec" aria-label="Decrease font size">A−</button>'
        '<button id="fs-rst" aria-label="Reset font size">A</button>'
        '<button id="fs-inc" aria-label="Increase font size">A+</button>'
        "</span>"
    )
    links.append('<a class="trainer" href="../trainer/index.html">🎯 Trainer</a>')
    toc_btn = (
        '<button id="toc-toggle" class="toc-toggle" title="Contents (c)" '
        'aria-label="Table of contents">☰ Contents</button>'
    )
    home = '<a class="home homebtn" href="../index.html" title="Home" aria-label="Home">\U0001F3E0</a>'
    return (
        '<div class="topbar">'
        + home
        + toc_btn
        + f'<span class="crumb">{html.escape(crumb)}</span>'
        + "".join(links)
        + fontctl
        + "</div>"
    )


def build_doc(joint: str, kind: str = "cheatsheet") -> None:
    suffix = "cheatsheet" if kind == "cheatsheet" else "cases"
    md_path = ROOT / joint / f"{joint}-mri-{suffix}.md"
    if not md_path.exists():
        return
    out_path = ROOT / joint / f"{joint}-mri-{suffix}.html"
    md = md_path.read_text(encoding="utf-8")
    review_base = review_anchors = None
    if kind == "cases":
        cheat_md_path = ROOT / joint / f"{joint}-mri-cheatsheet.md"
        if cheat_md_path.exists():
            _, _, _, review_anchors = md_to_html(cheat_md_path.read_text(encoding="utf-8"))
            review_base = f"{joint}-mri-cheatsheet.html"
    title, body, toc, _anchors = md_to_html(md, review_base, review_anchors)
    toc_html = build_toc(toc)
    # inject the inline "On this page" TOC just after the title banner / subtitle
    itoc = build_inline_toc(toc)
    if itoc:
        m = re.search(r"</p>", body) if '<p class="subtitle">' in body[:400] else None
        if m:
            body = body[: m.end()] + "\n" + itoc + body[m.end():]
        else:
            body = re.sub(r"(</h1>)", r"\1\n" + itoc.replace("\\", "\\\\"), body, count=1)
    has_template = (ROOT / "templates" / f"{joint}.html").exists()
    has_cases = (ROOT / joint / f"{joint}-mri-cases.md").exists()
    page = f"""<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>{html.escape(title or joint.title())}</title>
<link rel="manifest" href="../manifest.webmanifest">
<meta name="theme-color" content="#0b3a52">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
<meta name="apple-mobile-web-app-title" content="MSK MRI">
<link rel="apple-touch-icon" href="../apple-touch-icon.png">
<style>{CSS}</style>
</head>
<body>
{topbar(joint, title or joint.title(), has_template, kind, has_cases)}
{toc_html}
{body}
<button id="toc-handle" class="toc-handle" aria-label="Open table of contents" title="Contents">☰<span class="chev">›</span></button>
<button id="to-top" class="to-top" aria-label="Back to top" title="Back to top (Home)">↑</button>
<script>{SCRIPT}</script>
<script>if('serviceWorker' in navigator){{window.addEventListener('load',function(){{navigator.serviceWorker.register('../sw.js').catch(function(){{}});}});}}</script>
</body>
</html>
"""
    out_path.write_text(page, encoding="utf-8")
    print(f"  {joint:9s} {suffix:10s} -> {out_path.name}  ({len(page)//1024} KB)")


def main() -> None:
    print("Building dark-mode cheat sheets + case files:")
    for j in JOINTS:
        build_doc(j, "cheatsheet")
        build_doc(j, "cases")
    print("Done.")


if __name__ == "__main__":
    main()
