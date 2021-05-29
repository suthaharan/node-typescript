import * as express from 'express';
import * as mongoose from 'mongoose';
import * as bodyParser from 'body-parser';
import routes from './src/routes/crmRoutes';
import messenger from './src/utils/createMessage';
import { Settings } from './settings';

const app = express();
const PORT:number= 3000;
let messages = new messenger(Settings.PORT);

const mUser: string = Settings.mUser;
const mPassword: string = Settings.mPassword;
const database:string = `mongodb://${mUser}:${mPassword}@cluster0.vaj7r.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

// mongoose connection
// mongoose.Promise = global.Promise;
mongoose.connect(database, {
    useMongoClient: true
});

// bodyparser setup
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

routes(app);

// serving static files
app.use(express.static('public'));

interface User{
    firstName: string,
}
const siteUser = (currentUser:User) => {
    return `Hello, ${currentUser.firstName} - `;
}
let passUser = {
    firstName: 'Rakita'
}

app.get('/', (req, res) =>
    res.send(messages.messagePrint())
);

app.listen(Settings.PORT, () =>
    console.log(siteUser(passUser), messages.messagePrint())
);