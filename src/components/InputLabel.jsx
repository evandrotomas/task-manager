const InputLabel = (props) => {
  return (
    <div>
      <label className="text-sm font-semibold text-brand-dark-blue" {...props}>
        {props.children}
      </label>
    </div>
  )
}

export default InputLabel
