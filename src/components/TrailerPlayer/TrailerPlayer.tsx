import { FC, useRef, useState } from "react"
import ReactPlayer from "react-player/lazy"
import Modal from "react-modal";
import "./style/TrailerPlayer.css";

import play from "../../assets/trailerPlayer/play.svg"
import pause from "../../assets/trailerPlayer/pause.svg"

interface TrailerPlayerProps {
    isOpen: boolean;
    onRequestClose: () => void;
    videoUrl: string;
    videoTitle: string;
}

Modal.setAppElement('#root');


export const TrailerPlayer: FC<TrailerPlayerProps> = ({ isOpen, onRequestClose, videoUrl, videoTitle }) => {

    const playerRef = useRef<ReactPlayer | null>(null);
    const [loading, setLoading] = useState(true);
    const [playing, setPlaying] = useState(true);

    const handlePlayPause = () => {
        setPlaying(!playing);
    };

    const handleReady = () => {
        setLoading(false);
    };

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            ariaHideApp={false}
            className="trailerModal"
            shouldCloseOnOverlayClick={false}
            style={{ overlay: { backgroundColor: document.documentElement.scrollWidth < 1024 ? "rgba(10, 11, 11, 1)" : "rgba(10, 11, 11, 0.9)" } }}
        >
            <button onClick={onRequestClose} className="trailerModal__btnClose"></button>
            <div className="trailerModal__content">

                <div onClick={handlePlayPause} className={`playerControl  ${ document.documentElement.scrollWidth < 1000 ? (playing ? "opacity-mobile" : "") : ""}`} >
                    <button className="playerControl__btnPlayPause"
                        style={{
                            backgroundImage: playing ? `url("${pause}")` : `url("${play}")`
                        }}>
                    </button>
                    <p className="playerControl__title">{videoTitle}</p>
                </div>

                {loading && <div className="loading"></div>}
                <ReactPlayer
                    ref={playerRef}
                    url={`${videoUrl}`}
                    playing={playing}
                    width="100%"
                    height="100%"
                    onReady={handleReady}
                />
            </div>
        </Modal>
    );

}