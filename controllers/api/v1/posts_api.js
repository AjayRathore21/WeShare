const Post = require('../../../models/post');
const Comment = require('../../../models/comment');

module.exports.index = async function(req,res){
    let posts = await Post.find({})
        .sort('createdAt')
        .populate('user')
        .populate({
            path: 'comments',
            populate: {
                path: 'user'
            }
        });

    return res.json(200,{
        massege:'list of post',
        posts:posts
    })
}


module.exports.destroy = async function(req, res){

    try{
        let post = await Post.findById(req.params.id);

        if (post.user == req.user.id){
            post.remove();

            await Comment.deleteMany({post: req.params.id});

            // if(req.xhr){
            //     console.log('hello');
            //     return res.status(200).json({
            //         data:{
            //             post_id:req.params.id,
            //         },
            //         message:"post deleted"
            //     });
            // }
            

            //req.flash('success', 'Post and associated comments deleted!');

            return res.json(200,{
                message:'posts and its comments deleted successfully '
            });
        }
        else{
        //     req.flash('error', 'You cannot delete this post!');
        //     return res.redirect('back');
        return res.json(401,{
            message:'You cannot delete this Post!!!'
        });
        }

    }catch(err){
        //req.flash('error', err);
        return res.json(500,{
            messege:'internal server error'
        });
    }
    
}