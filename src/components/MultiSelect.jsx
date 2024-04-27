import { useState, useEffect, useRef } from "react";

export default function MultiSelectDropdown({ formFieldName, options, onChange, prompt = "Select one or more options" }) {
  const [isJsEnabled, setIsJsEnabled] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const optionsListRef = useRef(null);
  const [searchTerm, setSearchTerm] = useState(""); // New state for search term

  useEffect(() => {
    setIsJsEnabled(true);
  }, []);

  const handleChange = (e) => {
    const isChecked = e.target.checked;
    const option = e.target.value;
    const selectedOptionSet = new Set(selectedOptions);
    if (isChecked) {
      selectedOptionSet.add(option);
    } else {
      selectedOptionSet.delete(option);
    }
    const newSelectedOptions = Array.from(selectedOptionSet);
    setSelectedOptions(newSelectedOptions);
    onChange(newSelectedOptions);
  };

  const isSelectAllEnabled = selectedOptions.length < options.length;

  const handleSelectAllClick = (e) => {
    e.preventDefault();
    const optionsInputs = optionsListRef.current.querySelectorAll("input");
    optionsInputs.forEach((input) => {
      input.checked = true;
    });
    setSelectedOptions([...options]);
    onChange([...options]);
  };

  const isClearSelectionEnabled = selectedOptions.length > 0;

  const handleClearSelectionClick = (e) => {
    e.preventDefault();
    const optionsInputs = optionsListRef.current.querySelectorAll("input");
    optionsInputs.forEach((input) => {
      input.checked = false;
    });
    setSelectedOptions([]);
    onChange([]);
  };

  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <label className="relative">
      <input type="checkbox" className="hidden peer" />
      <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full px-2 py-1 border-b focus:outline-none w-80 peer-checked:after:-rotate-180"/>
      <div className="absolute top-0 right-0 px-2 py-1">
        {selectedOptions.map((option) => (
          <span key={option} className="bg-blue-200 text-blue-600 px-1 mr-1">
            {options.find((o) => o.value === option)?.label}
          </span>
        ))}
      </div>
      <div className="cursor-pointer after:content-['▼'] after:text-xs after:ml-1 after:inline-flex after:items-center peer-checked:after:-rotate-180 after:transition-transform inline-flex border rounded px-5 py-2">
        {prompt}
        {isJsEnabled && selectedOptions.length > 0 && (
          <span className="ml-1 text-blue-500">{`(${selectedOptions.length} selected)`}</span>
        )}
      </div>
      <div className="absolute border transition-opacity opacity-0 pointer-events-none peer-checked:opacity-100 peer-checked:pointer-events-auto w-full max-h-60 overflow-y-scroll">
        {isJsEnabled && (
          <ul>
            <li>
              <button onClick={handleSelectAllClick} disabled={!isSelectAllEnabled} className="w-full text-left px-2 py-1 text-blue-600 disabled:opacity-50">
                {"Select All"}
              </button>
            </li>
            <li>
              <button onClick={handleClearSelectionClick} disabled={!isClearSelectionEnabled} className="w-full text-left px-2 py-1 text-blue-600 disabled:opacity-50">
                {"Clear selection"}
              </button>
            </li>
          </ul>
        )}
        <ul ref={optionsListRef}>
          {options.map((option, i) => {
            return (
              <li key={option.value}>
                <label className={`flex whitespace-nowrap cursor-pointer px-2 py-1 transition-colors hover:bg-blue-100 [&:has(input:checked)]:bg-blue-200`}>
                  <input type="checkbox" name={formFieldName} value={option.label} className="cursor-pointer" onChange={handleChange}/>
                  <span className="ml-1">{option.label}</span>
                </label>
              </li>
            );
          })}
        </ul>
      </div>
    </label>
  );
}