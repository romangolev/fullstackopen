interface Result {
  periodLength: number
  trainingDays: number
  success: boolean
  rating: number
  ratingDescription: string
  target: number
  average: number
}

const calculateExercises = (dailyHours: number[], target: number): Result => {
  const periodLength = dailyHours.length
  const trainingDays = dailyHours.filter(h => h > 0).length
  const average = dailyHours.reduce((sum, h) => sum + h, 0) / periodLength
  const success = average >= target

  let rating: number
  let ratingDescription: string

  const percentage = average / target

  if (percentage >= 1) {
    rating = 3
    ratingDescription = 'great job, target reached!'
  } else if (percentage >= 0.75) {
    rating = 2
    ratingDescription = 'not too bad but could be better'
  } else {
    rating = 1
    ratingDescription = 'you need to work harder'
  }

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average
  }
}

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2))