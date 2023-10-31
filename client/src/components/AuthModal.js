import { useState } from "react"
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useCookies } from 'react-cookie'

export const AuthModal = ({setShowModal, isSignUp}) => {
    
    const [ email, setEmail ] = useState(null)
    const [ password, setPassword ] = useState(null)
    const [ confirmPassword, setConfirmPassword ] = useState(null)
    const [ error, setError ] = useState(null)
    const [ cookies, setCookie, removeCookie] = useCookies(['user'])
    let navigate = useNavigate()
    console.log(email, password, confirmPassword)

    const handleClick = () => {
        setShowModal(false)
    }
    
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            if(isSignUp && (password !== confirmPassword)) {
                setError('Passwords need to match!')
                return
            } 
            console.log('posting ', email, password)
             const response = await axios.post('http://localhost:8000/signup', {email, password})

             setCookie('Email', response.data.email)
             setCookie('UserId', response.data.userId)
             setCookie('AuthToken', response.data.token)

             const success = response.status === 201

             if(success) navigate('/onboarding')
        } 
        catch(error) {
            console.log(error)
        }
    }


    return (
    <div className="auth-modal">
        <div className="close-icon" onClick={handleClick}>⦻</div>
        <h2>{isSignUp ? 'CREATE ACCOUNT' : 'LOG IN'}</h2>
        <p>By clicking Log In, you agree to our terms. Learn how we process your data in our Privacy Policy and Cookie Policy.</p>
        <form onSubmit={handleSubmit}>
            <input
                type="email"
                id="email"
                name="email"
                placeholder="email"
                required={true}
                onChange={(e) => setEmail(e.target.value)}
            />
             <input
                type="password"
                id="password"
                name="password"
                placeholder="password"
                required={true}
                onChange={(e) => setPassword(e.target.value)}
            />
             {isSignUp && 
             <input
                type="password"
                id="confirm-password"
                name="confirm-password"
                placeholder="confirm password"
                required={true}
                onChange={(e) => setConfirmPassword(e.target.value)}
            />} 
            <input className="secondary-button" type="submit" value="submit"/>
            <p>{error}</p>
            <hr/>
            <h2>GET THE APP</h2>
        </form>
    </div>
  )
}

export default AuthModal