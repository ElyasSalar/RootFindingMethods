const bisection = (x0, x1, eps, f) => {
  if (f(x0) * f(x1) >= 0) return

  let nextPoint
  const results = []
  while ((x0 - x1) <= eps) {
    nextPoint = (x0 + x1) / 2
    
    results.push({
      x0,
      x1,
      nextPoint,
      fx0: f(x0),
      fx1: f(x1),
      fnextPoint: f(nextPoint),
    })

    if (f(nextPoint) === 0) break
    else if (f(x0) * f(nextPoint) < 0) x1 = nextPoint
    else x0 = nextPoint
  }

  return {
    results,
    nextPoint,
  }
}

export default bisection