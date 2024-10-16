import { TAny, TArray, TIntersect, TObject, TSchema, Type } from "@sinclair/typebox";
const packageJson = require('../../package.json');

const packageVersion = {
  version : '1.0.005'
}

export const createSuccessResponse = (
  statusCodeObject: any,
  message: string,
  data: any,
  options?: { includeMsgKey?: boolean; status?: string; serviceMeta?: any; spMeta?: any; }
) => {
  return {
    timestamp: new Date(),
    statusCode: statusCodeObject?.code || 200,
    status: statusCodeObject?.name || "OK",
    message: message || "Success",
    success: true,
    packageVersion:packageJson?.version,
    data: data || {},
    ...(options?.serviceMeta && { serviceMeta: options.serviceMeta }),
    ...(options?.spMeta && { spMeta: options.spMeta }),
  };
};

export const createErrorResponse = (statusCodeObject: any, message: string) => {
  return {
    timestamp: new Date(),
    statusCode: statusCodeObject?.code || 500,
    status: statusCodeObject?.name || "Internal Server Error",
    message: message || "Error",
    success: false,
    packageVersion:packageJson?.version,

  };
};

export function SuccessResponseDecorator(dataSchema: TObject | TArray | TAny| TIntersect) {
  return Type.Object({
    timestamp: Type.Union([Type.String(), Type.Date()]),
    statusCode: Type.Number(),
    status: Type.String(),
    message: Type.String(),
    success: Type.Boolean(),
    data: dataSchema,
    packageVersion:Type.String()

  });
}

export function commonFastifyErrorDecorator(){
  return Type.Object({
    statusCode: Type.Number(),
    code: Type.String(),
    message: Type.String(),
    error: Type.String(),
  });
}
export function ErrorResponseDecorator() {
  return Type.Object({
    timestamp: Type.Union([Type.String(), Type.Date()]),
    statusCode: Type.Number(),
    status: Type.String(),
    message: Type.String(),
    success: Type.Boolean(),
    packageVersion:Type.String()

  });
}


export function PaginationSuccessResponseDecorator(dataSchema: TSchema){
  
  return SuccessResponseDecorator(Type.Object({
    results: Type.Array(dataSchema),
    totalResults: Type.Optional(Type.Number()),
    totalPages: Type.Optional(Type.Number()),
    currentPage: Type.Optional(Type.Number()),
  }))
}