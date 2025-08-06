# Mini Payment Gateway & Subscription Billing Simulator

This Node.js project simulates a basic payment gateway proxy and subscription billing system. It includes risk analysis and monthly background processing.

## Features

### 1. Subscription Management
- Subscriptions stored in memory (`subscriptions.js`)
- Fields include:
  - `donorId`, `amount`, `currency`, `campaignDescription`
  - `isActive`, `interval`, `email`, `lastChargedAt`

### 2. Monthly Batched Processing
- Background job (`batchProcessor.js`) runs every 10 seconds (can simulate daily/hourly)
- For each active **monthly** subscription, if 1 month has passed since `lastChargedAt`:
  - Charges the amount
  - Logs a transaction
  - Updates `lastChargedAt`

### 3. Transaction Log
- In-memory list stored in `transactions.js`
- Each transaction includes:
  - `transactionId`, `donorId`, `amount`, `currency`, `timestamp`, `status`, `message`

### 4. Risk Explanation (Optional)
- `generateRiskExplanation()` analyzes:
  - If amount > 1000: flagged as high
  - Suspicious email domains like `.ru`, `test.com`

## Running the App

1. Clone the repo
2. Install dependencies (if using UUID):
   ```bash
   npm install uuid
   ```
3. Start the batch processor:
   ```bash
   node batchProcessor.js
   ```

## Example Output

```
Charged 1500 USD for donor abc123
```

## Files

- `subscriptions.js` - Subscription data
- `transactions.js` - Transaction logs
- `schedular.js` - Background job processor
- `generateRiskExplanation.js` - (optional) Risk reason generator
