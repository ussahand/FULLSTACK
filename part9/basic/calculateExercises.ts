type arrayInt = number[];
interface analys {
  periodLength: number,
  trainingDays: number,
  success?: boolean,
  rating?: number,
  ratingDescription?: string,
  target: number,
  average: number,
}

function calculateExercises(dailyExercises: arrayInt, targetHours: number): analys {
  const x = {} as analys;
  x.periodLength = dailyExercises.length;
  x.trainingDays = dailyExercises.reduce((p, c) => c > 0 ? p + 1 : p, 0);
  x.target = targetHours;
  x.average = dailyExercises.reduce((p, c) => p + c, 0) / x.periodLength;
  x.success = x.average >= x.target ? true : false;
  x.rating = 2;
  x.ratingDescription = Math.abs(x.average - x.target)  < 0.2
    ? 'You did well'
    : x.success
      ? 'You are fantastic'
      : 'You need to have better schedule';

  return x;
}
export default calculateExercises