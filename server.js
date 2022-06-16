const app = require('./app');

const hostname = 'localhost';
const port = 8080;
app.listen(port, hostname, (error) => {
    error ? console.log(error) : console.log(`Server listens http://${hostname}:${port}`);
});