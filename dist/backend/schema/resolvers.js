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
        }(),
        allOwners: function () {
            var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(root, data, _ref4) {
                var Owners = _ref4.mongo.Owners;
                return _regenerator2.default.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                _context2.next = 2;
                                return Owners.find({}).toArray();

                            case 2:
                                return _context2.abrupt('return', _context2.sent);

                            case 3:
                            case 'end':
                                return _context2.stop();
                        }
                    }
                }, _callee2, undefined);
            }));

            return function allOwners(_x4, _x5, _x6) {
                return _ref3.apply(this, arguments);
            };
        }()
    },

    Mutation: {
        createLink: function () {
            var _ref5 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(root, data, _ref6) {
                var Links = _ref6.mongo.Links;
                var newLink, response;
                return _regenerator2.default.wrap(function _callee3$(_context3) {
                    while (1) {
                        switch (_context3.prev = _context3.next) {
                            case 0:
                                newLink = (0, _extends3.default)({ id: 21 }, data);
                                _context3.next = 3;
                                return Links.insert(newLink);

                            case 3:
                                response = _context3.sent;
                                return _context3.abrupt('return', Object.assign({ id: response.insertedIds[0] }, newLink));

                            case 5:
                            case 'end':
                                return _context3.stop();
                        }
                    }
                }, _callee3, undefined);
            }));

            return function createLink(_x7, _x8, _x9) {
                return _ref5.apply(this, arguments);
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