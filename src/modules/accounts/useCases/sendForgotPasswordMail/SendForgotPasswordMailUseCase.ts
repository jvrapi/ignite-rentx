import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
import { IUsersTokenRepository } from '@modules/accounts/repositories/IUsersTokenRepository';
import { IDateProvider } from '@shared/container/providers/DateProvider/IDateProvider';
import { IMailProvider } from '@shared/container/providers/MailProvider/IMailProvider';
import { AppError } from '@shared/errors/AppError';
import { resolve } from 'path';
import { inject, injectable } from 'tsyringe';
import { v4 as uuid } from 'uuid';

@injectable()
class SendForgotPasswordMailUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('UsersTokensRepository')
    private usersTokensRepository: IUsersTokenRepository,

    @inject('DayjsDateProvider')
    private dateProvider: IDateProvider,

    @inject('EtherealMailProvider')
    private mailProvider: IMailProvider
  ) {}

  async execute(email: string) {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('User does not exists!');
    }

    const templatePath = resolve(
      __dirname,
      '..',
      '..',
      'views',
      'emails',
      'forgotPassword.hbs'
    );

    const token = uuid();

    const expires_date = this.dateProvider.addHours(3);

    await this.usersTokensRepository.create({
      refresh_token: token,
      user_id: user.id,
      expires_date
    });

    const variables = {
      name: user.name,
      link: `${process.env.FORGOT_MAIL_URL}${token}`
    };

    await this.mailProvider.sendMail(
      email,
      'Recuperação de senha',
      variables,
      templatePath
    );
  }
}
export { SendForgotPasswordMailUseCase };
