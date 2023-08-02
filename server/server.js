const express = require("express");
const DHT = require("hyperdht");
const goodbye = require("graceful-goodbye");
const b4a = require("b4a");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(cors());
const dht = new DHT();

const keyPair = DHT.keyPair();

app.get("/", (req, res) => {
  res.send("Luganodes");
});
let userID = "";
let type = "";
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.post("/", async (req, res) => {
  const { type_of_user, user_id } = req.body;
  userID = user_id;
  type = type_of_user;

  if (type === "main") {
    const chatID = recallFn();
    res.send({ chatID });
  } else {
    res.send({ chatID: userID });
  }
});
let messages = [];
app.get("/messages", (req, res) => {
  res.send({ messages });
});

const port = process.env.PORT || 5000;
const recallFn = () => {
  if (type === "main") {
    const server = dht.createServer(async (conn) => {
      console.log("got connection!");
      await process.stdin.pipe(conn).pipe(process.stdout);
      conn.on("data", (data) => {
        const message = data.toString();
        messages.push({ otherSide: message });
      });
    });
    server.listen(keyPair).then(() => {
      console.log("listening on:", b4a.toString(keyPair.publicKey, "hex"));
      process.stdin.on("data", (data) => {
        const inputMessage = data.toString().trim();
        if (inputMessage.length > 0) {
          messages.push({ mySide: inputMessage });
        }
      });
    });
    return b4a.toString(keyPair.publicKey, "hex");
  }

  //   CLIENT SIDE
  if (type === "client") {
    console.log("Connecting to:", userID);
    const publicKey = b4a.from(userID, "hex");
    const conn = dht.connect(publicKey);
    conn.once("open", () => console.log("got connection!"));
    conn.on("data", (data) => {
      const message = data.toString();
      messages.push({ otherSide: message });
    });

    process.stdin.pipe(conn).pipe(process.stdout);
    process.stdin.on("data", (data) => {
      const inputMessage = data.toString().trim();
      if (inputMessage.length > 0) {
        messages.push({ mySide: inputMessage });
      }
    });
  }
};

const start = async () => {
  try {
    app.listen(port, console.log(`Server is listening on port ${port}...`));
  } catch (error) {
    console.log(error);
  }
};

start();
goodbye(() => server.close());
