import React, { useState, useEffect } from 'react';
import './Post.css';
import Avatar from '@material-ui/core/Avatar';
import { db } from './firebase';
import firebase from 'firebase';


function Post({postId, user, username, caption, imageUrl}) {
    const [comments, setComments] = useState([]);
    const [comment, setComment] = useState('');

    useEffect(() => {
        let unsubscribe;
        if(postId){
            unsubscribe = db
                .collection('posts')
                .doc(postId)
                .collection('comments')
                .orderBy('timestamp', 'desc')
                .onSnapshot((snapshot) => {
                    setComments(snapshot.docs.map((doc) => doc.data()));
                });
        }
        return () => {
            unsubscribe();
        };
    }, [postId]);

    const postComment = (event)  => {
        event.preventDefault();
        db.collection('posts').doc(postId).collection('comments').add({
            username: user.displayName,
            comment: comment,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        });
        setComment('');
    };

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

            <div className='post_comments'>
                {comments.map((comment) => (
                    <p>
                        <b>{comment.username}</b> {comment.comment}
                    </p>
                ))}
            </div>

            {user && (
                <form className='post_commentBox'>
                    <input
                        className='post_input'
                        type='text'
                        placeholder='Add a comments...'
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                    />
                    <button
                        className='post_button'
                        disabled={!comment}
                        type='submit'
                        onClick={postComment}
                    >
                        Post
                    </button>
                </form>
            )}
        </div>
    )
}

export default Post
