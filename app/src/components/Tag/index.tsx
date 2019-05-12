import React from "react";
import { Link } from "react-router-dom";

const SmallTag = (props: { tagName: string; }) => (
  <span
    className="badge badge-light font-weight-normal papper-tag"
  >
    <Link to={`/show/${props.tagName}`}>
      #{props.tagName}
    </Link>
  </span>
)

export default SmallTag;