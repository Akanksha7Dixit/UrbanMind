import {
    useQuery,
    useMutation,
    useQueryClient,
} from "@tanstack/react-query";

import {

    getSettings,

    updateSettings,

    resetSettings,

} from "../services/settingsService";

/* ===============================
   GET
================================ */

export function useSettings() {

    return useQuery({

        queryKey: ["settings"],

        queryFn: getSettings,

    });

}

/* ===============================
   UPDATE
================================ */

export function useUpdateSettings() {

    const queryClient = useQueryClient();

    return useMutation({

        mutationFn: updateSettings,

        onSuccess: () => {

            queryClient.invalidateQueries({

                queryKey: ["settings"],

            });

        },

    });

}

/* ===============================
   RESET
================================ */

export function useResetSettings() {

    const queryClient = useQueryClient();

    return useMutation({

        mutationFn: resetSettings,

        onSuccess: () => {

            queryClient.invalidateQueries({

                queryKey: ["settings"],

            });

        },

    });

}