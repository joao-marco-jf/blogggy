import app from './app/index.js';

const port = process.env.PORT || '3000';

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  console.log(`http://localhost:3000`)
});