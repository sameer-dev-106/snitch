import { PlusIcon, TrashIcon } from "../utils/utils";

const AttributeInput = ({ props }) => {
  return (
    <div>
      <label className="block text-sm uppercase tracking-wider text-[#6e6258] mb-3">
        Attributes (e.g. Size, Color) *
      </label>
      <div className="space-y-3">
        {props.attributeInputs.map((attr, index) => (
          <div key={index} className="flex gap-2 items-center">
            <input
              type="text"
              placeholder="Key (e.g., Size)"
              value={attr.key}
              onChange={(e) =>
                props.handleAttributeChange(index, "key", e.target.value)
              }
              className="w-1/2 bg-transparent border-b border-[#d0c5b5] py-2 focus:outline-none focus:border-[#745a27] placeholder:text-[#d0c5b5]"
            />
            <input
              type="text"
              placeholder="Value (e.g., M)"
              value={attr.value}
              onChange={(e) =>
                props.handleAttributeChange(index, "value", e.target.value)
              }
              className="w-1/2 bg-transparent border-b border-[#d0c5b5] py-2 focus:outline-none focus:border-[#745a27] placeholder:text-[#d0c5b5]"
            />
            {props.attributeInputs.length > 1 && (
              <button
                onClick={() =>props. handleRemoveAttribute(index)}
                className="text-[#ba1a1a] p-2 hover:bg-[#ffdad6] transition-colors cursor-pointer"
              >
                <TrashIcon />
              </button>
            )}
          </div>
        ))}
      </div>
      <button
        onClick={props.handleAddAttribute}
        className="mt-3 text-[#745a27] text-sm uppercase tracking-wider flex items-center gap-1 hover:text-[#5a4312] cursor-pointer"
      >
        <PlusIcon /> Add Attribute
      </button>
    </div>
  );
};

export default AttributeInput;
