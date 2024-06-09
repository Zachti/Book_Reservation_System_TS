import { Router } from "express";
import { handleErrorCode } from "../errors/errors";
import { CustomerController } from "../controllers/customerController";
import {
    CustomerGetBooksRequest, customerGetBooksRequestSchema,
    CustomerGetBooksResponse,
    CustomerReserveBookRequest, customerReserveBookRequestSchema,
    CustomerReserveBookResponse
} from "./types/customerRequests";
import {IBook, IReservedBookInfo} from "../types/book";

export class CustomerRoutesHandler {
    private readonly customerRouter: Router;
    constructor(private customerController: CustomerController) {
        this.customerRouter = Router();

        this.customerRouter.get<null, CustomerGetBooksResponse, null, CustomerGetBooksRequest >("/", async (req, res) => {
            try {
                const books = await this.getBooks(req.query);
                res.json({ books });
            }
            catch (err) {
                res.status(handleErrorCode(err));
                res.send(err);
            }
        });

        this.customerRouter.put<null, CustomerReserveBookResponse, CustomerReserveBookRequest>("/", (req, res) => {
            try {
                const reservedBookInfo = this.reserveBook(req.body);
                res.json({ reservedBookInfo });
            }
            catch (err) {
                res.status(handleErrorCode(err));
                res.send(err);
            }
        });
    }

    get Router() {
        return this.customerRouter;
    }

    private async getBooks(req: CustomerGetBooksRequest): Promise<IBook[]> {
        const { genre, language, format, reservationPeriod } = customerGetBooksRequestSchema.parse(req);
        const filter = {
            genre,
            language,
            format,
            reservationPeriod: reservationPeriod?.startDate && reservationPeriod?.endDate ? {
                startDate: new Date(reservationPeriod.startDate).getTime(),
                endDate: new Date(reservationPeriod.endDate).getTime(),
            } : undefined,
        };
        return await this.customerController.getBooks(filter);
    }

    private async reserveBook(req: CustomerReserveBookRequest): Promise<IReservedBookInfo> {
        const { userId, bookId, startDate, endDate } = customerReserveBookRequestSchema.parse(req);
        return await this.customerController.reserveBook(userId, bookId, new Date(startDate), new Date(endDate));
    }
}
