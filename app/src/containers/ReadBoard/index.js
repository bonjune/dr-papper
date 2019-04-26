import React, { Component } from 'react'
import { withFirebase } from "../../components/Firebase";
import { compose } from "recompose";
import testimage from '../../assets/img/boxmain.png'
import pinIcon from '../../assets/icons/pinIcon.png'
import ReadPinned from './ReadPinned'

class ReadBoardBase extends Component {
  constructor(props) {
    super(props);
    this.state = {reviews: []};
    const reviews = this.props.firebase.getReviews();
    reviews.once('value').then(
      snapshot => {
        const data = snapshot.val();
        const list = [];
        for (let i in data) {
          list.push(data[i]);
        }
        this.setState({
          reviews: list
        });
      }
    )
  }

  render() {
    return (
      <section className="component-finned-box">
        <div class="container">
            <div className="row">
            <div className="col-sm-auto">
            <h3 className="text-uppercase">pinned paper <span><img src={pinIcon} alt="pinned" style={{width:'30px'}}/></span> </h3>
            </div>
            </div>
            <div class="row">
            <div class="col-sm-4">
                    <img src={testimage} alt="testimage"/>
                    <p className="title font-weight-normal">Layout</p>
                    <p className="content font-weight-light">Ipsum Lorem ipsum dolor, maiores distinctio perferendis quas recusandae architecto consequatur quis, nobis quibusdam iste.</p>
                    <section className="tags">
                        <span className="badge badge-light font-weight-normal">#Light</span>
                        <span className="badge badge-light font-weight-normal">#Light</span>
                        <span className="badge badge-light font-weight-normal">#Light</span>
                    </section>
                </div>
              { this.state.reviews && this.state.reviews.map(review => {
                  return (
                      <ReadPinned review={review}/>
                  )
              })}
            </div>
        </div>
      </section>
    )
  }
}

const ReadBoard = compose(withFirebase)(ReadBoardBase);

export default ReadBoard
