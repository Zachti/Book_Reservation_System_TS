import IntervalTree from "@flatten-js/interval-tree";

export interface IBook {
    id: string;
    title: string;
    author: string;
    price: number; // for a day
    reservations?: IntervalTree;
    location: ILocation;
    genre: Genre;
    format: Format;
    language: Language;
}

export enum Genre {
    Fiction = 'fiction',
    Mystery = 'mystery',
    Romance = 'romance',
    ScienceFiction = 'science-fiction',
    Drama = 'drama',
    History = 'history',
    Adventure = 'adventure',
    Horror = 'horror',
    Fantasy = 'fantasy',
}

export enum Format {
    Hardcover = 'hardcover',
    Paperback = 'paperback',
    Ebook = 'ebook',
    AudioBook = 'audiobook',
}

export enum Language {
    English = 'english',
    Spanish = 'spanish',
    French = 'french',
    German = 'german',
    Italian = 'italian',
    Russian = 'russian',
    Chinese = 'chinese',
    Japanese = 'japanese',
    Korean = 'korean',
}

export interface ILocation {
    aisle: number;
    shelf: number;
    floor: number;
}

export interface IBookReservation {
    userId: string;
    startDate: number;
    endDate: number;
}

export interface IReservedBookInfo {
    bookId: string;
    startDate: Date;
    endDate: Date;
    totalPrice: number;
}

export interface INewBookInfo {
    title: string;
    author: string;
    price: number; // for a day
    genre: Genre;
    language: Language;
    location: ILocation;
    format: Format;
}

export interface IBookFilterQuery {
    genre?: Genre;
    format?: Format;
    language?: Language;
    reservationPeriod?: {
        startDate: number;
        endDate: number;
    };
}


