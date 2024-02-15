import React from "react";

export default function CustomInput({
    name,
    type,
    label,
    value,
    onChange,
    placeholder,
  }) {
    return (
      <div className="flex flex-col w-full">
        <p className="text-[0.8em] font-bold pl-6">{label}</p>
  
        {type === "text" ? (
          <input
            name={name}
            className="px-6 py-3 border-[1px] border-black rounded-full bg-transparent focus:outline-none focus:border-black placeholder-[#8d8e8f]"
            value={value}
            onChange={onChange}
            placeholder={placeholder}
          />
        ) : (
          <textarea
            id="custom-textarea"
            name={name}
            className="px-6 py-3 border-[1px] border-black rounded-[2rem] bg-transparent focus:outline-none focus:border-black h-[75px] min-h-[75px] max-h-[150px] placeholder-[#8d8e8f]"
            value={value}
            onChange={onChange}
            placeholder={placeholder}
          />
        )}
      </div>
    );
  }
  