import React from 'react'
import './Post.css';
import Avatar from '@material-ui/core/Avatar';


function Post() {
    return (
        <div class="post">
            {/* header -> avatar + username */}
            <div class="post_header">
                <Avatar
                    className="post_avatar"
                    alt="username"
                    src="avatar.jpg"
                />
                <h3>Username</h3>
            </div>
            {/* immage */}
            <img className="post_image" src="logo512.png" />

            {/* usernname + caption */}
            <h4 className="post_text"><strong>Username</strong> caption</h4>
        </div>
    )
}

export default Post
