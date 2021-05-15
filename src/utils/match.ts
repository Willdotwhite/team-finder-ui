export default function match<T, RT>(val:T, ...matches: [T, RT][]): RT | undefined {
  for(const [match, rtn] of matches) if(val == match) return rtn;
}