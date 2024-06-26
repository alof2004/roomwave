import React, { useEffect, useState } from 'react';
import '../css/ClientForm.css';
import { useUser } from "./UserContext";
import { useNavigate } from 'react-router-dom';



function LandlordForm(){
    // Define state variables to store form field values
    const [firstname, setFirstName] = useState('');
    const [lastname, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [birthdate, setDateOfBirth] = useState('');
    const [city, setRole] = useState(''); // Assuming the user's role is either 'student' or 'worker'
    const [phone, setPhoneNumber] = useState('');
    const [type, setType] = useState('landlord'); // Assuming the user's type is 'client'
    const { loginUser } = useUser();
    const navigate = useNavigate();

    useEffect(() => {
        // Save the current path to local storage
        localStorage.setItem('redirectPath', location.pathname);
      }, [location]);
    
      const redirectToSavedPath = () => {
        const savedPath = localStorage.getItem('redirectPath');
        if (savedPath && savedPath != "/Home" && savedPath != "/" && savedPath != "/login" && savedPath != "/signup/client" && savedPath != "/signup/landlord")  {
            navigate(savedPath);
            localStorage.removeItem('redirectPath');
        }
        else{
          navigate("../../homeLandlord")
        }
      };
    
      // Function to handle form submission
      const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
          event.preventDefault();  // Prevent the default form submission behavior
          
          // Construct an object with the form data
          const formData = {
            firstname,
            lastname,
            email,
            type,
            password,
            birthdate,
            job: "landlord",
            phone,
            city
        };
  
          console.log(formData);      
          localStorage.setItem('userData', JSON.stringify(formData));
          console.log('Form data saved to local storage');
          loginUser(formData);
          redirectToSavedPath();
      };

    return ( 
        <div className="signup-container">
            <form className="signup-form" onSubmit={handleSubmit}>
                <h2>Criar conta</h2>
                <div className="name-inputs">
                    <input 
                        type="text" 
                        placeholder="Primeiro Nome" 
                        value={firstname} 
                        onChange={(e) => setFirstName(e.target.value)} 
                        required 
                    />
                    <span className="name-space"> </span>
                    <input 
                        type="text" 
                        placeholder="Último Nome" 
                        value={lastname} 
                        onChange={(e) => setLastName(e.target.value)} 
                        required 
                    />
                </div>
                <input 
                    type="email" 
                    placeholder="Email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    required 
                />
                <input 
                    type="password" 
                    placeholder="Password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    required 
                />
                <h2 style={{marginRight:"450px", fontSize:"20px", marginBottom:"-20px"}}>Data de Nascimento:</h2>

                <div className="job-pass">
                    <input 
                        type="date" 
                        placeholder="Data de Nascimento" 
                        value={birthdate} 
                        onChange={(e) => setDateOfBirth(e.target.value)} 
                        required 
                    />
                    <span className="name-space"> </span>

                    <select 
                        value={city} 
                        onChange={(e) => setRole(e.target.value)} 
                        required 
                        style={{height: '40px', width: '100%', padding: '5px'}}
                    >
                        <option value="">Cidade</option>
                        <option value="Aveiro">Aveiro</option>
                        <option value="Beja">Beja</option>
                        <option value="Braga">Braga</option>
                        <option value="Bragança">Bragança</option>
                        <option value="Castelo Branco">Castelo Branco</option>
                        <option value="Coimbra">Coimbra</option>
                        <option value="Évora">Évora</option>
                        <option value="Faro">Faro</option>
                        <option value="Guarda">Guarda</option>
                        <option value="Leiria">Leiria</option>
                        <option value="Lisboa">Lisboa</option>
                        <option value="Portalegre">Portalegre</option>
                        <option value="Porto">Porto</option>
                        <option value="Santarém">Santarém</option>
                        <option value="Setúbal">Setúbal</option>
                        <option value="Viana do Castelo">Viana do Castelo</option>
                        <option value="Vila Real">Vila Real</option>
                        <option value="Viseu">Viseu</option>
                    </select>
                    <div className="arrow">&#x25BC;</div>

                </div>
                <input 
                    type="number" 
                    placeholder="Número de Telefone" 
                    value={phone} 
                    onChange={(e) => setPhoneNumber(e.target.value)} 
                    required 
                />
                <button type="submit">CRIAR CONTA</button>
            </form>
        </div>
    );
}

export default LandlordForm;
