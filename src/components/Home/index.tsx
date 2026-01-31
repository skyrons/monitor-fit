import { Aside, Main, SectionContainer, UpdateButton, ProfileLink } from "./styles";
import { useRef, useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { Login } from "../Login";
import { RegisterModal } from "../RegisterModal";
import { UpdateProfileModal } from "../UpdateProfileModal";
import { ElaborarRefeicoes } from "../ElaborarRefeicoes";
import { calculateBMR, calculateBodyFatPercentage } from "../../utils/calculations";
import sr from '../../utils/scrollreveal'

export function Home(){
  const { user, refreshUser } = useAuth();
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  
  const asideRef = useRef<HTMLDivElement | null>(null);
  const mainRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (asideRef.current) {
      sr.reveal(asideRef.current, {
        origin: 'left',
        distance: '20px',
        duration: 1500,
        delay: 200,
        easing: 'ease-in-out',
        reset: true,
      });
    }
    if (mainRef.current) {
      sr.reveal(mainRef.current, {
        scale: 0.5,
        opacity: 0,
        duration: 2000,
        delay: 200,
        easing: 'ease-in-out',
        reset: true,
      });
    }
  }, [user]);

  useEffect(() => {
    const handleOpenUpdateProfile = () => {
      setIsUpdateModalOpen(true);
    };

    window.addEventListener('openUpdateProfile', handleOpenUpdateProfile);
    return () => {
      window.removeEventListener('openUpdateProfile', handleOpenUpdateProfile);
    };
  }, []);

  const handleUpdateProfileClose = async () => {
    setIsUpdateModalOpen(false);
    await refreshUser();
  };

  const bmr = user ? calculateBMR({
    weight: user.weight,
    height: user.height,
    age: user.age,
    gender: user.gender,
  }) : null;

  const bodyFat = user ? calculateBodyFatPercentage({
    height: user.height,
    gender: user.gender,
    neckCircumference: user.neckCircumference,
    waistCircumference: user.waistCircumference,
    hipCircumference: user.hipCircumference,
  }) : null;

  const hasIncompleteData = user && (!bmr || !bodyFat);

  return(
    <SectionContainer>
      <Aside ref={asideRef}>
        <h1>EasyFit</h1>
        <h1>Monitor de Desempenho</h1>
        <div>
          <p>
            Acompanhe o seu desenvolvimento de forma rapida e prática 
          </p>
          <p>
            Encontre o seu percentual de gordura a partir das suas medidas corporais
          </p>
          <p>
            Junte-se aos seus amigos e incentive a atividade fisica.
          </p>
        </div> 
      </Aside>

      {user ? (
        <Main ref={mainRef}>
          <div>
            <h1>SOBRE VOCÊ</h1>
            <ul>
              <li>{user.name}{user.age ? `, ${user.age} anos` : ''}</li>
              {user.height && <li>{user.height}cm de altura</li>}
              {user.weight && <li>{user.weight}kg</li>}
            </ul>
          </div>
          <div>
            <h1>TAXA METABÓLICA BASAL</h1>
            <ul>
              {bmr ? (
                <li>{Math.round(bmr)}cal</li>
              ) : (
                <li>
                  {hasIncompleteData && (
                    <ProfileLink onClick={() => setIsUpdateModalOpen(true)}>
                      Você precisa completar o seu perfil
                    </ProfileLink>
                  )}
                </li>
              )}
            </ul>
          </div>
          <div>
            <h1>PERCENTUAL DE GORDURA</h1>
            <ul>
              {bodyFat ? (
                <li>{Math.round(bodyFat)}%</li>
              ) : (
                <li>
                  {hasIncompleteData && (
                    <ProfileLink onClick={() => setIsUpdateModalOpen(true)}>
                      Você precisa completar o seu perfil
                    </ProfileLink>
                  )}
                </li>
              )}
            </ul>
          </div>
          <UpdateButton onClick={() => setIsUpdateModalOpen(true)}>
            ATUALIZAR PERFIL
          </UpdateButton>
        </Main>
      ) : (
        <Login onOpenRegister={() => setIsRegisterModalOpen(true)} />
      )}

      {user && <ElaborarRefeicoes />}

      <RegisterModal 
        isOpen={isRegisterModalOpen} 
        onClose={() => setIsRegisterModalOpen(false)} 
      />
      <UpdateProfileModal 
        isOpen={isUpdateModalOpen} 
        onClose={handleUpdateProfileClose} 
      />
    </SectionContainer>
  );
}