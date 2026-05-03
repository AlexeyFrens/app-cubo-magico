import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY

const supabase = createClient(supabaseUrl, supabaseKey)

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