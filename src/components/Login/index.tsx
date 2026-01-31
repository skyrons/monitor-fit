import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { LoginContainer, FormGroup, Input, Button, RegisterLink, ErrorMessage } from './styles';

interface LoginProps {
  onOpenRegister: () => void;
}

export function Login({ onOpenRegister }: LoginProps) {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Por favor, preencha todos os campos');
      return;
    }

    try {
      const success = await login(email, password);
      if (!success) {
        setError('Email ou senha incorretos');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao conectar. Execute: npm run server');
    }
  };

  return (
    <LoginContainer>
      <form onSubmit={handleSubmit}>
        <FormGroup>
          <h1>ID</h1>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Digite seu email"
          />
        </FormGroup>
        <FormGroup>
          <h1>SENHA</h1>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Digite sua senha"
          />
        </FormGroup>
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <Button type="submit">ENTRAR</Button>
        <RegisterLink onClick={onOpenRegister}>
          Registrar-se
        </RegisterLink>
      </form>
    </LoginContainer>
  );
}
