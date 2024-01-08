export default function CommentCard( {comment} ) {
  return (
    <div className="comment-card-container">
      <p>{comment.author_name} says: {comment.content}</p>
    </div>
  )
}
