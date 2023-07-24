// Packages
import { StatusCodes } from "http-status-codes";
import { Request, Response, NextFunction } from "express";
import * as Colors from "colors";

// Exceptions
import { CustomException } from "../exceptions/custom.exception";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  let errorResponse;
  let status = StatusCodes.INTERNAL_SERVER_ERROR;

  // Internal Application Errors
  if (err instanceof CustomException) {
    errorResponse = err.serializeErrors();
    status = err.statusCode;

    // Unknown Errors
  } else {
    errorResponse = {
      error: {
        status,
        errorCode: "UNKNOWN_ERROR",
      },
    };
  }

  // Log error to console
  console.error(
    Colors.red(`\n INTERNAL ERROR HANDLER => ${err.stack || err.message}`)
  );

  res.locals.isError = true;

  res.status(status).send(errorResponse);

  next();
};
