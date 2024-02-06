import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createPostThunk } from "../../redux/post";
import { allMountsThunk } from "../../redux/mount";
import './CreatePostForm.css'
import placeholderImage from '../../placeholder.jpg';

export default function CreatePostForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [caption, setCaption] = useState('');
  const [postImage, setPostImage] = useState('');
  const [imageLoading, setImageLoading] = useState(false)
  const [hasSubmitted, setHasSubmitted] = useState(false)
  const [validationErrors, setValidationErrors] = useState({});
  const [imageURL, setImageURL] = useState(placeholderImage);
  const mounts = useSelector(state => state.mounts);
  const [featuredMount, setFeaturedMount] = useState('Abyss Worm');

  useEffect(() => {
    const errors = {};

    // if (featuredMount.length < 4) {
    //   errors.featuredMount = 'Mount name must be at least 4 characters'
    // } else if (featuredMount.length > 50) {
    //   errors.featuredMount = 'Mount name must be less than 50 characters'
    // }

    if (caption.length < 3) {
      errors.caption = 'Caption must be at least 3 characters'
    } else if (caption.length > 50) {
      errors.caption = 'Caption must be less than 50 characters'
    }

    if (!postImage || postImage?.length < 1) {
      errors.postImage = 'An image file is required'
    }

    setValidationErrors(errors)
  }, [caption, postImage]);

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

  const fileWrap = (e) => {
    e.stopPropagation();

    const tempFile = e.target.files[0];

    const newImageURL = URL.createObjectURL(tempFile);
    setImageURL(newImageURL);
    setPostImage(tempFile);
  }

  useEffect(() => {
    const getMounts = async () => {
      await dispatch(allMountsThunk());
    }

    getMounts();
  }, [dispatch])

  return (
    <div className="new-post-container">
      <h1 className="new-post-header">Create a new post!</h1>
      <form className="new-post-form"
      onSubmit={handleSubmit}
      encType="multipart/form-data">
        <label className="new-post-input">
          <span>*What mount are you showing off? </span>
          <select name="featured_mount"
            onChange={e => setFeaturedMount(e.target.value)}
          >
            {
              mounts && mounts.map(mount => (
                <option key={mount.id}>{mount.name}</option>
              ))
            }
          </select>
        </label>
        <label className="new-post-input">
          <span>*Please provide a short caption for your post:</span>
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
          <input type="file" accept="image/png, image/jpeg, image/jpg" id="new-post-image-input" onChange={fileWrap}></input>
          <label htmlFor="new-post-image-input" className="file-input-labels-noname"><img src={imageURL} className="thumbnails-noname"></img></label>
          <p className="error">
              {hasSubmitted && validationErrors.postImage && (
                <span className="error">{validationErrors.postImage}</span>
              )}
          </p>
        </div>
        <button className="new-post-submit-button">Submit</button>
        {(imageLoading)&& <p>Loading...</p>}
      </form>
    </div>
  )
}
