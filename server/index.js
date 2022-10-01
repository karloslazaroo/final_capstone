const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors');
const app = express();

const AnnounceModel = require("./models/Announcement");
const TalkModel = require("./models/TalkToUs");
const ReviewModel = require("./models/Review");

app.use(express.json());
app.use(cors());

mongoose.connect(
    "mongodb+srv://karloslazaroo:101400karlo@cluster0.0vb2pbu.mongodb.net/chatbot?retryWrites=true&w=majority", //Link for Mongo DB, .net/announce yung DB name
{
    useNewUrlParser: true,
});

app.post('/insert', async (req, res) => {
    const title = req.body.title;
    const body = req.body.body;

    const announce = new AnnounceModel({title: title, body: body});

    try {
        await announce.save();
        res.send("inserted data");
    } catch(err) {
        console.log(err)
    }
});

app.get('/read', async (req, res) => {
    AnnounceModel.find(/*{ $where: {title: "Testing 1"}} */{}, (err, result) =>{
        if (err) {
            res.send(err);
        }

        res.send(result);
    })
});

app.put('/update', async (req, res) => {
    const newTitle = req.body.newTitle;
    const id = req.body.id;

    try {
        await AnnounceModel.findById(id, (err, updatedTitle) => {
            updatedTitle.title = newTitle;
            updatedTitle.save();
            res.send("update");
        });
    } catch(err) {
        console.log(err);
    }
});

app.delete("/delete/:id", async (req, res) => {
    const id = req.params.id;
    
    await AnnounceModel.findByIdAndRemove(id).exec();
    res.send("deleted");
});

app.post('/insertTalk', async (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const phone = req.body.phone;
    const message = req.body.message;

    const talk = new TalkModel({name: name, email: email, phone: phone, message: message});

    try {
        await talk.save();
        res.send("inserted data");
    } catch(err) {
        console.log(err)
    }
});

app.get('/readTalk', async (req, res) => {
    TalkModel.find(/*{ $where: {title: "Testing 1"}} */{}, (err, result) =>{
        if (err) {
            res.send(err);
        }

        res.send(result);
    })
});

app.post('/insertReview', async (req, res) => {
    const name = req.body.name;
    const approval = req.body.approval;
    const message = req.body.message;

    const review = new ReviewModel({name: name, approval: approval, message: message});

    try {
        await review.save();
        res.send("inserted data");
    } catch(err) {
        console.log(err)
    }
});

app.get('/readReview', async (req, res) => {
    ReviewModel.find(/*{ $where: {title: "Testing 1"}} */{}, (err, result) =>{
        if (err) {
            res.send(err);
        }

        res.send(result);
    })
});

app.get('/readReviewUser', async (req, res) => {
    ReviewModel.find({ approval: "Approve"} , (err, result) =>{
        if (err) {
            res.send(err);
        }

        res.send(result);
    })
});

app.put('/updateReview', async (req, res) => {
    const newApproval = req.body.newApproval;
    const id = req.body.id;

    try {
        await ReviewModel.findById(id, (err, updatedApproval) => {
            updatedApproval.approval = newApproval;
            updatedApproval.save();
            res.send("update");
        });
    } catch(err) {
        console.log(err);
    }
});

app.put('/updateReviewDis', async (req, res) => {
    const newDisapproval = req.body.newDisapproval;
    const id = req.body.id;

    try {
        await ReviewModel.findById(id, (err, updatedDisapproval) => {
            updatedDisapproval.approval = newDisapproval;
            updatedDisapproval.save();
            res.send("update");
        });
    } catch(err) {
        console.log(err);
    }
});

app.listen(3001, () => {
    console.log("Server running on port 3001...");
});