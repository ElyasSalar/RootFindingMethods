class RootFinding {
  constructor({
    x0,
    x1,
    eps,
    f,
    df,
    i
  }){
    this.x0 = x0
    this.x1 = x1
    this.eps = eps
    this.f = f
    this.df = df
    this.i = i
  }

  bisection = () => {
    let x0 = this.x0
    let x1 = this.x1
    let iterations = 0
    
    let nextPoint = (x0 + x1) / 2
    const results = []
    while (
      (typeof this.eps === "number" && Math.abs(this.f(nextPoint)) >= this.eps) ||
      iterations < this.i
    ) {
      nextPoint = (x0 + x1) / 2
      
      results.push({
        step: iterations,
        x0,
        x1,
        nextPoint,
        fx0: this.f(x0),
        fx1: this.f(x1),
        fnextPoint: this.f(nextPoint),
      })

      if (this.f(nextPoint) === 0) break
      else if (this.f(x0) * this.f(x1) >= 0) break
      else if (this.f(x0) * this.f(nextPoint) < 0) x1 = nextPoint
      else x0 = nextPoint
      iterations++
    }
  
    return {
      results,
      nextPoint,
    }
  }

  newtonRaphson = () => {
    let x0 = this.x0
    let iterations = 0
    let nextPoint = x0 - (this.f(x0) / this.df(x0))
    const  results = []

    while (
        (typeof this.eps === "number" && Math.abs(this.f(nextPoint)) >= this.eps) ||
        iterations < this.i
    ) {
      nextPoint = x0 - (this.f(x0) / this.df(x0))

      results.push({
        step: iterations,
        x0,
        fx0: this.f(x0),
        dfx0: this.df(x0),
        nextPoint,
      })
  
      x0 = nextPoint
      iterations++
    }
  
    return {
      x0,
      results,
    }
  }

  secant = () => {
    let x0 = this.x0
    let x1 = this.x1
    let iterations = 0
  
    let nextPoint = x0 - this.f(x0) * ( (x1 - x0) / (this.f(x1) - this.f(x0)) )
    const results = []

    while (
      (typeof this.eps === "number" && Math.abs(this.f(nextPoint)) >= this.eps) ||
      iterations < this.i
    ) {
      nextPoint = x0 - this.f(x0) * ( (x1 - x0) / (this.f(x1) - this.f(x0)) )
  
      results.push({
        step: iterations,
        x1,
        x0,
        fx1: this.f(x1),
        fx0: this.f(x0),
        nextPoint,
      })
  
      if (this.f(nextPoint) === 0) break
      
      x0 = x1
      x1 = nextPoint
      
      iterations++
    }
  
    return {
      nextPoint,
      results
    }
  }
}

export default RootFinding