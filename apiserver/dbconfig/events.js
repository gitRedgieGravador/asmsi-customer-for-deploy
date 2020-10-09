const mysql = require('mysql');
const MySQLEvents = require('@rodrigogs/mysql-events');
const ora = require('ora'); // cool spinner
const spinner = ora({
    text: '\n.....Watch to database events is active.....\n',
    color: 'blue',
    spinner: 'dots2'
});

const myconn = require('./mysql').connection;

const program = async() => {
    const connection = myconn
    const instance = new MySQLEvents(connection, {
        startAtEnd: true
    });

    await instance.start();

    instance.addTrigger({
        name: 'monitoring all statments',
        expression: 'thesis.*', // listen to thesis database !!!
        statement: MySQLEvents.STATEMENTS.ALL, // MySQLEvents.STATEMENTS.INSERT for INSERT ONLY
        onEvent: e => {
            console.log(e);
            spinner.succeed(' _EVENT_ ');
            spinner.start();
        }
    });

    instance.on(MySQLEvents.EVENTS.CONNECTION_ERROR, console.error);
    instance.on(MySQLEvents.EVENTS.ZONGJI_ERROR, console.error);
};

program()
    .then(spinner.start.bind(spinner))
    .catch(console.error);