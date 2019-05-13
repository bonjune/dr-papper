import React from 'react'
import Board from "../../containers/Board";
import { IReview } from '../Firebase/interface';

const Search = (props: any) => {
  const { query } = props.match.params;
  const prefix = "# ";
  const predicate = (query: string) => (review: IReview) => {
    for (let key in review.tags) {
      const tagName = review.tags[key].name;
      if (tagName == query) {
        return true;
      }
    }
    return false;
  }
  return (
    <div className="papper-board">
      <h1>{prefix + query}</h1>
      <Board boardPredicate={predicate(query)} search={true}/>
    </div>
  )
};

export default Search;
