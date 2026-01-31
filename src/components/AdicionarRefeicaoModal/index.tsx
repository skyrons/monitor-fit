import { useState, useEffect } from 'react';
import { Plus, X, CaretDown, CaretUp, Trash } from 'phosphor-react';
import type { Alimento } from '../../services/api';
import { scaleNutrientsByQuantity } from '../../utils/calculations';
import { BuscarAlimentoModal } from '../BuscarAlimentoModal';
import {
  ModalOverlay,
  ModalContainer,
  ModalHeader,
  CloseButton,
  Form,
  FormGroup,
  Input,
  AddFoodButton,
  FoodList,
  FoodItem,
  FoodLeft,
  FoodDesc,
  FoodQty,
  FoodMacros,
  ExpandButton,
  MicronutrientsBox,
  RemoveButton,
  FinalizeButton,
} from './styles';

export type AlimentoNoPrato = { alimento: Alimento; quantidadeG: number };

export type Refeicao = {
  id: string;
  nome: string;
  itens: AlimentoNoPrato[];
  totais: {
    proteinas_g: number;
    carboidratos_g: number;
    lipideos_g: number;
    calorias: number;
  };
};

interface AdicionarRefeicaoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onFinalizar: (refeicao: Refeicao) => void;
  refeicaoToEdit?: Refeicao | null;
}

const MICRO_LABELS: Record<string, string> = {
  umidade_pct: 'Umidade (%)',
  energia_kcal: 'Energia (kcal)',
  energia_kj: 'Energia (kJ)',
  colesterol_mg: 'Colesterol (mg)',
  fibra_alimentar_g: 'Fibra alimentar (g)',
  cinzas_g: 'Cinzas (g)',
  calcio_mg: 'Cálcio (mg)',
  magnesio_mg: 'Magnésio (mg)',
  manganes_mg: 'Manganês (mg)',
  fosforo_mg: 'Fósforo (mg)',
  ferro_mg: 'Ferro (mg)',
  sodio_mg: 'Sódio (mg)',
  potassio_mg: 'Potássio (mg)',
  cobre_mg: 'Cobre (mg)',
  zinco_mg: 'Zinco (mg)',
  retinol_mcg: 'Retinol (mcg)',
  re_mcg: 'RE (mcg)',
  rae_mcg: 'RAE (mcg)',
  tiamina_mg: 'Tiamina (mg)',
  riboflavina_mg: 'Riboflavina (mg)',
  piridoxina_mg: 'Piridoxina (mg)',
  niacina_mg: 'Niacina (mg)',
  vitamina_c_mg: 'Vitamina C (mg)',
};

function formatVal(v: number | null) {
  return v != null ? v.toFixed(1) : '—';
}

