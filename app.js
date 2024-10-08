var express = require('express');
var indexRouter = require('./routes/index');

const app = express();
const port = 3000;

app.use('/', indexRouter);


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

module.exports = app;
