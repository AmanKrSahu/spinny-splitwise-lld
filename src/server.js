const app = require('./app');
const connectDB = require('./db/connection');
const PORT = process.env.PORT || 3000;

const startServer = async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`🚀 Server is listening on ${PORT}`);
  });
};

startServer();