import { Request, Response } from 'express';
import { getAllIdeasService } from '../services/ideas.service';
import { asyncHandler } from '../utils/asyncHandler';

export const getAllIdeas = asyncHandler(async (req: Request, res: Response) => {
  const ideas = await getAllIdeasService();
  res.json(ideas);
});
