import React, { useState, useEffect } from 'react';

import './App.css';
import Post from './Post';
import { db, auth, storage } from './firebase';

function App() {
  // posts: list of objects with username/capture/imageUrl
  const [posts, setPosts] = useState([]);

  // useEffect: Runs a piece of code based on a specific condition
  useEffect(() => {
    db.collection('posts').onSnapshot(snapshot => {
      setPosts(snapshot.docs.map(doc => ({
        // uniqueID
        id: doc.id,
        post: doc.data(),
      })));
    })
  }, []);

  return (
    <div className="App">
      {/* Header */}
      <div classname="app_header">
        <div className="app_imageContainer">
          <img
            className="app_headerImage"
            src="instagram_logo.png"
            height="40px"
            // alt=""
          />
        </div>
        <h1>Hello World</h1>

        {
          // {id, post}で展開して、取得する
          posts.map(({id, post}) => (
            <Post username={post.username} caption={post.caption} imageUrl={post.imageUrl} />
            ))
        }
      </div>
      {/* Posts... */}
    </div>
  );
}

export default App;
