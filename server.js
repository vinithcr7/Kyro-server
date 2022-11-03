const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());
require('dotenv').config();

mongoose.connect("mongodb+srv://vinith:rQtzwdBdZHnceiEG@cluster0.b4upvcl.mongodb.net/kyro?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("db connected"))
    .catch(() => console.error)

const User = require('./models/User');

app.get('/userinfo', async (req, res) => {
    const userinfo = await User.find();
    console.log(userinfo)
    res.json(userinfo)
});

app.post('/userinfo', (req, res) => {
    const userInfo = new User({
        data: req.body.data
    });
    userInfo.save();
    res.json(userInfo);
});

app.put('/userinfo/:id', async (req, res) => {
    let user = await User.find({ "_id": req.params.id });
    let changedAttr = req.body.data;
    if (user && user[0]) {
        let existingAttr = user[0].data
        changedAttr.forEach((attr) => {
            let existingObj = existingAttr.find((existing) => existing.id === attr.id);
            if (existingObj) {
                existingObj.value = attr.value;
            }
        })
        let updatedUser = await User.updateOne({ "_id": req.params.id }, { $set: { 'data': existingAttr } });
        res.json({
            status: "success"
        })
    }
})


app.listen(process.env.PORT || 3001, () => console.log("server started on port 30001"));