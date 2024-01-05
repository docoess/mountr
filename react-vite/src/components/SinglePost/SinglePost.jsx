import { NavLink, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import './SinglePost.css';
import { singlePostThunk } from "../../redux/post";

export default function SinglePost() {
  const dispatch = useDispatch();
  const { postId } =  useParams();
  const post = useSelector((state) => state.posts[postId]);
  const currentUser = useSelector((state) => state.session.user);


  useEffect(() => {
    const getPost = async () => {
      await dispatch(singlePostThunk(postId))
    }

    getPost();
  }, [dispatch, postId])

  return post && (
    <div>
      <NavLink to='/feed'>&lt; Back</NavLink>
      <div className="single-post-container">
        <img className="single-post-image" src={post.post_image}/>
        <div className="single-post-details">
          <span>{post.featured_mount} owned by {post.author && post.author.username}</span>
        </div>
      </div>
      <div className="comments-container">

      </div>
    </div>
  )
}
