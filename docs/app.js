const repoOwner = 'suhaimitoamy';
const repoName = 'my-jurnal-trading';
const repoBase = `https://github.com/${repoOwner}/${repoName}`;
const readerBase = './reader.html';

const doneDays = [1,2,3,5,7,8,9,10,11,12,14,15,16,17,18,19,20,27,28,29,30,31,32,33,34,35];
const skipDays = [4,6,13,21,22,23,24,25,26];

const quickLinks = [
  { title: 'Risk Management', path: 'risk-management.md', desc: 'Aturan perlindungan modal.' },
  { title: 'Pre-Entry Checklist', path: 'pre-entry-checklist.md', desc: 'Filter sebelum klik buy atau sell.' },
  { title: 'Core Method', path: 'playbook/core-method.md', desc: 'Bias, structure, breakout, retest, entry.' },
  { title: 'Non-Negotiable Rules', path: 'playbook/non-negotiable-rules.md', desc: 'Larangan keras yang tidak boleh dilanggar.' },
  { title: 'Execution Checklist', path: 'playbook/execution-checklist.md', desc: 'Checklist eksekusi sebelum entry.' },
  { title: 'Daily Review Template', path: 'playbook/daily-review-template.md', desc: 'Template evaluasi sesudah sesi.' },
  { title: 'Journal Template V2', path: 'templates/journal-v2-template.md', desc: 'Template baru plus standar tag resmi untuk Reader dan Learning Hub.' },
  { title: 'Master Diagnosis 1-35', path: 'weekly-reviews/master-diagnosis-day-1-to-35.md', desc: 'Diagnosis besar dari seluruh fase awal.' },
  { title: 'Final Status 1-35', path: 'trades/final-status-day-1-to-35.md', desc: 'Status akhir: masuk repo vs skip.' }
];

const journals = [
  { day: 1, date: '2026-01-12', title: 'Hari 1', path: 'trades/2026-01-12-hari-1.md', tags: ['awal', 'fomo', 'real account'] },
  { day: 2, date: '2026-01-13', title: 'Hari 2', path: 'trades/2026-01-13-hari-2.md', tags: ['loss', 'emosi', 'risk'] },
  { day: 3, date: '2026-01-14', title: 'Hari 3', path: 'trades/2026-01-14-hari-3.md', tags: ['disiplin', 'stop trading'] },
  { day: 5, date: '2026-01-16', title: 'Hari 5', path: 'trades/2026-01-16-hari-5.md', tags: ['no trade', 'observasi'] },
  { day: 7, date: '2026-01-20', title: 'Hari 7', path: 'trades/2026-01-20-hari-7.md', tags: ['ath', 'trend', 'mindset'] },
  { day: 8, date: '2026-01-21', title: 'Hari 8', path: 'trades/2026-01-21-hari-8.md', tags: ['btc', 'overconfidence'] },
  { day: 9, date: '2026-01-22', title: 'Hari 9', path: 'trades/2026-01-22-hari-9.md', tags: ['profit', 'rule break'] },
  { day: 10, date: '2026-01-23', title: 'Hari 10', path: 'trades/2026-01-23-hari-10.md', tags: ['pullback', 'ath'] },
  { day: 11, date: '2026-01-26', title: 'Hari 11', path: 'trades/2026-01-26-hari-11.md', tags: ['lot', 'panic cut'] },
  { day: 12, date: '2026-01-27', title: 'Hari 12', path: 'trades/2026-01-27-hari-12.md', tags: ['martingale', 'revenge'] },
  { day: 14, date: '2026-01-29', title: 'Hari 14', path: 'trades/2026-01-29-hari-14.md', tags: ['mc', 'resistance'] },
  { day: 15, date: '2026-01-30', title: 'Hari 15', path: 'trades/2026-01-30-hari-15.md', tags: ['tiktok', 'rule set'] },
  { day: 16, date: '2026-02-02', title: 'Hari 16', path: 'trades/2026-02-02-hari-16.md', tags: ['mc', 'emosi', 'unfollow signal'] },
  { day: 17, date: '2026-02-03', title: 'Hari 17', path: 'trades/2026-02-03-hari-17.md', tags: ['sl', 'countertrend'] },
  { day: 18, date: '2026-02-04', title: 'Hari 18', path: 'trades/2026-02-04-hari-18.md', tags: ['no trade'] },
  { day: 19, date: '2026-02-05', title: 'Hari 19', path: 'trades/2026-02-05-hari-19.md', tags: ['no trade'] },
  { day: 20, date: '2026-02-06', title: 'Hari 20', path: 'trades/2026-02-06-hari-20.md', tags: ['breakout', 'tp kena'] },
  { day: 27, date: '2026-02-23', title: 'Hari 27', path: 'trades/2026-02-23-hari-27.md', tags: ['salah lot', 'tiktok'] },
  { day: 28, date: '2026-02-24', title: 'Hari 28', path: 'trades/2026-02-24-hari-28.md', tags: ['bearish', 'sell limit'] },
  { day: 29, date: '2026-02-25', title: 'Hari 29', path: 'trades/2026-02-25-hari-29.md', tags: ['sell loss', 'structure'] },
  { day: 30, date: '2026-03-02', title: 'Hari 30', path: 'trades/2026-03-02-hari-30.md', tags: ['demo', 'winrate', 'bias'] },
  { day: 31, date: '2026-03-03', title: 'Hari 31', path: 'trades/2026-03-03-hari-31.md', tags: ['bias', 'no sl'] },
  { day: 32, date: '2026-03-11', title: 'Hari 32', path: 'trades/2026-03-11-hari-32.md', tags: ['signal luar', 'overtrade'] },
  { day: 33, date: '2026-03-12', title: 'Hari 33', path: 'trades/2026-03-12-hari-33.md', tags: ['countertrend', 'risk besar'] },
  { day: 34, date: '2026-03-13', title: 'Hari 34', path: 'trades/2026-03-13-hari-34.md', tags: ['sweep', 'run', 'structure'] },
  { day: 35, date: '2026-03-26', title: 'Hari 35', path: 'trades/2026-03-26-hari-35.md', tags: ['jimmy', 'tp cepat', 'emosi'] }
];

