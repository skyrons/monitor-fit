import type { Macronutrientes, Micronutrientes } from '../services/api';

export function scaleNutrientsByQuantity(
  macros: Macronutrientes,
  micros: Micronutrientes,
  quantityG: number
): { macros: Macronutrientes; micros: Micronutrientes; calorias: number } {
  const f = quantityG / 100;
  const scale = (v: number | null) => (v != null ? Math.round(v * f * 100) / 100 : null);
  const macrosScaled: Macronutrientes = {
    proteinas_g: scale(macros.proteinas_g),
    lipideos_g: scale(macros.lipideos_g),
    carboidratos_g: scale(macros.carboidratos_g),
  };
  const microsScaled: Micronutrientes = {
    umidade_pct: scale(micros.umidade_pct),
    energia_kcal: scale(micros.energia_kcal),
    energia_kj: scale(micros.energia_kj),
    colesterol_mg: scale(micros.colesterol_mg),
    fibra_alimentar_g: scale(micros.fibra_alimentar_g),
    cinzas_g: scale(micros.cinzas_g),
    calcio_mg: scale(micros.calcio_mg),
    magnesio_mg: scale(micros.magnesio_mg),
    manganes_mg: scale(micros.manganes_mg),
    fosforo_mg: scale(micros.fosforo_mg),
    ferro_mg: scale(micros.ferro_mg),
    sodio_mg: scale(micros.sodio_mg),
    potassio_mg: scale(micros.potassio_mg),
    cobre_mg: scale(micros.cobre_mg),
    zinco_mg: scale(micros.zinco_mg),
    retinol_mcg: scale(micros.retinol_mcg),
    re_mcg: scale(micros.re_mcg),
    rae_mcg: scale(micros.rae_mcg),
    tiamina_mg: scale(micros.tiamina_mg),
    riboflavina_mg: scale(micros.riboflavina_mg),
    piridoxina_mg: scale(micros.piridoxina_mg),
    niacina_mg: scale(micros.niacina_mg),
    vitamina_c_mg: scale(micros.vitamina_c_mg),
  };
  const calorias = micros.energia_kcal != null ? micros.energia_kcal * f : 0;
  return { macros: macrosScaled, micros: microsScaled, calorias };
}

export interface UserData {
  weight?: number;
  height?: number;
  age?: number;
  gender?: 'masculino' | 'feminino';
  neckCircumference?: number;
  waistCircumference?: number;
  hipCircumference?: number;
}

export function calculateBMR(userData: UserData): number | null {
  const { weight, height, age, gender } = userData;

  if (!weight || !height || !age || !gender) {
    return null;
  }

  if (gender === 'masculino') {
    // Fórmula de Harris-Benedict para homens
    return 66.4730 + (13.7516 * weight) + (5.0033 * height) - (6.7550 * age);
  } else {
    // Fórmula de Harris-Benedict para mulheres
    return 655.0955 + (9.5634 * weight) + (1.8496 * height) - (4.6756 * age);
  }
}

export function calculateBodyFatPercentage(userData: UserData): number | null {
  const { height, gender, neckCircumference, waistCircumference, hipCircumference } = userData;

  if (!height || !gender) {
    return null;
  }

  if (gender === 'masculino') {
    // Fórmula para homens: precisa de circunferência abdominal e pescoço
    if (!neckCircumference || !waistCircumference) {
      return null;
    }
    const result = (85.20969 * Math.log10(waistCircumference - neckCircumference)) 
      - (69.73016 * Math.log10(height)) 
      + 37.26673;
    return result;
  } else {
    // Fórmula para mulheres: precisa de circunferência abdominal, quadril e pescoço
    if (!neckCircumference || !waistCircumference || !hipCircumference) {
      return null;
    }
    const result = (161.27327 * Math.log10((waistCircumference + hipCircumference - neckCircumference) / 2.54)) 
      - (100.81032 * Math.log10(height / 2.54)) 
      - 69.55016;
    return result;
  }
}
