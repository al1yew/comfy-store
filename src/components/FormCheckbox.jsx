const FormCheckbox = ({ label, name, defaultValue, size }) => {
  return (
    <div className="form-control items-center">
      <label htmlFor={name} className="label cursor-pointer">
        <span className="label-text capitalize">{label}</span>
      </label>
      <input
        type="checkbox"
        className={`checkbox checkbox-primary ${size}`}
        name={name}
        id={name}
        defaultChecked={defaultValue}
      />
    </div>
  );
};
export default FormCheckbox;
