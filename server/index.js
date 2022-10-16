const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors');
const app = express();

const AnnounceModel = require("./models/Announcement");
const TalkModel = require("./models/TalkToUs");
const ReviewModel = require("./models/Review");
const AdminModel = require("./models/manageAdmin");
const AnalyticsModel = require("./models/ForAnalytics");

app.use(express.json());
app.use(cors());

mongoose.connect(
    "mongodb+srv://admin:admin123@cluster0.u5hncyq.mongodb.net/announce?retryWrites=true&w=majority", //Link for Mongo DB, .net/announce yung DB name
{
    useNewUrlParser: true,
});

//route for inserting data used for analytics
app.post('/analyticsdata', (req , res) =>{
    const data = req.body;
    const newAnalyticsModel = new AnalyticsModel(data);

    newAnalyticsModel.save((error) =>{
        if (error) {
            res.status(500).json({ msg: 'Sorry, internal server errors' });
            return;
        }
        // Inquiry
        return res.json({
            msg: 'Your data has been saved!!!!!!'
        });
    });
});

//route for getting analytics data and count for talk to us

app.get('/readanalytics', (req , res) =>{
    
    AnalyticsModel.aggregate([
        {
            $match: { source : "Talk to Us"},
        },
        //count not appearing
        {
            $group: {
                _id: '$date',
                count : {$sum : 1}
        }}]
    ).then((result) => {
        console.log('result: ', result);
        res.send(result);
    })
    .catch((error)=>{
        console.log('error: ', dataerror);
    }) 
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

app.post('/insertAdmin', async (req, res) => {
    const email = req.body.email;
    const office = req.body.office;

    const admin = new AdminModel({email: email, office: office});

    try {
        await admin.save();
        res.send("inserted data");
    } catch(err) {
        console.log(err)
    }
});

app.get('/readAdmin', async (req, res) => {
    AdminModel.find(/*{ $where: {title: "Testing 1"}} */{}, (err, result) =>{
        if (err) {
            res.send(err);
        }

        res.send(result);
    })
});

app.get("/readAdminLogin/:email", async (req, res) => {
    const email = req.params.email;
    AdminModel.findOne({ email: email} , (err, result) =>{
        if (err) {
            res.send("False");
        }else{

            res.send(result);
        }

    })
}); 

app.delete("/deleteAdmin/:id", async (req, res) => {
    const id = req.params.id;
    
    await AdminModel.findByIdAndRemove(id).exec();
    res.send("deleted");
});

app.listen(3001, () => {
    console.log("Server running on port 3001...");
});