import { ExecutionContext, createParamDecorator } from "@nestjs/common";
import { Request } from "express";

/*
 Provides the current authenticated user accross the app.
 */
export const CurrentUser = createParamDecorator((data: any, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest() as Request        
    return request
})