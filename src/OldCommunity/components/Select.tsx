import Select from 'react-select';
import type { StylesConfig } from 'react-select';

type OptionType = {
  value: 'chat' | 'feed';
  label: string;
};

const options: OptionType[] = [
  { value: 'chat', label: 'Chat' },
  { value: 'feed', label: 'Feed' },
];

type Props = {
  type : "chat" | "feed",
  setType: React.Dispatch<React.SetStateAction<"chat" | "feed">>
}

// Special select element with react-select that allows you to pick the type of a community
export default function SpaceTypeSelect({type, setType} : Props) {
  const isDark = typeof window !== 'undefined' && document.getElementById('theme-wrapper')?.classList.contains('dark');
  console.log('isDark', isDark)

  const customStyles: StylesConfig<OptionType, false> = {
  control: (base) => ({
    ...base,
    color: isDark ? '#ffffff' : '#000000',
    backgroundColor: 'transparent',
    borderRadius: '1rem',
    borderColor: '#888',
    minHeight: '40px',
    paddingLeft: '8px',
    outline: 'none',
    boxShadow: 'none',
    '&:hover': {
      borderColor: '#888',
    },
  }),
  singleValue: (base) => ({
    ...base,
    color: isDark ? '#fff' : '#000',
    textAlign: 'left'
  }),
  menu: (base) => ({
    ...base,
    backgroundColor: !isDark ? '#fff' : '#000',
    color: isDark ? '#fff' : '#000',
    borderRadius: '0.5rem',
    overflow: 'hidden',
  }),
  option: (base, state) => ({
    ...base,
    backgroundColor: state.isFocused ? '#00338D' : 'transparent',
    color: state.isFocused ? '#fff' : isDark ? '#fff' : '#000',
    cursor: 'pointer',
    fontSize: '14px', 
  }),
};

  return (
    <div className="mb-6 h-10 w-full relative">
      <label
        className="top-[-14%] left-8 absolute text-xs bg-post px-1 text-lightText z-10"
        htmlFor="type-select"
      >
        Type of space:
      </label>
      <Select
        inputId="type-select"
        options={options}
        value={options.find((opt) => opt.value === type)}
        onChange={(selectedOption) => {
          if (selectedOption) setType(selectedOption.value);
        }}
        styles={customStyles}
        classNamePrefix="react-select"
        isSearchable={false}
      />
    </div>
  );
}
