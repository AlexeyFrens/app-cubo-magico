import {createContext, useContext, useState} from "react";
import {CustomAlert} from "../components/CustomAlert";

const AlertContext = createContext()

export const AlertProvider = ({children}) => {
    const [visible, setVisible] = useState(false)
    const [title, setTitle] = useState('')
    const [message, setMessage] = useState('')

    const showAlert = (newTitle, newMessage) => {
        setTitle(newTitle)
        setMessage(newMessage)
        setVisible(true)
    }

    const hideAlert = () => {
        setVisible(false)
    }

    return (
        <AlertContext.Provider value={{showAlert}}>
            {children}

            <CustomAlert visible={visible} title={title} message={message} onClose={hideAlert} />
        </AlertContext.Provider>
    )
}

export const useAlert = () => {
    const context = useContext(AlertContext)
    if (!context) {
        throw new Error('useAlert deve ser usado dentro de um AlertProvider')
    }

    return context
}