const GET_POSTS = '/posts/GET_POSTS';

const getAllPosts = posts => ({
  type: GET_POSTS,
  payload: posts
})

export const allPostsThunk = () => async dispatch => {
  const res = await fetch('/api/feed');
  if (res.ok) {
    const posts = await res.json();
    if (posts.errors) {
      return posts.errors;
    }
    dispatch(getAllPosts(posts))
    return posts
  }
}

function postsReducer(state = {}, action) {
  switch (action.type) {
    case GET_POSTS: {
      const newState = {...state};
      action.payload.forEach(post => {
        newState[post.id] = post
      });

      return newState;
    }

    default:
      return state;
  }
}

export default postsReducer;
