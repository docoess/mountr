const GET_POSTS = '/posts/GET_POSTS';
const GET_SINGLE_POST = '/posts/GET_SINGLE_POST';
const CREATE_POST = '/posts/CREATE_POST';
const UPDATE_POST = '/posts/UPDATE';
const DELETE_POST = '/posts/DELETE';
const CREATE_COMMENT = '/comments/CREATE_COMMENT';
const DELETE_COMMENT = '/comments/DELETE';
const UPDATE_COMMENT = '/comments/UPDATE';
const GET_USERS_POSTS = '/posts/user/GET_POSTS';

const getAllPosts = posts => ({
  type: GET_POSTS,
  payload: posts
})

const getUserPosts = posts => ({
  type: GET_USERS_POSTS,
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

const deletePost = postId => ({
  type: DELETE_POST,
  payload: postId
})

const createComment = (comment, postId) => ({
  type: CREATE_COMMENT,
  payload: {comment, postId}
})

const deleteComment = (commentId, postId) => ({
  type: DELETE_COMMENT,
  payload: {commentId, postId}
})

const updateComment = (commentId, postId, comment) => ({
  type: UPDATE_COMMENT,
  payload: {commentId, postId, comment}
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

export const allUsersPostsThunk = userId => async dispatch => {
  const res = await fetch(`/api/feed/user/${userId}`);
  if (res.ok) {
    const posts = await res.json();
    if (posts.errors) {
      return posts.errors;
    }
    dispatch(getUserPosts(posts))
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

export const deletePostThunk = postId => async dispatch => {
  const res = await fetch(`/api/feed/${postId}/delete`, {
    method: 'DELETE'
  })

  if (res.ok) {
    const post = await res.json();
    dispatch(deletePost(postId))
  } else {
      const e = await res.json()
      console.log(e)
      return null
  }
}

export const createCommentThunk = (comment, postId) => async dispatch => {
  const res = await fetch(`/api/feed/${postId}/comment/new`, {
    method: 'POST',
    body: comment
  })

  if (res.ok) {
    const newComment = await res.json();
    dispatch(createComment(newComment, postId));
  } else {
    const e = await res.json();
    console.log(e);
    return null;
  }
}

export const deleteCommentThunk = (commentId, postId) => async dispatch => {
  const res = await fetch(`/api/feed/${postId}/comment/${commentId}/delete`, {
    method: 'DELETE'
  });

  if (res.ok) {
    const post = await res.json();
    dispatch(deleteComment(commentId, postId));
  } else {
    const e = await res.json();
    console.log(e);
    return null;
  }
}

export const updateCommentThunk = (commentId, postId, formData) => async dispatch => {
  const res = await fetch(`/api/feed/${postId}/comment/${commentId}/update`, {
    method: "PUT",
    body: formData
  });

  if (res.ok) {
    const comment = await res.json();
    dispatch(updateComment(commentId, postId, comment))
  } else {
    const post = await res.json()
    return post
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

    case GET_USERS_POSTS: {
      const newState = {};
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
      return {...newState, [action.payload.id]: action.payload}
    }

    case UPDATE_POST: {
      const newState = {...state, [action.payload]:{...state[action.payload]}}
      return newState
    }

    case DELETE_POST: {
      const newState = {...state};
      delete newState[action.payload];
      return newState;
    }

    case CREATE_COMMENT: {
      const newState = {...state};
      newState[action.payload.postId]['comments'] = {};
      newState[action.payload.postId]['comments'][action.payload.comment.id] = action.payload.comment;
      return newState;
    }

    case DELETE_COMMENT: {
      const newState = {...state};
      return newState;
    }

    case UPDATE_COMMENT: {
      const newState = {...state};
      newState[action.payload.postId]['comments'][action.payload.commentId] = action.payload.comment;
      return newState
    }

    default:
      return state;
  }
}

export default postsReducer;
