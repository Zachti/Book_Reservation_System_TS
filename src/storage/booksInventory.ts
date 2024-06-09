import { IBook, IBookFilterQuery, IBookReservation } from "../types/book";
import IntervalTree from "@flatten-js/interval-tree";
import { Mutex } from "async-mutex";
import { BookAlreadyExistsError, BookNotFoundError, ReservationOverlapError } from "../errors/errors";

export class BooksInventory {
    private readonly inventory: Map<string, IBook>
    private readonly lock: Mutex

    constructor() {
        this.inventory = new Map();
        this.lock = new Mutex();
    }

    async addBook(book: IBook): Promise<IBook> {
        await this.lock.acquire();
        try {
            if (this.inventory.has(book.id)) {
                throw new BookAlreadyExistsError();
            }
            book.reservations = new IntervalTree();
            this.inventory.set(book.id, book);
            return book;
        }
        finally {
            this.lock.release();
        }
    }

    async removeBook(bookId: string): Promise<void> {
        await this.lock.acquire();
        try {
            if (!this.inventory.delete(bookId)) {
                throw new BookNotFoundError();
            }
        }
        finally {
            this.lock.release();
        }
    }

    async getBooks(filter?: IBookFilterQuery): Promise<IBook[]> {
        await this.lock.acquire();
        try {
            const bookArray = Array.from(this.inventory.values());
            if (filter) {
                return this.filterBooks(filter, bookArray);
            }
            return bookArray;
        }
        finally {
            this.lock.release();
        }
    }

    async updateBookPrice(bookId: string, price: number): Promise<IBook> {
        await this.lock.acquire();
        try {
            const book = this.inventory.get(bookId);
            if (!book) {
                throw new BookNotFoundError();
            }
            book.price = price;
            return book;
        }
        finally {
            this.lock.release();
        }
    }

    async addBookReservation(bookId: string, reservation: IBookReservation): Promise<IBook> {
        await this.lock.acquire();
        try {
            const book = this.inventory.get(bookId);
            if (!book) {
                throw new BookNotFoundError();
            }
            if (book.reservations.search([reservation.startDate, reservation.endDate]).length > 0) {
                throw new ReservationOverlapError();
            }
            book.reservations.insert([reservation.startDate, reservation.endDate]);
            return book;
        }
        finally {
            this.lock.release();
        }
    }

    private filterBooks(filter: IBookFilterQuery, books: IBook[]): IBook[] {
        return books.filter(book => {
            return (
                (!filter.genre || book.genre === filter.genre) &&
                (!filter.format || book.format === filter.format) &&
                (!filter.language || book.language === filter.language) &&
                (!filter.reservationPeriod || book.reservations.search([filter.reservationPeriod.startDate, filter.reservationPeriod.endDate]).length === 0));
        });
    }
}
