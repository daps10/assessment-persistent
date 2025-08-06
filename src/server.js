const app = require("./app");
const PORT = process.env.PORT || 3000;
const { startScheduler } = require('./services/scheduler')

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

startScheduler();