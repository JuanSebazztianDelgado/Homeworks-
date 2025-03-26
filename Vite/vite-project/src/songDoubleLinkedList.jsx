import React, {  useState } from 'react';
import { songDoubleLinkedList } from './songDoubleLinkedList';

const SongPlayer = () => {
    const songList = new songDoubleLinkedList();

    const songs = [
        "Always Forever - Cults",
        "The Run and Go - Twenty One Pilots",
        "Message Man - Twenty One Pilots",
        "Calm Like You - The Last Shadow Puppets",
        "Body Paint - Arctic Monkeys",
        "Loving Machine - Tv Girl"
    ];

    songs.forEach((song) => songList.append(song));

    const [currentSong, setCurrentSong] = useState (songList.head);

    const playPrevious = () => {
        if (currentSong && currentSong.prev){
            setCurrentSong(currentSong.prev);
        }
    }

    const playNext = () => {
        if (currentSong && currentSong.next) {
            setCurrentSong (currentSong.next);
        }
    }

    return (
        <div>
            <h1>Song Player</h1>
            <p>Now Playing: {currentSong ? currentSong.value : "No songs available"}</p>
            <button onClick={playPrevious} disabled={!currentSong || !currentSong.prev}>
                Previous Song
            </button>
            <button onClick={playNext} disabled={!currentSong || !currentSong.next}>
                Next Song
            </button>
            <h2>Playlist:</h2>
            <ul>
                {songList.print().map((song, index) => (
                    <li key={index}>{song}</li>
                ))}
            </ul>
        </div>
    );
}

export default SongPlayer;