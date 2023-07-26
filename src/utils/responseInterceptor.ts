import { Response } from "express";

interface ErrorResponse {
  message: string;
}

const responseInterceptor = (res: Response, status: number, data: any = {}, error?: ErrorResponse) => {
  if (error) {
    return res.status(status).json({ error });
  } else {
    return res.status(status).json({ data });
  }
};

export {
  responseInterceptor
};
