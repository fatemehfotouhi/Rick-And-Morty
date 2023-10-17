import { HeartIcon, TrashIcon } from "@heroicons/react/24/outline"
import { useState } from "react";
import Modal from "./Modal";
import { CharacterItem } from "./charactersList";

function Navbar({ children }) {
    return (
        <div className="navbar">
            {children}
        </div>
    )
}

export default Navbar;

export function Logo() {
    return <div className="navbar__logo">LOGO😍</div>

}
export function SearchInput({ query, setQuery }) {
    return <input
        className="navbar__search-input"
        type="text"
        placeholder="search..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
    />
}
export function SearchResult({ characters }) {
    return <div className="navbar__result">Found {characters.length} characters</div>
}
export function Favourites({ favoriteCharacter, onRemoveFavoriteCharacter }) {
    const [open, setOpen] = useState(false);
    const handleCloseModal = () => setOpen(false)
    return (
        <>
            <button className="navbar__heart" onClick={(() => setOpen(!open))}>
                <span className="quantity">{favoriteCharacter.length}</span>
                <HeartIcon className="heartIcon" />
            </button>
            {open &&
                <Modal
                    title="List of Favourites"
                    onCloseModal={handleCloseModal}
                >
                    {favoriteCharacter.map((fav) => {
                        return (
                            <CharacterItem key={fav.id} character={fav}>
                                <button
                                    style={{
                                        marginBlock: "auto",
                                        marginInlineStart: "auto",
                                    }}
                                    onClick={() => onRemoveFavoriteCharacter(fav.id)}
                                >
                                    <TrashIcon
                                        style={{
                                            width: "1.6rem",
                                            height: "1.6rem",
                                            color: "var(--rose-500)",
                                            marginBlock: "auto",
                                            marginInlineStart: "auto",
                                        }}
                                    />

                                </button>
                            </CharacterItem>
                        )
                    })}
                </Modal >

            }
        </>
    )
}



