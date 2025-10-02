import { Request, Response } from 'express';
import { getAllIdeasService } from '../services/ideas.service';
import { voteForIdeaService } from '../services/votes.service';
import { asyncHandler } from '../utils/asyncHandler';
import { getClientIp } from '../utils/ipUtils';

export const getAllIdeas = asyncHandler(async (req: Request, res: Response) => {
  const clientIp = getClientIp(req);

  const ideas = await getAllIdeasService(clientIp);
  res.json(ideas);
});

export const voteForIdea = asyncHandler(async (req: Request, res: Response) => {
  const clientIp = getClientIp(req);
  const ideaId = parseInt(req.params.id, 10);

  if (isNaN(ideaId)) {
    return res.status(400).json({ error: 'invalid_id' });
  }

  try {
    const updatedVotesCount = await voteForIdeaService(ideaId, clientIp);
    res.status(200).json({ votesCount: updatedVotesCount });
  } catch (err: unknown) {
    if (err.message === 'already_voted')
      return res
        .status(409)
        .json({ error: 'Вы уже проголосовали за эту идею!' });
    if (err.message === 'limit_exceeded')
      return res
        .status(409)
        .json({ error: 'Вы исчерпали свой лимит голосов!' });
    throw err;
  }
});
