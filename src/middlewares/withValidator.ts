import {NGNApiRequest} from "../types/NGNApiRequest";
import {NGNApiResponse} from "../types/NGNApiResponse";
import {NextHandler} from "../types/NextHandler";
import {Middleware} from "../types/Middleware";
import Keyable from "../types/Keyable";
import Rule from "../services/validator/rules/Rule";
import Validator from "../services/validator/Validator";
import {ValidationResult} from "../types/ValidationResult";
import ValidationError from "../errors/ValidationError";

const validator = (req: NGNApiRequest) => async (validationObject: Keyable<Array<Rule>>) => {
    const validator: Validator = new Validator();
    const validationRes: ValidationResult = await validator.validate(validationObject, req.all);
    if(!validationRes.result)
        throw new ValidationError("Given data is not valid", {errors: validationRes.errors});
}

const withValidator: Middleware = (req: NGNApiRequest, res: NGNApiResponse, next: NextHandler) => {
    req.validate = validator(req);
    next();
}

export default withValidator;