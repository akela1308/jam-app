import './TextInput.css';

interface TextInputProps {
  label: string;
  placeholder: string;
  type?: string;
  value: string;
  onChange: (v: string) => void;
}

export function TextInput({ label, placeholder, type = 'text', value, onChange }: TextInputProps) {
  return (
    <div className="text-input">
      <label className="text-input__label">{label}</label>
      <input
        className="text-input__field"
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        autoComplete="off"
      />
    </div>
  );
}
