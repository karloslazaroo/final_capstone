const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors');
const app = express();

const AnnounceModel = require("./models/Announcement");
const TalkModel = require("./models/TalkToUs");
const ReviewModel = require("./models/Review");
const AdminModel = require("./models/manageAdmin");
const AnalyticsModel = require("./models/ForAnalytics");
const ChatbotModel = require("./models/Chatbot");
const FaqsModel = require("./models/FAQs");

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

//route for getting chatbot project id
app.get("/readBot/:mail", async (req, res) => {
    const mail = req.params.mail;
    ChatbotModel.findOne({ mail: mail} , (err, result) =>{
        if (err) {
            res.send("False");
        }else{

            res.send(result);
        }

    })
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
    const name = req.body.name;
    const email = req.body.email;
    const body = req.body.body;

    const announce = new AnnounceModel({title: title, body: body, name: name, email: email});

    try {
        await announce.save();
        res.send("inserted data");
    } catch(err) {
        console.log(err)
    }
});

app.get('/read', async (req, res) => {
    var mysort = {_id: -1};
    AnnounceModel.find(/*{ $where: {title: "Testing 1"}} */{}, (err, result) =>{
        if (err) {
            res.send(err);
        }

        res.send(result);
    }).sort(mysort);
});

app.get('/readContent/:email', async (req, res) => {
    var mysort = {_id: -1};
    const email = req.params.email;
    AnnounceModel.find({ email: email} , (err, result) =>{
        if (err) {
            res.send(err);
        }
        res.send(result);
    }).sort(mysort);
});

app.put('/update', async (req, res) => {
    const newTitle = req.body.newTitle;
    const newBody = req.body.newBody;
    const id = req.body.id;

    try {
        if(newTitle == "") {
            await AnnounceModel.findById(id, (err, updatedBody) => {
                updatedBody.body = newBody;
                updatedBody.save();
                res.send("update");
            });
        } if(newBody == "") {
            await AnnounceModel.findById(id, (err, updatedTitle) => {
                updatedTitle.title = newTitle;
                updatedTitle.save();
                res.send("update");
            });
        }
        
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
    const message = req.body.message;

    const talk = new TalkModel({name: name, email: email, message: message});

    try {
        await talk.save();
        res.send("inserted data");
    } catch(err) {
        console.log(err)
    }
});

app.get('/readTalk', async (req, res) => {
    var mysort = {_id: -1};
    TalkModel.find(/*{ $where: {title: "Testing 1"}} */{}, (err, result) =>{
        if (err) {
            res.send(err);
        }

        res.send(result);
    }).sort(mysort);
});

app.post('/insertReview', async (req, res) => {
    const name = req.body.name;
    const approval = req.body.approval;
    const message = req.body.message;
    const email = req.body.email;
    const review = new ReviewModel({name: name, approval: approval, message: message, email: email});

    try {
        await review.save();
        res.send("inserted data");
    } catch(err) {
        console.log(err)
    }
});

app.get('/readReview', async (req, res) => {
    var mysort = {_id: -1};
    ReviewModel.find(/*{ $where: {title: "Testing 1"}} */{}, (err, result) =>{
        if (err) {
            res.send(err);
        }

        res.send(result);
    }).sort(mysort);
});

app.get('/readReviewUser', async (req, res) => {
    var mysort = {_id: -1};
    ReviewModel.find({ approval: "Approve"} , (err, result) =>{
        if (err) {
            res.send(err);
        }

        res.send(result);
    }).sort(mysort);
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

app.delete("/deleteReview/:id", async (req, res) => {
    const id = req.params.id;
    
    await ReviewModel.findByIdAndRemove(id).exec();
    res.send("deleted");
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
    var mysort = {_id: -1};
    AdminModel.find(/*{ $where: {title: "Testing 1"}} */{}, (err, result) =>{
        if (err) {
            res.send(err);
        }

        res.send(result);
    }).sort(mysort);
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

app.post('/insertBot', async (req, res) => {
    const mail = req.body.mail;
    const projId = req.body.projId;
    const name = req.body.name;
    const time = req.body.time;

    const chatbot = new ChatbotModel({mail: mail, projId: projId,name: name, time: time});

    try {
        await chatbot.save();
        res.send("inserted data");
    } catch(err) {
        console.log(err)
    }
});

app.get('/readBot', async (req, res) => {
    var mysort = {_id: -1};
    ChatbotModel.find(/*{ $where: {title: "Testing 1"}} */{}, (err, result) =>{
        if (err) {
            res.send(err);
        }

        res.send(result);
    }).sort(mysort);
});

app.get("/readBots/:email", async (req, res) => {
    const mail = req.params.email;
    ChatbotModel.find({ mail: mail} , (err, result) =>{
        if (err) {
            res.send("False");
        }else{

            res.send(result);
        }

    })
});  

app.post('/insertFaqs', async (req, res) => {
    const question = req.body.question;
    const answer = req.body.answer;

    const faqs = new FaqsModel({question: question, answer: answer});

    try {
        await faqs.save();
        res.send("inserted data");
    } catch(err) {
        console.log(err)
    }
});

app.get('/readFaqs', async (req, res) => {
    var mysort = {_id: -1};
    FaqsModel.find(/*{ $where: {title: "Testing 1"}} */{}, (err, result) =>{
        if (err) {
            res.send(err);
        }

        res.send(result);
    }).sort(mysort);
});

app.put('/updateFaqs', async (req, res) => {
    const newQuestion = req.body.newQuestion;
    const newAnswer = req.body.newAnswer;
    const id = req.body.id;

    try {
        if(newQuestion == "") {
            await FaqsModel.findById(id, (err, updatedAnswer) => {
                updatedAnswer.answer = newAnswer;
                updatedAnswer.save();
                res.send("update");
            });
        } else {
            await FaqsModel.findById(id, (err, updatedQuestion) => {
                updatedQuestion.question = newQuestion;
                updatedQuestion.save();
                res.send("update");
            });
        }
        
    } catch(err) {
        console.log(err);
    }
});

app.delete("/deleteFaqs/:id", async (req, res) => {
    const id = req.params.id;
    
    await FaqsModel.findByIdAndRemove(id).exec();
    res.send("deleted");
});

app.delete("/deleteBot/:id", async (req, res) => {
    const id = req.params.id;
    
    await ChatbotModel.findByIdAndRemove(id).exec();
    res.send("deleted");
});

app.listen(3001, () => {
    console.log("Server running on port 3001...");
});