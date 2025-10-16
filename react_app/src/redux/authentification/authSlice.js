import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';


export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async ({ email, password }, thunkAPI) => {
    try {
      const response = await fetch('http://localhost:3001/api/v1/user/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        return data.body.token; // Succès : on retourne le token
      } else {
        // Erreur renvoyée par l’API
        return thunkAPI.rejectWithValue(data.message || 'Erreur de connexion');
      }
    } catch (error) {
      // Erreur technique
      return thunkAPI.rejectWithValue(error.message || 'Erreur inconnue');
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  // C’est l’état initial de l’utilisateur avant qu’il soit connecté //
  initialState: {
    token: null,
    isLoading: false,
    error: null,
  },
  // Modifie le state, quand tu te déconnectes, on efface le token //
  reducers: {
    logout: (state) => {
      state.token = null;
    },
  },
  // loginUser est une fonction asynchrone, elle a 3 états possibles //
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        // active le chargement //
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.token = action.payload;
        // stocke le token //
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        // affiche un message d’erreur //
      });
  },
});
export default authSlice.reducer;

