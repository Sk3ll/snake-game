import type { NextApiRequest, NextApiResponse, NextApiHandler } from 'next';

export const errorHandler = (error: Error, req: NextApiRequest, res: NextApiResponse, next?: NextApiHandler) => {
  res.status(500).json({ success: false, message: error.message });
};
