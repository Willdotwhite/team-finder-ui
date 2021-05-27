import * as React from "react";

type Props = {
  disabled: boolean;
  possibleVals: string[];
  displayVals: string[];
  values: string[];
  changeCallback?: (values: string[]) => unknown;
}
export const MultiSelect: React.FC<Props> = (props) => {
  const [values, setValues] = React.useState(props.values);
  React.useEffect(() => setValues(props.values), [props.values])

  const displayIndex: Record<string, string> = {};
  props.possibleVals.forEach((x, i) => displayIndex[x] = props.displayVals[i]);

  const ToggleValue = (value: string) => {
    if(props.disabled) return;

    let newvalues: string[];

    if(values.includes(value)) newvalues = values.filter(v => v != value);
    else newvalues = [...values, value];

    setValues(newvalues);
    if(props.changeCallback) props.changeCallback(newvalues);
  }


  return (<div>
    {values.map((v, i) => (<div
      className="inline-block mr-5 leading-none cursor-pointer border-b border-transparent hover:border-white"
      key={i}
      onClick={() => ToggleValue(v)}
    >
      {displayIndex[v]}
    </div>))}
    <select
      value=""
      onChange={e => ToggleValue(e.target.value)}
      className="text-black block p-1 pb-1.5 mt-1 outline-none"
    >
      <option value=""></option>
      {props.possibleVals.filter(p => !values.includes(p)).map((p, i) =>
        (<option value={p} key={i}>{displayIndex[p]}</option>)
      )}
    </select>
  </div>)
}