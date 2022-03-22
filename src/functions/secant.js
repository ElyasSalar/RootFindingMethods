const secant = (x0, x1, eps, f) => {
  
  let nextPoint = x0 - f(x0) * ( (x1 - x0) / (f(x1) - f(x0)) )
  const results = []
  while (f(nextPoint) >= eps) {
    nextPoint = x0 - f(x0) * ( (x1 - x0) / (f(x1) - f(x0)) )

    results.push({
      x0,
      x1,
      fx0: f(x0),
      fx1: f(x1),
      nextPoint,
    })

    if (f(nextPoint) === 0) break
    else if (f(x0) * f(nextPoint) < 0) x1 = nextPoint
    else x0 = nextPoint
  }

  return {
    nextPoint,
    results
  }
}
export default secant