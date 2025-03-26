import React, {useState, useEffect} from 'react';
import {songLinkedList} from './songLinkedList';

const SongPlayer = () => {
    const [currentSong, setCurrentSong] = useState (null)
    const [songList, setSongList] = useState (null)

    useEffect(() => {

        const songs = new songLinkedList();
        songs.append("Always Forever - Cults");
        songs.append("The Run and Go - Twenty One Pilots");
        songs.append("Message Man - Twenty One Pilots");
        songs.append("Calm Like You - The Last Shadow Puppets");
        songs.append("Body Paint - Arctic Monkeys");
        songs.append("Loving Machine - Tv Girl");

        setSongList (songs);
        setCurrentSong (songs.head)
    }, []);

    const playNext = () => {
        if (currentSong && currentSong.next) {
            setCurrentSong(currentSong.next);
        } else {
            alert ("No hay más canciones en la lista");
        }
    }

    const playPrevious = () => {
        if (!songList || !currentSong || currentSong === songList.head) {
            alert ("Esta es la primera canción de la lista");
            return;
        }

        let prev = songList.head;
        while (prev.next !== currentSong) {
            prev = prev.next;
        }
        setCurrentSong(prev);
    }

    return (
        <div>
          <h1>Song Player</h1>
          {currentSong ? (
            <div>
              <h2>Now Playing:</h2>
              <p>{currentSong.value}</p>
            </div>
          ) : (
            <p>Loading playlist...</p>
          )}
          <button onClick={playPrevious}>Previous</button>
          <button onClick={playNext}>Next</button>
        </div>
    );
}

export default SongPlayer;