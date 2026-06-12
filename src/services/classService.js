import {supabase} from "./supabaseConnection";

export const classService = {
    searchStapsByTrail: async (trailId) => {
        const {data, error} = await supabase
            .from('etapas')
            .select('*')
            .eq('trilha_id', trailId)
            .order('ordem', {ascending: true})

        if (error) {
            throw new Error(error.message)
        }

        return data
    }
}