/* ===================================================================
   PowerScribe-style template engine — shared by all joint templates.
   Takes a CONFIG object (window.TEMPLATE_CONFIG) and renders an
   interactive page with clickable options + live dictation preview.

   CONFIG schema:
   {
     title: 'Knee MRI — Dictation Template',
     heading: 'KNEE MRI',         // top of preview output
     back_link: '../knee/knee-mri-cheatsheet.html',
     sections: [
       {
         id: 'effusion',
         label: 'Joint effusion',
         output_section: 'Effusion / fluid',   // optional grouping label in preview
         normal_state: 'no effusion',          // header pill text when normal
         grade_group: {
           label: 'Effusion size',
           options: [
             {id: 'none',  label: 'None',     sentence: 'No joint effusion.', is_normal: true},
             {id: 'small', label: 'Small',    sentence: 'Small joint effusion within the suprapatellar recess.'},
             ...
           ]
         },
         variable_groups: [
           {
             id: 'location',
             label: 'Location',
             type: 'multi',                    // 'mutex' or 'multi'
             placeholder: '[medial / lateral facet]',
             plural_suffix: 'facet',           // optional: tells pluralizer
             options: [
               {id: 'medial', value: 'medial facet'},
               {id: 'lateral', value: 'lateral facet'},
             ]
           }
         ],
         addon_group: {
           label: 'Subchondral findings',
           options: [
             {id: 'edema', label: 'Marrow edema', text: 'Associated subchondral T2-hyperintense bone marrow edema.'},
             {id: 'cyst',  label: 'Cyst',        text: 'Associated subchondral cyst measuring {cyst_size} mm.', size_input: 'cyst_size'},
           ]
         }
       },
       ...
     ]
   }
   =================================================================== */

