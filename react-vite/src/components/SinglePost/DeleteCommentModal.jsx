import { useModal } from "../../context/Modal";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteCommentThunk, singlePostThunk } from "../../redux/post";
import './DeleteCommentModal.css';

export default function DeleteCommentModal({ commentId, postId }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { closeModal } = useModal();

  const handleConfirm = async () => {
    await dispatch(deleteCommentThunk(commentId, postId));
    await dispatch(singlePostThunk(postId))
    closeModal();
    navigate(`/feed/${postId}`);
  }

  const close = () => {
    closeModal();
  }

  return (
    <div className="delete-modal">
      <h3>Are you sure you want to delete this comment?</h3>
      <button onClick={handleConfirm} className="delete-modal-button-confirm">Yes</button>
      <button onClick={close} className="delete-modal-button-cancel">No</button>
    </div>
  )
}
