// AudioVisualizer.tsx
import { FC, useEffect, useRef } from 'react';
import { AudioVisualizer } from 'react-audio-visualize';

interface AudioVisualizerProps {
    audioBlob: Blob;
}

const AudioVisualizerComponent: FC<AudioVisualizerProps> = ({ audioBlob }) => {
    const audioRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        if (audioRef.current) {
            const url = URL.createObjectURL(audioBlob);
            if ('src' in audioRef.current) {
                audioRef.current.src = url;
            }
            if ('play' in audioRef.current) {
                audioRef.current.play();
            }

            return () => {
                URL.revokeObjectURL(url);
            };
        }
    }, [audioBlob]);

    return (
        <div>
            <audio ref={audioRef} controls />
            <AudioVisualizer audio={audioRef.current} />
        </div>
    );
};

export default AudioVisualizerComponent;
