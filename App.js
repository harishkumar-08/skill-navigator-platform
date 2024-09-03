import React, { useState } from 'react';
import axios from 'axios';

function App() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [certifications, setCertifications] = useState('');
    const [batch, setBatch] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const candidate = {
            name,
            email,
            certifications: certifications.split(',').map(cert => cert.trim()),
        };
        const response = await axios.post('http://localhost:5000/api/candidates', candidate);
        setBatch(response.data.batch);
    };

    return (
        <div className="App">
            <h1>Skill Navigator</h1>
            <form onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    placeholder="Name" 
                    value={name} 
                    onChange={e => setName(e.target.value)} 
                    required 
                />
                <input 
                    type="email" 
                    placeholder="Email" 
                    value={email} 
                    onChange={e => setEmail(e.target.value)} 
                    required 
                />
                <input 
                    type="text" 
                    placeholder="Certifications (comma separated)" 
                    value={certifications} 
                    onChange={e => setCertifications(e.target.value)} 
                    required 
                />
                <button type="submit">Submit</button>
            </form>
            {batch && <h2>Allocated Batch: {batch}</h2>}
        </div>
    );
}

export default App;
