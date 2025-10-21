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

// Thunk pour récupérer le profil utilisateur
export const getUserProfile = createAsyncThunk(
  'auth/getUserProfile',
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const token = state.auth.token;

    try {
      const response = await fetch('http://localhost:3001/api/v1/user/profile', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        return thunkAPI.rejectWithValue(data.message || 'Erreur lors de la récupération du profil.');
      }

      return data.body; // Contient { id, email, firstName, lastName, userName }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message || 'Erreur inconnue');
    }
  }
);

export const updateUserName = createAsyncThunk(
  'auth/updateUserName',
  async (newUserName, thunkAPI) => {
    const state = thunkAPI.getState();
    const token = state.auth.token;

    try {
      const response = await fetch('http://localhost:3001/api/v1/user/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ userName: newUserName }),
      });

      const data = await response.json();

      if (!response.ok) {
        return thunkAPI.rejectWithValue(data.message || "Erreur lors de la mise à jour.");
      }

      return data.body.userName;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
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
    user: {
      firstName: '',
      lastName: '',
      userName: '',
    },
  },
  // Modifie le state, quand tu te déconnectes, on efface le token //
  reducers: {
    logout: (state) => {
      state.token = null;
      state.user = {
        firstName: '',
        lastName: '',
        userName: '',
      };
      // 🔄 On réinitialise aussi les infos utilisateur lors de la déconnexion
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
      })
      // 🔄 Gestion des états pour la récupération du profil utilisateur
      .addCase(getUserProfile.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        // active le chargement du profil utilisateur //
      })
      .addCase(getUserProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload; 
        // stocke les infos récupérées du profil (firstName, lastName, userName) //
      })
      .addCase(getUserProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        // affiche un message d’erreur lors de la récupération du profil //
      })
      // 🔄 Gestion des états pour la mise à jour du nom d’utilisateur
      .addCase(updateUserName.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        // active le chargement de la mise à jour //
      })
      .addCase(updateUserName.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user.userName = action.payload;
        // met à jour uniquement le userName dans le state //
      })
      .addCase(updateUserName.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        // affiche un message d’erreur lors de la mise à jour //
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;


