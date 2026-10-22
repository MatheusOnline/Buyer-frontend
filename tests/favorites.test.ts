import { afterEach, expect, it, vi } from 'vitest';
import { AxiosError } from 'axios';
import { api } from '../src/service/api';
import { useAuth } from '../src/features/auth/model/authStore';
import { favoritesApi } from '../src/features/favorites/api/favoritesApi';
import { favoritesPage, favoritesPageUrl } from '../src/features/favorites/utils/favoritesPagination';
afterEach(() => vi.restoreAllMocks());
it('normalizes invalid pages and keeps valid pages', () => {
    for (const value of [null,'','abc','-2','0','1.5','Infinity']) expect(favoritesPage(value)).toBe(1);
    expect(favoritesPage('3')).toBe(3);
    expect(favoritesPageUrl(1)).toBe('/favorites');
    expect(favoritesPageUrl(3)).toBe('/favorites?page=3');
});
it('requests paginated favorites with cancellation support', async () => {
    const controller = new AbortController();
    const response = {success:true,data:{products:[],pagination:{page:2,limit:20,totalItems:0,totalPages:0}}};
    const get = vi.spyOn(api,'get').mockResolvedValue({data:response});
    expect(await favoritesApi.list(2,controller.signal)).toEqual(response);
    expect(get).toHaveBeenCalledWith('/like',{params:{page:2,limit:20},signal:controller.signal});
});
it('clears an expired session so the protected route can return to login', async () => {
    useAuth.getState().setUser({name:'Fixture',email:'fixture@example.invalid',cpf:''});
    const error = new AxiosError('Unauthorized');
    error.response = {status:401} as AxiosError['response'];
    vi.spyOn(api,'get').mockRejectedValue(error);
    await expect(favoritesApi.list(1)).rejects.toBe(error);
    expect(useAuth.getState().user).toBeNull();
});
it('keeps the current session after a temporary server failure', async () => {
    const user = {name:'Fixture',email:'fixture@example.invalid',cpf:''};
    useAuth.getState().setUser(user);
    vi.spyOn(api,'get').mockRejectedValue(new Error('network'));
    await expect(favoritesApi.list(1)).rejects.toThrow('network');
    expect(useAuth.getState().user).toEqual(user);
});
