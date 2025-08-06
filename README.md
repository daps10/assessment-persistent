
# Mini Payment Gateway Proxy & Subscription Billing Simulator

This project simulates a minimal payment processing and recurring billing system with LLM integration to explain decisions and summarize campaigns.

## Features

### 1. Charge API (`/charge`)
- **POST /charge**
  - Simulates a fraud risk score (0 to 1) using heuristics (e.g., high amount, suspicious domain).
  - If riskScore < 0.5 → routes to Stripe or PayPal randomly.
  - If riskScore ≥ 0.5 → blocks the payment.
  - Uses LLM to generate a human-readable explanation.
  - Stores transaction with metadata in memory.
- **GET /transactions**
  - Retrieves all stored transactions.

### 2. Subscriptions API (`/subscriptions`)
- **POST /subscriptions**
  - Creates a recurring subscription for a donor.
  - Calls LLM to:
    - Tag the campaign.
    - Summarize the campaign.
  - Stores all subscriptions in memory.
- **DELETE /subscriptions/:donorId**
  - Cancels a subscription.
- **GET /subscriptions**
  - Lists all active subscriptions.
- **GET /donation-history**
  - Lists all simulated donation transactions.

### 3. Daily/Batched Processing
- A background job runs on a simulated daily interval (e.g., every 30 mins in dev mode).
- It charges all active subscriptions whose next billing date has passed.
- Generates new transactions and logs them.

## Tech Stack
- Node.js
- Express
- In-memory storage
- Docker (optional)

## Getting Started

### Installation
```bash
npm install
```

### Run the App
```bash
npm start
```


## Example Usage

### Charge
```http
POST /charge
Content-Type: application/json

{
  "amount": 1200,
  "email": "user@test.com",
  "currency": "USD"
}
```

### Subscription
```http
POST /subscriptions
Content-Type: application/json

{
  "amount": 1000,
  "currency": "USD",
  "source": "tok_test",
  "email": "donor@example.com",
  "interval": "monthly",
  "campaignDescription": "Emergency relief for flood victims in Assam"
}
```

## License
MIT

---

_This project simulates real-world payment scenarios and should not be used in production._
