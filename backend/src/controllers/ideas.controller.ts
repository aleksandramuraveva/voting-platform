import { Request, Response } from 'express';
import { getAllIdeasService } from '../services/ideas.service';
import { asyncHandler } from '../utils/asyncHandler';
import { getClientIp } from '../utils/ipUtils';

export const getAllIdeas = asyncHandler(async (req: Request, res: Response) => {
  const clientIp = getClientIp(req);

  const ideas = await getAllIdeasService(clientIp);
  res.json(ideas);
});
