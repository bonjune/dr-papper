/**
 * Author: Bongjun Jang
 */

export enum Format {
  Figure,
  Content
}

export interface IReview {
  reviewID: string;
  userID: string;

  createAt: string;
  updateAt: string;

  title: string;
  authors: string[];
  publishDate: string;
  published: string;
  link: string;

  mainFigure: string;
  
  toRead: boolean;
  pinned: boolean;
  trash: boolean;

  tags: Array<{
    key: string;
    name: string;
    reviews: string[];
  }>

  comment: string;
  boxes: Array<{
    format: Format;
    figure: string;
    subtitle: string;
    content: string;
  }>
}

export interface ITag{
  name: string;
  reviews: string[]; // Review Keys
}