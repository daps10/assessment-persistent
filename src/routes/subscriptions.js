const express = require('expresss');
const { subscriptions, transactions } = require('../store');
const { generateTags, summarizeCompaign } = require('../services/llm');

const router = express.Router();

router.post('/subscriptions', (req, res) => {
  const { amount, currency, source, email, campaignDescription } = req.body;

  if (!amount || !currency || !source || !email || !campaignDescription) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const donorId = `${email}-${Date.now()}`;
  const tags = generateTags(campaignDescription);
  const summary = summarizeCompaign(campaignDescription);

  subscriptions[donorId] = {
    donorId,
    email,
    amount,
    currency,
    source,
    campaignDescription,
    tags,
    summary,
    createdAt: new Date().toISOString(),
  }

  res.json(subscriptions[donorId]);
})


router.delete('/subscriptions/:donorId', (req, res) => {
  const { donorId } = req.params;
  if (subscriptions[donorId]) {
    delete subscriptions[donorId];
    return res.json({
      message: 'Subscription cancelled'
    })
  }

  res.status(404).json({ error: 'Not found' });
});

router.get('/subscriptions', (req, res) => {
  res.json(Object.values(subscriptions));
});


module.exports = router;
