import React, { useEffect, useState } from "react";
import axios from "axios";
import "../style/allblogs.css";

const Allblogs = () => {
  const [blogsData, setBlogsData] = useState([]);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("desc");

  useEffect(() => {
    getBlog();
  }, []);

  const getBlog = async () => {
    try {
      const response = await axios.get(`http://localhost:5001/api/viewblog?sortBy=${sortOrder}`);
      setBlogsData(response.data);
    } catch (error) {
      console.error("There was an error fetching the blog data:", error);
      setError(error);
    }
  };
  
  const handleSort = () => {
    if (sortOrder === "desc") {
      setSortOrder("asc");
    } else {
      setSortOrder("desc");
    }
    getBlog();
  };

  const deleteBlog = async (id) => {
    try {
      await axios.delete(`http://localhost:5001/api/deleteblog/${id}`);
      getBlog();
    } catch (error) {
      console.error("There was an error deleting the blog:", error);
      setError(error);
    }
  };

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5001/api/search?q=${searchTerm}`
      );
      setBlogsData(response.data);
    } catch (error) {
      console.error("There was an error searching for blogs:", error);
      setError(error);
    }
  };

  if (error) {
    return <div>Error fetching blogs data: {error.message}</div>;
  }

  return (
    <div className="container mt-4">
    <h1 className="title my-4 text-center">Blogs List</h1>
    <div className="d-flex justify-content-between align-items-center">
      <div>
        <button onClick={handleSort} className="btn btn-primary btn-sm">
          Sort by Date {sortOrder === "desc" ? "↑" : "↓"}
        </button>
      </div>

      <div className="search-bar">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search blogs..."
          className="form-control w-75"
        />

        <button onClick={handleSearch} className="btn btn-primary">
          Search
        </button>
      </div>
    </div>
    <table className="blogs-table table table-bordered table-striped mt-4">
      <thead>
        <tr>
          <th>Title</th>
          <th>Description</th>
          <th>Category</th>
          <th>Publish Date</th>
          <th>Action</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
        {blogsData.map((blog) => (
          <tr key={blog._id}>
            <td>{blog.blog_title}</td>
            <td>{blog.blog_des}</td>
            <td>{blog.blog_category}</td>
            <td>{blog.blog_publish_date}</td>
            <td>
              <a
                href={`updateblog/${blog._id}`}
                className="btn btn-primary btn-sm"
              >
                Edit
              </a>
            </td>
            <td>
              <button
                onClick={() => deleteBlog(blog._id)}
                className="btn btn-danger btn-sm"
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
  );
};

export default Allblogs;
