import calculateExercises from './calculateExercises'

let dailyExercises = [3, 0, 2, 4.5, 0, 3, 1];
let target = 2;

if ( process.argv.length < 4 ) {
  console.log("You didn't provide enought arguments: target:number [aray of numbers]");
  console.log(`I used dafault values of target: ${target} and daily exercises: ${dailyExercises}`);
  console.log();
} else {
  [target, ...dailyExercises] = process.argv.slice(2).map( arg => Number(arg));
  console.log(target, dailyExercises);
}

console.log(calculateExercises(dailyExercises, target));

