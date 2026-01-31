import styled from 'styled-components';

export const HeaderContainer = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 4rem;
  background-color: ${props => props.theme['bg-dark']};
  border-bottom: 2px solid ${props => props.theme['background']};
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2rem;
  z-index: 1000;
`;

export const NavCenter = styled.nav`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
`;

export const NavLink = styled.a`
  color: ${props => props.theme['bg-golden']};
  text-decoration: none;
  font-family: 'Roboto', sans-serif;
  font-size: 1rem;
  font-weight: 500;
  transition: filter 0.2s;

  &:hover {
    filter: brightness(0.8);
    text-decoration: underline;
  }
`;

export const ProfileIcon = styled.div`
  position: relative;
  cursor: pointer;
  color: ${props => props.theme['bg-golden']};
  transition: filter 0.2s;

  &:hover {
    filter: brightness(0.8);
  }
`;

export const Dropdown = styled.div`
  position: absolute;
  top: calc(100% + 0.5rem);
  left: 0;
  background-color: ${props => props.theme['bg-dark']};
  border: 2px solid ${props => props.theme['bg-golden']};
  border-radius: 8px;
  min-width: 200px;
  padding: 0.5rem 0;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
`;

export const DropdownItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  color: ${props => props.theme['paragraph']};
  cursor: pointer;
  font-family: 'Roboto', sans-serif;
  font-size: 0.9rem;
  transition: background-color 0.2s;

  &:hover {
    background-color: ${props => props.theme['background']};
  }

  svg {
    color: ${props => props.theme['bg-golden']};
  }
`;

export const HomeIcon = styled.div`
  cursor: pointer;
  color: ${props => props.theme['bg-golden']};
  transition: filter 0.2s;

  &:hover {
    filter: brightness(0.8);
  }
`;
