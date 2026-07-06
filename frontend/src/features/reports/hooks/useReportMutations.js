import { useMutation, useQueryClient } from "@tanstack/react-query";

import {

    deleteReport,
    archiveReport,

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