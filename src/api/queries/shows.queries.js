import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createShow, fetchShow, fetchShows, removeShow, updateShow } from '../requests/shows.requests';

export const useFetchShows = () =>
    useQuery(
        ['shows'],
        async () => {
            const res = await fetchShows();
            return res;
        },
    );

export const useFetchShow = (id) =>
    useQuery(
        ['shows'],
        async () => {
            const res = await fetchShow(id);
            return res;
        },
        {
            enabled: id !== undefined,
        },
    );

export const useCreateShow = () => {
    const queryClient = useQueryClient();

    return useMutation(
        async data => {
            const res = await createShow(data);
            return res;
        },
        {
            onSuccess: () => queryClient.invalidateQueries(['shows']),
        },
    );
};

export const useUpdateShow = () => {
    const queryClient = useQueryClient();

    return useMutation(
        async ({ data, id }) => {
            const res = await updateShow(data, id);
            return res;
        },
        {
            onSuccess: () => queryClient.invalidateQueries(['shows']),
        },
    );
};

export const useRemoveShow = () => {
    const queryClient = useQueryClient();

    return useMutation(
        async id => {
            const res = await removeShow(id);
            return res;
        },
        {
            onSuccess: () => queryClient.invalidateQueries(['shows']),
        },
    );
};

