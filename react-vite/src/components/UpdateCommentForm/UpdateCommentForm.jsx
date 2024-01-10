import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateCommentThunk } from "../../redux/post";
import './UpdateCommentForm.css';


export default function UpdateCommentForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { postId, commentId } = useParams();
  const post = useSelector(state => state.posts[postId]);
  let comment;
  if (post) {
    comment = post['comments'][commentId];
  }
  const [commentContent, setCommentContent] = useState(comment?.content);
  const [validationErrors, setValidationErrors] = useState({});
  const [hasSubmitted, setHasSubmitted] = useState(false);

  useEffect(() => {
    const errors = {};

    if (commentContent?.length < 2) {
      errors.content = "Comment must be at least 2 characters"
    }

    setValidationErrors(errors)
  }, [commentContent])

  const handleSubmit = async e => {
    e.preventDefault();

    setHasSubmitted(true);

    if (Object.values(validationErrors).length) {
      return
    }

    const formData = new FormData();
    formData.append('content', commentContent);
    let updatedComment = dispatch(updateCommentThunk(commentId, postId, formData));
    setHasSubmitted(false);
    navigate(`/feed/${postId}`);
  }

  return (
    <div className="update-comment-container">
      <h1>Update your comment!</h1>
      <form className="update-comment-form"
      onSubmit={handleSubmit}
      encType="multipart/form-data">
        <label className="update-comment-input">
          <input
            type="text"
            value={commentContent}
            onChange={e => setCommentContent(e.target.value)}
            required
          />
          <p className="error">
            {hasSubmitted && validationErrors.content && (
              <span className="error">{validationErrors.content}</span>
            )}
          </p>
        </label>
        <button className="update-comment-button">Submit</button>
      </form>
    </div>
  )
}
