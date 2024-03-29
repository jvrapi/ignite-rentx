import { Router } from 'express';
import { authenticateRoutes } from './authenticate.routes';
import { carsRoutes } from './cars.routes';
import { categoriesRoutes } from './categories.routes';
import { passwordRoutes } from './password.routes';
import { rentalRoutes } from './rental.routes';
import { specificationsRoutes } from './specifications.routes';
import { usersRoutes } from './users.routes';

const routes = Router();

routes.use('/cars', carsRoutes);
routes.use('/categories', categoriesRoutes);
routes.use('/specifications', specificationsRoutes);
routes.use('/users', usersRoutes);
routes.use('/rentals', rentalRoutes);
routes.use('/password', passwordRoutes);
routes.use(authenticateRoutes);

export { routes };
