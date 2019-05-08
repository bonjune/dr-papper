import React, { Component }from "react";
import Gluejar from 'react-gluejar'
 
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
        figure: null
    };
}

  replacePaste = (files) => {
    this.state.figure = files.pop()
  }

  render() {
    //console.log(this.state)
    return (
      <Gluejar onPaste={files => this.replacePaste(files)}>
        {images =>
          images.length > 0 &&
          images.map(image => <img src={image} key={image} alt={`Pasted: ${image}`} width="100%" height="100%"/>)
        }
      </Gluejar>
    )
  }
}