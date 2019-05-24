import React from 'react'
import Board, { predicateCompose, ReviewPredicate } from "../../containers/Board";
import { IReview } from '../Firebase/interface';

const Search = (props: any) => {
  let { query } = props.match.params;
  const { others } = props.location.state;
  query = query.split('&');
  const prefix = "#";
  const space = ' ';
  const predicate = (query: string[]) => (review: IReview) => {
    for (let key in review.tags) {
      const tagName = review.tags[key].name;
      if(query.includes(tagName)) {
        return true;
      }
    }
    return false;
  }

  return (
    <div className="papper-board">
      <h1 style={{marginTop: '10px', marginBottom:'5px'}}>{query && query.map((val:string) => prefix + val + space)}</h1>
      <Board
        boardType="Search"
        search={others}
        boardPredicate={predicateCompose(
          ReviewPredicate.Read,
          ReviewPredicate.Alive,
          predicate(query)
        )}
      />
    </div>
  )
};

export default Search;
