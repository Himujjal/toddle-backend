import { Router } from 'express';
import swaggerUi from 'swagger-ui-express';
import apiSpec from './openapi.json';

import * as AuthController from './controllers/auth';
import * as SurveyController from './controllers/survey';
import imageResizerHandler from './controllers/image/resize';
import protectedRoute from './middleware/authMiddleware';

const swaggerUiOptions = {
  customCss: '.swagger-ui .topbar { display: none }',
};

const router = Router();

// auth routes
router.post('/login', AuthController.login);
router.post('/sign_up', AuthController.signUp);
router.post('/refresh_token', AuthController.refreshToken);

// survey routes
router.post('/survey/add', protectedRoute, SurveyController.add);
router.get('/survey/get/:surveyId', protectedRoute, SurveyController.read);
router.get('/survey/all_user', protectedRoute, SurveyController.allUserCreated);
router.get('/survey/all', protectedRoute, SurveyController.all);
router.post('/survey/vote', protectedRoute, SurveyController.vote);
router.put('/survey/update', protectedRoute, SurveyController.update);
router.delete('/survey/delete/:surveyId', protectedRoute, SurveyController.deleteSurvey);

router.post('/image/resize', imageResizerHandler);

// Dev routes
if (process.env.NODE_ENV === 'development') {
  router.use('/dev/api-docs', swaggerUi.serve);
  router.get('/dev/api-docs', swaggerUi.setup(apiSpec, swaggerUiOptions));
}

export default router;
