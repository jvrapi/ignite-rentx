import { ICreateUserTokenDTO } from '@modules/accounts/dtos/ICreateUserTokenDTO';
import { UserTokens } from '@modules/accounts/infra/typeorm/entities/UserTokens';
import { IUsersTokenRepository } from '../IUsersTokenRepository';

class UsersTokensRepositoryInMemory implements IUsersTokenRepository {
  usersToken: UserTokens[] = [];

  async create({
    expires_date,
    refresh_token,
    user_id
  }: ICreateUserTokenDTO): Promise<UserTokens> {
    const userToken = new UserTokens();

    Object.assign(userToken, {
      expires_date,
      refresh_token,
      user_id
    });

    this.usersToken.push(userToken);
    return userToken;
  }

  async findByUserIdAndRefreshToken(
    user_id: string,
    refresh_token: string
  ): Promise<UserTokens> {
    const userToken = this.usersToken.find(
      (userToken) =>
        userToken.user_id === user_id &&
        userToken.refresh_token === refresh_token
    );

    return userToken;
  }

  async deleteById(id: string): Promise<void> {
    const userToken = this.usersToken.find((userToken) => userToken.id === id);
    this.usersToken.splice(this.usersToken.indexOf(userToken));
  }

  async findByRefreshToken(refresh_token: string): Promise<UserTokens> {
    const userToken = this.usersToken.find(
      (userToken) => userToken.refresh_token === refresh_token
    );

    return userToken;
  }
}
export { UsersTokensRepositoryInMemory };
