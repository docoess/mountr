import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { thunkSignup } from "../../redux/session";
import { useNavigate } from "react-router-dom";
import "./SignupForm.css";
import logo from '../../mountr-logo.jpeg';

function SignupFormModal() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const { closeModal } = useModal();

  useEffect(() => {
    const validationErrors = {};

    if (username.length < 4) {
      validationErrors.username = 'Username must be at least 4 characters'
    } else if (username.length > 40) {
      validationErrors.username = 'Username must be at most 40 characters'
    }

    if (password.length < 8) {
      validationErrors.password = 'Password must be at least 8 characters'
    } else if (password.length > 40) {
      validationErrors.password = 'Password must be at most 40 characters'
    }

    if (password !== confirmPassword) {
      validationErrors.confirm = 'Confirm Password field must be the same as the Password field'
    }

    setErrors(validationErrors);
  }, [username, password, confirmPassword, email])

  const handleSubmit = async (e) => {
    e.preventDefault();

    setHasSubmitted(true);

    if (Object.values(errors).length) {
      return
    }

    const serverResponse = await dispatch(
      thunkSignup({
        email,
        username,
        password,
      })
    );

    if (serverResponse) {
      setErrors(serverResponse);
    } else {
      setHasSubmitted(false);
      navigate('/feed');
      closeModal();
    }
  };

  return (
    <div className="signup-form-container">
      <img className="modal-logo" src={logo}/>
      <h3 className="signup-header">Sign Up and start your collection today!</h3>
      {errors.server && <p>{errors.server}</p>}
      <form className="signup-form" onSubmit={handleSubmit}>
        <label className="signup-form-input">
          <span>*Email</span>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <p className="error">
          {
            hasSubmitted && errors.email && <span>{errors.email}</span>
          }
        </p>
        <label className="signup-form-input">
          <span>*Username</span>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>
        <p className="error">
          {
            hasSubmitted && errors.username && <span>{errors.username}</span>
          }
        </p>
        <label className="signup-form-input">
        <span>*Password</span>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <p className="error">
          {
            hasSubmitted && errors.password && <span>{errors.password}</span>
          }
        </p>
        <label className="signup-form-input">
        <span>*Confirm Password</span>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </label>
        <p className="error">
          {
            hasSubmitted && errors.confirm && <span>{errors.confirm}</span>
          }
        </p>
        <button className="signup-button" type="submit">Sign Up</button>
      </form>
    </div>
  );
}

export default SignupFormModal;
