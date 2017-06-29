import { Router } from 'express';
import * as groupController from './controller';

const routes = new Router();

routes.post('/groups/new', groupController.createGroup);
routes.post('/groups/:groupId/meetups/new', groupController.createGroupMeetup);
routes.get('/groups/:groupId/meetups', groupController.getGroupMeetups);

export default routes;
