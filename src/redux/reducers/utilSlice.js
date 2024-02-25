import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    subjectId: '',
};

const utilSlice = createSlice({
    name: 'util',
    initialState,
    reducers: {
        setSubjectId: (state, newSubjectId) => {
            state.subjectId = newSubjectId;
        },
        wipeSubjectId: (state) => {
            state.subjectId = '';
        },
    },
});

export const { setSubjectId, wipeSubjectId } = utilSlice.actions;
export const selectSubjectId = (state) => state.util.subjectId;
export default utilSlice.reducer;