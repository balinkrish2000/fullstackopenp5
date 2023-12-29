import { useState, forwardRef, useImperativeHandle } from "react"

const Togglable = (props,refs) => { 

    const [loginVisible, setLoginVisibilty] = useState(false)

    const visibilityStyle = { display: loginVisible ? '' : 'none'}
    const buttonText = loginVisible? `Hide ${props.buttonText}` : `Show ${props.buttonText}`

    const handleToggleVisibility = () => {
        setLoginVisibilty(!loginVisible)
    }

    useImperativeHandle(refs, () => {
        return {
            handleToggleVisibility
        }
    })

    return (
        <>
            <button onClick={handleToggleVisibility}>{buttonText}</button>
            <div style={visibilityStyle}>
                {props.children}
            </div>
        </>
    )
}

export default forwardRef(Togglable)