import styled from 'styled-components';

export const Container = styled.div`
  grid-area: C;
  margin-top: 0;
  padding-top: 2rem;
  border-top: 1px solid ${(p) => p.theme['bg-golden']};
  width: 100%;
`;

export const Titulo = styled.h1`
  font-family: 'Bebas Neue', sans-serif;
  font-size: 1.75rem;
  margin-bottom: 1rem;
  background-image: linear-gradient(
    to right,
    ${(p) => p.theme['text-primary']} 10%,
    ${(p) => p.theme['text-secondary']} 50%
  );
  background-clip: text;
  color: transparent;
`;

export const TotaisBox = styled.div`
  background-color: ${(p) => p.theme['background']};
  border: 1px solid ${(p) => p.theme['bg-golden']};
  border-radius: 8px;
  padding: 1rem 1.25rem;
  margin-bottom: 1rem;
`;

export const TotaisLinha = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  margin-bottom: 0.5rem;

  &:last-child {
    margin-bottom: 0;
  }
`;

export const TotaisItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;

  .label {
    font-size: 0.8rem;
    color: ${(p) => p.theme['paragraph']};
    opacity: 0.85;
    font-family: 'Roboto', sans-serif;
  }

  .valor {
    font-size: 1rem;
    font-weight: 600;
    color: ${(p) => p.theme['bg-golden']};
    font-family: 'Roboto', sans-serif;
  }
`;

export const AddRefeicaoButton = styled.button<{ $secondary?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  width: 100%;
  padding: 0.75rem 1.25rem;
  background-color: ${(p) =>
    p.$secondary ? 'transparent' : p.theme['bg-golden']};
  color: ${(p) =>
    p.$secondary ? p.theme['bg-golden'] : p.theme['background']};
  border: 2px solid ${(p) => p.theme['bg-golden']};
  border-radius: 8px;
  font-family: 'Roboto', sans-serif;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  margin-bottom: ${(p) => (p.$secondary ? '0' : '1rem')};
  margin-top: ${(p) => (p.$secondary ? '1rem' : '0')};
  transition: filter 0.2s;

  &:hover {
    filter: brightness(0.9);
  }
`;

export const RefeicoesLista = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

export const RefeicaoCard = styled.li`
  background-color: ${(p) => p.theme['background']};
  border: 1px solid ${(p) => p.theme['bg-golden']};
  border-radius: 8px;
  padding: 0.9rem 1.25rem;
  cursor: pointer;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1rem;
  transition: filter 0.2s;

  &:hover {
    filter: brightness(1.05);
  }
`;

export const RefeicaoCardContent = styled.div`
  flex: 1;
  min-width: 0;
`;

export const RefeicaoRemoveButton = styled.button`
  background: transparent;
  border: none;
  color: #e74c3c;
  cursor: pointer;
  padding: 0.25rem;
  flex-shrink: 0;

  &:hover {
    filter: brightness(1.2);
  }
`;

export const RefeicaoNome = styled.div`
  font-family: 'Roboto', sans-serif;
  font-weight: 600;
  font-size: 1rem;
  color: ${(p) => p.theme['paragraph']};
  margin-bottom: 0.35rem;
`;

export const RefeicaoTotais = styled.div`
  font-size: 0.9rem;
  color: ${(p) => p.theme['paragraph']};
  opacity: 0.9;
  font-family: 'Roboto', sans-serif;
`;
