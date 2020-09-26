import express from 'express';
import bodyParser from 'body-parser';
import { createServer } from 'http';
import { ApolloServer } from 'apollo-server-express';
import { UserAPI, OrderAPI, ProductAPI, OwnerAPI } from './datasource';

export default class Server {
  constructor(config) {
      this.config = config;
      this.app = express();
  }

  run = () => {
    const { port, env } = this.config;
    this.httpServer.listen(port, () => {
      console.log(`Server started at ${port} ${env}`);
    })
  }
  
  initBodyParser = () => {
    const { app } = this;
    app.use('/graphql',bodyParser.urlencoded({ extended: false }));
    app.use('/graphql',bodyParser.json());
    return this;
  };

  bootstrap = () => {
      this.initBodyParser();
      return this;
  };
  
  setupApollo = (schema) => {
    const { app } = this;
    this.server = new ApolloServer({
      ...schema,
      dataSources: () => {
        return {
          userAPI: new UserAPI(),
          ownerAPI: new OwnerAPI(),
          productAPI: new ProductAPI(),
          orderAPI: new OrderAPI(),
        };
      },
      context: ({ req }) => {
        if (req) {
          return { token: req.headers.authorization };
        }
        return {};
      },
      healthCheck : () => (resolve) => {
        resolve('I am Ok');
      }
    });
    this.server.applyMiddleware({ app });
    this.httpServer = createServer(app);
    this.server.installSubscriptionHandlers(this.httpServer);
    this.run();
  };
}