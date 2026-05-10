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
    }
}