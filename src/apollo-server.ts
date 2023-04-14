import { ApolloGateway } from '@apollo/gateway';
import { ApolloServer } from 'apollo-server';
import { parse } from 'graphql';

async function startServer() {
  const gateway = new ApolloGateway({
    serviceList: [{ name: 'example', url: 'http://localhost:8080/graphql' }],
  });

  const server = new ApolloServer({
    gateway,
    subscriptions: false,
    plugins: [
      {
        requestDidStart() {
          const requestStartDate = new Date().getTime();
          return {
            willSendResponse(requestContext) {
              if (
                requestContext.request.query.startsWith(
                  '\n    query IntrospectionQuery',
                )
              )
                return;
              const ast = parse(requestContext.request.query);
              const definition: any = ast.definitions[0];
              const selectionSet = definition.selectionSet.selections[0];
              const fieldName = selectionSet.name.value;
              const requestEndDate = new Date().getTime();

              console.log(
                `Latency: ${
                  requestEndDate - requestStartDate
                } ms at "${fieldName}" field`,
              );
            },
          };
        },
      },
    ],
  });

  const { url } = await server.listen();
  console.log(`Gateway ready at ${url}`);
}

startServer().catch(console.error);
