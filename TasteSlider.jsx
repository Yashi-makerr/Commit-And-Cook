export default function TasteSlider({ label, value, onChange }) {
  return (
    <div style={{ marginBottom: 20 }}>
      <label>
        {label}: {value}
      </label>
      <br />
      <input
        type="range"
        min="0"
        max="10"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
      />
    </div>
  );
}
