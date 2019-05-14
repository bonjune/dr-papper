import React from "react";
import SmallTag, { TagsContext } from '../Tag'

const TagBarBase = (props: any) => (
  <TagsContext.Consumer>
    {tags => (
      <section className="component-tag-bar" style={{ minHeight: "80px", marginTop: "20px" }}>
        <div>
          <div className="sm-12">
            <div className="tag-bar-list">
              {tags ? tags.map((tag, i) => (
                <SmallTag
                  key={`tagbar-tag-${i}`}
                  tagName={tag.name}
                />
              )) : null}
            </div>
          </div>
        </div>
      </section>
    )}

  </TagsContext.Consumer>
);

const TagBar = TagBarBase;

export default TagBar;