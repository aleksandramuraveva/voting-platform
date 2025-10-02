import { Router } from 'express';
import { getAllIdeas, voteForIdea } from '../controllers/ideas.controller';

const ideasRouter = Router();

ideasRouter.get('/', getAllIdeas);
ideasRouter.post('/:id/vote', voteForIdea);

export default ideasRouter;
