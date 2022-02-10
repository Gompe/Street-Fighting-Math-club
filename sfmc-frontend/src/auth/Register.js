import React from 'react'

const Register = () => {
    return <div className='container'> <form>
        <label htmlFor="email"> Email </label>
        <input type="text" name="email" id="email"/>

        <label htmlFor="password"> Password </label>
        <input type="password" />
    
    </form> </div>
}

export default Register;
