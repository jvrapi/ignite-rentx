import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { CreateSpecificationUseCase } from './CreateSpecificationUseCase';

class CreateSpecificationController {
    handle(request: Request, response: Response): Response {
        const { description, name } = request.body;

        const createSpecificationUseCase = container.resolve(
            CreateSpecificationUseCase
        );

        const specification = createSpecificationUseCase.execute({
            description,
            name
        });
        return response.status(201).json(specification);
    }
}
export { CreateSpecificationController };
