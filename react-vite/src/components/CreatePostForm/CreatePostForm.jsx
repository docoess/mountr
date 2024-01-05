import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { createPostThunk } from "../../redux/post";

export default function CreatePostForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [caption, setCaption] = useState('');
  const [postImage, setPostImage] = useState('');
  const [featuredMount, setFeaturedMount] = useState('');
  const [imageLoading, setImageLoading] = useState(false)
  const [hasSubmitted, setHasSubmitted] = useState(false)
  const [validationErrors, setValidationErrors] = useState({})

  useEffect(() => {
    const errors = {};

    if (featuredMount.length < 4) {
      errors.featuredMount = 'Mount name must be at least 4 characters'
    }

    if (caption.length < 3) {
      errors.caption = 'Caption must be at least 3 characters'
    }

    if (!postImage || postImage?.length < 1) {
      errors.postImage = 'An image file is required'
    }

    setValidationErrors(errors)
  }, [featuredMount, caption, postImage]);

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
    let post = await dispatch(createPostThunk(formData));
    setHasSubmitted(false);
    navigate('/feed');
  }

  return (
    <div className="new-post-container">
      <h1 className="new-post-header">Create a new post!</h1>
      <form className="new-post-form"
      onSubmit={handleSubmit}
      encType="multipart/form-data">
        <label className="new-post-input">
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
        <label className="new-post-input">
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
        <label className="new-post-input">
          <span>Upload your mount image!</span>
          <input
            type='file'
            accept="image/*"
            onChange={e => setPostImage(e.target.files[0])}/>
          {hasSubmitted && validationErrors.postImage && (
            <span className="error">{validationErrors.postImage}</span>
          )}
        </label>
        <button className="new-post-submit-button">Submit</button>
        {(imageLoading)&& <p>Loading...</p>}
      </form>
    </div>
  )
}
