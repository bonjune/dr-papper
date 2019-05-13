import React, { Component }from "react";
 
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
        figure: null,
        figuresrc : null
    };
  }

  pasteFigure = (file) => {

    console.log(file.clipboardData.items)
    for(var i = 0;i<file.clipboardData.items.length;i++){
      var item = file.clipboardData.items[i]
      if (item.type.indexOf("image") !== -1) {
        //image
        var blob = item.getAsFile();
        var URLObj = window.URL || window.webkitURL;
        var source = URLObj.createObjectURL(blob);
        this.setState({
          figure:blob,
          figuresrc:source
        }, () => this.props.handleFigure(this.state.figure))
        break
      }
      
    }
  }

  render() {
    var {figuresrc} = this.state

    return (
      <div onPaste={file => this.pasteFigure(file)}>
      {figuresrc ? <img src={figuresrc} key={figuresrc} style={{maxWidth:"180px", maxHeight:"180px"}} alt={`Pasted`} onPaste={file => this.pasteFigure(file)}/> : <div style={{color:"rgb(108, 117, 125)"}}>Paste(Ctrl + V) Figure!</div>}
      </div>

    )
  }
}