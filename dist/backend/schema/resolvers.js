'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var resolvers = {
    Query: {
        allLinks: function () {
            var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(root, data, _ref2) {
                var Links = _ref2.mongo.Links;
                return _regenerator2.default.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                _context.next = 2;
                                return Links.find({}).toArray();

                            case 2:
                                return _context.abrupt('return', _context.sent);

                            case 3:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, undefined);
            }));

            return function allLinks(_x, _x2, _x3) {
                return _ref.apply(this, arguments);
            };
        }()
    },

    Mutation: {
        createLink: function () {
            var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(root, data, _ref4) {
                var Links = _ref4.mongo.Links;
                var newLink, response;
                return _regenerator2.default.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                console.log(root);
                                newLink = (0, _extends3.default)({ id: 21 }, data);
                                _context2.next = 4;
                                return Links.insert(newLink);

                            case 4:
                                response = _context2.sent;
                                return _context2.abrupt('return', Object.assign({ id: response.insertedIds[0] }, newLink));

                            case 6:
                            case 'end':
                                return _context2.stop();
                        }
                    }
                }, _callee2, undefined);
            }));

            return function createLink(_x4, _x5, _x6) {
                return _ref3.apply(this, arguments);
            };
        }()
    },

    Link: {
        id: function id(root) {
            return root._id || root.id;
        }
    },
    Subscription: {
        Link: {
            subscribe: function subscribe() {
                return pubsub.asyncIterator('Link');
            }
        }
    }
};

exports.default = resolvers;