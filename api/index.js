const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const LocalSrategy = require('passport-local').Strategy;


const app = express();
const port = 8000;
const cors = require('cors');
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(passport.initialize());
const jwt = require('jsonwebtoken');

mongoose.connect(
    "mongodb+srv://chatmate:shivamsheokand@cluster0.55bioyq.mongodb.net/",
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }
).then(() => {
    console.log('connect success');
}).catch((err) => {
    console.log('Connected Filed', err);
})

app.listen(port, () => {
    console.log('Server Running on port 8000');
})

const User = require('./models/user');
const Message = require('./models/message');


// function to the create token for the userid
const createToken = (userid) => {
    //set the token payload
    const payload = {
        userid: userid,
    };

    // Generate the token whit secret key and expiration time
    const token = jwt.sign(payload, "Q$r2K6W*n!jC%Zk", { expiresIn: "1h" });
    return token;
};

//end point for registration of the user

app.post('/register', (req, res) => {
    const { name, email, password, confirmpassword } = req.body;

    // create new user

    const newUser = new User({ name, email, password, confirmpassword })

    // save the user the Database
    newUser.save().then(() => {
        res.status(200).json({ message: "User register successfully" })
    }).catch((err) => {
        console.log('Error Registring');
        res.status(500).json({ message: "Error registring the user" })
    })
})


// end Points login in that particuler user

app.post('/login', (req, res) => {
    const { email, password } = req.body;

    // Check if the email and password are provided
    if (!email || !password) {
        return res.status(404).json({ message: "Email and Passwor are Required" })
    }

    // check for the user in the database
    User.findOne({ email }).then((user) => {
        if (!user) {
            //user not Found
            return res.status(404).json({ message: "User not Found" })
        }

        // compare the provided password with the user's password in the database
        if (user.password !== password) {
            return res.status(404).json({ message: "Invalid Password" })
        }

        const token = createToken(user._id);
        res.status(200).json({ token })
    }).catch((Err) => {
        console.log("error in finding in the user ", Err);
        res.status(500).json({ message: "Internal Server Error" })
    })
});