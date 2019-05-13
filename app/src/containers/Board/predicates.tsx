import { IReview } from "src/components/Firebase/interface";

export type ReviewPredicateType = (review: IReview) => boolean;

export const predicateCompose = (...predicates: ReviewPredicateType[]) => (review: IReview) => {
  for (let i = 0; i < predicates.length; i++) {
    let p = predicates[i];
    if (!p(review))
      return false;
  }
  return true;
}

export const predicateUnion = (...predicates: ReviewPredicateType[]) => (review: IReview) => {
  for (let i = 0; i < predicates.length; i++) {
    let p = predicates[i];
    if (p(review))
      return true;
  }
  return false;
}

export const ReviewPredicate = {
  Read: ((review: IReview) => !review.toRead) as ReviewPredicateType,
  ToRead: ((review: IReview) => review.toRead ) as ReviewPredicateType,
  Pinned: ((review: IReview) => review.pinned) as ReviewPredicateType,
  Archived: ((review: IReview) => !review.pinned) as ReviewPredicateType,
  Alive: ((review: IReview) => !review.trash) as ReviewPredicateType,
  Deleted: ((review: IReview) => review.trash) as ReviewPredicateType,
}