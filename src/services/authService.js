import {supabase} from "./supabaseConnection";

export const authService = {
    signUp: async (email, password) => {
        const {data, error} = await supabase.auth.signUp({
            email: email,
            password: password
        })

        if (error) {
            throw new Error(error.message)
        }

        return data
    },

    signIn: async (email, password) => {
        const {data, error} = await supabase.auth.signInWithPassword({
            email: email,
            password: password
        })

        if (error) {
            throw new Error(error.message)
        }

        return data
    },

    signOut: async () => {
        const {error} = await supabase.auth.signOut()

        if (error) {
            throw new Error(error.message)
        }
    }
}