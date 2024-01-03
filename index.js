import mongoose from "mongoose";
// import { MongoDBURL, PORT } from "./config.js";
import express, { request,response } from "express";
import cors from 'cors';
import { Group } from "./models/models.js";
import { MongoClient } from 'mongodb'
import dotenv from 'dotenv';
dotenv.config();

const uri =  process.env.MongoDBURL;
const client = new MongoClient(uri);

const connectDB = async () => {
    try {
      const conn = await mongoose.connect(process.env.MongoDBURL);
      console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
      console.log(error);
      process.exit(1);
    }
  }


const app = express();
const PORT = process.env.PORT || 5555;
app.use(cors()); //For Interacting different servers.
app.use(express.json()); //For Converting JSON String to JSON Object.

app.get('/',(response,request)=>{
    try {
        // response.status(200).send({
        //     error: "Successfully connected to the site."
        // });
        console.log('Successfully connected to the site.')
    } catch (error) {
        console.error(error);
        response.status(500).send({ error: 'Internal server error' });
    }
})


app.get('/api/listgroups', async(request,response)=>{
    try {
        // Use the find method to query the collection
        const databaseData = await Group.find();
        console.log(databaseData);
        //Send fetched data as a JSON response
        response.send(databaseData);

    } catch (error) {
        response.status(400).send({
            message: "Error in gettting the data"
        })
    }
})

// To save the data into the Database.
app.post('/api/addgroup',async(request,response)=>{
    try {
         // Step 1: Create an Instance of the Model
        const newGroup = new Group();

        // Step 2: Set the Model's Properties with Data from the Frontend
        newGroup.groupLink = request.body.link;
        newGroup.category = request.body.category;
        newGroup.groupName = request.body.groupName;

        // Step 3: Save the Model Instance to the Database
        const savedGroup = await newGroup.save();

        // Respond with the saved group data or a success message
        response.status(201).json(savedGroup);

        // console.log(savedGroup);
        
    } catch (error) {
        console.error(error);
        response.status(500).send({ error: 'Internal server error' });
    }
})
    



//Connecting to database
// mongoose.set('strictQuery', false);
// mongoose.connect(process.env.MongoDBURL)
//         .then(() => {
//             console.log('App connected to database');   
//             //Start the server
//             app.listen(PORT, ()=>{
//                 console.log(`Server is running on port ${PORT}`);
//             }) 
//         })
//         .catch((error)=>{
//             console.log('Error in Database');
//             console.log(error.message);
//             response.status(500).send({message: error.message});
//         })

//Connect to the database before listening
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log("listening for requests");
    })
})