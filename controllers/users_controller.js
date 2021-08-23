const User = require('../models/user');



module.exports.profile = function(req, res){
    return res.render('user_profile', {
        title: 'User Profile'
    })
}

// render the signup page
module.exports.signUp = function(req,res){
    res.render('user_sign_up',{
        title:"Codeial || sign-Up"
    })
}


// render the signin page 
module.exports.signIn = function(req,res){
    res.render('user_sign_in',{
        title:"Codeial || sign-Ip"
    })
}


//get the signup data
module.exports.create = function(req,res){
    if(req.body.password!=req.body.confirm_password){
        return res.redirect('back');
    }
    User.findOne({email:req.body.email},function(err,user){
        if(err){console.log('error in finding the user in signup'); return;}
    

    if(!user){
        User.create(req.body,function(err,user){
            if(err){
                console.log('error in creating the user in signup');
                return;
            }
        });
        return res.redirect('/users/sign-in');
    }else{
        return res.redirect('back');

    }
     });
}

// creating session using signin for the user
module.exports.createSession = function(req,res){

    User.findOne({email:req.body.email,})


    
}