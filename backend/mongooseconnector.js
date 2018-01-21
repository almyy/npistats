import Mongoose from "mongoose";
const MONGO_URL = process.env.MONGO_URL;

console.log("ANO:THEUNEOTUH", MONGO_URL);
Mongoose.Promise = global.Promise;

const mongo = Mongoose.connect(MONGO_URL);

const GameSchema = Mongoose.Schema({
  uuid: String,
  winner: String,
  loser: String,
  homeTeamScore: Number,
  awayTeamScore: Number,
  homeTeamId: String,
  awayTeamId: String,
  season: Number,
  week: Number,
});

const OwnerSchema = Mongoose.Schema({
  id: String,
  teamNames: [String],
  ownerName: String,
});

const Owner = Mongoose.model("owners", OwnerSchema);
const Game = Mongoose.model("games", GameSchema);

export { Game, Owner };
