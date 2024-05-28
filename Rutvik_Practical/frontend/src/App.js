import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Createblog from "./component/Createblog";
import Allblogs from "./component/Allblogs";
import Updateblog from "./component/Updateblog";
// import Searchblog from "./component/Searchblog";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Createblog/>} />
          <Route exact path="/blogs" element={<Allblogs/>} />
          <Route exact path="/updateblog/:bid" element={<Updateblog/>} />
          {/* <Route exact path="/search" element={<Searchblog/>} /> */}

        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
