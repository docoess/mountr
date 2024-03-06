const GET_WANTED_MOUNTS = '/mounts/GET_WANTED_MOUNTS';

const getWantedMounts = mounts => ({
  type: GET_WANTED_MOUNTS,
  payload: mounts
})

export const allWantedMountsThunk = () => async dispatch => {
  const res = await fetch('/api/mounts/wanted');
  if (res.ok) {
    const mounts = await res.json();
    dispatch(getWantedMounts(mounts));
    return mounts;
  }
}

function wantedMountsReducer(state = [], action) {
  switch (action.type) {
    case GET_WANTED_MOUNTS: {
      const newState = action.payload;

      return newState;
    }

    default:
      return state;
  }
}

export default wantedMountsReducer;
