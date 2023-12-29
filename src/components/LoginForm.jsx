import { useState } from "react"

const LoginForm = ({userLogin}) => {

    const [username, setUserName] = useState('')
    const [password, setPassword] = useState('')

    const handleLogin = (event) => {
            event.preventDefault()
            userLogin(username, password)
            setUserName('')
            setPassword('')   
    }

    return (
        <form onSubmit={handleLogin}>
            <div>
                username
                <input
                    type='text'
                    value={username}
                    name='Username'
                    onChange={({target}) => setUserName(target.value)}/>
            </div>
            <div>
                password
                <input
                    type='password'
                    value={password}
                    name='Password'
                    onChange={({target}) => setPassword(target.value)}/>
            </div>
            <button type="submit">Login</button>
            </form>
    )
}

export default LoginForm