import { useNavigate } from "react-router-dom";
import './PostCard.css';

export default function PostCard({ post }) {
  const redirect = useNavigate();

  const clickOnPost = () => {
    return redirect(`/feed/${post.id}`)
  }

  return (
    <div className="post-card" onClick={clickOnPost}>
      <h4 className="post-card-mount-name">{post.featured_mount}</h4>
      <img className="post-card-image" src={post.post_image} />
      <p className="post-card-caption">{post.caption}</p>
    </div>
  )
}
