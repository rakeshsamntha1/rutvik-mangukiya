const express = require("express");
const router = express.Router();

const Blog = require("../models/blogs");
const { format } = require("date-fns");
const curd = new Date();

const today = format(curd, "yyyy-MM-dd ", {
  timeZone: "Asia/Kolkata",
});

router.post("/addblog", async (req, res) => {
  try {
    const newBlog = new Blog({
      blog_title: req.body.blog_title,
      blog_des: req.body.blog_des,
      blog_category: req.body.blog_category,
      blog_publish_date: today,
    });
    const saveBlog = await newBlog.save();
    res.json(saveBlog);
  } catch (error) {
    console.error(error);
  }
});

router.get("/viewblog", async (req, res) => {
  try {
    const { sortBy } = req.query;
    let sortQuery = {};
    if (sortBy === "asc") {
      sortQuery = { blog_publish_date: 1 };
    } else if (sortBy === "desc") {
      sortQuery = { blog_publish_date: -1 };
    } else {
      sortQuery = { blog_publish_date: -1 };
    }
    const blogs = await Blog.find().sort(sortQuery);
    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/viewblog/:id", async (req, res) => {
  try {
    const blogs = await Blog.findById(req.params.id);
    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/search", async (req, res) => {
  try {
    const query = req.query.q;
    const regex = new RegExp(query, "i");
    const blogs = await Blog.find({
      $or: [
        { blog_title: regex },
        { blog_des: regex },
        { blog_category: regex },
      ],
    });
    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put("/updateblog/:id", async (req, res) => {
  try {
    const blogs = await Blog.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete("/deleteblog/:id", async (req, res) => {
  try {
    const blogs = await Blog.findByIdAndDelete(req.params.id);
    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
