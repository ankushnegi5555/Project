import * as swaggerJSDoc from 'swagger-jsdoc';

const options: any = {
  apis: [
    'dist/src/**/*.js',
    './dist/src/libs/swagger.js',
    './dist/src/controllers/owner/routes.js',
    './dist/src/controllers/user/routes.js',
    './dist/src/controllers/productManager/routes.js',
    './dist/src/controllers/order/routes.js',
  ],
  swaggerDefinition: {
    basePath: '/api',
    info: {
      description: 'Test Api',
      swagger: '3.5.0',
      openApi: '3.0.0',
      title: 'My Api',
      version: '1.0.0'
    },
    securityDefinitions: {
      Bearer: {
        in: 'Headers',
        name: 'Authorization',
        type: 'apiKey'
      }
    },
    servers: ['http://localhost:9000']
  }
};

const swaggerOptions = swaggerJSDoc(options);
export default swaggerOptions;