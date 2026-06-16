import Register from "../pages/Authenticator/Register"
import { useState } from "react"

interface WapperRegister {
    children: React.ReactNode
}

const WapperRegister = ({children}: WapperRegister) => {
    const [register, setRegister] = useState(false)
    if(!register) {
        return <Register
            RegisterSuccess={() => setRegister(true)}
            onSwitchToLogin={() => setRegister(true)}
        />
    }
    return <div className="Layout">{children}</div>
}

export default WapperRegister
