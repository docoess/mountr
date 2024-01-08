import { NavLink, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";
import DeletePostModal from "./DeletePostModal";
import './SinglePost.css';
import { createCommentThunk, singlePostThunk } from "../../redux/post";
import CommentCard from "../CommentCard/CommentCard";

export default function SinglePost() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { postId } =  useParams();
  const post = useSelector((state) => state.posts[postId]);
  const currentUser = useSelector((state) => state.session.user);
  const [commentContent, setCommentContent] = useState('');
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});


  useEffect(() => {
    const getPost = async () => {
      await dispatch(singlePostThunk(postId))
    }

    getPost();
  }, [dispatch, postId])

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
    navigate(`/feed/${postId}`);
  }

  return post && (
    <div>
      <NavLink to='/feed'>&lt; Back</NavLink>
      <div className="single-post-container">
        <img className="single-post-image" src={post.post_image}/>
        <div className="single-post-details">
          {
            post && currentUser && post.authorId == currentUser.id && (
              <div>
                <NavLink to={`/feed/${postId}/update`} className={"fake-button"}>Update</NavLink> <OpenModalMenuItem itemText={'Delete'} modalComponent={<DeletePostModal postId={postId} />} className={"fake-button"} />
              </div>
            )
          }
          <span className="single-post-mount">{post.featured_mount}</span> <span>owned by</span> <span className="single-post-owner">{post.author && post.author.username}</span>
          <p>{post.caption}</p>
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
              </form>
            </div>
          )
        }
      </div>
      <div className="comments-container">
          {
            post?.comments && post.comments.map(comment => (
              <CommentCard key={comment.id} comment={comment} />
            ))
          }
      </div>
    </div>
  )
}
