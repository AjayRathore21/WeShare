const User = require('../models/user');



module.exports.profile = function(req, res){
    User.findById(req.params.id,function(err,user){
        if(err){return console.log('error in finding the user');}
        return res.render('user_profile', {
            title: 'User Profile',
            profile_user: user
        })
    })
    
}

module.exports.update = function(req,res){
    if(req.user.id == req.params.id){
        User.findByIdAndUpdate(req.params.id,req.body,function(err,user){
            if(err){return console.log('error in updating the user');}
            return res.redirect('back');
        });
    }else{
        return res.status(401).send('unauthorized');
    }

}

// render the signup page
module.exports.signUp = function(req,res){
    if(req.isAuthenticated()){
      return  res.redirect('/users/profile');
    }
    res.render('user_sign_up',{
        title:"Codeial || sign-Up"
    })
}


// render the signin page 
module.exports.signIn = function(req,res){
    if(req.isAuthenticated()){
      return  res.redirect('/users/profile'); 
    }
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

   return res.redirect('/');

    
}

// deleting the session-cookie for sign out
module.exports.destroySession = function(req,res){   // #### req.logout hotaa h keep it in mind not res.logout()
    req.logout();  //passport.js is having this function  
    return res.redirect('/');
}