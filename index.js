const express = require('express')
const app = express()
const port = 3000

// routing
app.get('/', (req, res) => {
  res.send('Hello World!')
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});

// dynamic routing
app.get('/about', (req, res) => {
  res.send('Ini web tentang saya')
});
