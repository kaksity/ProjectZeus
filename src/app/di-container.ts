import { Container } from "inversify";
import { TYPES } from "./constants";
import { AuthenticationMiddleware } from "./http/middlewares";
import { UserService, UtilityService } from "./services";
import { BankService } from "./services/bank.service";
import { UserWalletService } from "./services/user.wallet.service";

const InversifyContainer = new Container();

InversifyContainer.bind<UserService>(TYPES.UserService).to(UserService);
InversifyContainer.bind<UtilityService>(TYPES.UtilityService).to(UtilityService);
InversifyContainer.bind<AuthenticationMiddleware>(TYPES.AuthenticationMiddleware).to(AuthenticationMiddleware);
InversifyContainer.bind<UserWalletService>(TYPES.UserWalletService).to(UserWalletService);
InversifyContainer.bind<BankService>(TYPES.BankService).to(BankService);

export default InversifyContainer;