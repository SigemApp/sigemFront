import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 

interface RegisterProps {
  onRegister: (token: string) => void;
}

const Register: React.FC<RegisterProps> = ({ onRegister }) => {
  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  
  const navigate = useNavigate();

  const handleRegisterClick = async () => {
    try {
      const response = await fetch('https://suaapi.com/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
      });

      if (!response.ok) {
        throw new Error('Falha ao registrar. Verifique seus dados.');
      }

      const data = await response.json();
      onRegister(data.token); 
    } catch (error) {
      setError((error as Error).message);
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        background: 'linear-gradient(to bottom, #3a0088, #30cfd0)',
      }}
    >
      <div
        style={{
          width: '400px',
          padding: '40px',
          background: '#fff',
          borderRadius: '8px',
          boxShadow: '0px 0px 15px rgba(0, 0, 0, 0.2)',
          textAlign: 'center',
        }}
      >
        <h1 style={{ fontSize: '30px', color: '#333', marginBottom: '10px', fontWeight: 'bolder' }}>
          Crie sua Conta
        </h1>
        <p style={{ color: '#666', marginBottom: '20px', fontSize: '14px' }}>
          Insira seus dados.
        </p>

        <input
          type="text"
          placeholder="Nome de Usuário"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={{
            width: '100%',
            padding: '10px',
            margin: '10px 0',
            border: '1px solid #ddd',
            borderRadius: '5px',
            fontSize: '16px',
          }}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            width: '100%',
            padding: '10px',
            margin: '10px 0',
            border: '1px solid #ddd',
            borderRadius: '5px',
            fontSize: '16px',
          }}
        />
        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            width: '100%',
            padding: '10px',
            margin: '10px 0',
            border: '1px solid #ddd',
            borderRadius: '5px',
            fontSize: '16px',
          }}
        />

        <button
          onClick={handleRegisterClick}
          style={{
            width: '40%',
            padding: '10px',
            fontSize: '16px',
            color: '#fff',
            background: 'linear-gradient(to right, #6a11cb, #2575fc)',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            marginTop: '10px',
          }}
        >
          Registrar
        </button>

        {error && (
          <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>
        )}

        <p style={{ marginTop: '20px', fontSize: '14px', color: '#666' }}>
          Já tem uma conta?{' '}
          <span
            onClick={() => navigate('/')} 
            style={{ color: '#2575fc', textDecoration: 'underline', cursor: 'pointer' }}
          >
            Faça login
          </span>
        </p>
      </div>
    </div>
  );
};

export default Register;
