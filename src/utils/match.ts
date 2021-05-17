export function match<T, RT>(val:T, ...matches: [T, RT][]): RT | undefined {
  for(const [match, rtn] of matches) if(val == match) return rtn;
}
export function matchFunc<T, RT>(val:T, ...matches: [T, ()=>RT][]): RT | undefined {
  for(const [match, rtn] of matches) if(val == match) return rtn();
}
export function matchif<RT>(...matches: [unknown, RT][]): RT | undefined {
  for(const [val, rtn] of matches) if(val) return rtn;
}
export function matchifFunc<RT>(...matches: [unknown, ()=>RT][]): RT | undefined {
  for(const [val, rtn] of matches) if(val) return rtn();
}