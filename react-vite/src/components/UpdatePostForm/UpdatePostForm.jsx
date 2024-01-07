import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { singlePostThunk, updatePostThunk } from "../../redux/post";

export default function UpdatePostForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { postId } = useParams();
  const post = useSelector(state => state.posts[postId]);
  const [caption, setCaption] = useState(post?.caption);
  const [postImage, setPostImage] = useState(post?.postImage);
  const [featuredMount, setFeaturedMount] = useState(post?.featuredMount);
  const [imageLoading, setImageLoading] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});
  const [hasSubmitted, setHasSubmitted] = useState(false);

  useEffect(() => {
    dispatch(singlePostThunk(postId));
  }, [dispatch, postId])

  useEffect(() => {
    const errors = {};

    if (featuredMount?.length < 4) {
      errors.featuredMount = 'Mount name must be at least 4 characters'
    }

    if (caption?.length < 3) {
      errors.caption = 'Caption must be at least 3 characters'
    }

    setValidationErrors(errors)
  }, [featuredMount, caption]);

  const handleSubmit = async e => {
    e.preventDefault();

    setHasSubmitted(true)

    if (Object.values(validationErrors).length) {
      return
    }

    const formData = new FormData();
    formData.append('post_image', postImage);
    formData.append('caption', caption);
    formData.append('featured_mount', featuredMount);

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
          <span> What mount are you showing off? </span>
          <input
            type='text'
            value={featuredMount}
            placeholder="Mount name"
            onChange={e => setFeaturedMount(e.target.value)}
            required/>
          {hasSubmitted && validationErrors.featuredMount && (
            <span className="error">{validationErrors.featuredMount}</span>
          )}
        </label>
        <label className="update-post-input">
          <span>Please provide a short caption for your post:</span>
          <input
            type="text"
            value={caption}
            placeholder="Caption"
            onChange={e => setCaption(e.target.value)}
            required/>
          {hasSubmitted && validationErrors.caption && (
            <span className="error">{validationErrors.caption}</span>
          )}
        </label>
        <label className="update-post-input">
          <span>Upload your mount image!</span>
          <input
            type='file'
            accept="image/*"
            onChange={e => setPostImage(e.target.files[0])}/>
        </label>
        <button className="update-submit-button">Submit</button>
        {(imageLoading)&& <p>Loading...</p>}
      </form>
    </div>
  )
}
