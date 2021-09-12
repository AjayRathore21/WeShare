const User = require('../../../models/user');
const jwt = require('jsonwebtoken');

// sign in and create a session for the user
module.exports.createSession = async function(req, res){
    try{
        let user = await User.findOne({email:req.body.email});

        if(!user || user.password != req.body.password){

            return res.json(422,{
                message:'Invaild username or password',

            })
        }
        return res.json(422,{
            message:'Sign in successful, here is your token, please keep it safe',
            data:{
                token: jwt.sign(user.toJSON(),'codeial',{expiresIn:'100000'})
            }
        });

    }catch(err){
        return res.json(500,{
            messege:'internal server error'
        });

    }










    // req.flash('success', 'Logged in Successfully');
    // return res.redirect('/');
}
