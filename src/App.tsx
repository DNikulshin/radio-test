// App.tsx
import './App.css';
import AudioPlayer from './components/AudioPleer.tsx';
import AudioVisualizerComponent from './components/AudioVisualizer.tsx';
import {useState} from 'react';

const audioFiles: string[] = [
    '/tracks/track_1.mp3',
    '/tracks/track_2.mp3',
    '/tracks/track_3.mp3',
    '/tracks/track_4.mp3',
    '/tracks/track_5.mp3',
    '/tracks/track_6.mp3',
    '/tracks/track_7.mp3'
];

function App() {
    const [currentBlob, setCurrentBlob] = useState<Blob | null>(null);

    const handleAudioFileChange = (file: File) => {
        setCurrentBlob(file);
    };

    return (
        <>
            <h1 style={{
                textAlign: 'center',
                color: 'white'
            }}>Radio - TEST</h1>
            <AudioPlayer audioFiles={audioFiles} onAudioFileChange={handleAudioFileChange} />
            {currentBlob && <AudioVisualizerComponent audioBlob={currentBlob} />}
        </>
    );
}

export default App;
