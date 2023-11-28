// Packages
const express = require("express");
const app = express();
const { createServer } = require("http");
const { Server } = require("socket.io");
const httpServer = createServer(app);
const cors = require("cors");
const fs = require("fs");

const bcrypt = require("bcrypt");

// Middlewares
app.use(express.static("public"));
app.use(express.json());

const io = new Server(httpServer);
let playerIndex = 0;
let are_players_ready = [false, false];

// Http server connection
httpServer.listen(8000, () => {
  console.log("The game server has started...");
});

// This helper function checks whether the text only contains word characters
function containWordCharsOnly(text) {
  return /^\w+$/.test(text);
}

// Handle the /register endpoint
app.post("/register", (req, res) => {
  // Get the JSON data from the body
  const { username, password } = req.body;

  //
  // D. Reading the users.json file
  //
  const users = JSON.parse(fs.readFileSync("data/users.json"));

  //
  // E. Checking for the user data correctness
  //
  if (!username) {
    res.json({ status: "error", error: "Username is empty." });
    return;
  }

  //   if (!avatar) {
  //     res.json({ status: "error", error: "Avatar is empty." });
  //     return;
  //   }

  //   if (!name) {
  //     res.json({ status: "error", error: "Name is empty." });
  //     return;
  //   }

  if (!password) {
    res.json({ status: "error", error: "Password is empty." });
    return;
  }

  if (!containWordCharsOnly(username)) {
    res.json({ status: "error", error: "Invalid username." });
    return;
  }

  if (username in users) {
    res.json({ status: "error", error: "User already exists." });
    return;
  }

  //
  // G. Adding the new user account
  //
  const hash = bcrypt.hashSync(password, 10);
  users[username] = { password: hash };
  console.log(users);

  //
  // H. Saving the users.json file
  //
  fs.writeFileSync("data/users.json", JSON.stringify(users, null, " "));

  //
  // I. Sending a success response to the browser
  //
  res.json({ status: "success" });
});

// Handle the /signin endpoint
app.post("/signin", (req, res) => {
  // Get the JSON data from the body
  const { username, password } = req.body;

  //
  // D. Reading the users.json file
  //
  const users = JSON.parse(fs.readFileSync("data/users.json"));

  //
  // E. Checking for username/password
  //
  if (username in users === false) {
    res.json({ status: "error", error: "User does not exist." });
    return;
  }
  const hashedPassword = users[username].password;

  if (!bcrypt.compareSync(password, hashedPassword)) {
    res.json({ status: "error", error: "Incorrect password." });
    return;
  }

  //
  // G. Sending a success response with the user account
  //
  //   const avatar = users[username].avatar;
  //   const name = users[username].name;
  //   req.session.user = { username, avatar, name };
  res.json({ status: "success", user: { username } });
});

io.on("connection", (socket) => {
  socket.on("assign player", () => {
    are_players_ready[playerIndex] = true;
    playerIndex++;
    if (playerIndex >= 2) {
      playerIndex = 0;
    }
    socket.emit("receive player", (playerIndex + 1).toString());

    if (are_players_ready[0] == true && are_players_ready[1] == true) {
      io.emit("player ready");
      are_players_ready[0] = false;
      are_players_ready[1] = false;
    }
  });

  // Handling player movement
  socket.on("player move", (num) => {
    socket.broadcast.emit("move player", num);
  });
  socket.on("player stop", (num) => {
    socket.broadcast.emit("stop player", num);
  });
  socket.on("player jump", (cor) => {
    socket.broadcast.emit("jump player", cor);
  });
  socket.on("player fall", (cor) => {
    socket.broadcast.emit("fall player", cor);
  });

  socket.on("save score", (data) => {
    let scores = fs.readFileSync("./data/scores.json");

    if (scores.toJSON().data.length > 0) {
      scores = JSON.parse(fs.readFileSync("./data/scores.json"));
      if (
        scores.some(
          (s) =>
            s.player1 == data.player1 &&
            s.player2 == data.player2 &&
            s.score == data.score
        )
      ) {
        socket.emit("send scores", scores);
        return;
      }
    } else {
      scores = [];
    }

    scores.push({
      player1: data.player1,
      player2: data.player2,
      score: data.score,
    });

    function compareByScore(a, b) {
      return a.score - b.score;
    }

    scores = scores.sort(compareByScore);
    scores = scores.reverse();
    fs.writeFileSync("./data/scores.json", JSON.stringify(scores));
    socket.emit("send scores", scores);
  });
});
