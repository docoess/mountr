import { useDispatch, useSelector } from "react-redux";
import { allUsersPostsThunk } from "../../redux/post";
import { useEffect, useState } from "react";
import PostCard from '../PostCard/PostCard';
import './MyFeedPage.css';
import { NavLink, useParams } from "react-router-dom";

export default function MyFeedPage() {
  const dispatch = useDispatch();
  const userPosts = useSelector(state => Object.values(state.posts));
  const { userId } = useParams();
  const currentUser = useSelector(state => state.session.user);

  useEffect(() => {
    const getPosts = async () => {
      await dispatch(allUsersPostsThunk(userId));
    }

    getPosts();
  }, [dispatch, userId]);

  return (
    <div className="main-feed-container">
      <h1 className="main-feed-header">All Posts</h1>
      <div className="main-feed-add-button-container">
        {
          currentUser && <NavLink className="fake-button" to={'/feed/new'}>Create a Post!</NavLink>
        }
      </div>
      <div className="all-posts-container">
        {userPosts.map(post => (
          <PostCard post={post} key={post.id} />
        ))}
      </div>
    </div>
  )
}
