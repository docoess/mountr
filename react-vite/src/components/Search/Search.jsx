import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { searchPostsThunk } from "../../redux/post";
import PostCard from "../PostCard/PostCard";
import './Search.css';

export default function Search() {
  const dispatch = useDispatch();
  const { searchQuery } = useParams();
  const searchPosts = useSelector(state => Object.values(state.posts));
  const [feedLoaded, setFeedLoaded] = useState(false);

  useEffect(() => {
    const getPosts = async () => {
      await dispatch(searchPostsThunk(searchQuery));
      setFeedLoaded(true);
    }

    getPosts();
  }, [dispatch]);

  return feedLoaded ? (
    <div className="main-feed-container">
      <h1 className="main-feed-header">Results for "{searchQuery}"</h1>
      <div className="all-posts-container">
        {searchPosts.map(post => (
          <PostCard post={post} key={post.id} />
        ))}
      </div>
    </div>
  ) :
  (
    <div className="search-feed-container">
      <h1 className="loading-text">Loading...</h1>
    </div>
  )
}