function githubBlob(path) {
  return `${repoBase}/blob/main/${path}`;
}

function githubUploadPath(path) {
  return `${repoBase}/new/main/${path}`;
}

function screenshotFolder(day) {
  return `docs/assets/images/screenshots/hari-${day}`;
}

function renderStats() {
  const root = document.getElementById('dashboard-stats');
  const cards = [
    { label: 'Jurnal masuk repo', value: doneDays.length, hint: 'Siap dibuka di Reader.' },
    { label: 'Hari di-skip', value: skipDays.length, hint: 'Tetap tercatat untuk evaluasi batch.' },
    { label: 'Quick links', value: quickLinks.length, hint: 'Rule, template, dan file penting dalam satu tempat.' },
    { label: 'Learning Hub', value: 'Ready', hint: 'Jurnal bisa jadi materi pembelajaran.' }
  ];

  root.innerHTML = cards.map(card => `
    <div class="stat-card">
      <div class="label">${card.label}</div>
      <div class="value">${card.value}</div>
      <div class="hint">${card.hint}</div>
    </div>
  `).join('');
}

function renderQuickLinks() {
  const root = document.getElementById('quick-links');
  root.innerHTML = quickLinks.map(item => `
    <div class="link-card">
      <a href="${githubBlob(item.path)}" target="_blank" rel="noreferrer">
        <div class="card-top">
          <h3>${item.title}</h3>
          <span class="card-action">Buka</span>
        </div>
        <p>${item.desc}</p>
      </a>
    </div>
  `).join('');
}

function renderJournals(items = journals) {
  const root = document.getElementById('journal-grid');
  if (!items.length) {
    root.innerHTML = '<div class="journal-card"><h3>Tidak ada hasil</h3><p class="meta">Coba kata kunci lain.</p></div>';
    return;
  }

  root.innerHTML = items.map(item => `
    <div class="journal-card">
      <a href="${githubBlob(item.path)}" target="_blank" rel="noreferrer">
        <div class="day-badge">Hari ${item.day}</div>
        <h3>${item.title}</h3>
        <p class="meta">${item.date}</p>
        <div class="tag-row">
          <span class="tag reader">Reader tersedia</span>
          <span class="tag">Learning Hub</span>
          ${item.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
        </div>
      </a>
      <div class="reader-link">
        <a class="btn" href="${readerBase}#view=${encodeURIComponent(item.path)}">Baca di Reader</a>
      </div>
    </div>
  `).join('');
}

function setupSearch() {
  const input = document.getElementById('journal-search');
  input.addEventListener('input', (e) => {
    const q = e.target.value.toLowerCase().trim();
    if (!q) return renderJournals(journals);
    const filtered = journals.filter(item => {
      return [item.title, item.date, `hari ${item.day}`, ...(item.tags || [])]
        .join(' ')
        .toLowerCase()
        .includes(q);
    });
    renderJournals(filtered);
  });
}

function listToBullets(text) {
  return (text || '')
    .split('\n')
    .map(line => line.trim())
    .filter(Boolean)
    .map(line => `- ${line}`)
    .join('\n');
}

