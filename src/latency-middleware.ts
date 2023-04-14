import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { parse, DocumentNode } from 'graphql';

// function getFieldNames(selectionSet: any) {
//   return selectionSet.selections
//     .map((selection: any) => {
//       if (selection.kind === 'Field' && selection.name.value !== '__schema') {
//         return selection.name.value;
//       } else if (selection.selectionSet) {
//         return getFieldNames(selection.selectionSet);
//       }
//     })
//     .flat();
// }

@Injectable()
export class LatencyMiddleware implements NestMiddleware {
  private readonly logger = new Logger(LatencyMiddleware.name);

  use(req: Request, res: Response, next: NextFunction) {
    const start = Date.now();
    res.on('finish', () => {
      const duration = Date.now() - start;
      if (req.body && req.body.query) {
        const parsedQuery: DocumentNode = parse(req.body.query);
        const definitions: any = parsedQuery.definitions[0];

        const fieldsRequest = definitions.selectionSet.selections
          .filter(
            (selection: any) =>
              selection.kind === 'Field' && selection.name.value !== '__schema',
          )
          .map((selection: any) => selection.name.value);

        if (fieldsRequest.length) {
          this.logger.log(
            `GraphQL operation fields names: ${fieldsRequest} took ${duration}ms`,
          );
        }
      } else {
        this.logger.log(`Request to ${req.originalUrl} took ${duration}ms`);
      }
    });
    next();
  }
}
