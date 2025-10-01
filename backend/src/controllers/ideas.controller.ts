import { Request, Response, NextFunction } from 'express';
import { getAllIdeasService } from '../services/ideas.service';

export async function getAllIdeas(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const ideas = await getAllIdeasService();
    console.log("Ideas", ideas)
    res.json(ideas);
  } catch (err) {
    next(err);
  }
}
