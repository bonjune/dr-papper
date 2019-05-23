/**
 * Author: Bongjun Jang
 */

export enum Format {
  Figure,
  Content
}

export interface IReview {
  // Indentification
  reviewID: string;
  userID: string;
  username: string;

  // Maintainence
  createAt: string;
  updateAt: string;

  // Basic Info
  title: string;
  authors: string[];
  publishDate: string;
  published: string;
  link: string;

  mainFigure: string;
  
  // State
  toRead: boolean;
  pinned: boolean;
  trash: boolean;

  // Memos
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