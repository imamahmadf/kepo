import React from "react";

class Like extends React.Component {
  state = {
    like: 100,
    dislike: 4,
    likeactive: false,
    dislikeactive: false,
  };

  likef = () => {
    if (this.state.likeactive) {
      this.setState({ likeactive: false });
      this.setState({ like: this.state.dislike - 1 });
    } else {
      this.setState({ likeactive: true });
      this.setState({ like: this.state.like + 1 });
      if (this.state.dislikeactive) {
        this.setState({ dislikeactive: false });
        this.setState({ like: this.state.like + 1 });
        this.setState({ dislike: this.state.dislike - 1 });
      }
    }
  };

  render() {
    return (
      <div>
        <button onClick={likef}>Like</button>
      </div>
    );
  }
}

export default Like;
