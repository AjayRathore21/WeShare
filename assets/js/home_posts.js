{
    //method to submit the form data to the new post using ajex
    let createPost = function(){
        let newPostForm = $('#new-post-form');
        newPostForm.submit(function(e){
            e.preventDefault();
            $.ajax({
                type:'post',
                url:'/posts/create',
                data:newPostForm.serialize(),  //makes json file of content in form
                success:function(data){
                    let newPost = new newPostDom(data.data.post);
                    $('#posts-list-container>ul').prepend(newPost);
                },
                error:function(error){
                    console.log(error.responseText);
                }
            })


        });
    }

    //method to create a post in DOM
    let newPostDom = function(post){
        return $(`<li id="post-${post._id}">
                    
        <p> 
         <small>
             <a href="/posts/destroy/${post.id}">delete</a><br>
         </small>
    
         ${post.content}
         <br>
         <small>
             ${post.user.name} 
         </small>
    
        </p> 
        
        <div class="past-comments">

            <form action="comments/create" method="POST" >
             <input type="text" name="content" placeholder="Do comment.." required>
             <input type="hidden" name="post" value="<%= post._id%>">
             <input type="submit" value="comment">
         </form>
    
        <div class="post-comments-list">
                <ul id="post-commnets-${post._id}">
                </ul>
        </div>        
    </div>
       
</li>`)
    }


    createPost();
}