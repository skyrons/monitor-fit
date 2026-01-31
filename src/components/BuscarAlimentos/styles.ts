import styled from 'styled-components';

export const PageContainer = styled.section`
  width: 100%;
  max-width: 1120px;
  margin: 0 auto;
  padding-top: 7rem;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
`;

export const PageTitle = styled.h1`
  font-family: 'Bebas Neue', sans-serif;
  font-size: 2rem;
  margin-bottom: 2rem;
  background-image: linear-gradient(
    to right,
    ${(props) => props.theme['text-primary']} 10%,
    ${(props) => props.theme['text-secondary']} 50%
  );
  background-clip: text;
  color: transparent;
`;

export const SearchForm = styled.form`
  width: 100%;
  max-width: 480px;
  position: relative;
  display: flex;
  align-items: center;
`;

export const SearchInput = styled.input`
  width: 100%;
  padding: 1rem 3.5rem 1rem 1.25rem;
  background-color: ${(props) => props.theme['bg-dark']};
  border: 2px solid ${(props) => props.theme['bg-golden']};
  border-radius: 8px;
  color: ${(props) => props.theme['paragraph']};
  font-family: 'Roboto', sans-serif;
  font-size: 1rem;
  outline: none;
  transition: box-shadow 0.2s;

  &::placeholder {
    color: ${(props) => props.theme['paragraph']};
    opacity: 0.6;
  }

  &:focus {
    box-shadow: 0 0 0 2px ${(props) => props.theme['background']};
  }
`;

export const SearchButton = styled.button`
  position: absolute;
  right: 0.5rem;
  top: 50%;
  transform: translateY(-50%);
  background: transparent;
  border: none;
  padding: 0.5rem;
  cursor: pointer;
  color: ${(props) => props.theme['bg-golden']};
  display: flex;
  align-items: center;
  justify-content: center;
  transition: filter 0.2s;

  &:hover:not(:disabled) {
    filter: brightness(0.8);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const StatusMessage = styled.p<{ $erro?: boolean }>`
  margin-top: 1rem;
  color: ${(props) => (props.$erro ? '#e74c3c' : props.theme['paragraph'])};
  opacity: ${(props) => (props.$erro ? 1 : 0.9)};
  font-family: 'Roboto', sans-serif;
  font-size: 0.95rem;
`;

export const ResultadosLista = styled.ul`
  margin-top: 1.5rem;
  list-style: none;
  padding: 0;
  max-width: 600px;
  width: 100%;
`;

export const ResultadoItem = styled.li`
  padding: 0.75rem 1rem;
  margin-bottom: 0.5rem;
  background-color: ${(props) => props.theme['background']};
  border-radius: 8px;
  border: 1px solid ${(props) => props.theme['bg-golden']};
  color: ${(props) => props.theme['paragraph']};
  font-family: 'Roboto', sans-serif;

  strong {
    color: ${(props) => props.theme['paragraph']};
  }
`;

export const ResultadoNutrientes = styled.div`
  font-size: 0.85rem;
  margin-top: 0.25rem;
  opacity: 0.9;
  color: ${(props) => props.theme['paragraph']};
`;
