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
  z-index: 2500;
  padding: 2rem;
`;

export const ModalContainer = styled.div`
  background-color: ${(p) => p.theme['bg-dark']};
  border: 2px solid ${(p) => p.theme['bg-golden']};
  border-radius: 16px;
  max-width: 640px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  padding: 1.5rem;
  position: relative;
`;

export const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.25rem;

  h1 {
    font-family: 'Bebas Neue', sans-serif;
    background-image: linear-gradient(
      to right,
      ${(p) => p.theme['text-primary']} 0%,
      ${(p) => p.theme['text-secondary']} 13%
    );
    background-clip: text;
    color: transparent;
    font-size: 1.75rem;
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

export const Form = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
`;

export const FormGroup = styled.div`
  h2 {
    font-family: 'Bebas Neue', sans-serif;
    background-image: linear-gradient(
      to right,
      ${(p) => p.theme['text-primary']} 0%,
      ${(p) => p.theme['text-secondary']} 13%
    );
    background-clip: text;
    color: transparent;
    font-size: 1.25rem;
    margin-bottom: 0.5rem;
  }
`;

export const Input = styled.input`
  width: 100%;
  background-color: ${(p) => p.theme['background']};
  border: 2px solid ${(p) => p.theme['background']};
  border-radius: 8px;
  padding: 0.65rem 1rem;
  color: ${(p) => p.theme['paragraph']};
  font-family: 'Roboto', sans-serif;
  font-size: 1rem;

  &:focus {
    outline: none;
    border-color: ${(p) => p.theme['bg-golden']};
  }
`;

export const AddFoodButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.65rem 1rem;
  background: transparent;
  border: 2px dashed ${(p) => p.theme['bg-golden']};
  border-radius: 8px;
  color: ${(p) => p.theme['bg-golden']};
  font-family: 'Roboto', sans-serif;
  font-size: 0.95rem;
  font-weight: 500;
  cursor: pointer;
  width: 100%;
  justify-content: center;
  transition: filter 0.2s;

  &:hover {
    filter: brightness(0.9);
    background: rgba(255, 205, 44, 0.08);
  }
`;

export const FoodList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0.75rem 0 0;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const FoodItem = styled.li`
  background-color: ${(p) => p.theme['background']};
  border: 1px solid ${(p) => p.theme['bg-golden']};
  border-radius: 8px;
  padding: 0.75rem 1rem;
  display: grid;
  grid-template-columns: 1fr auto auto auto;
  align-items: center;
  gap: 0.75rem;
  color: ${(p) => p.theme['paragraph']};
  font-family: 'Roboto', sans-serif;
  font-size: 0.9rem;
`;

export const FoodLeft = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
`;

export const FoodDesc = styled.span`
  font-weight: 500;
`;

export const FoodQty = styled.label`
  display: flex;
  align-items: center;
  gap: 0.35rem;
  font-size: 0.85rem;
  opacity: 0.9;

  input {
    width: 70px;
    padding: 0.3rem 0.5rem;
    background: ${(p) => p.theme['bg-dark']};
    border: 1px solid ${(p) => p.theme['bg-golden']};
    border-radius: 4px;
    color: ${(p) => p.theme['paragraph']};
    font-size: 0.85rem;
  }
`;

export const FoodMacros = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  font-size: 0.8rem;
  text-align: right;
`;

export const ExpandButton = styled.button`
  background: transparent;
  border: none;
  color: ${(p) => p.theme['bg-golden']};
  cursor: pointer;
  padding: 0.25rem;

  &:hover {
    filter: brightness(0.8);
  }
`;

export const RemoveButton = styled.button`
  background: transparent;
  border: none;
  color: #e74c3c;
  cursor: pointer;
  padding: 0.25rem;

  &:hover {
    filter: brightness(1.2);
  }
`;

export const MicronutrientsBox = styled.div`
  grid-column: 1 / -1;
  margin-top: 0.5rem;
  padding-top: 0.5rem;
  border-top: 1px solid rgba(255, 205, 44, 0.3);
  font-size: 0.8rem;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
  gap: 0.25rem 1rem;
  opacity: 0.9;
`;

export const FinalizeButton = styled.button`
  margin-top: 1rem;
  padding: 0.75rem 1.5rem;
  background-color: ${(p) => p.theme['bg-golden']};
  color: ${(p) => p.theme['background']};
  border: none;
  border-radius: 8px;
  font-family: 'Roboto', sans-serif;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  width: 100%;

  &:hover {
    filter: brightness(0.95);
  }
`;
