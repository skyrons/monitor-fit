import { useState } from 'react';
import { MagnifyingGlass, X } from 'phosphor-react';
import { api, type Alimento } from '../../services/api';
import {
  ModalOverlay,
  ModalContainer,
  ModalHeader,
  CloseButton,
  SearchForm,
  SearchInput,
  SearchButton,
  StatusMessage,
  ResultadosLista,
  ResultadoItem,
  ResultadoNutrientes,
} from './styles';

interface BuscarAlimentoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (alimento: Alimento) => void;
}

export function BuscarAlimentoModal({
  isOpen,
  onClose,
  onSelect,
}: BuscarAlimentoModalProps) {
  const [busca, setBusca] = useState('');
  const [resultados, setResultados] = useState<Alimento[] | null>(null);
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const query = busca.trim();
    setErro(null);
    if (!query) {
      setResultados(null);
      return;
    }
    setCarregando(true);
    try {
      const lista = await api.searchAlimentosPorNome(query);
      setResultados(lista);
    } catch (err) {
      setErro(err instanceof Error ? err.message : 'Erro ao buscar alimentos.');
      setResultados(null);
    } finally {
      setCarregando(false);
    }
  }

  function handleSelect(alimento: Alimento) {
    onSelect(alimento);
    onClose();
  }

  if (!isOpen) return null;

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <h1>Buscar alimento</h1>
          <CloseButton onClick={onClose} type="button">
            <X size={24} />
          </CloseButton>
        </ModalHeader>

        <SearchForm onSubmit={handleSubmit}>
          <SearchInput
            type="search"
            placeholder="buscar alimento por nome"
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            disabled={carregando}
          />
          <SearchButton type="submit" disabled={carregando} title="Buscar">
            <MagnifyingGlass size={22} weight="bold" />
          </SearchButton>
        </SearchForm>

        {carregando && <StatusMessage>Buscando...</StatusMessage>}
        {erro && <StatusMessage $erro>{erro}</StatusMessage>}
        {resultados !== null && !carregando && (
          <>
            {resultados.length === 0 ? (
              <StatusMessage>Nenhum alimento encontrado.</StatusMessage>
            ) : (
              <ResultadosLista>
                {resultados.map((a) => (
                  <ResultadoItem
                    key={a.id}
                    onClick={() => handleSelect(a)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) =>
                      e.key === 'Enter' && handleSelect(a)
                    }
                  >
                    <strong>{a.descricao}</strong>
                    <ResultadoNutrientes>
                      Proteínas: {a.macronutrientes.proteinas_g ?? '—'} g ·
                      Lipídeos: {a.macronutrientes.lipideos_g ?? '—'} g ·
                      Carboidratos: {a.macronutrientes.carboidratos_g ?? '—'} g
                      (por 100g)
                    </ResultadoNutrientes>
                  </ResultadoItem>
                ))}
              </ResultadosLista>
            )}
          </>
        )}
      </ModalContainer>
    </ModalOverlay>
  );
}
