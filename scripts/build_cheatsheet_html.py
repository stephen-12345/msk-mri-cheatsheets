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

  document.addEventListener('keydown', function(e){
    if(e.metaKey||e.ctrlKey||e.altKey) return;            // leave native zoom alone
    var t=e.target;
    if(t && (t.tagName==='INPUT'||t.tagName==='TEXTAREA'||t.isContentEditable)) return;
    if(e.key==='+'||e.key==='='){ set(scale+STEP); e.preventDefault(); }
    else if(e.key==='-'||e.key==='_'){ set(scale-STEP); e.preventDefault(); }
    else if(e.key==='0'){ set(1); e.preventDefault(); }
    else if(e.key==='Home'){ goTop(); e.preventDefault(); }
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


def md_to_html(md: str) -> tuple[str, str]:
    """Return (title, body_html)."""
    lines = md.split("\n")
    title = ""
    out: list[str] = []
    i = 0
    n = len(lines)
    bullets: list[str] = []

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
                out.append(f'<h2 class="group">{inline(text)}</h2>')
                i += 1
            continue
        if stripped.startswith("### "):
            flush_bullets()
            out.append(f"<h3>{inline(stripped[4:].strip())}</h3>")
            i += 1
            continue
        if stripped.startswith("## "):
            flush_bullets()
            out.append(f"<h2>{inline(stripped[3:].strip())}</h2>")
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
    return title, "\n".join(out)


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
    return (
        '<div class="topbar">'
        f'<span class="crumb">{html.escape(crumb)}</span>'
        + "".join(links)
        + fontctl
        + "</div>"
    )


def build(joint: str) -> None:
    md_path = ROOT / joint / f"{joint}-mri-cheatsheet.md"
    out_path = ROOT / joint / f"{joint}-mri-cheatsheet.html"
    md = md_path.read_text(encoding="utf-8")
    title, body = md_to_html(md)
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
