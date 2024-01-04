import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

export default function CreatePostForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [caption, setCaption] = useState('');
  const [postImage, setPostImage] = useState('');
  const [featuredMount, setFeaturedMount] = useState('');
  const [imageLoading, setImageLoading] = useState(false)
  const [hasSubmitted, setHasSubmitted] = useState(false)
  const [validationErrors, setValidationErrors] = useState({})



  return (
    <div className="new-post-container">
      <h1 className="new-post-header">Create a new post!</h1>
      <form className="new-post-form"
      onSubmit={handleSubmit}
      encType="multipart/form-data">
        <label className="new-post-input">
          <input
            type='text'
            value={featuredMount}
            placeholder="What Mount are you sharing?"
            onChange={e => setFeaturedMount(e.target.value)}
            required/>
        </label>

      </form>
    </div>
  )
}
