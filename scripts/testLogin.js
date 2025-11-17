(async () => {
  try {
    const res = await fetch('http://localhost:3333/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email_usuario: 'lilvhx@etec.sp.gov.br', senha_usuario: '93640205Vv@' }),
    });
    console.log('STATUS', res.status);
    const t = await res.text();
    try { console.log(JSON.parse(t)); } catch(e) { console.log(t); }
  } catch (e) {
    console.error('Request failed', e);
    process.exit(1);
  }
})();
