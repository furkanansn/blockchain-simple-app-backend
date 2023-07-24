// Packages
import { StatusCodes } from "http-status-codes";

export interface InternalAPIError {
  error: {
    status: StatusCodes;
    errorCode: string;
    message?: string;
    stack?: string;
    [key: string]: string | number | undefined;
  };
}

export abstract class CustomException extends Error {
  abstract statusCode: number;

  protected constructor(message: string) {
    super(message);
  }

  abstract serializeErrors(): InternalAPIError;
}
