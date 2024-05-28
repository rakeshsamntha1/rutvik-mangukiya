import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const Updateblog = () => {
  const navigate = useNavigate();
  //   const [message,setMessage]=useState('');
  const { bid } = useParams();

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

  useEffect(() => {
    axios
      .get(`http://localhost:5001/api/viewblog/${bid}`)
      .then((response) => {
        setblogData({
          ...blogData,
          blog_title: response.data.blog_title,
          blog_des: response.data.blog_des,
          blog_category: response.data.blog_category,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `http://localhost:5001/api/updateblog/${bid}`,
        blogData
      );
      console.log(response);
      setblogData({
        blog_title: "",
        blog_des: "",
        blog_category: "",
      });
      navigate("/blogs");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1 className="text-center mt-4">Add Blog</h1>
      <form className="form" onSubmit={handleSubmit}>
        <div className="formGroup">
          <label className="label">
            Title:
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
            Description:
            <input
              type="text"
              value={blogData.blog_des}
              onChange={handleInputChange}
              required
              className="input"
              name="blog_des"
            />
          </label>
        </div>
        <div className="formGroup">
          <label className="label">
            Category:
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
          value={"update blog"}
          className="button"
          name="Updateblog"
        >
          Submit
        </button>
      </form>
      {/* <p>{message}</p> */}
      {/* {bid} */}
    </div>
  );
};

export default Updateblog;
