import React, { Component }from "react";
 
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
        figure: null,
    };
  }

  pasteFigure = (file) => {

    var item = file.clipboardData.items[0]

    if (item.type.indexOf("image") !== -1) {
      //image
      var blob = item.getAsFile();
      var URLObj = window.URL || window.webkitURL;
      var source = URLObj.createObjectURL(blob);
      this.setState({
        figure:source
      }, () => this.props.handleFigure(this.state.figure))
    }
  }

  render() {
    var {figure} = this.state

    return (
      <div onPaste={file => this.pasteFigure(file)}>
      {figure ? <img src={figure} key={figure} style={{width:"100%", height:"100%"}} alt={`Pasted`} onPaste={file => this.pasteFigure(file)}/> : <div>Paste(Ctrl + V) Figure!</div>}
      </div>

    )
  }
}