import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { CreateCarSpecificationUseCase } from './CreateCarSpecificationUseCase';

class CreateCarSpecificationController {
  constructor() {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { specifications_id } = request.body;
    const createCarSpecificationUseCase = container.resolve(
      CreateCarSpecificationUseCase
    );
    const specifications = await createCarSpecificationUseCase.execute({
      car_id: id,
      specifications_id
    });

    return response.status(201).json(specifications);
  }
}
export { CreateCarSpecificationController };
