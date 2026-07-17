import { Card } from 'react-bootstrap';
import { Heart, HeartFill } from 'react-bootstrap-icons';
import { useDispatch, useSelector } from 'react-redux';
import { toggleFavorite, setCurrentTrack } from '../redux/musicSlice';

const SongCard = ({ track }) => {
    const dispatch = useDispatch();
    const favorites = useSelector((state) => state.music.favorites);

    // Controlla se la canzone è nei preferiti confrontando gli ID degli oggetti salvati
    const isFavorite = favorites.some((fav) => fav.id === track.id);

    const handlePlay = () => {
        dispatch(setCurrentTrack(track));
    };

    const handleFavorite = (e) => {
        e.stopPropagation(); // Evita di far partire la canzone quando clicchi solo sul cuore
        dispatch(toggleFavorite(track)); // Passiamo l'intera traccia a Redux
    };

    return (
        <div className="d-flex flex-column align-items-center text-center song-card-wrapper mx-auto">
            <Card
                className="bg-transparent border-0 p-0 align-items-center custom-song-card"
                onClick={handlePlay}
            >
                <div className="img-container mb-2">
                    <Card.Img variant="top" src={track.album.cover_medium} alt={track.title} className="rounded-0 exact-square-img" />
                </div>
                <Card.Body className="p-0 text-white w-100">
                    <Card.Title className="text-truncate m-0 fw-bold card-track-title">
                        {track.title}
                    </Card.Title>
                    <Card.Text className="text-secondary text-truncate m-0 card-artist-name">
                        {track.artist.name}
                    </Card.Text>
                </Card.Body>
            </Card>
            <div
                className="mt-2 text-secondary favorite-heart-btn"
                onClick={handleFavorite}
            >
                {isFavorite ? <HeartFill size={14} color="#1DB954" /> : <Heart size={14} color="#b3b3b3" />}
            </div>
        </div>
    );
};

export default SongCard;