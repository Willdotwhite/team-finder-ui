export default function match<T, RT>(val:T, ...matches: [T, RT][]): RT | undefined {
  for(let [match, rtn] of matches) if(val == match) return rtn;
}