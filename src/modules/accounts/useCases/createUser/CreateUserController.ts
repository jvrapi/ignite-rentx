import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { CreateUserUseCase } from './CreateUserUseCase';

class CreateUserController {
  constructor() {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { driver_license, email, name, password } = request.body;

    const createUserUseCase = container.resolve(CreateUserUseCase);

    await createUserUseCase.execute({
      driver_license,
      email,
      name,
      password
    });

    return response.status(201).send();
  }
}
export { CreateUserController };
