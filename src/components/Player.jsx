import { Container, Row, Col, ProgressBar } from 'react-bootstrap';
import { PlayFill, SkipBackwardFill, SkipForwardFill, Shuffle, ArrowRepeat } from 'react-bootstrap-icons';
import { useSelector } from 'react-redux';

const Player = () => {
    const currentTrack = useSelector((state) => state.music.currentTrack);

    if (!currentTrack) return null;

    return (
        <div className="fixed-bottom bg-dark bg-gradient text-white p-3 player-bar">
            <Container fluid>
                <Row className="align-items-center">
                    <Col xs={4} md={3} className="d-flex align-items-center">
                        <img
                            src={currentTrack.album.cover_small}
                            alt="cover"
                            className="me-3 d-none d-sm-block"
                            width="50"
                            height="50"
                        />
                        <div className="text-truncate">
                            <h6 className="mb-0 text-white text-truncate">{currentTrack.title}</h6>
                            <small className="text-secondary text-truncate">{currentTrack.artist.name}</small>
                        </div>
                    </Col>

                    <Col xs={8} md={6} className="d-flex flex-column align-items-center justify-content-center">
                        <div className="d-flex gap-4 align-items-center mb-2">
                            <Shuffle className="text-secondary player-icon" style={{ cursor: 'pointer' }} />
                            <SkipBackwardFill className="text-white fs-5 player-icon" style={{ cursor: 'pointer' }} />
                            <PlayFill className="text-white fs-2 player-icon" style={{ cursor: 'pointer' }} />
                            <SkipForwardFill className="text-white fs-5 player-icon" style={{ cursor: 'pointer' }} />
                            <ArrowRepeat className="text-secondary player-icon" style={{ cursor: 'pointer' }} />
                        </div>
                        <div className="w-100 d-flex align-items-center gap-2" style={{ maxWidth: '400px' }}>
                            <small className="text-secondary">0:00</small>
                            <ProgressBar now={0} className="flex-grow-1" style={{ height: '4px', backgroundColor: '#535353' }} variant="success" />
                            <small className="text-secondary">3:24</small>
                        </div>
                    </Col>

                    <Col md={3} className="d-none d-md-block"></Col>
                </Row>
            </Container>
        </div>
    );
};

export default Player;