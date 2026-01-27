import styled from 'styled-components';

export const LoginContainer = styled.div`
  grid-area: B;
  display: flex;
  flex-direction: column;
  justify-content: center;

  form {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  h1 {
    font-size: 1.5rem;
    margin-bottom: 0.5rem;
    background-image: linear-gradient(
      to right,
      ${props => props.theme['text-primary']} 0%,
      ${props => props.theme['text-secondary']} 13%);
    background-clip: text;
    color: transparent;
  }
`;

export const Input = styled.input`
  background-color: ${props => props.theme['bg-dark']};
  border: 2px solid ${props => props.theme['background']};
  border-radius: 8px;
  padding: 0.75rem 1rem;
  color: ${props => props.theme['paragraph']};
  font-family: 'Roboto', sans-serif;
  font-size: 1rem;
  transition: border-color 0.3s;

  &:focus {
    outline: none;
    border-color: ${props => props.theme['bg-golden']};
  }

  &::placeholder {
    color: ${props => props.theme['paragraph']}80;
  }
`;

export const Button = styled.button`
  background-color: ${props => props.theme['bg-golden']};
  color: ${props => props.theme['background']};
  border: none;
  border-radius: 8px;
  padding: 0.75rem 1.5rem;
  font-family: 'Roboto', sans-serif;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: filter 0.2s;

  &:hover {
    filter: brightness(0.9);
  }
`;

export const RegisterLink = styled.a`
  text-align: center;
  color: ${props => props.theme['bg-golden']};
  text-decoration: none;
  font-family: 'Roboto', sans-serif;
  font-size: 0.9rem;
  cursor: pointer;
  transition: filter 0.2s;

  &:hover {
    filter: brightness(0.8);
    text-decoration: underline;
  }
`;

export const ErrorMessage = styled.p`
  color: #ff4444;
  font-family: 'Roboto', sans-serif;
  font-size: 0.9rem;
  margin: -0.5rem 0;
`;
