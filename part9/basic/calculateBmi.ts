function calculateBmi(height: number, weight: number ): string {
  const bmi = weight / (height * height / 100 / 100) ;
  let categori : string;

  if (bmi < 16)
    categori = 'Underweight (Severe thinness)';
  else if ( bmi < 17 )
    categori = 'Underweight (Moderate thinness)';
  else if ( bmi < 18.5 )
    categori = 'Underweight (Mild thinness)';
  else if ( bmi < 25 )
    categori = 'Normal range';
  else if ( bmi < 30 )
    categori = 'Overweight (Pre-obese)';
  else if ( bmi < 35 )
    categori = 'Obese (Class I)';
  else if ( bmi < 40 )
    categori = 'Obese (Class II)';
  else
    categori = 'Obese (Class III)';

  return `${categori} (your BMI is:${Math.floor(bmi)})`;
}

export default calculateBmi;