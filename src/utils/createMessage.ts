// why default
// what if there are more classes

export default class Messenger{

    port: Number;

    constructor(passedPort: Number){
        this.port = passedPort;
    }

    messagePrint(){
        return `Node server has started and is running on ${this.port}`;
    }

}