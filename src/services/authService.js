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
    },

    requestPasswordReset: async (email) => {
        const {error} = await supabase.auth.resetPasswordForEmail(email)

        if (error) throw new Error(error.message)
    },

    verifyOtpForResetPassword: async (email, code) => {
        const {error} = await supabase.auth.verifyOtp({
            email: email,
            token: code,
            type: 'recovery'
        })

        if (error) throw new Error("Código inválido ou expirado.")
    },

    updatePasswordWithCode: async (newPassword) => {
        const {error} = await supabase.auth.updateUser({
            password: newPassword
        })

        if (error) throw new Error("Falha ao atualizar a senha.")
    }
}