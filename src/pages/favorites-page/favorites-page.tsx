import { Helmet } from 'react-helmet-async';
import { TOffer } from '../../types/offer';
import FavoritesItem from '../../components/favorites-item/favorites-item';

type TGroupedByCity = {
  [index: string]: TOffer[];
}

function groupOffersByCity(items: TOffer[]): TGroupedByCity {
  return items.reduce((grouped: TGroupedByCity, item) => {
    const city = item.city.name;
    if (!grouped[city]) {
      grouped[city] = [];
    }
    grouped[city].push(item);
    return grouped;
  }, {});
}

type FavoritePageProps = {
  placesMock: TOffer[];
}

function FavoritesPage ({placesMock} : FavoritePageProps) : JSX.Element {
  const favoritePlaces = placesMock.filter((place) => place.isFavorite);
  const offersGroupedByCity = groupOffersByCity(favoritePlaces);
  return (
    <main className="page__main page__main--favorites">
      <Helmet>
        <title>6 Cities. Favorites</title>
      </Helmet>
      <div className="page__favorites-container container">
        <section className="favorites">
          <h1 className="favorites__title">Saved listing</h1>
          <ul className="favorites__list">
            {Object.keys(offersGroupedByCity).map((city) => <FavoritesItem key={city} city={city} placesMock={offersGroupedByCity[city]}/>)}
          </ul>
        </section>
      </div>
    </main>
  );

}

export default FavoritesPage;

