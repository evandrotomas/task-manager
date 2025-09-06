const InputLabel = (props) => {
  return (
    <div>
      <label className="text-sm font-semibold text-[#35383E]" {...props}>
        {props.children}
      </label>
    </div>
  )
}

export default InputLabel
