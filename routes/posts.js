const express = require("express");
const router = express.Router();

// Import express validator
const { body, validationResult } = require("express-validator");

// Import database
const connection = require("../config/database");

/**
 * Index Post
 */
router.get("/", function (req, res) {
  // Query
  connection.query(
    "SELECT * FROM posts ORDER BY id DESC",
    function (err, rows) {
      if (err) {
        return res.status(500).json({
          status: false,
          message: "Internal Server Error",
        });
      } else {
        return res.status(200).json({
          status: true,
          message: "List Data Posts",
          data: rows,
        });
      }
    }
  );
});

/**
 * Store Post
 */
router.post(
  "/store",
  [
    // Validation
    body("title").notEmpty(),
    body("content").notEmpty(),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({
        errors: errors.array(),
      });
    }

    // Define formData
    let formData = {
      title: req.body.title,
      content: req.body.content,
    };

    // Insert query
    connection.query("INSERT INTO posts SET ?", formData, function (err, rows) {
      if (err) {
        return res.status(500).json({
          status: false,
          message: "Internal Server Error",
        });
      } else {
        return res.status(201).json({
          status: true,
          message: "Insert Data Successfully",
          data: rows[0],
        });
      }
    });
  }
);

/**
 * Show Post
 */
router.get("/(:id)", function (req, res) {
  let id = req.params.id;

  connection.query(
    `SELECT * FROM posts WHERE id = ${id}`,
    function (err, rows) {
      if (err) {
        return res.status(500).json({
          status: false,
          message: "Internal Server Error",
        });
      }

      // If post not found
      if (rows.length <= 0) {
        return res.status(404).json({
          status: false,
          message: "Data post not found",
        });
      } else {
        // If post found
        return res.status(200).json({
          status: true,
          message: "Detail data post",
          data: rows[0],
        });
      }
    }
  );
});

/**
 * Update Post
 */
router.patch(
  "/update/(:id)",
  [
    // Validation
    body("title").notEmpty(),
    body("content").notEmpty(),
  ],
  function (req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({
        errors: errors.array(),
      });
    }

    // Id post
    let id = req.params.id;

    // Data post
    let formData = {
      title: req.body.title,
      content: req.body.content,
    };

    // Update query
    connection.query(
      `UPDATE posts SET ? WHERE id = ${id}`,
      formData,
      function (err, rows) {
        if (err) {
          return res.status(500).json({
            status: false,
            message: "Internal Server Error",
          });
        } else {
          return res.status(200).json({
            status: true,
            message: "Update data successfully",
          });
        }
      }
    );
  }
);

/**
 * Delete Post
 */
router.delete("/delete/(:id)", function (req, res) {
  let id = req.params.id;

  connection.query(`DELETE FROM posts WHERE id = ${id}`, function (err, rows) {
    if (err) {
      return res.status(500).json({
        status: false,
        message: "Internal Server Error",
      });
    } else {
      return res.status(200).json({
        status: true,
        message: "Delete data successfully",
      });
    }
  });
});

module.exports = router;
