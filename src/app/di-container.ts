import { Container } from "inversify";
import { TYPES } from "./constants";
import { AuthenticationMiddleware } from "./http/middlewares";
import { UserService, UtilityService } from "./services";
import { WalletService } from "./services/wallet.service";

const InversifyContainer = new Container();

InversifyContainer.bind<UserService>(TYPES.UserService).to(UserService);
InversifyContainer.bind<UtilityService>(TYPES.UtilityService).to(UtilityService);
InversifyContainer.bind<AuthenticationMiddleware>(TYPES.AuthenticationMiddleware).to(AuthenticationMiddleware);
InversifyContainer.bind<WalletService>(TYPES.WalletService).to(WalletService);
export default InversifyContainer;