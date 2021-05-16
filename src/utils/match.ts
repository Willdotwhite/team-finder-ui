export function match<T, RT>(val:T, ...matches: [T, RT][]): RT | undefined {
  for(const [match, rtn] of matches) if(val == match) return rtn;
}
export function matchf<T, RT>(val:T, ...matches: [T, ()=>RT][]): RT | undefined {
  for(const [match, f] of matches) if(val == match) return f();
}