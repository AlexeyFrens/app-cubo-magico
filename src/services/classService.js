import {supabase} from "./supabaseConnection";

export const classService = {
    searchStapsByTrail: async (trailId) => {
        try {
            const {data, error} = await supabase
                .from('etapas')
                .select('*')
                .eq('trilha_id', trailId)
                .order('ordem', {ascending: true})

            if (error) {
                throw new Error(error.message)
            }

            return data
        } catch (error) {
            console.log("Erro na Busca de Aulas: ", error.message)
            throw error
        }
    }
}