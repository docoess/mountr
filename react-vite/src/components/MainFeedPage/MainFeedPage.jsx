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

  useEffect(() => {
    const getPosts = async () => {
      await dispatch(allPostsThunk());
    }

    getPosts();
  }, [dispatch]);

  return (
    <div className="main-feed-container">
      <h1 className="main-feed-header">All Posts</h1>
      <div className="main-feed-add-button-container">
        {
          currentUser && <NavLink to={'/feed/new'}>Create a Post!</NavLink>
        }
      </div>
      <div className="all-posts-container">
        {allPosts.map(post => (
          <PostCard post={post} key={post.id} />
        ))}
      </div>
    </div>
  )
}
