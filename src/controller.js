const path = require('path');
let fs= require('fs');
var jsonPath = path.join(__dirname, '..', 'dataset', 'users.json');
const addUser = async(req,res,next) =>{
    try{
        let {id,name,age}= req.body;
        
        let dataJson;
        fs.readFile(jsonPath,(err, data) =>{
            if(err) throw err
            dataJson=JSON.parse(data);
            dataJson.forEach(element => {
                if(element.id===id){
                    return res.status(500).send({is_error:true,message:"User id already exists"})
                }
            });
            var newObject = {id,name,age}
            dataJson.push(newObject)
            fs.writeFile(jsonPath,JSON.stringify(dataJson),(err, data) => {
                if(err) throw err
        
                return res.status(201).send({is_error:false,message:"User created successfully"})
            });
        });
    } catch(err){
        return res.status(500).send({is_error:true,message:err.message})
    }
    
}
const updateUser = async(req,res,next) =>{
    try{
        let {id,name,age}= req.body;
        fs.readFile(jsonPath,(err,data)=>{
            if(err) throw err;
        let parsedData = JSON.parse(data);
        let flagChanged=false;
        parsedData.forEach(element => {
            if(element.id===id){
                element.name= name;
                element.age= age;
                flagChanged=true;
            }
        });
        if(!flagChanged){
            var newObject = {id,name,age}
            parsedData.push(newObject)
            fs.writeFile(jsonPath,JSON.stringify(parsedData),(err, data)=>{
                if(err) throw err
            return res.status(201).send({is_error:false,message:"New User Created"})
            });
        }
        fs.writeFile(jsonPath,JSON.stringify(parsedData),(err, data)=>{
            if(err) throw err    
        return res.status(200).send({is_error:false,message:"User updated successfully"})
        });
    });
    } catch(err){
        return res.status(500).send({is_error:true,message:err.message})
    }
    
}
const deleteUser = async(req,res,next) =>{
    try{
        let {id}= req.body;
        fs.readFile(jsonPath,(err, data)=>{
       
        let parsedData = JSON.parse(data);
        let updatedData = parsedData.filter((item) => item.id !== id);
        if(parsedData.length == updatedData.length){
            return res.status(404).send({is_error:true,message:"User not found"})
        }
        fs.writeFile(jsonPath,JSON.stringify(updatedData),(err, data)=>{
        if(err) throw err     
        return res.status(201).send({is_error:false,message:"User deleted successfully"})
        });
             
    });
    } catch(err){
        return res.status(500).send({is_error:true,message:err.message})
    }
    
}
const getUser = async(req,res,next) =>{
    try{
        let {id}= req.params;
        fs.readFile(jsonPath,(err, data)=>{
        if (err) throw err
        let parsedData = JSON.parse(data);
        parsedData.forEach(element => {
            if(element.id==id){
                return res.status(201).send({is_error:false,data:element});
            }
        });
        return res.status(404).send({is_error:true,message:'No user found'})
    });
    } catch(err){
        return res.status(500).send({is_error:true,message:err.message})
    }
    
}
module.exports={addUser,updateUser,deleteUser,getUser}