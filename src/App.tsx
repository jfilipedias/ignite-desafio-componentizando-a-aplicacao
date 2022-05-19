import { useEffect, useState } from 'react';

import { SideBar, GenreResponseProps } from './components/SideBar';
import { Content } from './components/Content';

import './styles/global.scss';
import { api } from './services/api';

export function App() {
  const [selectedGenreId, setSelectedGenreId] = useState(1);
  const [selectedGenre, setSelectedGenre] = useState<GenreResponseProps>({} as GenreResponseProps);

  useEffect(() => {
    api.get<GenreResponseProps>(`genres/${selectedGenreId}`).then(response => {
      setSelectedGenre(response.data);
    })
  }, [selectedGenreId]);

  function handleClickButton(id: number) {
    setSelectedGenreId(id);
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <SideBar
        handleClickButton={handleClickButton}
        selectedGenreId={selectedGenreId}
      />

      <Content
        genreTitle={selectedGenre.title}
        selectedGenreId={selectedGenreId}
      />
    </div>
  )
}