import { createBrowserRouter } from 'react-router-dom';
import LoginFormPage from '../components/LoginFormPage';
import SignupFormPage from '../components/SignupFormPage';
import LandingPage from '../components/LandingPage/LandingPage';
import MainFeedPage from '../components/MainFeedPage/MainFeedPage';
import Layout from './Layout';
import CreatePostForm from '../components/CreatePostForm/CreatePostForm';
import SinglePost from '../components/SinglePost/SinglePost';

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <LandingPage />,
      },
      {
        path: "login",
        element: <LoginFormPage />,
      },
      {
        path: "signup",
        element: <SignupFormPage />,
      },
      {
        path: "feed",
        element: <MainFeedPage />,
      },
      {
        path: "feed/new",
        element: <CreatePostForm />
      },
      {
        path: "feed/:postId",
        element: <SinglePost />
      },
    ],
  },
]);
