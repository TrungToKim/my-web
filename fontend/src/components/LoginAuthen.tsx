import Login from "../pages/Authenticator/Login"
import { useState } from "react"

interface WapperLogin {
    children: React.ReactNode
    onSwitchToRegister?: () => void
    onSwitchToForgotPassword?: () => void
}

const WapperLogin = ({children, onSwitchToRegister, onSwitchToForgotPassword}: WapperLogin) => {
    const [login, setLogin] = useState(false)
    if(!login) {
        return <Login
            LoginSuccess={() => setLogin(true)}
            onSwitchToRegister={onSwitchToRegister ?? (() => {})}
            onSwitchToForgotPassword={onSwitchToForgotPassword ?? (() => {})}
        />
    }
    return <div className="Layout">{children}</div>
}

export default WapperLogin
