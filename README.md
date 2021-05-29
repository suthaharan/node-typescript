# node-typescript
Enable NodeJS project with TypeScript

# Typescript references
* https://www.typescriptlang.org - TypeScript Website
* https://www.typescriptlang.org/play - TypeScript Experiment your Code/Syntax
* https://www.typescriptlang.org/tsconfig - TypeScript Config Settings Check

# Lessons to be learnt for Node => TypeScript (TS)
* *Initial Setup*
* *File Conventions*
* *Compiling TS Code*
* *Types and functions*
* *TypeScript Classes*
* *Enums in TypeScript*
* *Interface*
* *Generics*
* *Modules*
* *Declaration merging*
* *Iterators*
* *Decorators*

**Initial setup**
* Project has a basic NodeJS setup and a connection to mongodb (make sure to create a sandbox database on mongodb and an associated user with the needed privileges to read/write to the database)
* Install typescript to your system 
* Make sure to check if the hidden .babelrc file is there in the project root
* Test with .ts file to ensure that .ts gets converted to .js files
    * $ tsc sample.ts 


**File Conventions**
* Change all .js files to .ts
* VSCode will point to typescript based errors in file when you change the file extensions which you can easily find out from the code highlights

**Compiling TS Code**
* To run node project with typescript install ts-node globally
    * $ npm install -g ts-node
* Some of the node packages have their own implementation of types setup which needs to be installed in the project as well (as dev dependencies)
    * $ npm install --save-dev @types/body-parser @types/express @types/node @types/mongoose
* Setup tsconfig file to tell the compiler how to compile the code and where to generate the output
    * $ touch tsconfig.json


``` javascript
{
    "compilerOptions": {
        "outDir": "./dist",
        "moduleResolution": "node",
        "module": "CommonJS",
        "allowJs": true,
        "target": "ES6"
    },
    "include": [
      "./src/**/*",
      "index.ts"
    ]
}
```

Replace
```javascript
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "nodemon ./index.js --exec babel-node -e js"
  },
```
With ...
```javascript
  "scripts": {
    "build": "tsc --w",
    "start": "tsc && ts-node ./dist/index.js"
  },
```

Try running
* $ npm run build

**Types and functions**
* sometimes TS just gives warning and it can get compiled without halting the programs
* TS is for type check
* For variables declared in the programs whether it be integers, strings, arrays, objects - declare the type of the variables to ensure you don't have any surprise during code execution
``` javascript
const app = express();
const PORT:number= 3000;
const database:string = 'mongodb://username:userpassword@cluster0.vaj7r.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
```

Now, consider cleaning up the database string so you could prepare it for it to access this info from env variables. We will be using template string variable to form the database string.

```javascript
const mUser: string = "username";
const mPassword: string = "userpassword";
const database:string = `mongodb://${mUser}:${mPassword}@cluster0.vaj7r.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
```

**TypeScript Classes**
```javascript
app.get('/', (req, res) =>
    res.send(`Node and express server is running on port ${PORT}`)
);

app.listen(PORT, () =>
    console.log(`your server is running on port ${PORT}`)
);
```

What if we want to have some utilities or helper files to group together common messages/functions into classes ...

``` javascript
export default class Messenger{
    port: Number;
    constructor(passedPort: Number){
        this.port = passedPort;
    }
    messagePrint(){
        return `Node server has started and is running on ${this.port}`;
    }
}

// To call this in index.ts
import messenger from './src/utils/createMessage';
...

const PORT:number= 3000;
let messages = new messenger(PORT);

...
app.get('/', (req, res) =>
    res.send(messages.messagePrint())
);

app.listen(PORT, () =>
    console.log(messages.messagePrint())
);
```


**Enums in TypeScript**
* Enums are immutable and are quite useful for settings
* Enums are constants and can be strings/numbers

**Interface**
```javascript
interface User{
    firstName: string,
}
const siteUser = (currentUser:User) => {
    return `Hello, ${currentUser.firstName} - `;
}
let passUser = {
    firstName: 'Rakita'
}

app.listen(Settings.PORT, () =>
    console.log(siteUser(passUser), messages.messagePrint())
);

```
**Generics**

**Modules**

**Declaration merging**

**Iterators**

**Decorators**