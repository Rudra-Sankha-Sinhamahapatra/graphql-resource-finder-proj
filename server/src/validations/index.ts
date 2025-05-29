import { authValidation } from "./auth";
import { resourceValidation } from "./resource";

export const validations = {
    auth: authValidation,
    resource: resourceValidation,
}