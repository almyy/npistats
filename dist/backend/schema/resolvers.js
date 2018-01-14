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
        }(),
        allGames: function () {
            var _ref5 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(root, data, _ref6) {
                var Games = _ref6.mongo.Games;
                return _regenerator2.default.wrap(function _callee3$(_context3) {
                    while (1) {
                        switch (_context3.prev = _context3.next) {
                            case 0:
                                _context3.next = 2;
                                return Games.find({}).toArray();

                            case 2:
                                return _context3.abrupt('return', _context3.sent);

                            case 3:
                            case 'end':
                                return _context3.stop();
                        }
                    }
                }, _callee3, undefined);
            }));

            return function allGames(_x7, _x8, _x9) {
                return _ref5.apply(this, arguments);
            };
        }(),
        gamesByOwnerId: function () {
            var _ref7 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4(root, data, _ref8) {
                var _ref8$mongo = _ref8.mongo,
                    Games = _ref8$mongo.Games,
                    Owners = _ref8$mongo.Owners;
                var owners, games, promises;
                return _regenerator2.default.wrap(function _callee4$(_context4) {
                    while (1) {
                        switch (_context4.prev = _context4.next) {
                            case 0:
                                _context4.next = 2;
                                return Owners.find({}).toArray();

                            case 2:
                                owners = _context4.sent;
                                _context4.next = 5;
                                return Games.find({
                                    $or: [{ awayTeamId: data.ownerId }, { homeTeamId: data.ownerId }]
                                }).toArray();

                            case 5:
                                games = _context4.sent;
                                promises = [owners, games];
                                _context4.next = 9;
                                return Promise.all(promises).then(function (result) {
                                    return games.map(function (game) {
                                        console.log(game);
                                        var awayTeam = owners.filter(function (owner) {
                                            return owner.id == game.awayTeamId;
                                        })[0];
                                        var homeTeam = owners.filter(function (owner) {
                                            return owner.id == game.homeTeamId;
                                        })[0];

                                        return {
                                            uuid: game.uuid,
                                            winner: game.winner,
                                            loser: game.loser,
                                            homeTeamId: homeTeam,
                                            awayTeamId: awayTeam,
                                            homeTeamScore: game.homeTeamScore,
                                            awayTeamScore: game.awayTeamScore,
                                            season: game.season,
                                            week: game.week
                                        };
                                    });
                                });

                            case 9:
                                return _context4.abrupt('return', _context4.sent);

                            case 10:
                            case 'end':
                                return _context4.stop();
                        }
                    }
                }, _callee4, undefined);
            }));

            return function gamesByOwnerId(_x10, _x11, _x12) {
                return _ref7.apply(this, arguments);
            };
        }(),
        ownerByOwnerId: function () {
            var _ref9 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee5(root, data, _ref10) {
                var Owners = _ref10.mongo.Owners;
                return _regenerator2.default.wrap(function _callee5$(_context5) {
                    while (1) {
                        switch (_context5.prev = _context5.next) {
                            case 0:
                                _context5.next = 2;
                                return Owners.findOne({ id: data.ownerId });

                            case 2:
                                return _context5.abrupt('return', _context5.sent);

                            case 3:
                            case 'end':
                                return _context5.stop();
                        }
                    }
                }, _callee5, undefined);
            }));

            return function ownerByOwnerId(_x13, _x14, _x15) {
                return _ref9.apply(this, arguments);
            };
        }()
    },

    Mutation: {
        createLink: function () {
            var _ref11 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee6(root, data, _ref12) {
                var Links = _ref12.mongo.Links;
                var newLink, response;
                return _regenerator2.default.wrap(function _callee6$(_context6) {
                    while (1) {
                        switch (_context6.prev = _context6.next) {
                            case 0:
                                newLink = (0, _extends3.default)({ id: 21 }, data);
                                _context6.next = 3;
                                return Links.insert(newLink);

                            case 3:
                                response = _context6.sent;
                                return _context6.abrupt('return', Object.assign({ id: response.insertedIds[0] }, newLink));

                            case 5:
                            case 'end':
                                return _context6.stop();
                        }
                    }
                }, _callee6, undefined);
            }));

            return function createLink(_x16, _x17, _x18) {
                return _ref11.apply(this, arguments);
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