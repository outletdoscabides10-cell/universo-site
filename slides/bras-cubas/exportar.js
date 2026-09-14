#!/usr/bin/env node
/**
 * Exporta slide.html para PNG/JPG em resolução exata, via Chrome DevTools Protocol.
 * Uso:  node exportar.js            (gera os 4 arquivos em export/)
 * Requer um Chrome/Chromium headless. Ajuste CHROME se necessário.
 */
const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

const CHROME = process.env.CHROME_BIN
  || '/opt/pw-browsers/chromium-1194/chrome-linux/chrome';

const BASE = 'file://' + path.join(__dirname, 'slide.html');
const OUT = path.join(__dirname, 'export');

// scale = deviceScaleFactor sobre o palco de 1280x720.
// 1 -> 1280x720 | 1.5 -> 1920x1080 | 3 -> 3840x2160
// Troque format/quality para 'png' se precisar de PNG sem perda.
const jobs = [
  { url: BASE,              out: 'bras-cubas-16x9-exemplo-3840.jpg', scale: 3, format: 'jpeg', quality: 93 },
  { url: BASE + '?limpo=1', out: 'bras-cubas-16x9-fundo-3840.jpg',   scale: 3, format: 'jpeg', quality: 93 },
  { url: BASE,              out: 'previa-1280.jpg',                  scale: 1, format: 'jpeg', quality: 86 },
];

const sleep = ms => new Promise(r => setTimeout(r, ms));

(async () => {
  fs.mkdirSync(OUT, { recursive: true });
  const port = 9333 + Math.floor(Math.random() * 200);
  const chrome = spawn(CHROME, [
    '--headless=new', '--no-sandbox', '--disable-gpu', '--hide-scrollbars',
    '--disable-dev-shm-usage', `--remote-debugging-port=${port}`, 'about:blank',
  ], { stdio: 'ignore' });

  let ver;
  for (let i = 0; i < 60 && !ver; i++) {
    try { ver = await (await fetch(`http://127.0.0.1:${port}/json/version`)).json(); }
    catch { await sleep(250); }
  }
  if (!ver) throw new Error('Chrome headless não iniciou');

  const ws = new WebSocket(ver.webSocketDebuggerUrl);
  await new Promise(r => ws.addEventListener('open', r, { once: true }));

  let id = 0;
  const pending = new Map();
  ws.addEventListener('message', e => {
    const m = JSON.parse(e.data);
    if (m.id && pending.has(m.id)) { pending.get(m.id)(m); pending.delete(m.id); }
  });
  const send = (method, params = {}, sessionId) => new Promise(res => {
    const myId = ++id;
    pending.set(myId, res);
    ws.send(JSON.stringify({ id: myId, method, params, ...(sessionId ? { sessionId } : {}) }));
  });

  const { result: { targetId } } = await send('Target.createTarget', { url: 'about:blank' });
  const { result: { sessionId } } = await send('Target.attachToTarget', { targetId, flatten: true });
  await send('Page.enable', {}, sessionId);

  for (const job of jobs) {
    // 1280x720 é o palco lógico; deviceScaleFactor define a resolução final
    await send('Emulation.setDeviceMetricsOverride',
      { width: 1280, height: 720, deviceScaleFactor: job.scale, mobile: false }, sessionId);
    await send('Page.navigate', { url: job.url }, sessionId);
    for (let i = 0; i < 80; i++) {
      const r = await send('Runtime.evaluate', {
        expression: `document.readyState==='complete' && document.fonts.status==='loaded'`,
        returnByValue: true,
      }, sessionId);
      if (r.result?.result?.value) break;
      await sleep(100);
    }
    await sleep(600); // deixa os filtros SVG (textura) assentarem
    const shot = await send('Page.captureScreenshot', {
      format: job.format || 'png',
      ...(job.quality ? { quality: job.quality } : {}),
      captureBeyondViewport: false, fromSurface: true,
    }, sessionId);
    const dest = path.join(OUT, job.out);
    fs.writeFileSync(dest, Buffer.from(shot.result.data, 'base64'));
    console.log('gerado:', path.relative(process.cwd(), dest));
  }

  ws.close();
  chrome.kill();
})().catch(e => { console.error(e); process.exit(1); });
