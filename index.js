const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

// Import library cors
const cors = require("cors");

// Use cors
app.use(cors());

// Import body parser
const bodyParser = require('body-parser');

// Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// Parse application/json
app.use(bodyParser.json());

// Import route posts
const postsRouter = require("./routes/posts");

app.use("/api/posts", postsRouter); // Use route posts

app.listen(port, () => {
  console.log(`App running at http://localhost:${port}`);
});
