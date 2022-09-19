const express = require('express')
const app = express()

const admin = require('firebase-admin')
const credentials = require("./key_1.json")

admin.initializeApp({
    credential:admin.credential.cert(credentials)

})

const db = admin.firestore();

app.use(express.json());

app.use(express.urlencoded({extended:true}))

app.post("/create",async(req,res)=>{
    try{
        const id = req.body.email;
        const userJson = {
            email: req.body.email,
            firstName :req.body.firstName,
            lastName :req.body.lastName
        };
        const response = await db.collection("users").add(userJson);
        res.send(response);
    }catch(error){
        res.send(error);
    }
});

app.get("/read/all",async(req,res) => {
    try{
        const usersRef = db.collection("users");
        const response = await usersRef.get();
        const responseArr = [];
        response.forEach(doc =>{
            responseArr.push(doc.data());
        });
        res.send(responseArr);
   }catch(error){
        res.send(error);
   }
})

app.get("/read/:id",async(req,res)=>{
    try{
        const usersRef = db.collection("users").doc(req.params.id);
        const response = await usersRef.get();
        res.send(response.data())
    }catch(error){
        res.send(error);
    }
});

app.post("/update",async(req,res)=>{
    try{
        const id = req.body.id;
        const newFirstName = "Sainadh";
        const usersRef = await db.collection("users").doc(id)
        .update({
            firstName:newFirstName
        });
        res.send(response.data())
    }catch(error){
        res.send(error)
    }
});

app.post("/delete/:id",async(req,res)=>{
    try{
        const response = req.params.id;
        const usersRef  = await db.collection("users").doc(response).delete()
        res.send(usersRef)

    }catch(error){
        res.send(error)
    }

})

const PORT = process.env.PORT || 8383;
app.listen(PORT,()=>{
    console.log("I am working on the port")

})