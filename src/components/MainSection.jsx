import { useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMusic } from '../redux/musicSlice';
import Topbar from './Topbar';
import SongCard from './SongCard';

const MainSection = () => {
    const dispatch = useDispatch();
    const { rockTracks, popTracks, hipHopTracks, searchResults, favorites } = useSelector((state) => state.music);

    useEffect(() => {
        dispatch(fetchMusic({ category: 'rock', query: 'led zeppelin' }));
        dispatch(fetchMusic({ category: 'pop', query: 'ed sheeran' }));
        dispatch(fetchMusic({ category: 'hiphop', query: 'eminem' }));
    }, [dispatch]);

    const renderSection = (title, tracks) => {
        if (!tracks || tracks.length === 0) return null;
        return (
            <div className="mb-5">
                <h2 className="text-white mb-4 fw-bold section-title text-start">{title}</h2>
                <Row className="gy-4 row-cols-2 row-cols-sm-2 row-cols-md-4 justify-content-start px-2">
                    {tracks.map((track) => (
                        <Col key={track.id} className="d-flex justify-content-center">
                            <SongCard track={track} />
                        </Col>
                    ))}
                </Row>
            </div>
        );
    };

    return (
        <div className="main-content flex-grow-1 pb-5">
            <div className="centered-blue-space px-3">
                <Topbar />
                <div className="content-wrapper">
                    {/* Risultati di Ricerca (Se presenti) */}
                    {searchResults.length > 0 && renderSection('Search Results 🔍', searchResults)}

                    {/* Sezione Preferiti: appare solo se hai messo almeno un cuore */}
                    {favorites.length > 0 && renderSection('Favorites ❤️', favorites)}

                    {/* Categorie Standard */}
                    {renderSection('Rock 🎸', rockTracks)}
                    {renderSection('Pop 🪩', popTracks)}
                    {renderSection('Hip Hop 🎤', hipHopTracks)}
                </div>
            </div>
        </div>
    );
};

export default MainSection;