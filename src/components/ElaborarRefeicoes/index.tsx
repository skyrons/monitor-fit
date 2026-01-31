import { useState } from 'react';
import { Plus, Trash } from 'phosphor-react';
import { calculateBMR } from '../../utils/calculations';
import { useAuth } from '../../contexts/AuthContext';
import { AdicionarRefeicaoModal, type Refeicao } from '../AdicionarRefeicaoModal';
import {
  Container,
  Titulo,
  TotaisBox,
  TotaisLinha,
  TotaisItem,
  AddRefeicaoButton,
  RefeicoesLista,
  RefeicaoCard,
  RefeicaoCardContent,
  RefeicaoNome,
  RefeicaoTotais,
  RefeicaoRemoveButton,
} from './styles';

export function ElaborarRefeicoes() {
  const { user } = useAuth();
  const [refeicoes, setRefeicoes] = useState<Refeicao[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingRefeicao, setEditingRefeicao] = useState<Refeicao | null>(null);

  const tmb = user
    ? calculateBMR({
        weight: user.weight,
        height: user.height,
        age: user.age,
        gender: user.gender,
      })
    : null;

  const totaisDia = refeicoes.reduce(
    (acc, r) => ({
      proteinas_g: acc.proteinas_g + r.totais.proteinas_g,
      carboidratos_g: acc.carboidratos_g + r.totais.carboidratos_g,
      lipideos_g: acc.lipideos_g + r.totais.lipideos_g,
      calorias: acc.calorias + r.totais.calorias,
    }),
    { proteinas_g: 0, carboidratos_g: 0, lipideos_g: 0, calorias: 0 }
  );

  const pctTMB =
    tmb != null && tmb > 0
      ? Math.round((totaisDia.calorias / tmb) * 100)
      : null;

  function handleFinalizar(refeicao: Refeicao) {
    if (editingRefeicao) {
      setRefeicoes((prev) =>
        prev.map((r) => (r.id === refeicao.id ? refeicao : r))
      );
      setEditingRefeicao(null);
    } else {
      setRefeicoes((prev) => [...prev, refeicao]);
    }
  }

  function handleEditar(refeicao: Refeicao) {
    setEditingRefeicao(refeicao);
    setModalOpen(true);
  }

  function handleRemover(id: string, e: React.MouseEvent) {
    e.stopPropagation();
    setRefeicoes((prev) => prev.filter((r) => r.id !== id));
  }

  if (!user) return null;

  return (
    <Container>
      <Titulo>Elaborar refeições</Titulo>

      <TotaisBox>
        <TotaisLinha>
          <TotaisItem>
            <span className="label">Proteínas</span>
            <span className="valor">{totaisDia.proteinas_g.toFixed(1)}g</span>
          </TotaisItem>
          <TotaisItem>
            <span className="label">Carboidratos</span>
            <span className="valor">{totaisDia.carboidratos_g.toFixed(1)}g</span>
          </TotaisItem>
          <TotaisItem>
            <span className="label">Lipídeos</span>
            <span className="valor">{totaisDia.lipideos_g.toFixed(1)}g</span>
          </TotaisItem>
        </TotaisLinha>
        <TotaisLinha>
          <TotaisItem>
            <span className="label">Calorias consumidas</span>
            <span className="valor">
              {Math.round(totaisDia.calorias)} cal
              {pctTMB != null && ` (${pctTMB}% da TMB)`}
            </span>
          </TotaisItem>
        </TotaisLinha>
        {tmb != null && (
          <TotaisLinha>
            <TotaisItem>
              <span className="label">TMB (meta diária)</span>
              <span className="valor">{Math.round(tmb)} cal</span>
            </TotaisItem>
          </TotaisLinha>
        )}
      </TotaisBox>

      <AddRefeicaoButton
        type="button"
        onClick={() => {
          setEditingRefeicao(null);
          setModalOpen(true);
        }}
      >
        <Plus size={22} weight="bold" />
        Adicionar refeição
      </AddRefeicaoButton>

      <RefeicoesLista>
        {refeicoes.map((r) => (
          <RefeicaoCard key={r.id} onClick={() => handleEditar(r)}>
            <RefeicaoCardContent>
              <RefeicaoNome>{r.nome}</RefeicaoNome>
              <RefeicaoTotais>
                P: {r.totais.proteinas_g.toFixed(1)}g · C:{' '}
                {r.totais.carboidratos_g.toFixed(1)}g · L:{' '}
                {r.totais.lipideos_g.toFixed(1)}g · {Math.round(r.totais.calorias)}{' '}
                cal
              </RefeicaoTotais>
            </RefeicaoCardContent>
            <RefeicaoRemoveButton
              type="button"
              onClick={(e) => handleRemover(r.id, e)}
              title="Remover refeição"
            >
              <Trash size={20} />
            </RefeicaoRemoveButton>
          </RefeicaoCard>
        ))}
      </RefeicoesLista>

      {refeicoes.length > 0 && (
        <AddRefeicaoButton
          type="button"
          onClick={() => {
            setEditingRefeicao(null);
            setModalOpen(true);
          }}
          $secondary
        >
          <Plus size={22} weight="bold" />
          Adicionar refeição
        </AddRefeicaoButton>
      )}

      <AdicionarRefeicaoModal
        isOpen={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setEditingRefeicao(null);
        }}
        onFinalizar={handleFinalizar}
        refeicaoToEdit={editingRefeicao}
      />
    </Container>
  );
}
