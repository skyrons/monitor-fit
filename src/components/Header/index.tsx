import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { User, House, SignOut, UserCircle } from 'phosphor-react';
import { useAuth } from '../../contexts/AuthContext';
import { HeaderContainer, NavCenter, NavLink, ProfileIcon, Dropdown, DropdownItem, HomeIcon } from './styles';

export function Header() {
  const { user, logout } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }

    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isDropdownOpen]);

  if (!user) return null;

  return (
    <HeaderContainer>
      <HomeIcon as={Link} to="/" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
        <House size={32} weight="fill" />
      </HomeIcon>
      <NavCenter>
        <NavLink as={Link} to="/buscar-alimentos">
          Buscar alimentos
        </NavLink>
      </NavCenter>
      <ProfileIcon onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
        <UserCircle size={32} weight="fill" />
        {isDropdownOpen && (
          <Dropdown ref={dropdownRef}>
            <DropdownItem onClick={() => {
              setIsDropdownOpen(false);
              const event = new CustomEvent('openUpdateProfile');
              window.dispatchEvent(event);
            }}>
              <User size={20} />
              Atualizar Perfil
            </DropdownItem>
            <DropdownItem onClick={() => {
              logout();
              setIsDropdownOpen(false);
            }}>
              <SignOut size={20} />
              Sair
            </DropdownItem>
          </Dropdown>
        )}
      </ProfileIcon>
    </HeaderContainer>
  );
}
