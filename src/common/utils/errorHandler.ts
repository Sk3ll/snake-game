import type { NextApiRequest, NextApiResponse } from 'next';
import { HttpCodes } from '../enums';

export const errorHandler = (error: Error, req: NextApiRequest, res: NextApiResponse) => {
  res.status(HttpCodes.INTERNAL_SERVER_ERROR).json({ success: false, message: error.message });
};