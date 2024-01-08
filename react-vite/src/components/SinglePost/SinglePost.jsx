import { NavLink, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";
import DeletePostModal from "./DeletePostModal";
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
          {
            post && currentUser && post.authorId == currentUser.id && (
              <div>
                <NavLink to={`/feed/${postId}/update`}>Update</NavLink> <OpenModalMenuItem itemText={'Delete'} modalComponent={<DeletePostModal postId={postId} />} className={"fake-button"} />
              </div>
            )
          }
          <span className="single-post-mount">{post.featured_mount}</span> <span>owned by</span> <span className="single-post-owner">{post.author && post.author.username}</span>
          <p>{post.caption}</p>
        </div>
      </div>
      <div className="comments-container">

      </div>
    </div>
  )
}
