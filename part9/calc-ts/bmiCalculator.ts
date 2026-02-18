
const calculateBmi = (height: number, weight: number): string => {
     const bmi = weight / ((height / 100) ** 2)
     switch (true) {
          case bmi < 16:
               return 'Underweight (Severe thinness)'
          case bmi >= 16 && bmi < 17:
               return 'Underweight (Moderate thinness)'
          case bmi >= 17 && bmi < 18.5:
               return 'Underweight (Mild thinness)'
          case bmi >= 18.5 && bmi < 25:
               return 'Normal range'
          case bmi >= 25 && bmi < 30:
               return 'Overweight (Pre-obese)'
          case bmi >= 30 && bmi < 35:
               return 'Obese (Class I)'
          case bmi >= 35 && bmi < 40:
               return 'Obese (Class II)'
          default:
               return 'Obese (Class III)'
     }
}

const height = Number(process.argv[2])
const weight = Number(process.argv[3])

if (isNaN(height) || isNaN(weight)) {
     console.log('Please provide valid numbers for height and weight.')
} else {
     console.log(calculateBmi(height, weight))
}