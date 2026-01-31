import styled from 'styled-components';

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.85);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 3000;
  padding: 2rem;
`;

export const ModalContainer = styled.div`
  background-color: ${(p) => p.theme['bg-dark']};
  border: 2px solid ${(p) => p.theme['bg-golden']};
  border-radius: 16px;
  max-width: 520px;
  width: 100%;
  max-height: 80vh;
  overflow-y: auto;
  padding: 1.5rem;
  position: relative;
`;

export const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;

  h1 {
    font-family: 'Bebas Neue', sans-serif;
    background-image: linear-gradient(
      to right,
      ${(p) => p.theme['text-primary']} 0%,
      ${(p) => p.theme['text-secondary']} 13%
    );
    background-clip: text;
    color: transparent;
    font-size: 1.5rem;
  }
`;

export const CloseButton = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  color: ${(p) => p.theme['bg-golden']};

  &:hover {
    filter: brightness(0.8);
  }
`;

export const SearchForm = styled.form`
  position: relative;
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
`;

export const SearchInput = styled.input`
  width: 100%;
  padding: 0.75rem 3rem 0.75rem 1rem;
  background-color: ${(p) => p.theme['background']};
  border: 2px solid ${(p) => p.theme['bg-golden']};
  border-radius: 8px;
  color: ${(p) => p.theme['paragraph']};
  font-family: 'Roboto', sans-serif;
  font-size: 0.95rem;

  &::placeholder {
    opacity: 0.6;
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px ${(p) => p.theme['background']};
  }
`;

export const SearchButton = styled.button`
  position: absolute;
  right: 0.5rem;
  top: 50%;
  transform: translateY(-50%);
  background: transparent;
  border: none;
  padding: 0.4rem;
  cursor: pointer;
  color: ${(p) => p.theme['bg-golden']};

  &:hover:not(:disabled) {
    filter: brightness(0.8);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const StatusMessage = styled.p<{ $erro?: boolean }>`
  margin: 0.5rem 0;
  font-size: 0.9rem;
  color: ${(p) => (p.$erro ? '#e74c3c' : p.theme['paragraph'])};
`;

export const ResultadosLista = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  max-height: 300px;
  overflow-y: auto;
`;

export const ResultadoItem = styled.li`
  padding: 0.6rem 0.8rem;
  margin-bottom: 0.4rem;
  background-color: ${(p) => p.theme['background']};
  border-radius: 8px;
  border: 1px solid ${(p) => p.theme['bg-golden']};
  color: ${(p) => p.theme['paragraph']};
  font-family: 'Roboto', sans-serif;
  cursor: pointer;
  transition: filter 0.2s;

  &:hover {
    filter: brightness(1.1);
  }

  strong {
    display: block;
    font-size: 0.95rem;
  }
`;

export const ResultadoNutrientes = styled.div`
  font-size: 0.8rem;
  margin-top: 0.2rem;
  opacity: 0.9;
`;
