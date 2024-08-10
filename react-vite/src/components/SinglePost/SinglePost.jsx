import { NavLink, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";
import DeletePostModal from "./DeletePostModal";
import DeleteCommentModal from "./DeleteCommentModal";
import { FaRegStar, FaStar } from "react-icons/fa";
import wowheadLogo from '../../wowhead-logo.png';
import './SinglePost.css';
import { createCommentThunk, singlePostThunk } from "../../redux/post";
import { singleMountThunk } from "../../redux/mount";
import CommentCard from "../CommentCard/CommentCard";

export default function SinglePost() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { postId } =  useParams();
  const post = useSelector((state) => state.posts[postId]);
  const currentUser = useSelector((state) => state.session.user);
  const [commentContent, setCommentContent] = useState('');
  const [wanted, setWanted] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});
  const [postLoaded, setPostLoaded] = useState(false);

  useEffect(() => {
    const getPost = async () => {
      await dispatch(singlePostThunk(postId));
      if (currentUser) {
        const wantStatus = await dispatch(singleMountThunk(postId));
        if (wantStatus === undefined || !Object.values(wantStatus).length) {
          setWanted(false)
        } else {
          setWanted(true)
        }
      }

      setPostLoaded(true)
    }

    getPost();
  }, [dispatch, postId, currentUser])

  useEffect(() => {
    const errors = {};

    if (commentContent.length < 2) {
      errors.commentContent = 'Comment must be at least 2 characters'
    } else if (commentContent.length > 400) {
      errors.commentContent = 'Comment must be less than 400 characters'
    }

    setValidationErrors(errors);
  }, [commentContent])

  const handleSubmit = async e => {
    e.preventDefault();

    setHasSubmitted(true);

    if (Object.values(validationErrors).length) {
      return
    }

    const formData = new FormData();
    formData.append('content', commentContent);

    let comment = await dispatch(createCommentThunk(formData, postId));
    await dispatch(singlePostThunk(postId));
    setHasSubmitted(false);
    setCommentContent('');
    navigate(`/feed/${postId}`);
  }

  const addWant = async () => {
    if (currentUser) {
      await fetch(`/api/mounts/${post.featured_mount}/want`, {
      method: 'POST'
    });
      setWanted(!wanted);
    }
  }

  const removeWant = async () => {
    if (currentUser) {
      await fetch(`/api/mounts/${post.featured_mount}/unwant`, {
        method: 'PATCH'
      });
      setWanted(!wanted);
    }
  }

  return (postLoaded && post) ? (
    <div className="single-post-main">
      <NavLink className="back-button" to='/feed'>&lt; Back</NavLink>
      <div className="single-post-container">
        <a href={post.post_image} target="_">
          <img className="single-post-image" src={post.post_image}/>
        </a>
        <div className="single-post-details">
          {
            post && currentUser && post.authorId == currentUser.id && (
              <div className="post-buttons">
                <NavLink to={`/feed/${postId}/update`} className={"fake-button-update"}>Update</NavLink> <OpenModalMenuItem itemText={'Delete'} modalComponent={<DeletePostModal postId={postId} />} className={"fake-button-delete"} />
              </div>
            )
          }
          <a className="wowhead-mount-link" href={`https://www.wowhead.com/mount/${post.blizzId}`}><img className="wowhead-logo" src={wowheadLogo} /></a><span className="single-post-mount">{post.featured_mount}</span> <span>owned by</span> <span className="single-post-owner">{post.author && post.author.username}</span>
          <p className="single-post-caption">{post.caption}</p>
          <div>
            {
              currentUser &&
              (!wanted ?
              <span className="wanted-mount-selection"><FaRegStar onClick={addWant} className="want-mount-button" /> want?</span>
              :
              <span className="wanted-mount-selection"><FaStar onClick={removeWant} className="want-mount-button" /> wanted!</span>
              )
            }
          </div>
        </div>
        {
          post && currentUser && (
            <div className="inline-comment-form">
              <form className="new-comment-form"
              onSubmit={handleSubmit}
              encType="multipart/form-data">
                <label className="new-comment-input">
                  <input
                    type='text'
                    value={commentContent}
                    placeholder="Comment"
                    onChange={e => setCommentContent(e.target.value)}
                    required
                  />
                </label>
                <button className="comment-submit-button">Submit</button>
                <p className="error">
                  {
                    hasSubmitted && validationErrors.commentContent && (
                      <span className="error">{validationErrors.commentContent}</span>
                  )}
                </p>
              </form>
            </div>
          )
        }
      </div>
      {
        post && Object.keys(post.comments).length > 0 ? (
          <div className="comments-container-holder">
            <div className="comments-container">
                {
                  post?.comments && Object.values(post.comments).map(comment => (
                    <div className="comment" key={comment.id}>
                    <CommentCard comment={comment} />
                      {
                      currentUser && comment?.authorId === currentUser.id && <span className="comment-buttons"><NavLink to={`/feed/${postId}/comment/${comment.id}/update`} className={"fake-button-update"}>Update</NavLink><OpenModalMenuItem itemText={'Delete'} modalComponent={<DeleteCommentModal postId={postId} commentId={comment.id} />} className={"fake-button-delete"} /></span>
                      }
                    </div>
                  ))
                }
            </div>
          </div>
      ) : (
        <div className="comments-container-holder">
          <div className="comments-container">
            <p>No comments yet! Why not leave one?</p>
          </div>
        </div>
      )
      }
    </div>
  ) :
  (
    <div className="single-post-main">
      <h1 className="loading-text">Loading...</h1>
    </div>
  )
}
