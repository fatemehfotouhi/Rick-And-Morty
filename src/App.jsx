import "./App.css"
import Navbar, { Favourites, Logo, SearchInput, SearchResult } from "./components/Navbar"
import CharacterDetails from "./components/CharacterDetails"
import { useState } from "react";
import Loader from "./components/Loader";
import { Toaster } from "react-hot-toast";
import useCharacters from "./hooks/useCharacters";
import useLocalStorage from "./hooks/useLocalStorage";
import CharactersList from "./components/CharactersList";


function App() {

  const [query, setQuery] = useState("");
  const { isLoading, characters } = useCharacters(query);
  const [selectedId, setSelectedId] = useState(null);
  const [favoriteCharacter, setFavoriteCharacter] = useLocalStorage("fav", [])

  const handleSelectItem = (id) => {
    setSelectedId((prevId) => prevId === id ? null : id)
  };

  const handleAddFavorite = (character) => {
    setFavoriteCharacter([...favoriteCharacter, character]);
  }

  const isAddToFavorite = favoriteCharacter.map(fav => fav.id).includes(selectedId)

  const handleRemoveCharacter = (id) => {
    const favCharacter = favoriteCharacter.filter(c => c.id !== id);
    setFavoriteCharacter(favCharacter)
  }
  return (
    <div className="container">
      <Toaster />
      <Navbar>
        <Logo />
        <SearchInput query={query} setQuery={setQuery} />
        <SearchResult characters={characters} />
        <Favourites favoriteCharacter={favoriteCharacter} onRemoveFavoriteCharacter={handleRemoveCharacter} />
      </Navbar>
      <Main>
        {isLoading ? <Loader /> :
          <CharactersList
            characters={characters}
            onSelectItem={handleSelectItem}
            selectedId={selectedId}
          />
        }
        <CharacterDetails
          selectedId={selectedId}
          onAddFavorite={handleAddFavorite}
          isAddToFavorite={isAddToFavorite}
        />
      </Main>
    </div >
  )
}

export default App;


function Main({ children }) {
  return <div className="main">{children}</div>
}