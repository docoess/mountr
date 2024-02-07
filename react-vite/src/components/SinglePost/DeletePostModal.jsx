import { useModal } from "../../context/Modal";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { allPostsThunk, deletePostThunk } from "../../redux/post";
import './DeletePostModal.css';

export default function DeletePostModal({ postId }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { closeModal } = useModal();

  const handleConfirm = async () => {
    await dispatch(deletePostThunk(postId));
    await dispatch(allPostsThunk());
    closeModal();
    navigate('/feed');
  }

  const close = () => {
    closeModal()
  }

  return (
    <div className="delete-modal">
      <h3>Are you sure you want to delete this post?</h3>
      <button onClick={handleConfirm} className="delete-modal-button-confirm">Yes</button>
      <button onClick={close} className="delete-modal-button-cancel">No</button>
    </div>
  )
}
