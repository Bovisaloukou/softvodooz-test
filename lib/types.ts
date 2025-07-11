export interface User {
  id: string;
  name: string;
  username: string;
  cover: string | null;
  image: string;
}

export interface Bookshelf {
  id: string;
  slug: string;
  last_modified: number;
  title: string;
  user: User;
}

export interface Author {
  id: string;
  name: string;
  slug: string;
  role?: string;
}

export interface BookInfo {
  id: string;
  slug: string;
}

export interface BookSubjects {
  bisac: string[];
  clil: string[];
  thema?: string[];
}

export interface BookCan {
  sample: boolean;
  buy?: boolean;
}

export interface BookPrice {
  amount: number;
  currency: string;
  includes_taxes: boolean;
}

export interface BookExtents {
  pages?: number;
  gl_pages?: number;
}

export interface Book {
  id: string;
  authors: Author[];
  book: BookInfo;
  can: BookCan;
  form: string;
  language: string;
  short_title: string;
  title: string;
  description: string;
  isbn: string;
  publisher: string;
  subjects?: BookSubjects;
  tags: string[];
  image?: string;
  adult: boolean;
  is_free: boolean;
  extents?: BookExtents;
  price?: BookPrice;
  publication_date?: number;
  rating?: number;
}

export interface PaginationParams {
  offset?: number;
  limit?: number;
}
