import { createParamDecorator } from "@nestjs/common";

export const AuthUserId = createParamDecorator((data, req) => {
    return req.args[0].user.sub;
});