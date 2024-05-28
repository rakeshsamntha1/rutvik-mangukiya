import React, { useState } from "react";
import "../style/createblogs.css";
import axios from "axios"; 
import { Link } from "react-router-dom";
const Createbook = () => {
  // const [message,setMessage]=useState('');
  const [blogData, setblogData] = useState({
    blog_title: "",
    blog_des: "",
    blog_category: "",
  });

  const handleInputChange = (e) => { 
    
    const { name, value } = e.target;
    setblogData({
      ...blogData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    try {
      const response = await axios.post(
        "http://localhost:5001/api/addblog",
        blogData
      );
      console.log(response);
      setblogData({
        blog_title: "",
        blog_des: "",
        blog_category: "",
      });
      //  setMessage("Your Data Is Submitted")
    } 
    
    catch (error) {
      console.error(error);
    }
    e.preventDefault();

  };

  return (
    <div>
      <h1 className="text-center mt-3">"Create Article Here"</h1>
      <form onSubmit={handleSubmit} className="form">
        <div className="formGroup">
          <label className="label">
            Blog Name:-
            <input
              type="text"
              value={blogData.blog_title}
              onChange={handleInputChange} 
              required
              className="input"
              name="blog_title"
            />
          </label>
        </div>
        <div className="formGroup">
          <label className="label">
            Description:-
            <input
              type="text"
              value={blogData.blog_des}
              onChange={handleInputChange} 
              require
              className="input"
              name="blog_des"
            />
          </label>
        </div>
        <div className="formGroup">
          <label className="label">
           Category:-
            <input
              type="text"
              value={blogData.blog_category}
              onChange={handleInputChange} 
              required
              className="input"
              name="blog_category"
            />
          </label>
        </div>
        <button
          type="submit"
          value={"Add Blog"}
          className="button"
          name="AddBlog"
        >
          Slug Your Blog
        </button>
        <Link to="/blogs">
      <button className="btn btn-primary mx-auto mt-2">View All Data</button></Link>
      </form>
      {/* <p>{message}</p> */}
      
    </div>
  );
};

export default Createbook;
