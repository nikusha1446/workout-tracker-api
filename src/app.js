import express from 'express';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3000;

// middleware
app.use(cors());
app.use(express.json());

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
  });
});

// error handler
app.use((err, req, res, next) => {
  res.status(500).json({
    success: false,
    message: 'Something went wrong. Please try again',
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
