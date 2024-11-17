const workPrices = {
  Completo: 80000,
  Laterales: 60000,
  'Frontal / Trasero': 50000,
  Individual: 40000,
};

function calculateTimeAndCosts(
  vehicleType,
  polarizeMeterPrice,
  polarizeMeters,
  polarizeCoverage,
  polarizeMinutes
) {
  const workPrice = workPrices[polarizeCoverage];
  let totalCost = polarizeMeterPrice * polarizeMeters + workPrice;
  let totalTime = polarizeMinutes / 60;

  if (vehicleType === 'SUV' || vehicleType === 'Pickup') {
    totalCost *= 1.5;
    totalTime *= 1.5;
  }
  return { totalCost, totalTime, workPrice };
}

export default calculateTimeAndCosts;
