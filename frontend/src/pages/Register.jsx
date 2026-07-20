import { useState } from "react";

function Register() {

    const [user, setUser] = useState({
        name:"",
        email:"",
        password:""
    });


    const handleChange = (e)=>{
        setUser({
            ...user,
            [e.target.name]: e.target.value
        });
    };


    const handleSubmit = async(e)=>{

        e.preventDefault();

        const response = await fetch(
            "http://localhost:5000/api/auth/register",
            {
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify(user)
            }
        );


        const data = await response.json();

        alert(data.message);

    };


    return(
        <div>

            <h1>Register</h1>


            <form onSubmit={handleSubmit}>

                <input
                name="name"
                placeholder="Name"
                onChange={handleChange}
                />


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
                    Register
                </button>


            </form>


        </div>
    );

}


export default Register;