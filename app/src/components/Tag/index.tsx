import React from "react";

const SmallTag = (props: { keyName: string; tagName: string; }) => (
  <span
    key={`tag-${props.keyName}`}
    className="badge badge-light font-weight-normal papper-tag"
  >
    #{props.tagName}
  </span>
)

export default SmallTag;