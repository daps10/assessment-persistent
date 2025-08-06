function generateRiskExplanation(riskScore, email, amount) {
  const reasons = [];
  if (amount > 1000) reasons.push("amount is too high");
  if (email.endsWith(".ru") || email.endsWith("test.com")) reasons.push("email domain is suspicious");

  const action = riskScore < 0.5 ? "routed" : "blocked";
  const reasonText = reasons.length > 0 ? ` due to ${reasons.join(" and ")}` : "";

  return `This payment was ${action}${reasonText}.`;
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