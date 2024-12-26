import {FC, useState, useEffect, useRef } from 'react'

const AudioPlayer: FC<{ audioFiles: string[] }> = ({ audioFiles }) => {
    const [currentTrackIndex, setCurrentTrackIndex] = useState(0)
    const [isPlaying, setIsPlaying] = useState(false)
    const [currentTime, setCurrentTime] = useState(0)
    const audioRef = useRef<HTMLAudioElement | null>(null)

    useEffect(() => {
        if (audioRef.current) {
            if ('src' in audioRef.current) {
                audioRef.current.src = audioFiles[currentTrackIndex]
            }
            if ('currentTime' in audioRef.current) {
                audioRef.current.currentTime = currentTime
            }
            if (isPlaying) {
                if ('play' in audioRef.current) {
                    audioRef.current.play()
                }
            }
        }
    }, [currentTrackIndex, isPlaying, audioFiles])

    useEffect(() => {
        const handleTimeUpdate = () => {
            if (audioRef.current) {
                if ('currentTime' in audioRef.current) {
                    setCurrentTime(audioRef.current.currentTime)
                }
            }
        }

        const audioElement = audioRef.current
        audioElement?.addEventListener('timeupdate', handleTimeUpdate)

        return () => {
            audioElement?.removeEventListener('timeupdate', handleTimeUpdate)
        }
    }, [])

    const handlePlayPause = () => {
        setIsPlaying(!isPlaying)
    }

    const handleEnded = () => {
        setCurrentTrackIndex((prevIndex) => (prevIndex + 1) % audioFiles.length)
        setCurrentTime(0)
    }

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 3
        }}>
            <audio ref={audioRef} onEnded={handleEnded} controls />
            <button onClick={handlePlayPause} style={{
                marginTop: '.5rem'
            }}>
                {isPlaying ? 'Pause' : 'Play'}
            </button>
        </div>
    )
}

export default AudioPlayer