export function AdicionarRefeicaoModal({
  isOpen,
  onClose,
  onFinalizar,
  refeicaoToEdit,
}: AdicionarRefeicaoModalProps) {
  const [nome, setNome] = useState('');
  const [itens, setItens] = useState<AlimentoNoPrato[]>([]);
  const [buscarOpen, setBuscarOpen] = useState(false);
  const [expandido, setExpandido] = useState<number | null>(null);

  useEffect(() => {
    if (isOpen && refeicaoToEdit) {
      setNome(refeicaoToEdit.nome);
      setItens(refeicaoToEdit.itens);
    } else if (isOpen && !refeicaoToEdit) {
      setNome('');
      setItens([]);
    }
  }, [isOpen, refeicaoToEdit]);

  function handleAddAlimento(alimento: Alimento) {
    setItens((prev) => [
      ...prev,
      { alimento, quantidadeG: 100 },
    ]);
    setBuscarOpen(false);
  }

  function handleQtyChange(index: number, qty: number) {
    setItens((prev) => {
      const next = [...prev];
      next[index] = { ...next[index], quantidadeG: Math.max(0, qty) };
      return next;
    });
  }

  function handleRemove(index: number) {
    setItens((prev) => prev.filter((_, i) => i !== index));
  }

  function calcTotais() {
    let p = 0,
      c = 0,
      l = 0,
      cal = 0;
    itens.forEach(({ alimento, quantidadeG }) => {
      const { macros, calorias } = scaleNutrientsByQuantity(
        alimento.macronutrientes,
        alimento.micronutrientes,
        quantidadeG
      );
      p += macros.proteinas_g ?? 0;
      c += macros.carboidratos_g ?? 0;
      l += macros.lipideos_g ?? 0;
      cal += calorias;
    });
    return { proteinas_g: p, carboidratos_g: c, lipideos_g: l, calorias: cal };
  }

  function handleFinalizar() {
    const t = calcTotais();
    onFinalizar({
      id: refeicaoToEdit?.id ?? crypto.randomUUID(),
      nome: nome.trim() || 'Refeição',
      itens,
      totais: t,
    });
    setNome('');
    setItens([]);
    setExpandido(null);
    onClose();
  }

  if (!isOpen) return null;

  return (
    <>
      <ModalOverlay onClick={onClose}>
        <ModalContainer onClick={(e) => e.stopPropagation()}>
          <ModalHeader>
            <h1>{refeicaoToEdit ? 'Editar refeição' : 'Adicionar refeição'}</h1>
            <CloseButton onClick={onClose} type="button">
              <X size={24} />
            </CloseButton>
          </ModalHeader>

          <Form>
            <FormGroup>
              <h2>Nome da refeição</h2>
              <Input
                type="text"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                placeholder="Ex: Café da manhã"
              />
            </FormGroup>

            <FormGroup>
              <h2>Alimentos</h2>
              <AddFoodButton type="button" onClick={() => setBuscarOpen(true)}>
                <Plus size={20} weight="bold" />
                Adicionar alimento
              </AddFoodButton>

              <FoodList>
                {itens.map((item, idx) => {
                  const { macros, micros } = scaleNutrientsByQuantity(
                    item.alimento.macronutrientes,
                    item.alimento.micronutrientes,
                    item.quantidadeG
                  );
                  const showMicro = expandido === idx;
                  return (
                    <FoodItem key={`${item.alimento.id}-${idx}`}>
                      <FoodLeft>
                        <FoodDesc>{item.alimento.descricao}</FoodDesc>
                        <FoodQty>
                          <input
                            type="number"
                            min={1}
                            step={1}
                            value={item.quantidadeG}
                            onChange={(e) =>
                              handleQtyChange(idx, parseFloat(e.target.value) || 0)
                            }
                          />
                          g
                        </FoodQty>
                      </FoodLeft>
                      <FoodMacros>
                        <span>P: {formatVal(macros.proteinas_g)}g</span>
                        <span>C: {formatVal(macros.carboidratos_g)}g</span>
                        <span>L: {formatVal(macros.lipideos_g)}g</span>
                      </FoodMacros>
                      <ExpandButton
                        type="button"
                        onClick={() => setExpandido(showMicro ? null : idx)}
                        title={showMicro ? 'Ocultar micronutrientes' : 'Exibir micronutrientes'}
                      >
                        {showMicro ? (
                          <CaretUp size={18} />
                        ) : (
                          <CaretDown size={18} />
                        )}
                      </ExpandButton>
                      <RemoveButton type="button" onClick={() => handleRemove(idx)}>
                        <Trash size={18} />
                      </RemoveButton>
                      {showMicro && (
                        <MicronutrientsBox>
                          {Object.entries(micros).map(([k, v]) => (
                            <div key={k}>
                              {MICRO_LABELS[k] ?? k}: {formatVal(v)}
                            </div>
                          ))}
                        </MicronutrientsBox>
                      )}
                    </FoodItem>
                  );
                })}
              </FoodList>

              {itens.length > 0 && (
                <FinalizeButton type="button" onClick={handleFinalizar}>
                  Finalizar prato
                </FinalizeButton>
              )}
            </FormGroup>
          </Form>
        </ModalContainer>
      </ModalOverlay>

      <BuscarAlimentoModal
        isOpen={buscarOpen}
        onClose={() => setBuscarOpen(false)}
        onSelect={handleAddAlimento}
      />
    </>
  );
}
