const express = require('express');
const router = express.Router();
const person = require('./../person');
const { model } = require('mongoose');
router.post('/',async(req,res)=>{
    try {
       const data = req.body; //Assuming the request body contains the person data

       //create a new person document using the Mongoose model
       const newPerson = new person(data);

       //save the new person to the database
       const response  = await newPerson.save();
       console.log('data saved');
       res.status(200).json(response);

    } catch (error) {
       console.log(error);
       res.status(500).json({error:'Internal server error'});
    }
})
router.get('/',async(req,res)=>{
    try {
        const data = await person.find();
        console.log('data fetched successfully..');
        res.status(200).json(data);
    } catch (error) {
        console.log(error);
        res.status(500).json({error:'Internal server error'});
    }
})
router.get('/:workType',async(req,res)=>{
    try {
        const workType = req.params.workType;
        if(workType == 'chef' || workType == 'manager' || workType == 'waiter'){
            const response = await person.find({work : workType});
            console.log('data fetched');
            res.status(200).json(response);
        }else{
            res.status(400).json({error:'Invalid worktype'})
        }
    } catch (error) {
        console.log(error);
        res.status(400).json({error:'Internal server error'});
    }
})

router.put('/:id',async(req,res)=>{
    try {
       const personId = req.params.id;
       const updatedPersonData = req.body;
       const response = await  person.findByIdAndUpdate(personId,updatedPersonData,{
        new:true,
        runValidators:true,
       })
       if(!response){
        res.status(404).json({error:'Person not found'});
       }
       console.log('Data updated');
       res.status(200).json(response);
    } catch (error) {
       console.log(error);
       res.status(404).json({error:'Internal server error'}); 
    }
})

router.delete('/:id',async(req,res)=>{
    try {
        const personId = req.params.id;
        const response = await person.findByIdAndDelete(personId);
        if(!response){
            return res.status(404).json({error:'Person not found'});
        }
        console.log('Data deleted');
        res.status(200).json({message : 'Person Deleted Successfully'});   
    } catch (error) {
        console.log(error);
        res.status(404).json({error:'Internal server error'});
    }
    
})
module.exports = router;