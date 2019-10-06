const PORT = process.env.PORT || 5000;
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');

module.exports = (app) => {
  const swaggerDefinition = {
    info: {
      title: 'Docs API',
      version: '0.0.1',
    },
    host: `localhost:${PORT}`,
    basePath: '/',
  };

  const options = {
    swaggerDefinition,
    apis: ['./routes/*.js'],
  };

  const swaggerSpec = swaggerJSDoc(options);

  app.get('/api-docs.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
  });

  app.use('/api/swagger', swaggerUI.serve, swaggerUI.setup(swaggerSpec));
};