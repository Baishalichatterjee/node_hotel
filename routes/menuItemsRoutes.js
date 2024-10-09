const express = require('express');
const router = express.Router();
const MenuItem = require('./../Menu');
const { model } = require('mongoose');
router.post('/',async(req,res)=>{
    try {
    const item = req.body;
    const newMenu = new MenuItem(item);
    const response = await newMenu.save();
    console.log('data saved');
    res.status(200).json(response);
    } catch (error) {
        console.log(error);
        res.status(500).json({error:'Internal server error'});
    }
})
router.get('/',async(req,res)=>{
    try {
        const data = await MenuItem.find();
        console.log('data fetched successfully.');
        res.status(200).json(data);
    } catch (error) {
        console.log(error);
        res.status(500).json({error:'Internal server error'});
    }
})
router.get('/:tastetype',async(req,res)=>{
    try {
        const tastetype = req.params.tastetype;
        if(tastetype == 'sweet' || tastetype=='spicy' || tastetype=='sour'){
            const response = await MenuItem.find({taste:tastetype});
            console.log('data fetched');
            res.status(200).json(response);
        }else{
            res.status(400).json({error:'Invalid tastetype'});
        }
    } catch (error) {
       console.log(error);
       res.status(400).json({error:'Internal server error'}); 
    }
})

router.put('/:id',async(req,res)=>{
    try {
       const menulist = req.params.id;
       const updatedMenuList = req.body;
       const response = await MenuItem.findByIdAndUpdate(menulist,updatedMenuList,{
        new:true,
        runValidators:true,
       })
       if(!response){
        res.status(404).json('Menu not found');
       }
       console.log('Data updated succesfully');
       res.status(200).json(response);
    } catch (error) {
       console.log(error);
       res.status(404).json({error:'Internal Server Error'}); 
    }
})

router.delete('/:id',async(req,res)=>{
    try {
        const MenuList = req.params.id;
        const response =  await MenuItem.findByIdAndDelete(MenuList);
        if(!response){
            res.status(404).json('Menu item is not found');
        }
        console.log('Data deleted succesfully');
        res.status(200).json(response);
    } catch (error) {
       console.log(error);
       res.status(404).json({error:'Internal Server Error'}); 
    }
})

module.exports = router;