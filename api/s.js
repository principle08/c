let BG = null;
const esc = v => String(v == null ? '' : v).slice(0, 24).replace(/[<>&"']/g, c => ({'<':'&lt;','>':'&gt;','&':'&amp;','"':'&quot;',"'":'&#39;'}[c]));
module.exports = async (req, res) => {
  if (!BG) {
    const r = await fetch('https://principle08.github.io/c/bg.jpg');
    BG = 'data:image/jpeg;base64,' + Buffer.from(await r.arrayBuffer()).toString('base64');
  }
  const q = req.query || {};
  const n = esc(q.n || '조선'), d = esc(q.d || '');
  const T = (x, y, s, extra) => `<text x="${x}" y="${y}"${extra || ''}>${s}</text>`;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 104" width="640" height="104" font-family="'Noto Sans KR','Malgun Gothic','Apple SD Gothic Neo',sans-serif" font-size="13" font-weight="bold" fill="#f2ead2">`
    + `<image href="${BG}" width="640" height="104"/>`
    + T(52, 44, n, ' text-anchor="middle" font-size="15"')
    + T(52, 66, d, ' text-anchor="middle" font-size="12" fill="#c9bfa0"')
    + T(136, 32, esc(q.a) + '%') + T(212, 32, esc(q.w) + '%')
    + T(292, 32, esc(q.c)) + T(368, 32, esc(q.m))
    + T(441, 32, `GDP ${esc(q.g)}조 · 성장 ${esc(q.r)}%`)
    + T(136, 76, esc(q.o) + '일') + T(212, 76, esc(q.s)) + T(288, 76, esc(q.p))
    + T(344, 76, `국고 ${esc(q.k)}조 · 부채 ${esc(q.b)}% · 실업 ${esc(q.u)}%`)
    + `</svg>`;
  res.setHeader('Content-Type', 'image/svg+xml; charset=utf-8');
  res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
  res.status(200).send(svg);
};
