import { z } from "zod";
import { Format, Genre, IBook, Language } from "../../types/book";

export const adminAddBookRequestSchema = z.object({
    title: z.string(),
    author: z.string(),
    price: z.number(),
    genre: z.nativeEnum(Genre),
    language: z.nativeEnum(Language),
    location: z.object({
        aisle: z.number().nonnegative(),
        shelf: z.number().nonnegative(),
        floor: z.number().nonnegative(),
    }),
    format: z.nativeEnum(Format)
});

export type AdminAddBookRequest = z.infer<typeof adminAddBookRequestSchema>;

export interface AdminAddBookResponse {
    book: IBook;
}

export const adminRemoveBookRequestSchema = z.object({
    bookId: z.string(),
});

export type AdminRemoveBookRequest = z.infer<typeof adminRemoveBookRequestSchema>;

export interface AdminRemoveBookResponse {
    bookId: string;
}

export const adminUpdateBookPriceRequestSchema = z.object({
    bookId: z.string(),
    price: z.number(),
});

export type AdminUpdateBookPriceRequest = z.infer<typeof adminUpdateBookPriceRequestSchema>;

export interface AdminUpdateBookPriceResponse {
    bookId: string;
}

