const newtonRaphson = (x0, eps, f, df) => {
  
  let nextPoint = x0 - (f(x0) / df(x0))
  const  results = []
  while (Math.abs(f(nextPoint)) >= eps) {
    nextPoint = x0 - (f(x0) / df(x0))

    results.push({
      x0,
      fx0: f(x0),
      dfx0: df(x0),
      nextPoint,
    })

    x0 = nextPoint
  }

  return {
    x0,
    results,
  }
}

export default newtonRaphson