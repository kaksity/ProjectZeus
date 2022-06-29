import { Container } from "inversify";
import { TYPES } from "./constants";
import { AuthenticationMiddleware } from "./http/middlewares";
import { UserBankService, UserService, UtilityService } from "./services";
import { BankService } from "./services/bank.service";
import { TransferService } from "./services/transfer.service";
import { UserWalletService } from "./services/user.wallet.service";

const InversifyContainer = new Container();

InversifyContainer.bind<UserService>(TYPES.UserService).to(UserService);
InversifyContainer.bind<UtilityService>(TYPES.UtilityService).to(UtilityService);
InversifyContainer.bind<AuthenticationMiddleware>(TYPES.AuthenticationMiddleware).to(AuthenticationMiddleware);
InversifyContainer.bind<UserWalletService>(TYPES.UserWalletService).to(UserWalletService);
InversifyContainer.bind<BankService>(TYPES.BankService).to(BankService);
InversifyContainer.bind<UserBankService>(TYPES.UserBankService).to(UserBankService);
InversifyContainer.bind<TransferService>(TYPES.TransferService).to(TransferService);

export default InversifyContainer;