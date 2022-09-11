import calculateBmi from './calculateBmi'

let height = 180;
let weight = 74;

// if the method called from command line without parameter
if ( process.argv.length && process.argv.length < 4 ) {
  console.log("You didn't provide enought arguments: Height and Weight");
  console.log(`I used dafault values of height: ${height} and weight: ${weight}`);
  console.log();
} else 
  [height, weight] = process.argv.slice(2).map( arg => Number(arg));


console.log(calculateBmi(height, weight));

