import React from 'react';
import {
  Button,
  ButtonGroup,
  Col,
  Row,
  Input,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormGroup,
  Label
} from 'reactstrap'

import CommonInfo from './commonInfo'
import EditBox from './editBox'

import { compose } from "recompose";

export class PapperView extends React.Component {
    constructor(props) {
      super(props);
      this.modalBgColor = '#EEEEEE';
    }

		render() {
			return (
        <div>
          <Modal
            isOpen={this.props.modalShow}
            toggle={this.props.toggle}
            size='lg'
            scrollable={true}
          >
            <ModalHeader
              toggle={this.props.toggle}
              style={{ background: this.modalBgColor, padding: 0 }}
              cssModule={{ 'modal-title': 'w-100 text-center mb-0' }}
            />
              <ModalBody style={{background:this.modalBgColor}}>
                <CommonInfo
                  title={this.props.title}
                  authors={this.props.authors}
                  publishDate={this.props.publishDate} 
                  published={this.props.publishedAt}
                  link={this.props.link}
                  tags={this.props.tags}
                />
                {this.props.toread ? 
                <EditBox
                  toRead={this.props.toRead}
                  boxes={this.props.boxes}
                  comment={this.props.comment}
                /> : (this.props.boxes
                  ? Object.keys(this.props.boxes).map(key => 
                  <EditBox
                  toRead={this.props.toRead}
                  boxes={this.props.boxes[key]}
                  comment={this.props.comment}
                    />)
                  : null)
                }
                
              </ModalBody>
              <ModalFooter style={{background:this.modalBgColor}}>
              <Button
                block
                style={{ background: "#B0BEC5", border: 0 }}
                onClick={this.props.toggle}>
                Done
              </Button>
              </ModalFooter>
            </Modal>
          </div>
    	)
    }
}

export default PapperView;
