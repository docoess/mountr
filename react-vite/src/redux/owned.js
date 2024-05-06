const GET_OWNED_MOUNTS = '/mounts/GET_OWNED_MOUNTS';

const getOwnedMounts = mounts => ({
  type: GET_OWNED_MOUNTS,
  payload: mounts
})

export const allOwnedMountsThunk = (pageNum = 1) => async dispatch => {
  const res = await fetch(`/api/mounts/all_owned/${pageNum}`);
  if (res.ok) {
    const mounts = await res.json();
    dispatch(getOwnedMounts(mounts));
    return mounts;
  }
}

function ownedMountsReducer(state = [], action) {
  switch (action.type) {
    case GET_OWNED_MOUNTS: {
      const newState = action.payload;

      return newState;
    }

    default:
      return state;
  }
}

export default ownedMountsReducer;
