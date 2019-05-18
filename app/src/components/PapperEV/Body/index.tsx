import React from "react";
import {Button} from 'reactstrap'
import { IReview } from 'src/components/Firebase/interface';
import {AddBoxIcon} from "../../../assets/icons"

import EVBoxes from './Boxes';
import EVContent from "./EVContent";
import EVTags from './EVTags';


interface IPapperEVBody {
    edit : boolean;
    review : IReview;
    onChangeHandler:(review:object) => void;
}

interface IPapperEVBodyState {
    review : IReview
}

class PapperEVBody extends React.Component<IPapperEVBody, IPapperEVBodyState> {
    constructor(props:IPapperEVBody){
        super(props);
        this.state = {
            review : this.props.review
        }
    }

    onContentChange = (content:object) => {
        const {review} = this.state
        const contentKey = Object.keys(content)[0]
        const contentValue = content[contentKey]
        review[contentKey] = contentValue

        this.setState({review})
        this.props.onChangeHandler(review)
    }

    render() {
        const {edit} = this.props
        const {review} = this.state
        return(
        <div>
            <div style={{background:"white", padding:"5px"}}>
                <EVContent edit={edit} content={{"title" : review.title}} label="Title" onChangeHandler={this.onContentChange}/>
                <EVContent edit={edit} content={{"authors" : review.authors}} label="Authors" onChangeHandler={this.onContentChange}/>
                <EVContent edit={edit} content={{"publishDate" : review.publishDate}} label="Date" onChangeHandler={this.onContentChange}/>
                <EVContent edit={edit} content={{"published" : review.published}} label="Published" onChangeHandler={this.onContentChange}/>
                <EVContent edit={edit} content={{"link" : review.link}} label="Link" onChangeHandler={this.onContentChange}/>
            </div>

            <div style={{background:"white", marginTop:"10px", padding:"5px"}}>
                <EVTags edit={edit} tags={review.tags} suggestions={[{id:"test", name:"test"}]} onChangeHandler={this.onContentChange}/>
            </div>

            <div style={{background:"white", marginTop:"10px", padding:"5px"}}>
                {review.toRead ?
                <EVContent edit={edit} content={{"comment" : review.comment}} label="Comment" onChangeHandler={this.onContentChange}/>:
                <div>
                    {review.boxes.map((box, i) => <EVBoxes edit={edit} box={box} key={i} onChangeHandler={this.onContentChange}/>)}
                    {edit ?
                    <div style={{background:"white", marginTop:"10px", padding:"5px"}}>
                        <Button block={true} color="white">
                            <img src={AddBoxIcon} alt="addbox" style={{height:"20px", width:"20px"}}/>
                        </Button>
                    </div> :
                    null}
                </div>
                }
            </div>

        </div>)
    }
};

export default PapperEVBody;