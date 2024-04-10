import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import type {FavoritesStatus} from '../../const';
import type { ServerOffer } from '../../types/offer';
import { Endpoint } from '../../const';

//thunk на получение всех файвроитов
const fetchFavorites = createAsyncThunk<ServerOffer[], undefined, { extra: AxiosInstance }>
('favorite/fetchAll', async (_arg, { extra : api}) => {
  const response = await api.get<ServerOffer[]>(Endpoint.Favorite);
  return response.data;
});

interface ChangeProps {
    offerId: string;
    status: FavoritesStatus;
  }

interface ChangeResponse {
    offer: ServerOffer;
    status: FavoritesStatus;
  }

const changeFavorite = createAsyncThunk<ChangeResponse, ChangeProps, { extra: AxiosInstance }>
//thunk на изменение избранного принимает объект offerId и статус
('favorite/change', async ({ offerId, status}, {extra : api}) => {
  const response = await api.post<ServerOffer>(`${Endpoint.Favorite}/${offerId}/${status}`);
  //возвращает поле offer с полученными данными от сервера и статус с информацией (добавлено/снято в избр.)
  return {offer: response.data, status};
});


export { changeFavorite, fetchFavorites};


