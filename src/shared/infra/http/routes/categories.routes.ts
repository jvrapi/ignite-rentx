import { CreateCategoryController } from '@modules/cars/useCases/categories/createCategory/CreateCategoryController';
import { ImportCategoryController } from '@modules/cars/useCases/categories/importCategory/ImportCategoryController';
import { ListCategoriesController } from '@modules/cars/useCases/categories/listCategories/ListCategoriesController';
import { Router } from 'express';
import multer from 'multer';
import { ensureAdmin } from '@shared/infra/http/middlewares/ensureAdmin';
import { ensureAuthenticated } from '@shared/infra/http/middlewares/ensureAuthenticated';

const categoriesRoutes = Router();

const upload = multer({
  dest: './tmp'
});

const createCategoryController = new CreateCategoryController();
const importCategoryController = new ImportCategoryController();
const listCategoriesController = new ListCategoriesController();

categoriesRoutes.post(
  '/',
  ensureAuthenticated,
  ensureAdmin,
  createCategoryController.handle
);

categoriesRoutes.get('/', listCategoriesController.handle);

categoriesRoutes.post(
  '/import',
  upload.single('file'),
  ensureAuthenticated,
  ensureAdmin,
  importCategoryController.handle
);

export { categoriesRoutes };
