import { createSlice } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';

const sessionSlice = createSlice({
  name: 'session',
  initialState: {
    session: false,
  },
  reducers: {
    setSession: (state, action) => {
      state.session = action.payload;
    },
  },
});

const useGetSession = () => {
  return useSelector((state) => state.session.session);
};
const useSetSession = () => {
  const dispatch = useDispatch();
  return (value) => dispatch(setSession(value));
};

export { useGetSession, useSetSession };
export const { setSession } = sessionSlice.actions;
export default sessionSlice;
