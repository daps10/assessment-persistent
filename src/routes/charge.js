const express = require("express");
const { evaluateRisk } = require("../services/fraudEvaluator");
const { transactions } = require("../store");
const { generateRiskExplanation } = require("../services/llm");
const router = express.Router();


router.post("/charge", (req, res) => {
  const { amount, email, currency, source } = req.body;

  if (!amount || !email || !currency || !source) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const riskScore = evaluateRisk(email, amount);
  const explanation = generateRiskExplanation(riskScore, email, amount);
  const timestamp = new Date().toISOString();

  if (riskScore >= 0.5) {
    const blockTx = { email, amount, status: 'Blocked', riskScore, explanation, timestamp };
    transactions.push(blockTx);
    return res.status(403).json(blockTx);
  }
  const provider = riskScore < 0.3 ? 'stripe' : 'payPal';
  const transactionId = `txn_${Math.random().toString(36).substring(2, 9)}`;
  const tx = {
    transactionId,
    email,
    amount,
    provider,
    status: 'success',
    riskScore,
    explanation,
    timestamp
  }

  transactions.push(tx);
  res.json(tx);
});

router.get('/transactions', (req, res) => {
  res.json(transactions);
})

module.exports = router;