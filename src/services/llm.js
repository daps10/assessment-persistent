function generateRiskExplanation(riskScore, email, amount) {
  const reasons = [];
  if (amount > 1000) reasons.push("Amount is too high");
  if (email.endsWith(".ru") || email.endsWith('test.com')) reasons.push("Email domain is suspicious");

  return `This payment was ${riskScore < 0.5 ? "routed" : "blocked"} due to ${reasons.join(" and ")}`;
}

function generateTags(description) {
  const tags = [];
  if (/earthquake|flood|disaster/i.test(description)) tags.push('disaster relief');
  if (/Nepal|India|Africa/i.test(description)) tags.push('region');

  return tags;
}

function summarizeCompaign(description) {
  return `Compaign: ${description.slice(0, 60)}...`;
}

module.exports = {
  generateRiskExplanation,
  generateTags,
  summarizeCompaign
};