const FormInput = ({
  label,
  name,
  type,
  defaultValue,
  size,
  autoFocus = false,
}) => {
  return (
    <label className="form-control capitalize">
      <div className="label">
        <span className="label-text">{label}</span>
      </div>
      <input
        type={type}
        name={name}
        defaultValue={defaultValue}
        autoFocus={autoFocus}
        className={`input input-bordered ${size}`}
      />
    </label>
  );
};
export default FormInput;
