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
  const [feedLoaded, setFeedLoaded] = useState(false);

  let postsAuthor = 'Someone';
  if (Object.values(userPosts).length) {
    postsAuthor = userPosts[0].author_name;
  }

  useEffect(() => {
    const getPosts = async () => {
      await dispatch(allUsersPostsThunk(userId));
      setFeedLoaded(true);
    }

    getPosts();
  }, [dispatch, userId]);

  return feedLoaded ? (
    <div className="main-feed-container">
      {
        currentUser && currentUser.id == userId ? <h1 className="main-feed-header">My Posts</h1> : <h1 className="main-feed-header">{postsAuthor}&apos;s Posts</h1>
      }
      <div className="main-feed-add-button-container">
        {
          currentUser && <NavLink className="fake-button" to={'/feed/new'}>Make a Post!</NavLink>
        }
      </div>
      <div className="all-posts-container">
        {userPosts.map(post => (
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
