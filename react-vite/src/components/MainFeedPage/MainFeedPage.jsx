import { useDispatch, useSelector } from "react-redux";
import { allPostsThunk } from "../../redux/post";
import { useEffect, useState } from "react";
import PostCard from '../PostCard/PostCard';
import './MainFeedPage.css';
import { NavLink, useNavigate } from "react-router-dom";

export default function MainFeedPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const allPosts = useSelector(state => Object.values(state.posts));
  const currentUser = useSelector((state) => state.session.user);
  const [feedLoaded, setFeedLoaded] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [validationErrors, setValidationErrors] = useState({});
  const [hasSubmitted, setHasSubmitted] = useState(false);

  useEffect(() => {
    const getPosts = async () => {
      await dispatch(allPostsThunk());
      setFeedLoaded(true);
    }

    getPosts();
  }, [dispatch]);

  useEffect(() => {
    const errors = {};

    if (!searchQuery) {
      errors.searchQuery = 'Please enter an item to search for'
    }

    setValidationErrors(errors);
  }, [searchQuery]);

  const handleSubmit = async e => {
    e.preventDefault();

    setHasSubmitted(true);

    if (Object.values(validationErrors).length) {
      return
    }

    setHasSubmitted(false);
    navigate(`/feed/search/${searchQuery}`);
  }

  return feedLoaded ? (
    <div className="main-feed-container">
      <h1 className="main-feed-header">All Posts</h1>
      <form className="search-form"
      onSubmit={handleSubmit}
      encType="multipart/form-data">
        <label className="search-input">
          <input
            type="text"
            value={searchQuery}
            placeholder="Mount Name"
            onChange={e => setSearchQuery(e.target.value)}
            required/>
        </label>
        <button className="search-submit-button fake-button">Search!</button>
      </form>
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
