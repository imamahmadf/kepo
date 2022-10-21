import React from "react";
import Foto from "../img/profile/profile1.png";
import "./story.css";

class Story extends React.Component {
  render() {
    return (
      <div className="story-akun">
        <img src={Foto} alt="" />
        <p className="story-username">User</p>
      </div>
    );
  }
}

export default Story;
