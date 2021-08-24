const Post = require('../models/post');

module.exports.create = function(req,res){
    console.log("inside the post create function", req.body);
    Post.create({
        content:req.body.content,
        user:req.user._id,
    },function(err,post){
        if(err){
            console.log('error in creating the post');
            return;
        }
        res.redirect('back');
    });
}