import express from 'express';

const studentRoute = express.Router();

studentRoute.get('/profile-setup', (req, res) => {
  res.send('Hello World!');
});

export default studentRoute;
