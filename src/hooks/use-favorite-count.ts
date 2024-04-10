import { useEffect } from 'react';

import { AuthorizationStatus, RequestStatus } from '../const';
import { favoritesActions, favoritesSelector } from '../store/slices/favorites';
import { useActionCreators, useAppSelector } from './store';
import { userSelector } from '../store/slices/user';

function useFavoriteCount () {
  const status = useAppSelector(favoritesSelector.favoriteStatus);
  const count = useAppSelector(favoritesSelector.favorites).length;
  const userStatus = useAppSelector(userSelector.userStatus);
  const { fetchFavorites } = useActionCreators(favoritesActions);

  useEffect(() => {
    if (status === RequestStatus.Idle && userStatus === AuthorizationStatus.Auth) {
      fetchFavorites();
    }
  }, [status, fetchFavorites, userStatus]);

  return count;
}

export { useFavoriteCount };

