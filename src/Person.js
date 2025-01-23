import React, { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Form, Button,Container,Table } from 'react-bootstrap'
import axios from 'axios';

 const Person = () => {
    const[Name,setName]=useState('');
    const[Email,setEmail]=useState('');
    const[Phoneno,setPhoneno]=useState('')
    const[Data,setData]=useState([]);
    const[isediting,setisediting]=useState(false);
    const[editid,setEditId]=useState(null)

    useEffect(()=>{
        const fetchdata=async()=>{
            try{
                const response= await axios.get('https://6700f21cb52042b542d65577.mockapi.io/contactdetails');
                setData(response.data)

            }
            catch(error){
                console.error("error in fetching data",error);

            }

        }
        fetchdata()
       

    },[Data])

    const handlecreatedata=async ()=>{
        try{
            axios.post(`https://6700f21cb52042b542d65577.mockapi.io/contactdetails`,{
                Name,
                Email,
                Phoneno
            })

        
        }
        catch(error){
            console.error("data create is error",error);
        }

       

    }

    const handleEdit=async(id)=>{
       const updatedata=Data.find((data)=>data.id===id);
        setName(updatedata.Name);
        setEmail(updatedata.Email)
        setPhoneno(updatedata.Phoneno);
        setEditId(updatedata.id);
        setisediting(true);



      }
      const handleupdateData=async()=>{
        try{
            await axios.put(`https://6700f21cb52042b542d65577.mockapi.io/contactdetails/${editid}`,{Name,Email,Phoneno});
            setName("");
            setEmail("");
            setPhoneno("");
            setEditId(null);
            setisediting(false);
        }
        catch(error){
            console.log("error upadating the data");
        }

      };
      const handlesubmit=(e)=>{
        e.preventDefault();
        if(isediting){
            handleupdateData();
        }
        else{
            handlecreatedata();
        }

      }

    const getData = () => {
        axios.get(`https://6700f21cb52042b542d65577.mockapi.io/contactdetails`)
            .then((getData) => {
                 setData(getData.data);
             })
    }
    const handledelete=(id)=>{
        axios.delete(`https://6700f21cb52042b542d65577.mockapi.io/contactdetails/${id}`)
        .then(()=>{
            getData()
            
        })
    }

    return (
        <div className="form-container">
            <Form className="signup-form text-center my-4" onSubmit={handlesubmit}>
                <Form.Group >
                    <input className="name-input my-2" value={Name} type="text" placeholder="name" name="name" onChange={(e) => setName(e.target.value)}></input>
                    <br/>
                    <input className="email-input my-2"  value={Email}type="text" placeholder="email" name="email" onChange={(e) => setEmail(e.target.value)} ></input>
                    <br/>
                    <input className="phone-input my-2"  value={Phoneno}type="number" placeholder="phoneno" name="phoneno" onChange={(e) => setPhoneno(e.target.value)}></input>
                    <br/>
                    <Button className="submit-button mx-4" value="submit" type="submit" >{isediting?'update':'add'}</Button>
                    

                </Form.Group>
                
            </Form>
            <Container>
              <Table>
              <thead>
        <tr>
          <th> Name</th>
          <th>Email</th>
          <th>Phoneno</th>
        </tr>
      </thead>
      <tbody>
        {Data.map((data)=>{
            return(
                <tr key={data.id}>
                <td>{data.Name}</td>
                <td>{data.Email}</td>
                <td>{data.Phoneno}</td>
                <td><button onClick={()=>handleEdit(data.id)}>update</button></td>
                <td><button onClick={()=>handledelete(data.id)}>delete</button></td>
              </tr>

            )
        })}
        </tbody>
              </Table>
            </Container>

        </div>
    )
}
export default Person