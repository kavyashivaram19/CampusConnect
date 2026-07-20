import { useState } from "react";

function CreateEvent(){

    const [event,setEvent] = useState({
        title:"",
        description:"",
        category:"",
        date:"",
        venue:""
    });


    const handleChange=(e)=>{

        setEvent({
            ...event,
            [e.target.name]:e.target.value
        });

    };


    const handleSubmit=async(e)=>{

        e.preventDefault();


        const response = await fetch(
            "http://localhost:5000/api/events/create",
            {
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify(event)
            }
        );


        const data = await response.json();

        alert(data.message);

    };


    return(

        <div>

            <h1>Create Event</h1>


            <form onSubmit={handleSubmit}>


                <input
                name="title"
                placeholder="Event Name"
                onChange={handleChange}
                />


                <input
                name="description"
                placeholder="Description"
                onChange={handleChange}
                />


                <input
                name="category"
                placeholder="Category"
                onChange={handleChange}
                />


                <input
                name="date"
                placeholder="Date"
                onChange={handleChange}
                />


                <input
                name="venue"
                placeholder="Venue"
                onChange={handleChange}
                />


                <button>
                    Create Event
                </button>


            </form>

        </div>

    );

}


export default CreateEvent;