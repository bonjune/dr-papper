import React from "react";
import {Col, FormGroup, Label} from "reactstrap"
import SmallTag from "../../Tag";
import { IReview } from 'src/components/Firebase/interface';

import {WithContext as ReactTags} from 'react-tag-input';
import './tagbox.css'

const KeyCodes = {
    comma: 188,
    enter: 13,
};
const delimiters = [KeyCodes.comma, KeyCodes.enter];

interface IEVTags {
    edit : boolean;
    tags : Pick<IReview, 'tags'>['tags'];
    suggestions : Pick<IReview, 'tags'>['tags'];
    onChangeHandler:(tags:object) => void;
}

interface IEVTagsState {
    tags : Array<{
        id: string;
        text: string;   // IT IS NOT NAME!
      }>;
    suggestions : Array<{
        id: string;
        text: string;   // IT IS NOT NAME!
      }>;
}

class EVTags extends React.Component<IEVTags, IEVTagsState> {
    constructor(props:IEVTags){
        super(props)
        this.state = {
            suggestions : this.tagNametoText(props.suggestions),
            tags : this.tagNametoText(props.tags)
        }

    }

    tagNametoText = (tags:Array<{id:string, name:string}>) => {
        const retTag = [] as Array<{id:string, text:string}>
        if(tags){
            tags.forEach(tag => {
                retTag.push({id:tag.id, text:tag.name})
            })
        }
        return retTag
    }

    tagTexttoName = (tags:Array<{id:string, text:string}>) => {
        const retTag = [] as Array<{id:string, name:string}>
        if(tags){
            tags.forEach(tag => {
                retTag.push({id:tag.id, name:tag.text})
            })
        }
        return retTag
    }

    handleTagDelete = (i:number) => {
        const { tags } = this.state;
        this.setState({
         tags: tags.filter((tag, index) => index !== i),
        }, () => this.props.onChangeHandler({"tags": this.tagTexttoName(this.state.tags)}));
    }

    handleTagAddition = (tag: { id: string; text: string;}) => {
      this.setState(state => (
        { tags: [...state.tags, tag] }), () => this.props.onChangeHandler({"tags": this.tagTexttoName(this.state.tags)})
      );
    }

    render() {
        const {edit} = this.props
        const {tags, suggestions} = this.state

        return(
            <FormGroup row={true}>
                <Label sm={2} size="lg" style={{ textAlign: "right", fontWeight: "bold" }}>
                    Tags
                </Label>
                <Col sm={10}>
                {edit ?
                    <ReactTags
                        classNames={{
                            tagInputField: 'form-control-lg form-control',
                        }} 
                        id="evbox"
                        tags={tags}
                        suggestions={suggestions}
                        handleDelete={this.handleTagDelete}
                        handleAddition={this.handleTagAddition}
                        allowDeleteFromEmptyInput={false}
                        minQueryLength={1}
                        allowDragDrop={false}
                        delimiters={delimiters}
                        inline={true}/> :
                    <div className="form-control-lg" style={{border: "0px", fontSize:"1.25rem", marginBottom:"8px"}}>
                        {tags ? tags.map((tag, i) => (
                            <SmallTag key={`common-info-tag-${tag.text}`} tagName={tag.text} />
                        )) : null}
                    </div>}
                </Col>
            </FormGroup>
        )
    }

};

export default EVTags;