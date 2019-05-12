import React from 'react'
import { withFirebase } from '../Firebase';
import CardBox, { CardPredicate } from '../../containers/Board/CardBox';


class ShowSearchBase extends React.Component {
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
      .once('value').then(snapshot => {
        snapshot.val()[this.state.value].reviews.map((value) => {
          this.props.firebase.review(value)
            .once('value').then(snapshot => {
                result.push(snapshot.val());
                this.setState({cards:result});
            })
        })
      })
  }
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
