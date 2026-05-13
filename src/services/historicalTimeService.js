import {supabase} from "./supabaseConnection";

export const historicalTimeService = {
    saveHistoricalTime: async (timeInCs, scrambleArray) => {
        const {data: {user}} = await supabase.auth.getUser()

        const {error} = await supabase.from('historico_tempos')
            .insert(
                {
                    user_id: user.id,
                    time_cs: timeInCs,
                    scramble: scrambleArray
                }
            )

        if (error) {
            throw new Error(error.message)
        }
    },

    searchHistorialTimes: async () => {

        const {data, error} = await supabase
            .from('historico_tempos')
            .select('*')
            .order('created_at')

        if (error) throw new Error("Erro ao buscar o histórico de tempos: " + error.message)

        return data
    },

    deleteHistoricalTime: async (id) => {
        const {error} = await supabase.from('historico_tempos')
            .delete()
            .eq('id', id)

        if (error) throw new Error(`Erro ao deletar o histórico de tempo com o id ${id}: ` + error.message)

        return true
    }
}