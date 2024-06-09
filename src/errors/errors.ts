class BookReservationError extends Error {
    constructor(message: string, public code: number) {
        super(message);
    }
}

export class BookAlreadyExistsError extends BookReservationError {
    constructor() {
        super("Book already exists", 400);
    }
}

export class BookNotFoundError extends BookReservationError {
    constructor() {
        super("Book not found", 404);
    }
}

export class ReservationOverlapError extends BookReservationError {
    constructor() {
        super("Reservation overlaps with existing reservation", 400);
    }
}

export const handleErrorCode = (err: Error) => {
    if (err instanceof BookReservationError) {
        return err.code;
    }
    else {
        return 500;
    }
}
