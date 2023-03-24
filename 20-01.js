const express = require('express');
const contactRouter = require('./routers/contactRouter');
const hbs = require('express-handlebars').create({
    extname: '.hbs',
    helpers: {
        goBack: () => 'window.location.href = \'/\''
    }
});
const bodyParser = require('body-parser');



const app = express();

app.use(express.json());
app.engine('.hbs', hbs.engine);
app.set('view engine', '.hbs');

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use('/', contactRouter);


app.listen(3000, () => {
    console.log(`http://localhost:3000`);
  
});


