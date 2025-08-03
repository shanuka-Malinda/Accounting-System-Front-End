export interface ApiResponse<T> {
    status: boolean;
    errorMessages: string[];
    payload: T;
}
