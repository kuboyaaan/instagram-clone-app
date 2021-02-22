import './App.css';
import Post from './Post';

function App() {
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

        <Post />
        <Post />
        <Post />
      </div>
      {/* Posts... */}
    </div>
  );
}

export default App;
