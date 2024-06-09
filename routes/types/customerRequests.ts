import { z } from "zod";
import {Format, Genre, IBook, IReservedBookInfo, Language} from "../../types/book";

export const customerGetBooksRequestSchema = z.object({
    genre: z.nativeEnum(Genre),
    language: z.nativeEnum(Language),
    format: z.nativeEnum(Format),
    reservationPeriod: z.object({
        startDate: z.number(),
        endDate: z.number(),
    }),
});

export type CustomerGetBooksRequest = z.infer<typeof customerGetBooksRequestSchema>;

export interface CustomerGetBooksResponse {
    books: IBook[];
}

export const customerReserveBookRequestSchema = z.object({
    userId: z.string(),
    bookId: z.string(),
    startDate: z.string(),
    endDate: z.string(),
});

export type CustomerReserveBookRequest = z.infer<typeof customerReserveBookRequestSchema>;

export interface CustomerReserveBookResponse {
    reservedBookInfo: IReservedBookInfo | Promise<IReservedBookInfo>
}
