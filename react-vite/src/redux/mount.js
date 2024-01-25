const GET_MOUNTS = '/mounts/GET_MOUNTS';

const getAllMounts = mounts => ({
  type: GET_MOUNTS,
  payload: mounts
})

export const allMountsThunk = () => async dispatch => {
  const res = await fetch('/api/feed/mounts');
  if (res.ok) {
    const mounts = await res.json();
    dispatch(getAllMounts(mounts));
    return mounts;
  }
}

function mountsReducer(state = [], action) {
  switch (action.type) {
    case GET_MOUNTS: {
      const newState = action.payload;

      return newState
    }

    default:
      return state;
  }
}

export default mountsReducer;
