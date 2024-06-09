import { Router } from "express";
import { handleErrorCode } from "../errors/errors";
import {
    AdminAddBookRequest,
    adminAddBookRequestSchema,
    AdminAddBookResponse,
    AdminRemoveBookRequest,
    adminRemoveBookRequestSchema,
    AdminRemoveBookResponse,
    AdminUpdateBookPriceRequest,
    adminUpdateBookPriceRequestSchema,
    AdminUpdateBookPriceResponse
} from "./types/adminRequests";
import { AdminController } from "../controllers/adminController";
import { IBook } from "../types/book";

export class AdminRoutesHandler {
    private readonly adminRouter: Router;
    constructor(private adminController: AdminController) {
        this.adminRouter = Router();

        this.adminRouter.post<null, AdminAddBookResponse, AdminAddBookRequest>("/", async (req, res) => {
            try {
                const book = await this.addBook(req.body);
                res.json({ book });
            }
            catch (err) {
                res.status(handleErrorCode(err));
                res.send(err);
            }
        });

        this.adminRouter.delete<null, AdminRemoveBookResponse, AdminRemoveBookRequest>("/", async (req, res) => {
            try {
                const bookId = await this.removeBook(req.body);
                res.json({ bookId });
            }
            catch (err) {
                res.status(handleErrorCode(err));
                res.send(err);
            }
        });

        this.adminRouter.patch<null, AdminUpdateBookPriceResponse, AdminUpdateBookPriceRequest>("/", async (req, res) => {
            try {
                await this.updateBookPrice(req.body);
                res.end();
            }
            catch (err) {
                res.status(handleErrorCode(err));
                res.send(err);
            }
        });
    }

    get Router() {
        return this.adminRouter;
    }

    private async addBook(req: AdminAddBookRequest): Promise<IBook> {
        const { title, author, price, genre, language, location, format } = adminAddBookRequestSchema.parse(req);
        if (!location.aisle || !location.shelf || !location.floor) {
            throw new Error("Location must include aisle, shelf and floor");
        }
        const { aisle, shelf, floor } = location;
        return await this.adminController.addNewBook({ title, author, price, genre, language, location: { aisle, shelf, floor }, format });
    }

    private async removeBook(req: AdminRemoveBookRequest): Promise<string> {
        const { bookId } = adminRemoveBookRequestSchema.parse(req);
        return await this.adminController.deleteBook(bookId);
    }

    private async updateBookPrice(req: AdminUpdateBookPriceRequest): Promise<string> {
        const { bookId, price } = adminUpdateBookPriceRequestSchema.parse(req);
        await this.adminController.updateBookPrice(bookId, price);
        return bookId;
    }
}
