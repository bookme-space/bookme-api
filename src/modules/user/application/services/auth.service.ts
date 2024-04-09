import { Injectable } from "@nestjs/common";

import { ICryptoService } from "@core/modules/shared/crypto";

import { DomainError } from "src/modules/abstract/throwable";

import { IJwtService, TokenType } from "../../domain/adapters";
import { User } from "../../domain/entities";
import { UserFactory } from "../../domain/factories/user.factory";
import { IUserRepository } from "../../domain/user.repository";

export interface IUserAuthorized {
  readonly access: string;
  readonly refresh: string;
  readonly user: User;
}

export interface ILoginParams {
  readonly email: string;
  readonly password: string;
}

export interface IRegisterParams {
  readonly email: string;
  readonly firstname: string;
  readonly lastname: string;
  readonly password: string;
}

export interface IRefreshParams {
  refresh: string;
}

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepo: IUserRepository,
    private readonly factory: UserFactory,
    private readonly crypto: ICryptoService,
    private readonly jwt: IJwtService,
  ) {}

  public async login({
    email,
    password,
  }: ILoginParams): Promise<IUserAuthorized> {
    const user = await this.userRepo.findByEmail({ email });

    const isPasswordEquals =
      user.Password?.length &&
      (await this.crypto.compare(user.Password, password));

    if (!isPasswordEquals)
      throw new DomainError("Invalid credentials");

    const [access, refresh] = await this.jwt.sign({
      id: user.Id,
      email: user.Email,
      role: user.Role,
    });

    return { access, refresh, user };
  }

  public async register(
    params: IRegisterParams,
  ): Promise<IUserAuthorized> {
    const user = this.factory.create({
      ...params,
      password: await this.crypto.hash(params.password),
    });

    await this.userRepo.save(user);

    const [access, refresh] = await this.jwt.sign({
      id: user.Id,
      email: user.Email,
      role: user.Role,
    });

    return { access, refresh, user };
  }

  public async refresh({
    refresh: token,
  }: IRefreshParams): Promise<IUserAuthorized> {
    const { id } = await this.jwt.verify(
      token,
      TokenType.Refresh,
    );

    const user = await this.userRepo.findById({ id });

    const [access, refresh] = await this.jwt.sign({
      id: user.Id,
      email: user.Email,
      role: user.Role,
    });

    return { access, refresh, user };
  }
}
