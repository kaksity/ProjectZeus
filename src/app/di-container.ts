import { Container } from "inversify";
import { TYPES } from "./constants";
import { AuthenticationService, UtilityService } from "./services";

const InversifyContainer = new Container();

InversifyContainer.bind<AuthenticationService>(TYPES.AuthenticationService).to(AuthenticationService);
InversifyContainer.bind<UtilityService>(TYPES.UtilityService).to(UtilityService);

export default InversifyContainer;