import { BooksInventory } from "../storage/booksInventory";
import { IBook, INewBookInfo } from "../types/book";
import Logger from "../utils/logger";
import { v4 as uuidv4 } from 'uuid';

export class AdminController {
    constructor(private booksInventory: BooksInventory, private logger: Logger) {}

    async addNewBook(newBook: INewBookInfo): Promise<IBook> {
        const book: IBook = {
            id: uuidv4(),
            ...newBook,
        }
        try {
            await this.booksInventory.addBook(book);
            this.logger.info(`Successfully added new book: ${book.id}`);
            return book;
        } catch (err) {
            this.logger.error(`Failed to add new book: ${err}`);
            throw err;
        }
    }

    async deleteBook(bookId: string): Promise<string> {
        try {
            await this.booksInventory.removeBook(bookId);
            this.logger.info(`Successfully removed book: ${bookId}`);
            return bookId;
        } catch (err) {
            this.logger.error(`Failed to remove book: ${err}`);
            throw err;
        }
    }

    async updateBookPrice(bookId: string, price: number): Promise<IBook> {
        try {
            const book = await this.booksInventory.updateBookPrice(bookId, price);
            this.logger.info(`Successfully updated book price: ${bookId}`);
            return book;
        } catch (err) {
            this.logger.error(`Failed to update book price: ${err}`);
            throw err;
        }
    }
}
