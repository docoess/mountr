import { useDispatch, useSelector } from "react-redux";
import { allPostsThunk } from "../../redux/post";
import { useEffect, useState } from "react";
import PostCard from '../PostCard/PostCard';
import './MainFeedPage.css';
import { NavLink } from "react-router-dom";

export default function MainFeedPage() {
  const dispatch = useDispatch();
  const allPosts = useSelector(state => Object.values(state.posts));
  const currentUser = useSelector((state) => state.session.user);
  const [feedLoaded, setFeedLoaded] = useState(false);

  useEffect(() => {
    const getPosts = async () => {
      await dispatch(allPostsThunk());
      setFeedLoaded(true);
    }

    getPosts();
  }, [dispatch]);

  return feedLoaded ? (
    <div className="main-feed-container">
      <h1 className="main-feed-header">All Posts</h1>
      <span className="search-span">Search: </span>
      <div className="main-feed-add-button-container">
        {
          currentUser && <NavLink className="fake-button" to={'/feed/new'}>Make a Post!</NavLink>
        }
      </div>
      <div className="all-posts-container">
        {allPosts.map(post => (
          <PostCard post={post} key={post.id} />
        ))}
      </div>
    </div>
  ) :
  (
    <div className="main-feed-container">
      <h1 className="loading-text">Loading...</h1>
    </div>
  )
}
