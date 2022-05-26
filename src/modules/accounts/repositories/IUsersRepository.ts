import { ICreateUserDTO } from '../dtos/ICreateUSerDTO';
import { User } from '../entities/User';

interface IUsersRepository {
    create(data: ICreateUserDTO): Promise<void>;
    findByEmail(email: string): Promise<User>;
}

export { IUsersRepository };