import { useState, useEffect } from 'react';
import { X } from 'phosphor-react';
import type { User } from '../../services/api';
import { useAuth } from '../../contexts/AuthContext';
import {
  ModalOverlay,
  ModalContainer,
  ModalHeader,
  CloseButton,
  Form,
  FormGroup,
  Input,
  Select,
  Button,
  ButtonGroup,
  ErrorMessage,
} from './styles';

interface UpdateProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function UpdateProfileModal({ isOpen, onClose }: UpdateProfileModalProps) {
  const { user, updateUser } = useAuth();
  const [error, setError] = useState('');
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<Partial<User>>({});

  useEffect(() => {
    if (isOpen && user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        weight: user.weight,
        height: user.height,
        age: user.age,
        gender: user.gender,
        activityLevel: user.activityLevel,
        neckCircumference: user.neckCircumference,
        waistCircumference: user.waistCircumference,
        hipCircumference: user.hipCircumference,
      });
      setCurrentStep(1);
      setError('');
    }
  }, [isOpen, user]);

  const handleInputChange = (field: keyof User, value: string | number | undefined) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setError('');
  };

  const handleSubmit = async () => {
    try {
      await updateUser(formData);
      onClose();
    } catch (error) {
      setError('Erro ao atualizar perfil. Tente novamente.');
      console.error(error);
    }
  };

  const handleNext = () => {
    setError('');

    if (currentStep === 1) {
      if (!formData.name || !formData.email) {
        setError('Por favor, preencha nome e email');
        return;
      }
      setCurrentStep(2);
      return;
    }

    if (currentStep === 2) {
      if (!formData.weight || !formData.height || !formData.age || !formData.gender || !formData.activityLevel) {
        setError('Por favor, preencha todos os campos');
        return;
      }
      // Sempre vai para o passo 3 após definir sexo e dados básicos
      setCurrentStep(3);
      return;
    }

    if (currentStep === 3) {
      handleSubmit();
    }
  };

  const handleSkip = () => {
    handleSubmit();
  };

  if (!isOpen || !user) return null;

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <h1>ATUALIZAR PERFIL</h1>
          <CloseButton onClick={onClose}>
            <X size={24} />
          </CloseButton>
        </ModalHeader>

        <Form>
          {currentStep === 1 && (
            <>
              <FormGroup>
                <h2>NOME</h2>
                <Input
                  type="text"
                  value={formData.name || ''}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  placeholder="Digite seu nome"
                />
              </FormGroup>
              <FormGroup>
                <h2>EMAIL</h2>
                <Input
                  type="email"
                  value={formData.email || ''}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  placeholder="Digite seu email"
                />
              </FormGroup>
            </>
          )}

          {currentStep === 2 && (
            <>
              <FormGroup>
                <h2>PESO (kg)</h2>
                <Input
                  type="number"
                  step="0.1"
                  value={formData.weight || ''}
                  onChange={(e) => handleInputChange('weight', parseFloat(e.target.value) || undefined)}
                  placeholder="Digite seu peso"
                />
              </FormGroup>
              <FormGroup>
                <h2>ALTURA (cm)</h2>
                <Input
                  type="number"
                  step="0.1"
                  value={formData.height || ''}
                  onChange={(e) => handleInputChange('height', parseFloat(e.target.value) || undefined)}
                  placeholder="Digite sua altura"
                />
              </FormGroup>
              <FormGroup>
                <h2>IDADE</h2>
                <Input
                  type="number"
                  value={formData.age || ''}
                  onChange={(e) => handleInputChange('age', parseInt(e.target.value) || undefined)}
                  placeholder="Digite sua idade"
                />
              </FormGroup>
              <FormGroup>
                <h2>SEXO</h2>
                <Select
                  value={formData.gender || ''}
                  onChange={(e) => handleInputChange('gender', e.target.value as 'masculino' | 'feminino')}
                >
                  <option value="">Selecione</option>
                  <option value="masculino">Masculino</option>
                  <option value="feminino">Feminino</option>
                </Select>
              </FormGroup>
              <FormGroup>
                <h2>NÍVEL DE ATIVIDADE FÍSICA</h2>
                <Select
                  value={formData.activityLevel || ''}
                  onChange={(e) => handleInputChange('activityLevel', e.target.value as User['activityLevel'])}
                >
                  <option value="">Selecione</option>
                  <option value="sedentario">Sedentário</option>
                  <option value="regularmente">Regularmente</option>
                  <option value="ativo">Ativo</option>
                  <option value="muito-ativo">Muito Ativo</option>
                </Select>
              </FormGroup>
            </>
          )}

          {currentStep === 3 && (
            <>
              <FormGroup>
                <h2>CIRCUNFERÊNCIA DO PESCOÇO (cm)</h2>
                <Input
                  type="number"
                  step="0.1"
                  value={formData.neckCircumference || ''}
                  onChange={(e) => handleInputChange('neckCircumference', parseFloat(e.target.value) || undefined)}
                  placeholder="Digite a circunferência do pescoço"
                />
              </FormGroup>
              <FormGroup>
                <h2>CIRCUNFERÊNCIA DA CINTURA (cm)</h2>
                <Input
                  type="number"
                  step="0.1"
                  value={formData.waistCircumference || ''}
                  onChange={(e) => handleInputChange('waistCircumference', parseFloat(e.target.value) || undefined)}
                  placeholder="Digite a circunferência da cintura"
                />
              </FormGroup>
              <FormGroup>
                <h2>CIRCUNFERÊNCIA DO QUADRIL (cm)</h2>
                <Input
                  type="number"
                  step="0.1"
                  value={formData.hipCircumference || ''}
                  onChange={(e) => handleInputChange('hipCircumference', parseFloat(e.target.value) || undefined)}
                  placeholder="Digite a circunferência do quadril"
                />
              </FormGroup>
            </>
          )}

          {error && <ErrorMessage>{error}</ErrorMessage>}

          <ButtonGroup>
            {currentStep > 1 && (
              <Button type="button" onClick={() => setCurrentStep(currentStep - 1)} variant="secondary">
                VOLTAR
              </Button>
            )}
            {currentStep === 3 && (
              <Button type="button" onClick={handleSkip} variant="secondary">
                PULAR
              </Button>
            )}
            <Button type="button" onClick={handleNext} variant="primary">
              {currentStep === 3 ? 'SALVAR' : 'PRÓXIMO'}
            </Button>
          </ButtonGroup>
        </Form>
      </ModalContainer>
    </ModalOverlay>
  );
}
