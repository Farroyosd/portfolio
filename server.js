const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
dotenv.config();

const client = require('twilio')(process.env.DB_TWSID, process.env.DB_KEY);
const app = express();

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static(__dirname));
app.set('port', (process.env.PORT || 8080));

app.set('views', './views');

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    const data = {
        person: {
            firstName: 'Francisco',
            lastName: 'Arroyo',
        }
    }

    res.render('index', data);
});


// app.get('*', function (req, res) {
//     res.send('Whoops, page not found 404').status(404);
//   })

app.get('/SanDiegoCheckIn', function (req, res) {
    res.render('sdjs');
});

app.get('/DoorStopFood', function (req, res) {
    res.render('doorstopfood');
});

app.get('/MovieFinder', function (req, res) {
    res.render('moviefinder');
});

app.get('/WeatherApp', function (req, res) {
    res.render('weatherapp');
});

app.get('/TravelWise', function (req, res) {
    res.render('travelwise');
});

app.post('/thanks', (req, res) => {
    var userInfo = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        phoneNumber: req.body.phoneNumber,
        email: req.body.email,
        message: req.body.message
    }


    client.messages.create({
        to: "+16199852389",
        from: "+16196757230",
        body: '\n' + `Inquiry from: ${userInfo.firstName} ${userInfo.lastName}` + '\n' +
        `PhoneNumber: ${userInfo.phoneNumber}` + '\n' +
        `Email: ${userInfo.email}` + '\n' +
        `Message: ${userInfo.message}`,
    }, function (err, message) {
        console.log(message.sid);
    });
    res.render('thanks', { userInfo: req.body })
});

app.listen(app.get('port'), () => {
    console.log('listening at http://localhost:' + app.get('port'));
});