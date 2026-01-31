import { useState } from 'react';
import { MagnifyingGlass } from 'phosphor-react';
import { api, type Alimento } from '../../services/api';
import {
  PageContainer,
  PageTitle,
  SearchForm,
  SearchInput,
  SearchButton,
  StatusMessage,
  ResultadosLista,
  ResultadoItem,
  ResultadoNutrientes,
} from './styles';

export function BuscarAlimentos() {
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
  return (
    <PageContainer>
      <PageTitle>Buscar alimentos</PageTitle>
      <SearchForm onSubmit={handleSubmit}>
        <SearchInput
          type="search"
          name="busca"
          placeholder="buscar alimento por nome"
          aria-label="Buscar alimento por nome"
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          disabled={carregando}
        />
        <SearchButton
          type="submit"
          title="Buscar alimento"
          disabled={carregando}
          aria-label="Buscar alimento"
        >
          <MagnifyingGlass size={24} weight="bold" />
        </SearchButton>
      </SearchForm>
      {carregando && <StatusMessage>Buscando...</StatusMessage>}
      {erro && <StatusMessage $erro>{erro}</StatusMessage>}
      {resultados !== null && !carregando && (
        <ListaResultados resultados={resultados} />
      )}
    </PageContainer>
  );
}

function ListaResultados({ resultados }: { resultados: Alimento[] }) {
  if (resultados.length === 0) {
    return <StatusMessage>Nenhum alimento encontrado.</StatusMessage>;
  }
  return (
    <ResultadosLista>
      {resultados.map((a) => (
        <ResultadoItem key={a.id}>
          <strong>{a.descricao}</strong>
          <ResultadoNutrientes>
            Proteínas: {a.macronutrientes.proteinas_g ?? '—'} g · Lipídeos: {a.macronutrientes.lipideos_g ?? '—'} g · Carboidratos: {a.macronutrientes.carboidratos_g ?? '—'} g (por 100g)
          </ResultadoNutrientes>
        </ResultadoItem>
      ))}
    </ResultadosLista>
  );
}
