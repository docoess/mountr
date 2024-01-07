const GET_POSTS = '/posts/GET_POSTS';
const GET_SINGLE_POST = '/posts/GET_SINGLE_POST';
const CREATE_POST = '/posts/CREATE_POST';
const UPDATE_POST = '/posts/UPDATE';

const getAllPosts = posts => ({
  type: GET_POSTS,
  payload: posts
})

const getSinglePost = post => ({
  type: GET_SINGLE_POST,
  payload: post
})

const createPost = post => ({
  type: CREATE_POST,
  payload: post
})

const updatePost = postId => ({
  type: UPDATE_POST,
  payload: postId
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

export const singlePostThunk = (postId) => async dispatch => {
  const res = await fetch(`/api/feed/${postId}`);
  if (res.ok) {
    const post = await res.json();
    if (post.errors) {
      return post.errors;
    }
    dispatch(getSinglePost(post))
    return post
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

export const updatePostThunk = (postId, formData) => async dispatch => {
  try {
    const res = await fetch(`/api/feed/${postId}/update`, {
      method: "PUT",
      body: formData
    })

    if (res.ok) {
      const post = await res.json();
      dispatch(updatePost(postId))
    } else {
      const post = await res.json()
      return post
    }
  } catch (e) {
    console.log('update thunk errors', e)
    return e
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

    case GET_SINGLE_POST: {
      return {...state, [action.payload.id]: action.payload}
    }

    case CREATE_POST: {
      const newState = {...state};
      console.log('CREATE POST THUNK payload', action.payload);
      return {...newState, [action.payload.id]: action.payload}
    }

    case UPDATE_POST: {
      const newState = {...state, [action.payload]:{...state[action.payload]}}
      return newState
    }

    default:
      return state;
  }
}

export default postsReducer;
