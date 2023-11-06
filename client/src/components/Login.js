import { useState } from "react";
import axios from "axios";
import { useNavigate} from "react-router-dom"
import '../components/login.css';

function Login ({setUser}) {
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const handleEmail = (e) => {
        setEmail(e.target.value)
    }
    const handlePassword = (e) => {
        setPassword(e.target.value)
    }
    const handleApi = (e) => {
        e.preventDefault()
        console.log({ email, password })
        axios.post('/login', {
            email: email,
            password: password
        })
        .then( result => {
            console.log(result.data)
            setUser(result.data)
            alert('Success')
            localStorage.setItem('token', result.data.token)
            navigate('/recipe')
        })
        .catch(error => {
            alert('service error')
            console.log(error)
        })
    }
    return (
        <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
            <h5 className="flex p-20 text-xl font-medium text-gray-900 dark:text-white">Login below</h5>
            <form>
            Email : <input value={email} onChange={handleEmail}  type="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required/>
            Password : <input value={password} onChange={handlePassword} type="password" required className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
            <button onClick={handleApi} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Login</button>
            </form>
        </div>
    )
}
export default Login