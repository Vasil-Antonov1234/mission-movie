import { getEmbdedUrl } from "../../utils/getEmbdedUrl";
import styles from "./TrailerModal.module.css";

type TrailerModalProps = {
    trailerUrl: string,
    onClose: () => void;
};

export default function TrailerModal({ trailerUrl, onClose }: TrailerModalProps) {
    const embedUrl = getEmbdedUrl(trailerUrl);

    return (
        <div onClick={onClose} className={styles["trailer-modal-container"]} >
            <div className={styles["trailer-modal-wrapper"]} onClick={(e) => e.stopPropagation()} >
                
                {/* Close button */}
                <button onClick={onClose} className={styles["close-button"]} >
                    ✕
                </button>

                {/* Video */}
                <div style={{ position: "relative", paddingBottom: "56.25%", height: 0 }}>
                    <iframe
                        src={`${embedUrl}?autoplay=1`}
                        className={styles["i-frime"]}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope"
                        allowFullScreen
                    />
                </div>
            </div>
        </div>
    );
}