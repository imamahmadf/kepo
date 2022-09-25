import React, { useState } from "react";

function App() {
  const [like, setlike] = useState(100);
  const [dislike, setdislike] = useState(4);

  const [likeactive, setlikeactive] = useState(false);
  const [dislikeactive, setdislikeactive] = useState(false);

  function likef() {
    if (likeactive) {
      setlikeactive(false);
      setlike(like - 1);
    } else {
      setlikeactive(true);
      setlike(like + 1);
      if (dislikeactive) {
        setdislikeactive(false);
        setlike(like + 1);
        setdislike(dislike - 1);
      }
    }
  }

  return (
    <div className="App">
      <div></div>
      <button
        onClick={likef}
        className={[likeactive ? "active-like" : null, "button"].join(" ")}
      >
        Like {like}
      </button>

      <div></div>
    </div>
  );
}

export default App;
