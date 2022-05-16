const app = require('./app')

const port = 3000;
app.listen(port, (error) => {
    error ? console.log(error) : console.log(`Server listens http://localhost:${port}`);
});

// done