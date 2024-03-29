import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { singlePostThunk, updatePostThunk } from "../../redux/post";
import './UpdatePostForm.css';

export default function UpdatePostForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { postId } = useParams();
  const post = useSelector(state => state.posts[postId]);
  const [caption, setCaption] = useState(post?.caption);
  const [postImage, setPostImage] = useState(post?.post_image);
  const [featuredMount, setFeaturedMount] = useState(post?.featured_mount);
  const [imageLoading, setImageLoading] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [imageURL, setImageURL] = useState(post?.post_image);

  useEffect(() => {
    dispatch(singlePostThunk(postId));
  }, [dispatch, postId])

  useEffect(() => {
    const errors = {};

    if (caption?.length < 3) {
      errors.caption = 'Caption must be at least 3 characters'
    } else if (caption.length > 50) {
      errors.caption = 'Caption must be less than 50 characters'
    }

    setValidationErrors(errors)
  }, [caption]);

  const fileWrap = (e) => {
    e.stopPropagation();

    const tempFile = e.target.files[0];

    const newImageURL = URL.createObjectURL(tempFile);
    setImageURL(newImageURL);
    setPostImage(tempFile);
  }

  const handleSubmit = async e => {
    e.preventDefault();

    setHasSubmitted(true)

    if (Object.values(validationErrors).length) {
      return
    }

    const formData = new FormData();
    formData.append('post_image', postImage);
    formData.append('caption', caption);

    setImageLoading(true);
    let post = await dispatch(updatePostThunk(postId, formData));
    setHasSubmitted(false);
    navigate(`/feed/${postId}`);
  }

  return (
    <div className="update-post-container">
      <h1 className="update-post-header">Update a post!</h1>
      <form className="update-post-form"
      onSubmit={handleSubmit}
      encType="multipart/form-data">
        <label className="update-post-input">
          <span>Please provide a short caption for your post:</span>
          <input
            type="text"
            value={caption}
            placeholder="Caption"
            onChange={e => setCaption(e.target.value)}
            required/>
          <p className="error">
            {hasSubmitted && validationErrors.caption && (
              <span className="error">{validationErrors.caption}</span>
            )}
          </p>
        </label>
        <div className="file-inputs-container">
          <input type="file" accept="image/png, image/jpeg, image/jpg" id="update-image-input" onChange={fileWrap}></input>
          <label htmlFor="update-image-input" className="file-input-labels-noname"><img src={imageURL} className="thumbnails-noname"></img></label>
        </div>
        <button className="update-submit-button">Submit</button>
        {(imageLoading)&& <p>Loading...</p>}
      </form>
    </div>
  )
}
