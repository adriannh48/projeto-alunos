import app from './app';

const port = 3001;
app.listen(port, () => {
  console.log(`Aplicação iniciada ${port}`);
  console.log(`CTRL + clique em http://localhost:${port}`);
});
