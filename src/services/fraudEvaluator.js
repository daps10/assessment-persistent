function evaluateRisk(email, amount) {
  let risk = 0;
  const suspiciousDomains = ['.ru', 'test.com'];
  if (amount > 1000) risk += 0.4;
  if (suspiciousDomains.some(domain => email.includes(domain))) risk += 0.3;

  return Math.min(risk, 1);
}

module.exports = {
  evaluateRisk,
};