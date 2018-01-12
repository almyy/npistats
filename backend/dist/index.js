'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _apolloServerExpress = require('apollo-server-express');

var _graphqlTools = require('graphql-tools');

var _typeDefinitions = require('./schema/typeDefinitions');

var _typeDefinitions2 = _interopRequireDefault(_typeDefinitions);

var _resolvers = require('./schema/resolvers');

var _resolvers2 = _interopRequireDefault(_resolvers);

var _mongoconnector = require('./mongoconnector');

var _mongoconnector2 = _interopRequireDefault(_mongoconnector);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var start = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
    var mongo, schema, app;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return (0, _mongoconnector2.default)();

          case 2:
            mongo = _context.sent;
            schema = (0, _graphqlTools.makeExecutableSchema)({
              typeDefs: _typeDefinitions2.default,
              resolvers: _resolvers2.default
            });
            app = (0, _express2.default)();


            app.use('/graphql', _bodyParser2.default.json(), (0, _apolloServerExpress.graphqlExpress)({
              context: { mongo: mongo },
              schema: schema
            }));

            app.use('/graphiql', (0, _apolloServerExpress.graphiqlExpress)({ endpointURL: '/graphql' }));

            app.listen(5000, function () {
              console.log('Go to http://localhost:3000/graphiql to run queries!');
            });

          case 8:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function start() {
    return _ref.apply(this, arguments);
  };
}();
start();