function buildMarkdown(formData) {
  const filename = `${formData.date}-hari-${formData.day}.md`;
  const title = `# Trade Journal - Hari ${formData.day}`;
  const mistakes = listToBullets(formData.mistakes) || '-';
  const lessons = listToBullets(formData.lessons) || '-';
  const focus = listToBullets(formData.focus) || '-';

  const md = `${title}\n\n## Informasi Umum\n- Tanggal: ${formData.date}\n- Hari ke: ${formData.day}\n- Instrumen: ${formData.instrument || 'XAUUSD'}\n- Hasil hari ini: ${formData.result || '-'}\n- Bias atau kondisi market: ${formData.bias || '-'}\n- Sesi trading: London / New York / Asia\n\n## Ringkasan Hari Ini\n${formData.summary || '-'}\n\n## Konteks Market\n- Struktur HTF: -\n- Struktur intraday: -\n- Area penting: -\n- Skenario utama: -\n- Skenario batal: -\n\n## Entry yang Diambil\n- Entry 1: -\n- Alasan entry: -\n- Execution quality: -\n- Hasil: -\n\n## Kesalahan Utama\n${mistakes}\n\n## Pembelajaran Hari Ini\n${lessons}\n\n## Fokus Perbaikan\n${focus}\n\n## Tag Pembelajaran\n- psychology\n- risk-management\n- execution\n\n## Standar Tag Resmi\n- psychology\n- risk-management\n- execution\n- market-structure\n- discipline\n- external-signal\n- review\n\n## Pelajaran Inti\n- Tulis 2 sampai 5 pelajaran paling penting dari jurnal ini.\n- Gunakan kalimat singkat, jelas, dan praktis.\n\n## Ringkasan Materi\nTulis 2 sampai 4 kalimat inti agar Learning Hub bisa menampilkan materi dengan lebih rapi.\n\n## Checklist Besok\n- [ ] Tetapkan bias sebelum entry\n- [ ] Tunggu validasi struktur\n- [ ] Risk tetap kecil\n- [ ] Hindari entry impulsif\n`;

  return { filename: `trades/${filename}`, markdown: md, screenshotFolder: screenshotFolder(formData.day) };
}

function setupBuilder() {
  const form = document.getElementById('journal-form');
  const output = document.getElementById('markdown-output');
  const fileLabel = document.getElementById('suggested-filename');
  const screenshotFolderLabel = document.getElementById('screenshot-folder');
  const uploadLink = document.getElementById('upload-screenshot-link');
  const storageKey = 'my-jurnal-trading-builder';

  const fieldIds = [
    'entry-date', 'entry-day', 'entry-instrument', 'entry-result', 'entry-bias',
    'entry-summary', 'entry-mistakes', 'entry-lessons', 'entry-focus'
  ];

  function resetScreenshotState() {
    screenshotFolderLabel.textContent = '-';
    uploadLink.href = '#';
    uploadLink.setAttribute('aria-disabled', 'true');
  }

  function updateScreenshotTarget(dayValue) {
    const day = String(dayValue || '').trim();
    if (!day) {
      resetScreenshotState();
      return;
    }
    const folder = screenshotFolder(day);
    screenshotFolderLabel.textContent = folder;
    uploadLink.href = githubUploadPath(folder);
    uploadLink.removeAttribute('aria-disabled');
  }

  function saveDraft() {
    const draft = {};
    fieldIds.forEach(id => { draft[id] = document.getElementById(id).value; });
    localStorage.setItem(storageKey, JSON.stringify(draft));
    updateScreenshotTarget(document.getElementById('entry-day').value);
  }

  function loadDraft() {
    const raw = localStorage.getItem(storageKey);
    if (!raw) return;
    try {
      const draft = JSON.parse(raw);
      fieldIds.forEach(id => {
        if (draft[id] != null) document.getElementById(id).value = draft[id];
      });
    } catch (_) {}
  }

  loadDraft();
  updateScreenshotTarget(document.getElementById('entry-day').value);
  fieldIds.forEach(id => document.getElementById(id).addEventListener('input', saveDraft));

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = {
      date: document.getElementById('entry-date').value,
      day: document.getElementById('entry-day').value,
      instrument: document.getElementById('entry-instrument').value,
      result: document.getElementById('entry-result').value,
      bias: document.getElementById('entry-bias').value,
      summary: document.getElementById('entry-summary').value,
      mistakes: document.getElementById('entry-mistakes').value,
      lessons: document.getElementById('entry-lessons').value,
      focus: document.getElementById('entry-focus').value,
    };
    const built = buildMarkdown(data);
    output.value = built.markdown;
    fileLabel.textContent = built.filename;
    screenshotFolderLabel.textContent = built.screenshotFolder;
    uploadLink.href = githubUploadPath(built.screenshotFolder);
    uploadLink.removeAttribute('aria-disabled');
  });

  document.getElementById('clear-form').addEventListener('click', () => {
    form.reset();
    output.value = '';
    fileLabel.textContent = '-';
    localStorage.removeItem(storageKey);
    resetScreenshotState();
  });

  document.getElementById('copy-markdown').addEventListener('click', async () => {
    if (!output.value) return alert('Belum ada markdown untuk di-copy.');
    await navigator.clipboard.writeText(output.value);
    alert('Markdown berhasil di-copy.');
  });

  document.getElementById('download-markdown').addEventListener('click', () => {
    if (!output.value) return alert('Belum ada markdown untuk di-download.');
    const filename = (fileLabel.textContent || 'journal.md').replace('trades/', '');
    const blob = new Blob([output.value], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  });
}

function init() {
  document.getElementById('repo-link').href = repoBase;
  renderStats();
  renderQuickLinks();
  renderJournals();
  setupSearch();
  setupBuilder();
}

init();
