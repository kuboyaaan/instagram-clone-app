import React from 'react'
import './Post.css';
import Avatar from '@material-ui/core/Avatar';


function Post({username, caption, imageUrl}) {
    return (
        <div className="post">
            {/* header -> avatar + username */}
            <div className="post_header">
                <Avatar
                    className="post_avatar"
                    alt="username"
                    src="avatar.jpg"
                />
                <h3>{username}</h3>
            </div>
            {/* immage */}
            <img className="post_image" src={imageUrl} />

            {/* usernname + caption */}
            <h4 className="post_text"><strong>{username}</strong> {caption}</h4>
        </div>
    )
}

export default Post
