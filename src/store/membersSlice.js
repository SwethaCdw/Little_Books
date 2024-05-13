import { createSlice } from '@reduxjs/toolkit';

const membersSlice = createSlice({
  name: 'members',
  initialState: {
    openModal: false,
    membersData: null,
  },
  reducers: {
    setOpenModal(state, action) {
      state.openModal = action.payload;
    },
    setMembersData(state, action) {
      state.membersData = action.payload;
    },
   
  }
});

export const { setOpenModal, setMembersData } = membersSlice.actions;

export default membersSlice.reducer;
