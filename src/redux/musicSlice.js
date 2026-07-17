import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Thunk per recuperare le canzoni dall'API
export const fetchMusic = createAsyncThunk(
    'music/fetchMusic',
    async ({ category, query }) => {
        const response = await fetch(`https://striveschool-api.herokuapp.com/api/deezer/search?q=${query}`);
        if (!response.ok) throw new Error('Errore nel fetch dei dati');
        const data = await response.json();
        return { category, data: data.data };
    }
);

// Recupera i preferiti salvati nel localStorage all'avvio dell'app
const savedFavorites = JSON.parse(localStorage.getItem('spotify_favorites')) || [];

const initialState = {
    rockTracks: [],
    popTracks: [],
    hipHopTracks: [],
    searchResults: [],
    favorites: savedFavorites, // Ora contiene gli oggetti canzone completi per poterli mostrare nella sezione dedicata
    currentTrack: null,
    status: 'idle',
    error: null,
};

const musicSlice = createSlice({
    name: 'music',
    initialState,
    reducers: {
        toggleFavorite: (state, action) => {
            const track = action.payload; // Riceve l'oggetto canzone intero
            const exists = state.favorites.some((fav) => fav.id === track.id);

            if (exists) {
                // Se esiste già, lo rimuove
                state.favorites = state.favorites.filter((fav) => fav.id !== track.id);
            } else {
                // Se non esiste, lo aggiunge alla lista
                state.favorites.push(track);
            }

            // Sincronizza lo stato corrente con il Local Storage del browser
            localStorage.setItem('spotify_favorites', JSON.stringify(state.favorites));
        },
        setCurrentTrack: (state, action) => {
            state.currentTrack = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchMusic.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchMusic.fulfilled, (state, action) => {
                state.status = 'succeeded';
                const tracks = action.payload.category === 'search'
                    ? action.payload.data
                    : action.payload.data.slice(0, 4);

                switch (action.payload.category) {
                    case 'rock':
                        state.rockTracks = tracks;
                        break;
                    case 'pop':
                        state.popTracks = tracks;
                        break;
                    case 'hiphop':
                        state.hipHopTracks = tracks;
                        break;
                    case 'search':
                        state.searchResults = tracks;
                        break;
                    default:
                        break;
                }
            })
            .addCase(fetchMusic.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

export const { toggleFavorite, setCurrentTrack } = musicSlice.actions;
export default musicSlice.reducer;