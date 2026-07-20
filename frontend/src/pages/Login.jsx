import { useState } from "react";

function Login(){

    const [user,setUser] = useState({
        email:"",
        password:""
    });


    const handleChange = (e)=>{

        setUser({
            ...user,
            [e.target.name]:e.target.value
        });

    };


    const handleSubmit = async(e)=>{

        e.preventDefault();


        const response = await fetch(
            "http://localhost:5000/api/auth/login",
            {
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify(user)
            }
        );


        const data = await response.json();


        if(data.token){

            localStorage.setItem(
                "token",
                data.token
            );

            localStorage.setItem(
                "role",
                data.role
            );

            alert("Login successful");

        }
        else{

            alert(data.message);

        }

    };


    return(

        <div>

            <h1>Login</h1>


            <form onSubmit={handleSubmit}>


                <input
                name="email"
                placeholder="Email"
                onChange={handleChange}
                />


                <input
                name="password"
                type="password"
                placeholder="Password"
                onChange={handleChange}
                />


                <button>
                    Login
                </button>


            </form>


        </div>

    );

}


export default Login;