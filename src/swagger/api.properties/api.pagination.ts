import { Type, applyDecorators } from "@nestjs/common";
import {
  ApiExtraModels,
  ApiOkResponse,
  getSchemaPath,
} from "@nestjs/swagger";

export const ApiPagination = <TModel extends Type<any>>(
  model: TModel,
) =>
  applyDecorators(
    ApiExtraModels(model),
    ApiOkResponse({
      schema: {
        title: `${model.name}Paging`,
        allOf: [
          {
            properties: {
              pagination: {
                type: "object",
                properties: {
                  total: { type: "number", example: 100 },
                  take: { type: "number", example: 10 },
                  skip: { type: "number", example: 0 },
                },
              },
            },
          },
          {
            properties: {
              items: {
                type: "array",
                items: { $ref: getSchemaPath(model) },
              },
            },
          },
        ],
      },
    }),
  );
