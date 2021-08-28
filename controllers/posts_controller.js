const Post = require('../models/post');
const Comment = require('../models/comment');

module.exports.create = async function(req, res){
    try{
        await Post.create({
            content: req.body.content,
            user: req.user._id
        });
        
        req.flash('success', 'Post published!');
        return res.redirect('back');

    }catch(err){
        req.flash('error', err);
        return res.redirect('back');
    }
  
}


module.exports.destroy = async function(req, res){

    try{
        let post = await Post.findById(req.params.id);

        if (post.user == req.user.id){
            post.remove();

            await Comment.deleteMany({post: req.params.id});

            req.flash('success', 'Post and associated comments deleted!');

            return res.redirect('back');
        }else{
            req.flash('error', 'You cannot delete this post!');
            return res.redirect('back');
        }

    }catch(err){
        req.flash('error', err);
        return res.redirect('back');
    }
    
}



// const Post = require('../models/post');
// const Comment = require('../models/comment');


// module.exports.create = async function(req,res){
//     try{
//         await Post.create({
//             content:req.body.content,
//             user:req.user.id,
//         });
//             res.redirect('back');

//     }catch(err){
//         console.log('Error',err);
//         return;

//     }
   
// }
// module.exports.destroy = async function(req, res){
   
//         try{
//             //.id means converting the object id into string
//             let post = await Post.findById(req.params.id)
//             if (post.user == req.user.id){
//                 post.remove();
        
//                 await Comment.deleteMany({post: req.params.id});
//                 return res.redirect('back');
                
//             }else{
//                 return res.redirect('back');
//             }
        

//         }catch(err){
//             console.log('Error',err);
//             return;

            
//         }

    
    
// }


// /*module.exports.destroy = function(req,res){
//     Post.findById(req.params.id,function(err,post){
//         if(err){
//             console.log('error in finding the post')
//             return;
//         }
//         // .id converts the object id into string. use .id for comparison
//         if(post.user==req.user.id){
//             post.remove();

//             comment.deleteMany({post:req.params.id},function(err){
//                 return res.redirect('back');
//             });
//         }else{
//             return res.redirect('back');
//         }
//     });
// }*/