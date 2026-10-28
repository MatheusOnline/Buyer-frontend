import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { api } from "./api";
import type { CardProductProps } from "../types/types";

export interface CatalogResponse {
    success: boolean;
    data: {search?:{query:string;mode:'direct'|'similar'|'empty'};products: CardProductProps[]; pagination: {page: number; limit: number; totalItems: number; totalPages: number}};
}
export type ListProps = {limit?: number; page?: number; search?: string; category?: string; department?: string};
const fetchList = async (value: ListProps, signal?: AbortSignal) => {
    const response = await api.get<CatalogResponse>("/product/list", {params: value, signal});
    return response.data;
};
const fetchGet = async (id: string) => {
    const response = await api.get(`/product/get/${id}`);
    return response.data;
};
export function useList(value: ListProps) {
    return useQuery({queryKey: ["products", value], queryFn: ({signal}) => fetchList(value, signal)});
}
export function useHomeProducts() {
    return useInfiniteQuery({
        queryKey: ["products", "home"], initialPageParam: 1,
        queryFn: ({pageParam, signal}) => fetchList({page: pageParam, limit: 12}, signal),
        getNextPageParam: last => last.data.pagination.page < last.data.pagination.totalPages ? last.data.pagination.page + 1 : undefined,
    });
}
export function useGet(id: string) {
    return useQuery({queryKey: ["product", id], queryFn: () => fetchGet(id), enabled: !!id});
}
