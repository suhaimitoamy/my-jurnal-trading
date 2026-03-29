(function () {
  const REPO_OWNER = 'suhaimitoamy';
  const REPO_NAME = 'my-jurnal-trading';
  const BRANCH = 'main';
  const REPO_BASE = `https://github.com/${REPO_OWNER}/${REPO_NAME}`;
  const RAW_BASE = `https://raw.githubusercontent.com/${REPO_OWNER}/${REPO_NAME}/${BRANCH}/`;
  const API_BASE = `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}`;
  const CACHE_TTL_MS = 1000 * 60 * 60 * 6;

  const FALLBACK_JOURNALS = [
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

  const FALLBACK_MAP = Object.fromEntries(FALLBACK_JOURNALS.map(item => [item.path, item]));
  const CATEGORY_LABELS = {
    psychology: 'Psychology',
    'risk-management': 'Risk Management',
    execution: 'Execution',
    'market-structure': 'Market Structure',
    discipline: 'Discipline',
    'external-signal': 'External Signal',
    review: 'Review'
  };
  const PRIORITY_LABELS = {
    urgent: 'Wajib diperbaiki',
    repeat: 'Kesalahan berulang',
    improved: 'Sudah membaik',
    watch: 'Perlu dipantau'
  };

  function githubBlob(path) {
    return `${REPO_BASE}/blob/${BRANCH}/${path}`;
  }

  function rawUrl(path) {
    return `${RAW_BASE}${path}`;
  }

  function readerUrl(path) {
    return `./reader.html#view=${encodeURIComponent(path)}`;
  }

  function learnUrl(path) {
    return `./learn.html#source=${encodeURIComponent(path)}`;
  }

  function readCache(key) {
    try {
      const raw = localStorage.getItem(key);
      if (!raw) return null;
      const parsed = JSON.parse(raw);
      if (!parsed || typeof parsed !== 'object') return null;
      if (!parsed.expiresAt || Date.now() > parsed.expiresAt) return null;
      return parsed.data;
    } catch (_) {
      return null;
    }
  }

  function writeCache(key, data, ttl = CACHE_TTL_MS) {
    try {
      localStorage.setItem(key, JSON.stringify({ data, expiresAt: Date.now() + ttl }));
    } catch (_) {}
  }

  async function fetchJson(url) {
    const response = await fetch(url, { headers: { Accept: 'application/vnd.github+json' }, cache: 'no-store' });
    if (!response.ok) throw new Error('Gagal mengambil data repo.');
    return response.json();
  }

  async function fetchText(url) {
    const response = await fetch(url, { cache: 'no-store' });
    if (!response.ok) throw new Error('Gagal memuat file markdown.');
    return response.text();
  }

  function parseTradeFilename(name) {
    const match = name.match(/^(\d{4}-\d{2}-\d{2})-hari-(\d+)\.md$/i);
    if (!match) return null;
    return { date: match[1], day: Number(match[2]) };
  }

  function normalizeTradeEntry(entry) {
    const path = typeof entry === 'string' ? entry : entry.path || entry.name;
    const name = path.split('/').pop();
    const fallback = FALLBACK_MAP[path] || null;
    const parsed = parseTradeFilename(name || '');
    const day = fallback?.day ?? parsed?.day ?? null;
    const date = fallback?.date ?? parsed?.date ?? '';
    return {
      day,
      date,
      title: fallback?.title || (day ? `Hari ${day}` : name.replace(/\.md$/i, '')),
      path,
      tags: fallback?.tags || []
    };
  }

  function sortTradeItems(a, b) {
    const dayA = Number(a.day || 0);
    const dayB = Number(b.day || 0);
    if (dayA !== dayB) return dayB - dayA;
    return String(b.date || '').localeCompare(String(a.date || ''));
  }

  async function loadTradeCatalog(options = {}) {
    const force = Boolean(options.force);
    const cacheKey = 'my-jurnal-trading:catalog:v2';
    if (!force) {
      const cached = readCache(cacheKey);
      if (cached) return cached;
    }

    try {
      const payload = await fetchJson(`${API_BASE}/contents/trades?ref=${BRANCH}`);
      const items = (Array.isArray(payload) ? payload : [])
        .filter(item => item.type === 'file' && /\.md$/i.test(item.name) && !/final-status/i.test(item.name))
        .map(item => normalizeTradeEntry(item))
        .sort(sortTradeItems);
      writeCache(cacheKey, items);
      return items;
    } catch (_) {
      return FALLBACK_JOURNALS.slice().sort(sortTradeItems);
    }
  }

  async function fetchTradeMarkdown(path, options = {}) {
    const force = Boolean(options.force);
    const cacheKey = `my-jurnal-trading:markdown:${path}`;
    if (!force) {
      const cached = readCache(cacheKey);
      if (cached) return cached;
    }
    const markdown = await fetchText(rawUrl(path));
    writeCache(cacheKey, markdown);
    return markdown;
  }

  function parseFrontmatter(markdown) {
    const trimmed = markdown.trimStart();
    if (!trimmed.startsWith('---')) return {};
    const endIndex = trimmed.indexOf('\n---', 3);
    if (endIndex === -1) return {};
    const block = trimmed.slice(3, endIndex).trim();
    const data = {};
    let currentKey = null;

    block.split('\n').forEach(rawLine => {
      const line = rawLine.trimEnd();
      if (!line.trim()) return;
      const keyMatch = line.match(/^([A-Za-z0-9_-]+):\s*(.*)$/);
      if (keyMatch) {
        currentKey = keyMatch[1];
        const value = keyMatch[2].trim();
        if (!value) {
          data[currentKey] = [];
          return;
        }
        if (value.startsWith('[') && value.endsWith(']')) {
          data[currentKey] = value.slice(1, -1).split(',').map(item => item.trim().replace(/^['"]|['"]$/g, '')).filter(Boolean);
          return;
        }
        data[currentKey] = value.replace(/^['"]|['"]$/g, '');
        return;
      }
      if (currentKey && line.trim().startsWith('- ')) {
        if (!Array.isArray(data[currentKey])) data[currentKey] = [];
        data[currentKey].push(line.trim().slice(2).trim());
      }
    });

    return data;
  }

  function extractSection(markdown, heading) {
    const escaped = heading.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`^##\\s+${escaped}\\s*$([\\s\\S]*?)(?=^##\\s+|$)`, 'im');
    const match = markdown.match(regex);
    return match ? match[1].trim() : '';
  }

  function sectionByNames(markdown, names) {
    for (const name of names) {
      const section = extractSection(markdown, name);
      if (section) return section;
    }
    return '';
  }

  function extractBullets(section) {
    return (section || '')
      .split('\n')
      .map(line => line.trim())
      .filter(line => line.startsWith('- '))
      .map(line => line.slice(2).trim())
      .filter(Boolean);
  }

  function cleanSentence(text) {
    return text.replace(/\s+/g, ' ').trim();
  }

  function firstMeaningfulSentences(section, limit = 3) {
    const normalized = (section || '')
      .replace(/^###?\s+/gm, '')
      .replace(/^- /gm, '')
      .replace(/\n+/g, ' ');
    const sentences = normalized.match(/[^.!?]+[.!?]?/g) || [];
    return sentences
      .map(cleanSentence)
      .filter(sentence => sentence.length > 22)
      .slice(0, limit);
  }

  function normalizeTag(tag) {
    const value = String(tag || '').toLowerCase().trim();
    if (!value) return '';
    if (value.includes('psychology') || value.includes('fomo') || value.includes('emosi') || value.includes('revenge') || value.includes('panic') || value.includes('mental') || value.includes('overconfidence') || value.includes('overtrade')) return 'psychology';
    if (value.includes('risk') || value.includes('lot') || value.includes('sl') || value.includes('stop loss') || value.includes('tp') || value.includes('mc') || value.includes('martingale') || value.includes('drawdown')) return 'risk-management';
    if (value.includes('entry') || value.includes('execution') || value.includes('breakout') || value.includes('retest') || value.includes('trigger') || value.includes('sell limit') || value.includes('buy limit')) return 'execution';
    if (value.includes('structure') || value.includes('trend') || value.includes('bearish') || value.includes('bullish') || value.includes('support') || value.includes('resistance') || value.includes('order flow') || value.includes('pullback') || value.includes('sweep') || value.includes('wick')) return 'market-structure';
    if (value.includes('discipline') || value.includes('disiplin') || value.includes('rule')) return 'discipline';
    if (value.includes('sinyal') || value.includes('signal') || value.includes('jimmy') || value.includes('uwi') || value.includes('zio') || value.includes('tiktok')) return 'external-signal';
    return value.includes('/') ? normalizeTag(value.split('/')[0]) : value;
  }

  function inferTagsFromText(text) {
    const source = String(text || '').toLowerCase();
    const tags = new Set();
    ['psychology', 'risk-management', 'execution', 'market-structure', 'discipline', 'external-signal'].forEach(tag => {
      if (normalizeTag(source).includes(tag)) tags.add(tag);
    });
    [
      ['psychology', ['fomo', 'emosi', 'revenge', 'panic', 'mental', 'overtrade', 'overconfidence']],
      ['risk-management', ['risk', 'lot', 'stop loss', 'sl', 'tp cepat', 'martingale', 'mc']],
      ['execution', ['entry', 'breakout', 'retest', 'sell limit', 'buy limit', 'trigger']],
      ['market-structure', ['structure', 'trend', 'bearish', 'bullish', 'support', 'resistance', 'pullback', 'sweep', 'order flow']],
      ['discipline', ['disiplin', 'discipline', 'rule', 'aturan']],
      ['external-signal', ['sinyal', 'signal', 'jimmy', 'uwi', 'zio', 'tiktok']]
    ].forEach(([tag, keywords]) => {
      if (keywords.some(keyword => source.includes(keyword))) tags.add(tag);
    });
    return Array.from(tags);
  }

  function formatCategoryLabel(tag) {
    return CATEGORY_LABELS[tag] || String(tag || 'Review').replace(/-/g, ' ').replace(/\b\w/g, ch => ch.toUpperCase());
  }

  function formatPriorityLabel(tag) {
    return PRIORITY_LABELS[tag] || tag;
  }

  function deriveTopic(item, tags, takeaways) {
    if (takeaways[0]) return takeaways[0].slice(0, 88);
    const primary = tags[0] || 'review';
    if (primary === 'psychology') return `Pelajaran psikologi dari Hari ${item.day || '?'}`;
    if (primary === 'risk-management') return `Pelajaran risk management dari Hari ${item.day || '?'}`;
    if (primary === 'execution') return `Pelajaran eksekusi dari Hari ${item.day || '?'}`;
    if (primary === 'market-structure') return `Pelajaran market structure dari Hari ${item.day || '?'}`;
    if (primary === 'discipline') return `Pelajaran disiplin dari Hari ${item.day || '?'}`;
    if (primary === 'external-signal') return `Pelajaran soal sinyal luar dari Hari ${item.day || '?'}`;
    return `Pelajaran dari ${item.title}`;
  }

  function derivePriorities(tags, summary, takeaways) {
    const text = `${summary} ${(takeaways || []).join(' ')}`.toLowerCase();
    const priorities = [];
    const hasNegative = ['salah', 'loss', 'stop loss', 'martingale', 'mc', 'emosi', 'fomo', 'asal', 'tidak disiplin', 'ikut sinyal', 'panic', 'overtrade', 'no sl', 'tanpa'].some(keyword => text.includes(keyword));
    const hasRepeated = ['masih', 'lagi', 'berulang', 'kembali', 'belum stabil', 'masih belum', 'masih mudah'].some(keyword => text.includes(keyword));
    const hasImproved = ['lebih baik', 'membaik', 'sesuai rencana', 'patuh', 'disiplin', 'no trade', 'menunggu', 'valid'].some(keyword => text.includes(keyword));

    if (hasNegative || tags.includes('risk-management') || tags.includes('external-signal')) priorities.push('urgent');
    if (hasRepeated || ((tags.includes('psychology') || tags.includes('discipline')) && text.includes('masih'))) priorities.push('repeat');
    if (hasImproved && !hasNegative) priorities.push('improved');
    if (!priorities.length || (tags.includes('market-structure') && !hasNegative)) priorities.push('watch');
    return Array.from(new Set(priorities)).slice(0, 2);
  }

  function buildLearningItem(item, markdown) {
    const frontmatter = parseFrontmatter(markdown);
    const explicitTags = extractBullets(sectionByNames(markdown, ['Tag Pembelajaran'])).map(normalizeTag).filter(Boolean);
    const explicitTakeaways = extractBullets(sectionByNames(markdown, ['Pelajaran Inti', 'Catatan Penting', 'Pembelajaran Hari Ini']));
    const summarySection = sectionByNames(markdown, ['Ringkasan Materi', 'Kesimpulan', 'Ringkasan Hari Ini', 'Evaluasi Emosi dan Kesalahan']);
    const summary = firstMeaningfulSentences(summarySection, 2).join(' ');
    const inferredTags = inferTagsFromText(`${markdown}\n${(item.tags || []).join(' ')}`);
    const tags = Array.from(new Set([
      ...((Array.isArray(frontmatter.tags) ? frontmatter.tags : []).map(normalizeTag).filter(Boolean)),
      ...explicitTags,
      ...((item.tags || []).map(normalizeTag).filter(Boolean)),
      ...inferredTags
    ])).filter(Boolean);
    const takeaways = explicitTakeaways.length
      ? explicitTakeaways.slice(0, 5)
      : [
          ...firstMeaningfulSentences(sectionByNames(markdown, ['Catatan Penting']), 3),
          ...firstMeaningfulSentences(sectionByNames(markdown, ['Pembelajaran Hari Ini']), 2)
        ].filter(Boolean).slice(0, 5);
    const category = tags[0] || 'review';
    const priorities = derivePriorities(tags, summary || '', takeaways || []);
    return {
      ...item,
      tags,
      topic: frontmatter.learning_topic || frontmatter.topic || deriveTopic(item, tags, takeaways),
      summary: summary || 'Pelajaran diambil otomatis dari isi jurnal ini.',
      takeaways: takeaways.length ? takeaways : ['Buka jurnal sumber untuk melihat detail pembelajaran lengkap.'],
      category,
      categoryLabel: formatCategoryLabel(category),
      priorities,
      priorityLabels: priorities.map(formatPriorityLabel),
      readerUrl: readerUrl(item.path),
      learnUrl: learnUrl(item.path),
      githubUrl: githubBlob(item.path)
    };
  }

  async function loadLearningItems(options = {}) {
    const force = Boolean(options.force);
    const cacheKey = 'my-jurnal-trading:learning:v3';
    if (!force) {
      const cached = readCache(cacheKey);
      if (cached) return cached;
    }

    const catalog = await loadTradeCatalog({ force });
    const items = [];
    for (const item of catalog) {
      try {
        const markdown = await fetchTradeMarkdown(item.path, { force });
        items.push(buildLearningItem(item, markdown));
      } catch (_) {
        items.push({
          ...item,
          tags: item.tags || [],
          topic: `Pelajaran dari ${item.title}`,
          summary: 'Jurnal ada di repo, tetapi detail pelajaran belum berhasil dimuat saat ini.',
          takeaways: ['Buka jurnal sumber untuk membaca isi lengkapnya.'],
          category: 'review',
          categoryLabel: 'Review',
          priorities: ['watch'],
          priorityLabels: ['Perlu dipantau'],
          readerUrl: readerUrl(item.path),
          learnUrl: learnUrl(item.path),
          githubUrl: githubBlob(item.path)
        });
      }
    }
    items.sort(sortTradeItems);
    writeCache(cacheKey, items);
    return items;
  }

  function escapeHtml(value) {
    return String(value || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  function markdownToHtml(markdown) {
    const lines = String(markdown || '').replace(/\r/g, '').split('\n');
    let html = '';
    let inList = false;
    const closeList = () => {
      if (inList) {
        html += '</ul>';
        inList = false;
      }
    };

    lines.forEach(rawLine => {
      const line = rawLine.trim();
      if (!line) {
        closeList();
        return;
      }
      if (line === '---') {
        closeList();
        html += '<hr>';
        return;
      }
      if (line.startsWith('### ')) {
        closeList();
        html += `<h3>${escapeHtml(line.slice(4))}</h3>`;
        return;
      }
      if (line.startsWith('## ')) {
        closeList();
        html += `<h2>${escapeHtml(line.slice(3))}</h2>`;
        return;
      }
      if (line.startsWith('# ')) {
        closeList();
        html += `<h1>${escapeHtml(line.slice(2))}</h1>`;
        return;
      }
      if (line.startsWith('- ')) {
        if (!inList) {
          html += '<ul>';
          inList = true;
        }
        html += `<li>${escapeHtml(line.slice(2))}</li>`;
        return;
      }
      closeList();
      html += `<p>${escapeHtml(line)}</p>`;
    });

    closeList();
    return html;
  }

  window.TradingJournalSite = {
    REPO_OWNER,
    REPO_NAME,
    REPO_BASE,
    BRANCH,
    githubBlob,
    rawUrl,
    readerUrl,
    learnUrl,
    loadTradeCatalog,
    fetchTradeMarkdown,
    loadLearningItems,
    markdownToHtml,
    formatCategoryLabel,
    formatPriorityLabel,
    categoryLabels: CATEGORY_LABELS,
    priorityLabels: PRIORITY_LABELS,
    fallbackJournals: FALLBACK_JOURNALS
  };
})();
