const workPrice = {
  Completo: 80000,
  Laterales: 60000,
  'Frontal / Trasero': 50000,
  Individual: 40000,
};

function calculateTimeAndCosts(
  polarizeMeterPrice,
  polarizeMeters,
  polarizeCoverage,
  polarizeMinutes
) {
  const totalCost =
    polarizeMeterPrice * polarizeMeters + workPrice[polarizeCoverage];

  const totalTime = polarizeMinutes / 60;

  return { totalCost, totalTime };
}

export default calculateTimeAndCosts;
