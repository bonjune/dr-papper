import React from "react";

interface ISmallTagInterface {
  tagName: string;
}

class SmallTag extends React.Component<ISmallTagInterface> {
  constructor(props: ISmallTagInterface) {
    super(props)
  }

  render() {
    return (
      <span className="badge badge-light font-weight-normal papper-tag">#{this.props.tagName}</span>
    )
  }
}

export default SmallTag;