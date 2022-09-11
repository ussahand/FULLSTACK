/*
const multiplication = (a: number, b, desc) =>
  console.log(desc, a*b)

  multiplication(2, 4, 'Multiplication of 2, 4 is: ')
  multiplication(null, 4, 'Multiplication of 2, 4 is: ')
  multiplication(undefined, 4, 'Multiplication of 2, 4 is: ')
  multiplication('', 4, 'Multiplication of 2, 4 is: ')
  multiplication('2', 4, 'Multiplication of 2, 4 is: ')
*/
  /********************* use TS */

  type operation = 'multiply' | 'add' | 'divide';

  const multiplication2 = (a: number, b: number, opr: operation ): number => {
    let result: number;

    switch ( opr ) {
      case 'add':
        result = a+b; break;
      case 'multiply':
        result = a*b; break;
      case 'divide':
        result = a/b; break; 
    }
    console.log(a, opr, b, ' = ', result);
    return result;
  };

  const x = Number(process.argv[2]);
  const y = Number(process.argv[3]);

  console.log('args:', process.argv, x, y);
  multiplication2 (x,y,'add');
  multiplication2 (x,y,'multiply');
  multiplication2 (x,y,'divide');
  // multiplication2 (2,4,'mode')
