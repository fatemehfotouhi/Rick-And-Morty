
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";

function CharactersList({ characters, onSelectItem, selectedId }) {

    return (
        <div className="characters-list">
            {characters.map((character) =>
                <CharacterItem
                    key={character.id}
                    character={character}
                >
                    <button
                        style={{
                            marginBlock: "auto",
                            marginInlineStart: "auto",
                        }}
                        onClick={() => onSelectItem(character.id)}
                    >
                        {character.id === selectedId ? <EyeSlashIcon className="eyeIcon" /> :
                            < EyeIcon className="eyeIcon" />
                        }
                    </button>
                </CharacterItem>
            )}
        </div>
    )
}

export default CharactersList;

export function CharacterItem({ character, children }) {
    return (
        <div className='character-item'>
            <div className='character-item__img'>
                <img src={character.image} alt={character.name} />
            </div>
            <div className='character-item__info'>
                <h3>
                    <span>{character.gender === "Male" ? "👱🏻‍♂️" : "👩🏻"}</span>
                    <span> {character.name}</span>
                </h3>
                <div className='character-item__status'>
                    <span style={{ fontSize: ".8rem" }}>{character.status === "Alive" ? "🟢" : "🔴"}</span>
                    <span>&nbsp;{character.status} -</span>
                    <span>&nbsp; {character.species}</span>
                </div>
            </div>
            {children}
        </div>
    )
}