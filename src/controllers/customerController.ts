import { BooksInventory } from "../storage/booksInventory";
import { IBook, IBookFilterQuery, IBookReservation, IReservedBookInfo } from "../types/book";
import Logger from "../utils/logger";
import { differenceInCalendarDays } from "date-fns";

export class CustomerController {
    constructor(private booksInventory: BooksInventory, private logger: Logger) {}

    async reserveBook(userId: string, bookId: string, startDate: Date, endDate: Date): Promise<IReservedBookInfo> {
        const reservation: IBookReservation = {
            userId,
            startDate: startDate.getTime(),
            endDate: endDate.getTime(),
        };
        try {
            const reservedBook = await this.booksInventory.addBookReservation(bookId, reservation);
            const daysReserved = differenceInCalendarDays(endDate, startDate) + 1;
            this.logger.info(`Reserved book ${bookId} for user ${reservation.userId} for ${daysReserved} days`);
            return {
                bookId,
                startDate,
                endDate,
                totalPrice: daysReserved * reservedBook.price,
            };
        }
        catch (err) {
            this.logger.error(`Failed to reserve book: ${err}`);
            throw err;
        }
    }

    async getBooks(filter: IBookFilterQuery): Promise<IBook[]> {
        return (await this.booksInventory.getBooks(filter)).map(({ reservations, ...book }) => book);
    }
}
