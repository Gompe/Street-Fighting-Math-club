import React from "react";

const Login = () => {
    return <div className="container"> <form>
        <label htmlFor="email"> Email </label>
        <input type="text" name="email" id="email"/>

        <label htmlFor="password"> Password </label>
        <input type="password" />
    
    </form> </div>
}

export default Login;
