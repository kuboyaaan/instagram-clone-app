import React, { useState, useEffect } from 'react';
import { makeStyles } from  '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';

import './App.css';
import Post from './Post';
import ImageUpload from './ImageUpload';
import { db, auth, storage } from './firebase';
import { Button, Input } from '@material-ui/core';

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyle = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function App() {
  const classes =  useStyle();
  const [modalStyle] = useState(getModalStyle);

  // posts: list of objects with username/capture/imageUrl
  const [posts, setPosts] = useState([]);
  const [isOpen, setIsOpen]  = useState(false);
  const [isOpenSignIn, setIsOpenSignIn] = useState(false);
  const [username, setUsername]  = useState('');
  const [email, setEmail]  = useState('');
  const [password, setPassword]  = useState('');
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if(authUser){
        // user has logged in ...
        console.log(authUser);
        setUser(authUser);

        // if (authUser.displayName) {
        //   // dont update username
        // } else {
        //   // if we just created someone...
        //   return authUser.updateProfile({
        //     displayName: username,
        //   });
        // }
      } else {
        // user has logged out ...
        setUser(null);
      }
    })

    return () => {
      // performm some cleanup actions
      unsubscribe();
    }
  }, [user, username]);

  // useEffect: Runs a piece of code based on a specific condition
  useEffect(() => {
    db.collection('posts').orderBy('timestamp', 'desc').onSnapshot(snapshot => {
      setPosts(snapshot.docs.map(doc => ({
        // uniqueID
        id: doc.id,
        post: doc.data(),
      })));
    })
  }, []);

  const signUp = (event) => {
    event.preventDefault();

    auth.createUserWithEmailAndPassword(email, password)
    .then((authUser) => {
      return authUser.user.updateProfile({
        displayName: username,
      });
    })
    .catch((error) => alert(error.message))

    setIsOpen(false);
  };

  const signIn = (event) => {
    event.preventDefault();

    auth.signInWithEmailAndPassword(email, password)
    .catch((error) => alert(error.code))

    setIsOpenSignIn(false);
  };

  return (
    <div className="App">
      {/* LogInしたusernameを使用する→user.displayName */}
      {user?.displayName ? (
        <ImageUpload username={user.displayName} />
      ): (
        <h3>Sorry you need to lodin to upload</h3>
      )}

      <Modal
        open={isOpen}
        onClose={() => {setIsOpen(false)}}

      >
        <div style={modalStyle} className={classes.paper}>
          <form className="app_signup">
            <center>
              <img
                className="app_headerImage"
                src="instagram_logo.png"
                height="40px"
                alt=""
              />
            </center>
            <Input
              placeholder="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <Input
              placeholder="email"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              placeholder="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button type="submit" onClick={signUp}>Sign up</Button>
          </form>
        </div>
      </Modal>

      <Modal
        open={isOpenSignIn}
        onClose={() => {setIsOpenSignIn(false)}}
      >
        <div style={modalStyle} className={classes.paper}>
          <form className="app_signup">
            <center>
              <img
                className="app_headerImage"
                src="instagram_logo.png"
                height="40px"
                alt=""
              />
            </center>
            <Input
              placeholder="email"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              placeholder="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button type="submit" onClick={signIn}>Sign In</Button>
          </form>
        </div>
      </Modal>
      {/* Header */}
      <div className="app_header">
        <div className="app_imageContainer">
          <img
            className="app_headerImage"
            src="instagram_logo.png"
            height="40px"
            // alt=""/
          />
        </div>
        {
          user ? (
            <Button onClick={() => auth.signOut()}>LogOut</Button>

          ) : (
            <div className="app_loginContainer">
              <Button onClick={() => setIsOpenSignIn(true)}>Sign In</Button>
              <Button onClick={() => setIsOpen(true)}>Sign Up</Button>
            </div>
          )
        }
        <h1>Hello World</h1>

        {
          // {id, post}で展開して、取得する
          posts.map(({id, post}) => (
            // keyにidを設定することで、効率よく再レンダリングされる。（以前あったものは維持）
            <Post key={id} username={post.username} caption={post.caption} imageUrl={post.imageUrl} />
            ))
        }
      </div>
      {/* Posts... */}
    </div>
  );
}

export default App;