(function(){
  'use strict';

  // ===== Grammar helpers (multi-select pluralization) =====
  function pluralize(word){
    if (!word) return word;
    if (/s$/i.test(word)) return word;
    if (/y$/i.test(word)) return word.slice(0, -1) + 'ies';
    return word + 's';
  }
  function joinWithAnd(items){
    if (items.length === 0) return '';
    if (items.length === 1) return items[0];
    if (items.length === 2) return items.join(' and ');
    return items.slice(0, -1).join(', ') + ', and ' + items[items.length - 1];
  }
  function commonSuffixLen(arrays){
    if (arrays.length < 2) return 0;
    const minLen = Math.min(...arrays.map(a => a.length));
    let n = 0;
    for (let i = 1; i <= minLen; i++) {
      const w = arrays[0][arrays[0].length - i];
      if (arrays.every(a => a[a.length - i] === w)) n = i;
      else break;
    }
    return n >= minLen ? minLen - 1 : n;
  }
  function formatLocations(locs){
    if (!locs || locs.length === 0) return '';
    if (locs.length === 1) return locs[0];
    const words = locs.map(l => l.trim().split(/\s+/));
    const suffixLen = commonSuffixLen(words);
    if (suffixLen > 0) {
      const stripped = words.map((w, i) =>
        i === words.length - 1 ? w.join(' ') : w.slice(0, -suffixLen).join(' ')
      );
      const lastWords = stripped[stripped.length - 1].split(' ');
      lastWords[lastWords.length - 1] = pluralize(lastWords[lastWords.length - 1]);
      stripped[stripped.length - 1] = lastWords.join(' ');
      return joinWithAnd(stripped);
    }
    return joinWithAnd(locs);
  }

  function escapeHtml(s){
    return String(s).replace(/[&<>]/g, m => ({'&':'&amp;','<':'&lt;','>':'&gt;'}[m]));
  }

  // ===== Template class =====
  class Template {
    constructor(config){
      this.config = config;
      this.state = {};
      for (const sec of config.sections) {
        const s = {
          grade: null,
          vars: {},
          addons: {},
          var_inputs: {},
        };
        if (sec.grade_group) {
          const normal = sec.grade_group.options.find(o => o.is_normal);
          s.grade = normal ? normal.id : sec.grade_group.options[0].id;
        }
        for (const vg of (sec.variable_groups || [])) {
          s.vars[vg.id] = [];
        }
        this.state[sec.id] = s;
      }
    }

    render(root){
      root.innerHTML = this.buildOptionsHtml();
      this.wireEvents(root);
      this.applyDefaults(root);
      this.updatePreview();
    }

    buildOptionsHtml(){
      return this.config.sections.map(sec => this.buildSectionHtml(sec)).join('');
    }

    buildSectionHtml(sec){
      const parts = [];
      if (sec.grade_group) {
        parts.push(this.buildGroupHtml(sec.id, 'grade', sec.grade_group, true));
      }
      for (const vg of (sec.variable_groups || [])) {
        if (vg.type === 'numeric') {
          parts.push(this.buildNumericHtml(sec.id, vg));
        } else {
          parts.push(this.buildGroupHtml(sec.id, vg.id, vg, vg.type === 'mutex', 'var'));
        }
      }
      if (sec.addon_group) {
        parts.push(this.buildAddonHtml(sec.id, sec.addon_group));
      }
      return `
        <section class="template-section" data-sec="${sec.id}">
          <header>
            <h4>${escapeHtml(sec.label)}</h4>
            <span class="state" data-state-for="${sec.id}"></span>
          </header>
          <div class="body">${parts.join('')}</div>
        </section>
      `;
    }

    buildGroupHtml(secId, groupKey, group, isMutex, kind){
      kind = kind || 'grade';
      const hint = group.type === 'multi' ? ' <span class="multi-hint">(pick one or more)</span>' : '';
      const opts = group.options.map(o => {
        const cls = ['option-btn'];
        if (o.is_normal) cls.push('normal');
        const lbl = o.short ? `<span class="grade">${escapeHtml(o.short)}</span>${escapeHtml(o.label)}` : escapeHtml(o.label);
        return `<button class="${cls.join(' ')}"
          data-sec="${secId}" data-kind="${kind}" data-group="${groupKey}"
          data-id="${o.id}" data-value="${escapeHtml(o.value || '')}"
          data-mutex="${isMutex}">${lbl}</button>`;
      }).join('');
      return `
        <div class="option-group" data-group="${groupKey}">
          <div class="option-group-label">${escapeHtml(group.label)}${hint}</div>
          <div class="option-buttons">${opts}</div>
        </div>
      `;
    }

    buildNumericHtml(secId, vg){
      // Render a numeric input field instead of buttons.
      // The current value lives in state[secId].var_inputs[vg.id]
      const placeholder = vg.unit ? vg.unit : 'value';
      return `
        <div class="option-group" data-group="${vg.id}">
          <div class="option-group-label">${escapeHtml(vg.label)}</div>
          <div class="option-buttons">
            <input type="number" class="size-input numeric-var" data-sec="${secId}" data-input="${vg.id}" placeholder="${escapeHtml(placeholder)}" min="0" max="999" step="0.1">
          </div>
        </div>
      `;
    }

    buildAddonHtml(secId, addonGroup){
      const opts = addonGroup.options.map(o => {
        const btn = `<button class="option-btn checkbox" data-sec="${secId}" data-kind="addon" data-id="${o.id}">${escapeHtml(o.label)}</button>`;
        let inp = '';
        if (o.size_input) {
          inp = `<input type="number" class="size-input" data-sec="${secId}" data-input="${o.size_input}" placeholder="mm" min="1" max="999">`;
        }
        return btn + inp;
      }).join('');
      return `
        <div class="option-group">
          <div class="option-group-label">${escapeHtml(addonGroup.label)}</div>
          <div class="option-buttons">${opts}</div>
        </div>
      `;
    }

    wireEvents(root){
      root.querySelectorAll('.option-btn').forEach(btn => {
        btn.addEventListener('click', () => this.onClickButton(btn));
      });
      root.querySelectorAll('.size-input').forEach(inp => {
        inp.addEventListener('input', () => this.onInput(inp));
      });
    }

    applyDefaults(root){
      // Apply selected class to default grade buttons
      for (const sec of this.config.sections) {
        const s = this.state[sec.id];
        if (s.grade) {
          const btn = root.querySelector(`button[data-sec="${sec.id}"][data-kind="grade"][data-id="${s.grade}"]`);
          if (btn) btn.classList.add('selected');
        }
      }
    }

    onClickButton(btn){
      const secId = btn.dataset.sec;
      const kind = btn.dataset.kind;
      const id = btn.dataset.id;
      const value = btn.dataset.value;
      const mutex = btn.dataset.mutex === 'true';
      const groupKey = btn.dataset.group;
      const s = this.state[secId];

      if (kind === 'grade') {
        // Always mutex
        const group = btn.closest('.option-group');
        group.querySelectorAll('.option-btn').forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
        s.grade = id;
      } else if (kind === 'var') {
        if (mutex) {
          const group = btn.closest('.option-group');
          const wasSelected = btn.classList.contains('selected');
          group.querySelectorAll('.option-btn').forEach(b => b.classList.remove('selected'));
          if (!wasSelected) {
            btn.classList.add('selected');
            s.vars[groupKey] = [value];
          } else {
            s.vars[groupKey] = [];
          }
        } else {
          // Multi-select
          const arr = s.vars[groupKey];
          const idx = arr.indexOf(value);
          if (idx >= 0) {
            arr.splice(idx, 1);
            btn.classList.remove('selected');
          } else {
            arr.push(value);
            btn.classList.add('selected');
          }
        }
      } else if (kind === 'addon') {
        btn.classList.toggle('selected');
        s.addons[id] = btn.classList.contains('selected');
      }
      this.updatePreview();
    }

    onInput(inp){
      const secId = inp.dataset.sec;
      const inputId = inp.dataset.input;
      this.state[secId].var_inputs[inputId] = inp.value;
      this.updatePreview();
    }

    // Expand {var} placeholders in a sentence
    expandTemplate(text, sec){
      const s = this.state[sec.id];
      return text.replace(/\{(\w+)\}/g, (_, name) => {
        const vg = (sec.variable_groups || []).find(g => g.id === name);
        if (vg) {
          if (vg.type === 'numeric') {
            const val = s.var_inputs[name];
            if (val !== undefined && val !== null && String(val).trim() !== '') return escapeHtml(val);
            const ph = vg.placeholder || `[${name}]`;
            return `<<PH>>${escapeHtml(ph)}<</PH>>`;
          }
          const sel = s.vars[name] || [];
          if (sel.length === 0) {
            const ph = vg.placeholder || `[${name}]`;
            return `<<PH>>${escapeHtml(ph)}<</PH>>`;
          }
          return escapeHtml(formatLocations(sel));
        }
        const val = s.var_inputs[name];
        if (val && String(val).trim()) return escapeHtml(val);
        return `<<PH>>[${escapeHtml(name)}]<</PH>>`;
      });
    }

    isNormal(sec){
      if (!sec.grade_group) return true;
      const opt = sec.grade_group.options.find(o => o.id === this.state[sec.id].grade);
      return !!(opt && opt.is_normal);
    }

    buildSectionSentence(sec){
      const s = this.state[sec.id];
      let main = '';
      if (sec.grade_group) {
        const opt = sec.grade_group.options.find(o => o.id === s.grade);
        if (opt) main = this.expandTemplate(opt.sentence, sec);
      }
      if (sec.addon_group && !this.isNormal(sec)) {
        const enabled = sec.addon_group.options.filter(o => s.addons[o.id]);
        if (enabled.length) {
          const addonTexts = enabled.map(o => this.expandTemplate(o.text, sec));
          main += ' ' + addonTexts.join(' ');
        }
      }
      return main;
    }

    // Group sections by output_section
    groupedSections(){
      const groups = [];
      const byKey = {};
      for (const sec of this.config.sections) {
        const key = sec.output_section || '';
        if (!byKey[key]) {
          byKey[key] = { key, sections: [] };
          groups.push(byKey[key]);
        }
        byKey[key].sections.push(sec);
      }
      return groups;
    }

    updatePreview(){
      const out = [];
      if (this.config.heading) out.push(`<span class="heading">${escapeHtml(this.config.heading)}</span>`);
      for (const g of this.groupedSections()) {
        if (g.key) out.push(`<span class="sub-heading">${escapeHtml(g.key.toUpperCase())}:</span>`);
        for (const sec of g.sections) {
          const text = this.buildSectionSentence(sec);
          const cls = this.isNormal(sec) ? 'sentence normal-line' : 'sentence abnormal';
          // Convert <<PH>>placeholder<</PH>> markers into placeholder spans
          const rendered = text.replace(/<<PH>>(.*?)<<\/PH>>/g, '<span class="placeholder">$1</span>');
          out.push(`<span class="${cls}"><b class="sec-name">${escapeHtml(sec.label)}:</b> ${rendered}</span>`);
        }
      }
      document.getElementById('preview-output').innerHTML = out.join('');
      this.updateStates();
    }

    updateStates(){
      for (const sec of this.config.sections) {
        const node = document.querySelector(`[data-state-for="${sec.id}"]`);
        if (!node) continue;
        const s = this.state[sec.id];
        const isNorm = this.isNormal(sec);
        if (isNorm) {
          node.textContent = sec.normal_state || 'normal';
          node.classList.remove('modified');
        } else {
          const opt = sec.grade_group ? sec.grade_group.options.find(o => o.id === s.grade) : null;
          let txt = opt ? opt.label : 'modified';
          // Append location summary if any
          const locSummary = [];
          for (const vg of (sec.variable_groups || [])) {
            const sel = s.vars[vg.id] || [];
            if (sel.length) locSummary.push(sel.join(', '));
          }
          if (locSummary.length) txt += ' · ' + locSummary.join(' · ');
          node.textContent = txt;
          node.classList.add('modified');
        }
      }
    }

    compiledText(opts){
      opts = opts || {};
      const abnormalOnly = !!opts.abnormalOnly;
      const lines = [];
      if (this.config.heading) lines.push(this.config.heading);
      for (const g of this.groupedSections()) {
        const sections = abnormalOnly ? g.sections.filter(s => !this.isNormal(s)) : g.sections;
        if (sections.length === 0) continue;
        if (g.key) lines.push('', g.key.toUpperCase() + ':');
        for (const sec of sections) {
          let text = this.buildSectionSentence(sec);
          // Strip HTML placeholders, keep [bracketed] text
          text = text.replace(/<<PH>>(.*?)<<\/PH>>/g, '$1');
          // Decode any HTML entities
          const div = document.createElement('div');
          div.innerHTML = text;
          const decoded = div.textContent;
          lines.push(`${sec.label}: ${decoded}`);
        }
      }
      return lines.join('\n');
    }

    reset(){
      for (const sec of this.config.sections) {
        const s = this.state[sec.id];
        if (sec.grade_group) {
          const normal = sec.grade_group.options.find(o => o.is_normal);
          s.grade = normal ? normal.id : sec.grade_group.options[0].id;
        }
        for (const vg of (sec.variable_groups || [])) {
          s.vars[vg.id] = [];
        }
        s.addons = {};
        s.var_inputs = {};
      }
      // Clear UI
      document.querySelectorAll('.option-btn').forEach(b => b.classList.remove('selected'));
      document.querySelectorAll('.size-input').forEach(i => i.value = '');
      this.applyDefaults(document.getElementById('options-pane'));
      this.updatePreview();
    }
  }

  // ===== Bootstrap =====
  function bootstrap(){
    const config = window.TEMPLATE_CONFIG;
    if (!config) {
      console.error('TEMPLATE_CONFIG not defined');
      return;
    }
    document.title = config.title || 'Template';
    document.getElementById('page-title').textContent = config.title || 'Template';
    if (config.back_link) {
      const a = document.getElementById('back-link');
      if (a) a.href = config.back_link;
    }
    const tmpl = new Template(config);
    tmpl.render(document.getElementById('options-pane'));
    window.tmpl = tmpl;

    document.getElementById('copy-btn').addEventListener('click', e => {
      copyText(e.currentTarget, tmpl.compiledText({abnormalOnly: false}));
    });
    document.getElementById('copy-abnormal-btn').addEventListener('click', e => {
      copyText(e.currentTarget, tmpl.compiledText({abnormalOnly: true}));
    });
    document.getElementById('reset-btn').addEventListener('click', () => {
      if (confirm('Reset all selections to normal?')) tmpl.reset();
    });
  }

  function copyText(btn, text){
    const finish = () => {
      const orig = btn.dataset.origText || btn.textContent;
      btn.dataset.origText = orig;
      btn.textContent = '✓ Copied!';
      btn.classList.add('success');
      setTimeout(() => {
        btn.textContent = orig;
        btn.classList.remove('success');
      }, 1800);
    };
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(finish).catch(() => fallback(text, finish));
    } else {
      fallback(text, finish);
    }
  }
  function fallback(text, done){
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.style.position = 'fixed';
    ta.style.left = '-9999px';
    document.body.appendChild(ta);
    ta.select();
    try { document.execCommand('copy'); } catch(e) {}
    document.body.removeChild(ta);
    done();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', bootstrap);
  } else {
    bootstrap();
  }
})();
