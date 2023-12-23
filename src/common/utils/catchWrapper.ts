import type { NextApiRequest, NextApiResponse } from 'next';
import { errorHandler } from './errorHandler';

type ControllerFnType = (req: NextApiRequest, res: NextApiResponse) => Promise<void>;

export const catchWrapper = (controller: ControllerFnType): ControllerFnType => async (req, res) => {
  await controller(req, res).catch((e) => errorHandler(e, req, res));
};
