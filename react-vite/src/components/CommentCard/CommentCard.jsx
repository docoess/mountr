import './CommentCard.css';

export default function CommentCard( {comment} ) {
  return (
    <div className="comment-card-container">
      <p>
        <span className="comment-author">{comment.author_name}</span> says: <span className="comment-content">{comment.content}</span>
      </p>
    </div>
  )
}
