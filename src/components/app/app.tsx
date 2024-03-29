import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import MainPage from '../../pages/main-page/main-page';
import LoginPage from '../../pages/login-page/login-page';
import FavoritesPage from '../../pages/favorites-page/favorites-page';
import OfferPage from '../../pages/offer-page/offer-page';
import NotFoundPage from '../../pages/not-found-page/not-found-page';
import { AppRoute, CITIES } from '../../const';
import PrivateRoute from '../private-route/private-route';
import Layout from '../layout/layout';
import { getAuthorizationStatus } from '../../mocks/authorization-status';
import { TOffer } from '../../types/offer';
import { TReviewType } from '../../types/reviews';

//импорты из библиотек желательно расположить в самом начале

type AppPageProps = {
  placesMock: TOffer[];
  reviews: TReviewType[];
}

function App({ placesMock, reviews}: AppPageProps): JSX.Element {
  const authorizationStatus = getAuthorizationStatus();
  return (
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route
            path={AppRoute.Main}
            element={<Layout/>}
          >
            <Route
              index
              element={<MainPage placesMock = {placesMock} locations = {CITIES}/>}
            />
            <Route
              path={AppRoute.Login}
              element={(
                <PrivateRoute authorizationStatus={authorizationStatus} isReverse>
                  <LoginPage/>
                </PrivateRoute>
              )}

            />
            <Route
              path={AppRoute.Favorites}
              element={(
                <PrivateRoute authorizationStatus={authorizationStatus}>
                  <FavoritesPage placesMock = {placesMock}/>
                </PrivateRoute>
              )}
            />
            <Route
              path={AppRoute.Offer}
              element={<OfferPage placesMock = {placesMock} reviews = {reviews}/>}
            />
          </Route>
          <Route
            path='*'
            element={<NotFoundPage/>}
          />
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
