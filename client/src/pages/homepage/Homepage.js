import { useState , useEffect} from "react";

import Header from "../../components/header/header.js";
import Posts from "../../components/posts/posts.js";
import Sidebar from "../../components/sidebar/sidebar.js";
import "./homepage.css";
import { useLocation } from "react-router";

import axios from "axios";

export default function Homepage() {
  const [posts,setPosts] = useState([]);
  const { search } = useLocation();

  useEffect(()=>{
    const fetchPosts = async ()=>{
      const res = await axios.get("https://blog-webapp-server.herokuapp.com/api/posts" + search)
      setPosts(res.data);
    }
    fetchPosts();
  },[search]);
  return (
        <div>
          <Header />
          <div className = "home">
               <Posts posts = {posts}/>
               <Sidebar />
          </div>
        </div>
  );
}
