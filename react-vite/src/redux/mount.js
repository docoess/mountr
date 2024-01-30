const GET_MOUNTS = '/mounts/GET_MOUNTS';
const GET_SINGLE_MOUNT = '/mounts/GET_SINGLE_MOUNT';

const getAllMounts = mounts => ({
  type: GET_MOUNTS,
  payload: mounts
})

const getSingleMount = mount => ({
  type: GET_SINGLE_MOUNT,
  payload: mount
})

export const allMountsThunk = () => async dispatch => {
  const res = await fetch('/api/feed/mounts');
  if (res.ok) {
    const mounts = await res.json();
    dispatch(getAllMounts(mounts));
    return mounts;
  }
}

export const singleMountThunk = (postId) => async dispatch => {
  const res = await fetch(`/api/mounts/${postId}`);
  if (res.ok) {
    const mount = await res.json();
    dispatch(getSingleMount(mount));
    return mount;
  }
}

function mountsReducer(state = [], action) {
  switch (action.type) {
    case GET_MOUNTS: {
      const newState = action.payload;

      return newState
    }

    case GET_SINGLE_MOUNT: {
      const newState = [action.payload];

      return newState
    }

    default:
      return state;
  }
}

export default mountsReducer;
