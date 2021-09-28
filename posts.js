const router = require("express").Router();
const User = require("./User");
const Post = require("./Post");
const { rawListeners } = require("./User");

//CREATE POST
router.post("/", async (req, res) => {
  const newPost = new Post(req.body);
  try {
    const savedPost = await newPost.save();
    res.status(200).json(savedPost);
  } catch (error) {
    res.status(500).json(error);
  }
});

//UPDATE POST
// router.put("/:id", async (req, res) => {
//   try {
//     const post = await Post.findById(req.params.id);
//     try {
//       const updatedPost = await post.updateOne({}, { done: "done" });
//       res.status(200).json(updatedPost);
//     } catch (error) {
//       res.status(500).json(error);
//     }
//   } catch (error) {
//     res.status(500).json(error);
//   }
// });
// router.put("/update/:id", function (req, res) {
//   let id = req.params.id;
//   ChoiceModel.findOne({ _id: id }, function (err, foundObject) {
//     if (err) {
//       console.log(err);
//       res.status(500).json();
//     } else {
//       if (!foundObject) {
//         res.status(404).json();
//       } else {
//         if (req.body.done) {
//           foundObject.done = req.body.done;
//         }
//         foundObject.save(function (err, updatedObject) {
//           res.send(updatedObject);
//         });
//       }
//     }
//   });
// });

router.put("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.username === req.body.username) {
      try {
        const updatedPost = await Post.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          { new: true }
        );
        res.status(200).json(updatedPost);
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(401).json("You can update only your post!");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});
// DELETE POST

router.delete("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.username === req.body.username) {
      try {
        await post.delete();
        res.status(200).json("Post deleted");
      } catch (error) {
        res.status(500).json(error);
      }
    } else {
      res.status(401).json("you can't delete it");
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

//GET POST
router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json(error);
  }
});

// router.get("/", async (req, res) => {
//   try {
//     const task = await Post.findAll(req.params.date);
//     res.status(200).json(task);
//   } catch (error) {
//     res.status(500).json(error);
//   }
// });

//GET ALL POSTS
router.get("/", async (req, res) => {
  const username = req.query.user;
  const catName = req.query.cat;
  try {
    let posts;
    if (username) {
      posts = await Post.find({ username });
    } else if (catName) {
      posts = await Post.find({
        categories: {
          $in: [catName],
        },
      });
    } else {
      posts = await Post.find();
    }
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json(error);
  }
});
module.exports = router;
