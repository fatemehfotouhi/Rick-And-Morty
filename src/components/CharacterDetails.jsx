import React, { useEffect, useState } from 'react';
import { ArrowUpCircleIcon } from "@heroicons/react/24/outline"
import axios from 'axios';
import { toast } from 'react-hot-toast';
import Loader from './Loader';

function CharacterDetails({ selectedId, onAddFavorite, isAddToFavorite }) {
    const [character, setCharacter] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [episodes, setEpisodes] = useState([]);

    useEffect(() => {
        async function fetchCharacter() {
            try {
                setIsLoading(true);
                const res = await axios.get(`https://rickandmortyapi.com/api/character/${selectedId}`);
                setCharacter(res.data);

                const episodeId = res.data.episode.map((e) => e.split("/").at(-1));
                const episodeData = await axios.get(`https://rickandmortyapi.com/api/episode/${episodeId}`);
                setEpisodes([episodeData.data].flat().slice(0, 5))
            } catch (err) {
                toast.error(err.response.data.error)
            } finally {
                setIsLoading(false);
            }
        }
        if (selectedId) fetchCharacter()
    }, [selectedId])

    if (!character || !selectedId) return <p style={{ color: "var(--slate-300)" }}>Please select a character.</p>
    if (isLoading) return <Loader />

    return (
        <div className='character-info-container'>
            <CharacterSubInfo
                character={character}
                onAddFavorite={onAddFavorite}
                isAddToFavorite={isAddToFavorite}
            />
            <CharacterEpisodes episodes={episodes} />
        </div >
    )
}

export default CharacterDetails;

function CharacterSubInfo({ character, onAddFavorite, isAddToFavorite }) {
    return (
        <div className='character-details'>
            <div className='character-details__img'>
                <img src={character.image} alt={character.name} />
            </div>
            <div className='character-details__info'>
                <h3 className='name'>
                    <span>{character.gender === "Male" ? "👱🏻‍♂️" : "👩🏻"}</span>
                    <span>&nbsp;{character.name}</span>
                </h3>
                <div className='status'>
                    <span style={{ fontSize: ".8rem" }}>{character.status === "Alive" ? "🟢" : "🔴"}</span>
                    <span>{character.status} - </span>
                    <span>{character.species}</span>
                </div>
                <div className='location'>
                    <p>Last known location:</p>
                    <p>{character.location.name}</p>
                </div>
                <div>
                    {isAddToFavorite ? <span>Already Added To Favourites✅</span>
                        : <button className='btn--primary' onClick={() => onAddFavorite(character)}>Add to Favourite</button>
                    }
                </div>
            </div>
        </div>
    )
}

function CharacterEpisodes({ episodes }) {

    const [desc, setDesc] = useState(false);

    const handleSortEpisodes = () => {
        setDesc(!desc);
        if (!desc) return episodes.sort((a, b) => new Date(b.air_date) - new Date(a.air_date));
        return episodes.sort((a, b) => new Date(a.air_date) - new Date(b.air_date));
    }

    return (
        <div className='character-episodes'>
            <div className='character-episodes__header'>
                <h2 style={{ color: 'var(--slate-400)', fontWeight: 'bold' }}>List of Episodes:</h2>
                <button onClick={handleSortEpisodes}>
                    <ArrowUpCircleIcon className="arrowUpCircleIcon" style={{ rotate: `${desc ? "180deg" : "0deg"}` }} />
                </button>
            </div>
            {episodes.map((episode) => <Episode key={episode.id} episode={episode} />)}
        </div>
    )
}
function Episode({ episode }) {
    return (
        <div className='character-episodes__item'>
            <div className='character-episodes__title'>
                <span>{String(episode.id).padStart(2, "0")} -</span>
                <span> {episode.episode} :</span>
                <span> {episode.name}</span>
            </div>
            <div className='character-episodes__date'>{episode.air_date}</div>
        </div>
    )
}