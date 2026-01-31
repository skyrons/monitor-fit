import { useState, useEffect } from 'react';
import { X } from 'phosphor-react';
import type { User } from '../../services/api';
import { api } from '../../services/api';
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
  StepIndicator,
} from './styles';

interface RegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface RegisterFormData extends Partial<User> {
  confirmPassword?: string;
}

export function RegisterModal({ isOpen, onClose }: RegisterModalProps) {
  const { login } = useAuth();
  const [step, setStep] = useState(1);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState<RegisterFormData>({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    weight: undefined,
    height: undefined,
    age: undefined,
    gender: undefined,
    activityLevel: undefined,
    neckCircumference: undefined,
    waistCircumference: undefined,
    hipCircumference: undefined,
  });

  useEffect(() => {
    if (isOpen) {
      setStep(1);
      setFormData({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        weight: undefined,
        height: undefined,
        age: undefined,
        gender: undefined,
        activityLevel: undefined,
        neckCircumference: undefined,
        waistCircumference: undefined,
        hipCircumference: undefined,
      });
      setError('');
    }
  }, [isOpen]);

  const handleInputChange = (field: keyof RegisterFormData, value: string | number | undefined) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setError('');
  };

  const validateStep1 = () => {
    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      setError('Por favor, preencha todos os campos');
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      setError('As senhas não coincidem');
      return false;
    }
    return true;
  };

  const validateStep2 = () => {
    if (!formData.weight || !formData.height || !formData.age || !formData.gender || !formData.activityLevel) {
      setError('Por favor, preencha todos os campos');
      return false;
    }
    return true;
  };

  const validateStep3 = () => {
    if (formData.gender === 'feminino') {
      if (!formData.neckCircumference || !formData.waistCircumference || !formData.hipCircumference) {
        setError('Por favor, preencha todas as circunferências');
        return false;
      }
    } else {
      if (!formData.neckCircumference || !formData.waistCircumference) {
        setError('Por favor, preencha as circunferências necessárias');
        return false;
      }
    }
    return true;
  };

  const handleNext = () => {
    setError('');

    if (step === 1) {
      if (validateStep1()) {
        setStep(2);
      }
      return;
    }

    if (step === 2) {
      if (validateStep2()) {
        // Sempre vai para o passo 3 após definir sexo e dados básicos
        setStep(3);
      }
      return;
    }

    if (step === 3) {
      // No último passo, valida circunferências (se o usuário quiser preenchê-las)
      if (validateStep3()) {
        handleSubmit();
      }
    }
  };

  const handleSkip = () => {
    handleSubmit();
  };

  const handleSubmit = async () => {
    try {
      const { confirmPassword: _confirmPassword, ...userData } = formData;
      const newUser = await api.createUser(userData as Omit<User, 'id'>);
      await login(newUser.email, formData.password as string);
      onClose();
    } catch (error) {
      setError(
        error instanceof Error ? error.message : 'Erro ao criar conta. Tente novamente.'
      );
      console.error(error);
    }
  };

  if (!isOpen) return null;

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <h1>REGISTRAR-SE</h1>
          <CloseButton onClick={onClose}>
            <X size={24} />
          </CloseButton>
        </ModalHeader>

        <StepIndicator>
          Passo {step} de 3
        </StepIndicator>

        <Form>
          {step === 1 && (
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
              <FormGroup>
                <h2>SENHA</h2>
                <Input
                  type="password"
                  value={formData.password || ''}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  placeholder="Digite sua senha"
                />
              </FormGroup>
              <FormGroup>
                <h2>REPETIR SENHA</h2>
                <Input
                  type="password"
                  value={formData.confirmPassword || ''}
                  onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                  placeholder="Repita sua senha"
                />
              </FormGroup>
            </>
          )}

          {step === 2 && (
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

          {step === 3 && (
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
            {step > 1 && (
              <Button type="button" onClick={() => setStep(step - 1)} variant="secondary">
                VOLTAR
              </Button>
            )}
            {step === 3 && (
              <Button type="button" onClick={handleSkip} variant="secondary">
                PULAR
              </Button>
            )}
            <Button type="button" onClick={handleNext} variant="primary">
              {step === 3 ? 'FINALIZAR' : 'PRÓXIMO'}
            </Button>
          </ButtonGroup>
        </Form>
      </ModalContainer>
    </ModalOverlay>
  );
}
