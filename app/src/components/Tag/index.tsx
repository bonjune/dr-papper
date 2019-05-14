import React from "react";
import { Link } from "react-router-dom";
import { TagsContext, withTags } from "./context";

const SmallTag = (props: { tagName: string; }) => (
  <span style={{backgroundColor:"#E8EAF6", marginBottom: "7px"}}
    className="badge badge-light font-weight-normal papper-tag"
  >
    <Link to={`/show/${props.tagName}`}>
      #{props.tagName}
    </Link>
  </span>
)

export { TagsContext, withTags };
export default SmallTag;