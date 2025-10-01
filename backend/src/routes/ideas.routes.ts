import { Router } from 'express';
import { getAllIdeas } from '../controllers/ideas.controller';

const ideasRouter = Router();

ideasRouter.get('/', getAllIdeas);

export default ideasRouter;
