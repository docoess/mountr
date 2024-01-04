const GET_POSTS = '/posts/GET_POSTS';
const CREATE_POST = '/posts/CREATE_POST';

const getAllPosts = posts => ({
  type: GET_POSTS,
  payload: posts
})

const createPost = post => ({
  type: CREATE_POST,
  payload: post
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

export const createPostThunk = formData => async dispatch => {
  const res = await fetch('/api/feed/new', {
    method: 'POST',
    body: formData
  });

  if (res.ok) {
    const post = await res.json();
    dispatch(createPost(post));
    return post;
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

    case CREATE_POST: {
      const newState = {...state};
      console.log('CREATE POST THUNK payload', action.payload);
      return {...newState, [action.payload.id]: action.payload}
    }

    default:
      return state;
  }
}

export default postsReducer;
