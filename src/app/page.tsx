import { AnimeList } from '@/components/AnimeList/AnimeList';
import { SearchField } from '@/components/SearchField/SearchField';
import { Filter } from '@/components/Filter/Filter';

export default function Home() {
  return (
    <div>
      <SearchField />
      <div className="container">
        <AnimeList />
        <Filter />
      </div>
    </div>
  );
}
