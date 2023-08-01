const express = require("express");
const DHT = require("hyperdht");
const goodbye = require("graceful-goodbye");
const b4a = require("b4a");
const bodyParser = require('body-parser');

const app = express();
const dht = new DHT();

const keyPair = DHT.keyPair();

app.get("/", (req, res) => {
  res.send("Luganodes");
});
let userID=''
let type = ""
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.post("/", (req, res)=>{
    const {type_of_user, user_id} =req.body
    userID = user_id
    type = type_of_user
    recallFn()
    res.send("Hello")
})
let messages = []
app.get('/messages', (req, res)=>{
    res.send({messages})
})

const port = process.env.PORT || 5000;
const recallFn=()=>{
    if (type === "main") {
        const server = dht.createServer(async (conn) => {
          console.log("got connection!");
          await process.stdin.pipe(conn).pipe(process.stdout);
        });
        server.listen(keyPair).then(() => {
          console.log("listening on:", b4a.toString(keyPair.publicKey, "hex"));
        });
      }
      if (type === "client") {
        console.log(
          "Connecting to:",
          userID
        );
        const publicKey = b4a.from(
          userID,
          "hex"
        );
        const conn = dht.connect(publicKey);
        conn.once("open", () => console.log("got connection!"));
        conn.on("data", (data) => {
            const message = data.toString();
            console.log("Received message:", message);
            messages.push(message);
          });
      
        process.stdin.pipe(conn).pipe(process.stdout);
      }
}


const start = async () => {
  try {
    app.listen(port, console.log(`Server is listening on port ${port}...`));
  } catch (error) {
    console.log(error);
  }
};

start();
goodbye(() => server.close());
