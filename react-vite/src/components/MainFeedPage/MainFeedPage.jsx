import { useDispatch, useSelector } from "react-redux";
import { allPostsThunk } from "../../redux/post";
import { useEffect, useState } from "react";
import PostCard from '../PostCard/PostCard';
import './MainFeedPage.css';

export default function MainFeedPage() {
  const dispatch = useDispatch();
  const allPosts = useSelector(state => Object.values(state.posts));

  useEffect(() => {
    const getPosts = async () => {
      await dispatch(allPostsThunk());
    }

    getPosts();
  }, [dispatch]);

  console.log('MAIN FEED ALL POSTS', allPosts)

  return (
    <div className="main-feed-container">
      <h1 className="main-feed-header">All Posts</h1>
      <div className="all-posts-container">
        {allPosts.map(post => (
          <PostCard post={post} key={post.id} />
        ))}
      </div>
    </div>
  )
}
