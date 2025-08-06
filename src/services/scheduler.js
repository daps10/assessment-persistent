
const { subscriptions, transactions } = require('../store');
const { v4: uuidv4 } = require("uuid");

function isOneMonthPassed(lastDateStr) {
  const lastDate = new Date(lastDateStr);
  const now = new Date();
  return now.getTime() - lastDate.getTime() >= 30 * 24 * 60 * 60 * 1000; // ~30 days
}


function startScheduler() {
  setInterval(() => {
    const now = new Date().toISOString();
    Object.values(subscriptions).forEach(sub => {
      if (!sub.isActive || sub.interval !== "monthly") return;
      if (!isOneMonthPassed(sub.createdAt)) {
        console.log(`Skipping donor ${sub.donorId}, not a full month yet.`);
        return;
      }

      const tx = {
        transactionId: uuidv4(),
        donorId: sub.donorId,
        amount: sub.amount,
        currency: sub.currency,
        status: 'success',
        timestamp: now,
        interval: "monthly",
        message: `Charged ${sub.amount} ${sub.currency} for donor ${sub.donorId}`
      }
      transactions.push(tx);
      sub.createdAt = now;
      console.log(`[${now}] Charged ${sub.email} ${sub.amount} ${sub.currency}`);
    });

  }, 30 * 1000); // every 30 mins
}

module.exports = { startScheduler }