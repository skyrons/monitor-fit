import styled from 'styled-components';

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
  padding: 2rem;
`;

export const ModalContainer = styled.div`
  background-color: ${props => props.theme['bg-dark']};
  border: 2px solid ${props => props.theme['bg-golden']};
  border-radius: 16px;
  max-width: 600px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  padding: 2rem;
  position: relative;
`;

export const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;

  h1 {
    font-family: 'Bebas Neue', sans-serif;
    background-image: linear-gradient(
      to right,
      ${props => props.theme['text-primary']} 0%,
      ${props => props.theme['text-secondary']} 13%);
    background-clip: text;
    color: transparent;
    font-size: 2rem;
  }
`;

export const CloseButton = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  color: ${props => props.theme['bg-golden']};
  transition: filter 0.2s;

  &:hover {
    filter: brightness(0.8);
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  h2 {
    font-family: 'Bebas Neue', sans-serif;
    background-image: linear-gradient(
      to right,
      ${props => props.theme['text-primary']} 0%,
      ${props => props.theme['text-secondary']} 13%);
    background-clip: text;
    color: transparent;
    font-size: 1.5rem;
    margin-bottom: 0.5rem;
  }
`;

export const Input = styled.input`
  background-color: ${props => props.theme['background']};
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

export const Select = styled.select`
  background-color: ${props => props.theme['background']};
  border: 2px solid ${props => props.theme['background']};
  border-radius: 8px;
  padding: 0.75rem 1rem;
  color: ${props => props.theme['paragraph']};
  font-family: 'Roboto', sans-serif;
  font-size: 1rem;
  transition: border-color 0.3s;
  cursor: pointer;

  &:focus {
    outline: none;
    border-color: ${props => props.theme['bg-golden']};
  }

  option {
    background-color: ${props => props.theme['bg-dark']};
    color: ${props => props.theme['paragraph']};
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
`;

export const Button = styled.button<{ variant?: 'primary' | 'secondary' }>`
  flex: 1;
  background-color: ${props => 
    props.variant === 'secondary' 
      ? 'transparent' 
      : props.theme['bg-golden']};
  color: ${props => 
    props.variant === 'secondary' 
      ? props.theme['bg-golden'] 
      : props.theme['background']};
  border: 2px solid ${props => props.theme['bg-golden']};
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

export const ErrorMessage = styled.p`
  color: #ff4444;
  font-family: 'Roboto', sans-serif;
  font-size: 0.9rem;
  margin: -0.5rem 0;
`;
