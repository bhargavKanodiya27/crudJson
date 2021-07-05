let express = require('express');
let router = express.Router();
let {addUser,updateUser,deleteUser,getUser} = require('./controller');
router.post('/addUser',addUser);
router.post('/updateUser',updateUser);
router.post('/deleteUser',deleteUser);
router.get('/getUser/:id',getUser); 
module.exports=router;