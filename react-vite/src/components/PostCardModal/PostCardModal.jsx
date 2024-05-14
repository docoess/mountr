import { useNavigate } from "react-router-dom";
import './PostCardModal.css';

export default function PostCardModal({ post }) {
  const redirect = useNavigate();

  const clickOnPostModal = () => {
    return redirect(`/feed/${post.id}`)
  }

  return (
    <div className="post-card-modal" onClick={clickOnPostModal}>
      <h3 className="post-card-modal-mount-name">{post.featured_mount}</h3>
      <img className="post-card-modal-image" src={post.post_image} />
      <p className="post-card-modal-author">by {post.author_name}</p>
      <p className="post-card-modal-comments-num">{post.comments_num} comments</p>
    </div>
  )
}
