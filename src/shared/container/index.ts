import { UsersRepository } from '@modules/accounts/infra/repositories/UsersRepository';
import { UsersTokenRepository } from '@modules/accounts/infra/repositories/UsersTokenRepository';
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
import { IUsersTokenRepository } from '@modules/accounts/repositories/IUsersTokenRepository';
import { CarsRepository } from '@modules/cars/infra/typeorm/repositories/CarsRepository';
import { CategoriesRepository } from '@modules/cars/infra/typeorm/repositories/CategoriesRepository';
import { SpecificationsRepository } from '@modules/cars/infra/typeorm/repositories/SpecificationsRepository';
import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository';
import { ICategoriesRepository } from '@modules/cars/repositories/ICategoriesRepository';
import { ISpecificationsRepository } from '@modules/cars/repositories/ISpecificationsRepository';
import { RentalsRepository } from '@modules/rentals/infra/typeorm/repositories/RentalsRepository';
import { IRentalsRepository } from '@modules/rentals/repositories/IRentalsRepository';
import '@shared/container/providers';
import { container } from 'tsyringe';

// ICategoriesRepository
container.registerSingleton<ICategoriesRepository>(
  'CategoriesRepository',
  CategoriesRepository
);

container.registerSingleton<ISpecificationsRepository>(
  'SpecificationsRepository',
  SpecificationsRepository
);

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository
);

container.registerSingleton<ICarsRepository>('CarsRepository', CarsRepository);

container.registerSingleton<IRentalsRepository>(
  'RentalsRepository',
  RentalsRepository
);

container.registerSingleton<IUsersTokenRepository>(
  'UsersTokensRepository',
  UsersTokenRepository
);
