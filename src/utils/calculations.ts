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
