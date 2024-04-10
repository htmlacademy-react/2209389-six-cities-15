import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useActionCreators } from '../../hooks/store';
import MainPage from '../../pages/main-page/main-page';
import LoginPage from '../../pages/login-page/login-page';
import FavoritesPage from '../../pages/favorites-page/favorites-page';
import OfferPage from '../../pages/offer-page/offer-page';
import NotFoundPage from '../../pages/not-found-page/not-found-page';
import { AppRoute, CITIES, DEFAULT_CITY } from '../../const';
import Layout from '../layout/layout';
import { offersActions } from '../../store/slices/offers';
import { userActions } from '../../store/slices/user';
import ProtectedRoute from '../private-route/protected-route';

//импорты из библиотек желательно расположить в самом начале


const TOASTIFY_ERROR_MESSAGE = 'Не удалось загрузить предложения. Попробуйте перезагрузить страницу';

function App(): JSX.Element {

  const { fetchAllOffers } = useActionCreators(offersActions);

  const { checkAuth } = useActionCreators(userActions);

  useEffect(() => {
    checkAuth();
    fetchAllOffers()
      .unwrap()
      .catch(() => {
        toast.error(TOASTIFY_ERROR_MESSAGE);
      });

  }, [fetchAllOffers, checkAuth]);


  return (
    <HelmetProvider>
      <BrowserRouter>
        <ToastContainer />
        <Routes>
          <Route
            path={AppRoute.Main}
            element={<Layout />}
          >
            <Route index element={<Navigate to={`/${DEFAULT_CITY.id}`} />} />
            {CITIES.map((city) => (
              <Route path={`/${city.id}`} element={<MainPage city={city.name} />} key={city.id} />
            ))}
            <Route
              path={AppRoute.Login}
              element={(
                <ProtectedRoute onlyAuth>
                  <LoginPage />
                </ProtectedRoute>
              )}

            />
            <Route
              path={AppRoute.Favorites}
              element={(
                <ProtectedRoute>
                  <FavoritesPage />
                </ProtectedRoute>
              )}
            />
            <Route
              path={AppRoute.Offer}
              element={(
                <OfferPage />
              )}
            />
          </Route>
          <Route
            path='*'
            element={<NotFoundPage />}
          />
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
