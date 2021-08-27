const Post = require('../models/post');
const Comment = require('../models/comment');


module.exports.create = function(req,res){
    console.log("inside the post create function", req.body);
    Post.create({
        content:req.body.content,
        user:req.user.id,
    },function(err,post){
        if(err){
            console.log('error in creating the post');
            return;
        }
        res.redirect('back');
    });
}
module.exports.destroy = function(req, res){
    Post.findById(req.params.id, function(err, post){
        // .id means converting the object id into string
        if (post.user == req.user.id){
            post.remove();

            Comment.deleteMany({post: req.params.id}, function(err){
                return res.redirect('back');
            });
        }else{
            return res.redirect('back');
        }

    });
}


/*module.exports.destroy = function(req,res){
    Post.findById(req.params.id,function(err,post){
        if(err){
            console.log('error in finding the post')
            return;
        }
        // .id converts the object id into string. use .id for comparison
        if(post.user==req.user.id){
            post.remove();

            comment.deleteMany({post:req.params.id},function(err){
                return res.redirect('back');
            });
        }else{
            return res.redirect('back');
        }
    });
}*/