const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')

const app = express();
const port = 3000;
app.use(express.json());
app.use(cors())

const admin = {
    email: 'admin@crms.com',
    password: 'admin',
};

const TOKEN = 'SuperSecretToken';

const users = [];

app.post('/admin/login', (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        res.status(404);
        res.send('Bad Request');
    }

    if (email === admin.email && password === admin.password) {
        res.json({
            token: TOKEN,
        });
    } else {
        res.status(401);
        res.send('Unauthorized');
    }
});

app.post('/admin/users', (req, res) => {
    const { token } = req.body;

    console.log(req.body)

    // Sanity check
    if (!token) {
        res.status(404);
        res.send('From admin users Bad Request');
    } else if (token !== TOKEN) {
        res.status(401);
        res.send('Unauthorized');
    } else {
        res.json({ users: users });
    }
});

app.post('/signup', (req, res) => {
    const { email, password } = req.body;

    // Sanity check
    if (!email || !password) {
        res.status(404);
        res.send('Bad Request');
    }

    // Existing user check
    const existingUser = users.filter((user) => {
        return user.email === email;
    });

    if (existingUser.length > 0) {
        res.status(404);
        res.send('Email already registered');
    } else {
        users.push({ email: email, password: password });
        console.log(users);

        res.send('User registered successfully');
    }
});

app.get('/', (req, res) => {
    res.send('Welcome to CRMS');
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
