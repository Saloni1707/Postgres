import express from 'express';
import { Client } from "pg";

const app = express();
app.use(express.json());

const pgClient = new Client("postgresql://neondb_owner:GeskQpb68MNL@ep-snowy-term-a591rx9b.us-east-2.aws.neon.tech/neondb?sslmode=require");
pgClient.connect();

console.log("the backend is connected");


app.post("/signup",async(req,res) => {
    const username = req.body.username;
    const password = req.body.password;
    const email = req.body.email;
    try{
        //const insertQuery = `INSERT INTO users (username ,email ,password) VALUES ('${username}','${password}','${email}');`
        //const response = await pgClient.query(insertQuery);
        //to avoid the sql injection we use this approach -
        const insertQuery = `INSERT INTO users (username,email,password) VALUES ($1,$2,$3);`
        const response = await pgClient.query(insertQuery,[username,email,password]);
        res.json({
            message:"You have signed up !"
        })
    }catch(e){
        res.json({
            message:"Error while signing up"
        })
    }
    
})

app.listen(3000);