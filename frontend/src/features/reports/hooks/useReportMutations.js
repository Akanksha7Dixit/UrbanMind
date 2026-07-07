import { useMutation, useQueryClient } from "@tanstack/react-query";

import {

    deleteReport,
    archiveReport,

    createReport,

} from "../services/reportService";

export function useDeleteReport() {

    const queryClient = useQueryClient();

    return useMutation({

        mutationFn: deleteReport,

        onSuccess: () => {

            queryClient.invalidateQueries({

                queryKey: ["reports"]

            });

        },

    });

}

export function useArchiveReport() {

    const queryClient = useQueryClient();

    return useMutation({

        mutationFn: archiveReport,

        onSuccess: () => {

            queryClient.invalidateQueries({

                queryKey: ["reports"]

            });

        },

    });

}

export function useCreateReport() {

    const queryClient = useQueryClient();

    return useMutation({

        mutationFn: createReport,

        onSuccess: () => {

            queryClient.invalidateQueries({

                queryKey: ["reports"]

            });

        },

    });

}