// Imports:
import { createSlice } from '@reduxjs/toolkit';

// Initial State:
const initialState = {
  success: false,
  isLoading: false,
  rows: null,
  row: null,
  message: '',
  activeEdit: false,
};

export const TableSlice = createSlice({
  name: 'table-reducer',
  initialState,
  reducers: {
    // In case of success:
    tableRequest: (state) => {
      state.isLoading = true;
    },

    setTableRows: (state, action) => {
      state.isLoading = false;
      state.success = true;
      state.rows = action.payload;
    },

    setTableRow: (state, action) => {
      state.isLoading = false;
      state.success = true;
      state.row = action.payload;
    },

    setActiveEdit: (state, action) => {
      state.activeEdit = action.payload;
    },
  },
});

export const { tableRequest, setTableRows, setTableRow, setActiveEdit } =
  TableSlice.actions;

export default TableSlice.reducer;
