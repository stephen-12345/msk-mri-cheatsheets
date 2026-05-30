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

ROOT = Path("/Users/jarviscore/Downloads/msk-mri-dictation-cheatsheets-webapp")
JOINTS = ["shoulder", "knee", "elbow", "hip", "ankle", "foot", "finger", "wrist"]

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
  margin:0 -32px 22px; padding:11px 32px;
  background:rgba(12,15,21,0.92); backdrop-filter:blur(10px);
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

h2.group{
  margin:40px 0 16px; padding:13px 18px;
  background:linear-gradient(135deg,#241a3a,#1a2030);
  color:#fff; border-radius:9px; border-left:5px solid #a78bfa;
  font-size:24px; line-height:1.2; letter-spacing:0.6px;
  text-transform:uppercase; scroll-margin-top:64px;
}
h2{
  margin:34px 0 14px; padding:11px 16px;
  background:var(--h2bg); color:#fff; border-radius:8px;
  font-size:21px; line-height:1.25; letter-spacing:0.2px;
  scroll-margin-top:64px;
}
h3{
  margin:22px 0 9px; color:var(--h3tx);
  font-size:18.5px; line-height:1.3; font-weight:700;
  border-bottom:1px solid #2c3a48; padding-bottom:5px;
  scroll-margin-top:64px;
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
  position:fixed; right:22px; bottom:22px; z-index:20;
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
  padding:13px 16px; border-bottom:1px solid var(--bdr); flex:0 0 auto;
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

@media (max-width:680px){
  body{font-size:17px; padding:0 16px 48px}
  .topbar{margin:0 -16px 18px; padding:10px 16px}
  h1{font-size:24px;padding:13px 16px}
  h2{font-size:19px}
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
      tocClose=document.getElementById('toc-close');
  function tocOpen(){ if(drawer){ drawer.classList.add('open'); backdrop.classList.add('show'); } }
  function tocCloseFn(){ if(drawer){ drawer.classList.remove('open'); backdrop.classList.remove('show'); } }
  function tocToggleFn(){ drawer && (drawer.classList.contains('open')?tocCloseFn():tocOpen()); }
  if(tocToggle) tocToggle.onclick=tocToggleFn;
  if(tocClose) tocClose.onclick=tocCloseFn;
  if(backdrop) backdrop.onclick=tocCloseFn;
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
    "NOTE": ("note", "📝", "Note"),
}


def render_callout(block: list[str]) -> str:
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
    return f'<div class="callout {cls}">{head}{"".join(out)}</div>'


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

DIAGRAMS = {
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


def inline(text: str) -> str:
    """Escape, then apply **bold** and [placeholder] formatting."""
    text = html.escape(text)
    # bold
    text = re.sub(r"\*\*(.+?)\*\*", r"<b>\1</b>", text)
    # bracketed placeholders -> highlighted spans (handle nested-free [..])
    text = re.sub(r"\[([^\[\]]+?)\]", r'<span class="ph">[\1]</span>', text)
    return text


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


def md_to_html(md: str) -> tuple[str, str, list]:
    """Return (title, body_html, toc) where toc is a list of (level, id, label)."""
    lines = md.split("\n")
    title = ""
    out: list[str] = []
    i = 0
    n = len(lines)
    bullets: list[str] = []
    used_ids: set = set()
    toc: list = []

    def flush_bullets():
        nonlocal bullets
        if bullets:
            out.append("<ul>" + "".join(f"<li>{inline(b)}</li>" for b in bullets) + "</ul>")
            bullets = []

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
            out.append(render_callout(block))
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
                sid = slugify(text, used_ids)
                out.append(f'<h2 class="group" id="{sid}">{inline(text)}</h2>')
                toc.append(("group", sid, plain(text)))
                i += 1
            continue
        if stripped.startswith("### "):
            flush_bullets()
            htext = stripped[4:].strip()
            sid = slugify(htext, used_ids)
            out.append(f'<h3 id="{sid}">{inline(htext)}</h3>')
            toc.append(("h3", sid, plain(htext)))
            i += 1
            continue
        if stripped.startswith("## "):
            flush_bullets()
            htext = stripped[3:].strip()
            sid = slugify(htext, used_ids)
            out.append(f'<h2 id="{sid}">{inline(htext)}</h2>')
            toc.append(("h2", sid, plain(htext)))
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
            out.append(f'<div class="dx">{inline(name)}</div>')
            i += 1
            continue

        # plain paragraph
        flush_bullets()
        out.append(f"<p>{inline(stripped)}</p>")
        i += 1

    flush_bullets()
    return title, "\n".join(out), toc


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


def topbar(joint: str, title: str, has_template: bool) -> str:
    links = [
        '<a href="../index.html">← All regions</a>',
        f'<a href="{joint}-mri-cheatsheet.pdf">PDF (print)</a>',
        f'<a href="{joint}-mri-cheatsheet-dark.pdf">PDF (dark)</a>',
        f'<a href="{joint}-mri-cheatsheet.md">Markdown</a>',
    ]
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
    toc_btn = (
        '<button id="toc-toggle" class="toc-toggle" title="Contents (c)" '
        'aria-label="Table of contents">☰ Contents</button>'
    )
    return (
        '<div class="topbar">'
        + toc_btn
        + f'<span class="crumb">{html.escape(crumb)}</span>'
        + "".join(links)
        + fontctl
        + "</div>"
    )


def build(joint: str) -> None:
    md_path = ROOT / joint / f"{joint}-mri-cheatsheet.md"
    out_path = ROOT / joint / f"{joint}-mri-cheatsheet.html"
    md = md_path.read_text(encoding="utf-8")
    title, body, toc = md_to_html(md)
    toc_html = build_toc(toc)
    has_template = (ROOT / "templates" / f"{joint}.html").exists()
    # move the rendered <h1>/subtitle out so the topbar sits above them
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
{topbar(joint, title or joint.title(), has_template)}
{toc_html}
{body}
<button id="to-top" class="to-top" aria-label="Back to top" title="Back to top (Home)">↑</button>
<script>{SCRIPT}</script>
<script>if('serviceWorker' in navigator){{window.addEventListener('load',function(){{navigator.serviceWorker.register('../sw.js').catch(function(){{}});}});}}</script>
</body>
</html>
"""
    out_path.write_text(page, encoding="utf-8")
    print(f"  {joint:9s} -> {out_path.name}  ({len(page)//1024} KB)")


def main() -> None:
    print("Building dark-mode document cheat sheets:")
    for j in JOINTS:
        build(j)
    print("Done.")


if __name__ == "__main__":
    main()
