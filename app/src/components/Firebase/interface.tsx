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
    id: string;
    name: string;
  }>

  comment: string;
  boxes: IBox[];
}

export interface ITag{
  name: string;
  reviews: string[]; // Review Keys
}

export interface IBox{
  format: Format;
  figure: any;
  subtitle: string;
  content: string;
  figsrc: string;
}