// src/features/employees/employeeSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  collection, addDoc, getDocs, doc, updateDoc, deleteDoc
} from 'firebase/firestore';
import { db } from '../../app/firebase';

// ⚡ Async Thunks ---------------------
export const fetchEmployees = createAsyncThunk(
  'employees/fetch',
  async () => {
    const snapshot = await getDocs(collection(db, 'employees'));
    return snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
  }
);

export const addEmployee = createAsyncThunk(
  'employees/add',
  async (emp) => {
    const ref = await addDoc(collection(db, 'employees'), emp);
    return { id: ref.id, ...emp };
  }
);

export const updateEmployee = createAsyncThunk(
  'employees/update',
  async ({ id, ...emp }) => {
    await updateDoc(doc(db, 'employees', id), emp);
    return { id, ...emp };
  }
);

export const deleteEmployee = createAsyncThunk(
  'employees/delete',
  async (id) => {
    await deleteDoc(doc(db, 'employees', id));
    return id;
  }
);

// 🌱 Slice ---------------------------
const employeeSlice = createSlice({
  name: 'employees',
  initialState: { data: [], status: 'idle', error: null },
  reducers: {
    clearCurrent: state => { state.current = null; },   // optional
  },
  extraReducers: builder => {
    builder
      .addCase(fetchEmployees.pending,  s => { s.status = 'loading'; })
      .addCase(fetchEmployees.fulfilled, (s, a) => { s.status = 'succeeded'; s.data = a.payload; })
      .addCase(fetchEmployees.rejected,  (s,a) => { s.status = 'failed'; s.error = a.error.message; })

      .addCase(addEmployee.fulfilled,    (s,a) => { s.data.push(a.payload); })
      .addCase(updateEmployee.fulfilled, (s,a) => {
        const i = s.data.findIndex(e => e.id === a.payload.id);
        if (i !== -1) s.data[i] = a.payload;
      })
      .addCase(deleteEmployee.fulfilled, (s,a) => {
        s.data = s.data.filter(e => e.id !== a.payload);
      });
  },
});

export default employeeSlice.reducer;
export const { clearCurrent } = employeeSlice.actions;
