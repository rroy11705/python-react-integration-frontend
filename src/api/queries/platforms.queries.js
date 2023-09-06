import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createPlatform, fetchPlatforms, removePlatform, updatePlatform } from '../requests/platforms.requests';

export const useFetchPlatforms = () =>
    useQuery(
        ['platforms'],
        async () => {
            const res = await fetchPlatforms();
            return res;
        },
    );

export const useCreatePlatforms = () => {
    const queryClient = useQueryClient();

    return useMutation(
        async data => {
            const res = await createPlatform(data);
            return res;
        },
        {
            onSuccess: () => queryClient.invalidateQueries(['platforms']),
        },
    );
};

export const useUpdatePlatform = () => {
    const queryClient = useQueryClient();

    return useMutation(
        async ({ data, id }) => {
            const res = await updatePlatform(data, id);
            return res;
        },
        {
            onSuccess: () => queryClient.invalidateQueries(['platforms']),
        },
    );
};

export const useRemovePlatform  = () => {
    const queryClient = useQueryClient();

    return useMutation(
        async id => {
            const res = await removePlatform(id);
            return res;
        },
        {
            onSuccess: () => queryClient.invalidateQueries(['platforms']),
        },
    );
};
