import * as React from "react";

const Selected: React.FC<{onClick: () => void}> = ({onClick, children}) => (
  <div
    className="flex mb-3 mr-5 leading-none cursor-pointer border rounded border-gray-400 bg-gray-700"
    onClick={onClick}
  >
    <div className="p-1.5">x</div>
    <div className="border-gray-400 border-l p-1.5 pb-2">{children}</div>
  </div>
)

const Selectables: React.FC<{
  valueDisplayIndex: Record<string, string>;
  selectableValues: string[];
  toggleValue: (s: string) => void;
}> = ({selectableValues, valueDisplayIndex, toggleValue}) => {
  return (
    <select
      value=""
      onChange={e => toggleValue(e.target.value)}
      className="p-1 pb-1.5 outline-none w-full rounded bg-gray-700"
    >
      <option value="">Click here to select a language..</option>
      {selectableValues.map((p, i) =>
        (<option value={p} key={i}>{valueDisplayIndex[p]}</option>)
      )}
    </select>
  );
}

type Props = {
  disabled: boolean;
  valueDisplayIndex: Record<string, string>;
  selected: string[];
  changeCallback: (selected: string[]) => unknown;
}
export const MultiSelect: React.FC<Props> = ({valueDisplayIndex, selected, ...props}) => {

  const toggleValue = (value: string) => {
    if(props.disabled) return;

    let newvalues: string[];

    if(selected.includes(value)) newvalues = selected.filter(v => v != value);
    else newvalues = [...selected, value];

    props.changeCallback(newvalues);
  }

  const selectableValues = Object.keys(valueDisplayIndex).filter(p => !selected.includes(p));

  return (
    <div className="flex flex-wrap rounded border-white">
      <div className="flex flex-wrap flex-shrink-0 max-w-full">
        {selected.map((v, i) => (
          <Selected key={i} onClick={() => toggleValue(v)}>{valueDisplayIndex[v]}</Selected>
        ))}
      </div>
      <div className="flex-grow mb-3">
        <Selectables {...{valueDisplayIndex, selectableValues, toggleValue}} />
      </div>
    </div>
  )
}