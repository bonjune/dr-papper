import React from "react";

const SmallTag = (props: { index: number; tagName: string; }) => (
  <span
    key={`tag-${props.index}`}
    className="badge badge-light font-weight-normal papper-tag"
  >
    #{props.tagName}
  </span>
)

export default SmallTag;