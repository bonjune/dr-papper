import React, { Component } from 'react'
import { withFirebase } from '../Firebase';
import Board, { BoardPredicate } from '../../containers/Board'
import CardBox, { CardPredicate } from '../../containers/Board/CardBox';


class ShowSearchBase extends Component {
  constructor(props){
    super(props);
    console.log(props.match.params.name);
    this.state = {
      value: '',
      cards: [],
    }
    let result = [];
    this.state.value = props.match.params.name;
    console.log(props.match.params.name);
    this.props.firebase.tags()
      .once('value').then(async snapshot => {
        snapshot.val()[this.state.value].reviews.map((value) => {
          this.props.firebase.review(value)
            .once('value').then(async snapshot => {
                result.push(snapshot.val());
                this.setState({cards:result});
            })
        })
      })
  }
  // componentWillReceiveProps(nextProps){
  //   let name = nextProps.match.params.name;
  //   let result = [];
  //   // console.log(name);
  //   this.props.firebase.tags()
  //   .once('value').then(async snapshot => {
  //     let tmp = snapshot.val()[name];
  //     // console.log(tmp);
  //     if (tmp != null){
  //       await tmp.reviews.forEach(review => {
  //         result.push(review);
  //         this.state.cards = result;
  //       })
  //       this.setState({
  //         reviews: children
  //       });
  //     }
  //   })
  // }

  render() {

    console.log("rere", this.state.cards);
    return (
      <div className="papper-board">
        <h1>{this.state.value}</h1>
        <CardBox reviews={this.state.cards} cardPredicate={CardPredicate.Archived} imgShow="true"/>
      </div>
    )
    }
}

const ShowSearch = withFirebase(ShowSearchBase);

export default ShowSearch
