import React, {forwardRef, useImperativeHandle} from "react";
import { useState } from "react";

const Input = forwardRef((props, ref) => {

  const [value, setValue] = useState("")

  const handleChange = (e) => {
    setValue(e.target.value)
    props.onChange(e.target.name, e.target.value)
  }

  const validate = () => {
    return true
  }

  useImperativeHandle(
    ref,
    () => {
      return {
        validate: () => validate()
      }
    }
  )

  return (
    <div>
      {props.label && (
        <label>{props.label}</label>
      )}
      <input
      ref={ref}
      type={props.type}
      onChange={(e) => handleChange(e)}
      value={props.value ? props.value : value}
      onKeyDown={props.onKeyDown}
      placeholder={props.placeholder}
    />
    </div>
  );
})


Input.defaultProps = {
  placeholder: "",
  name: "",
  type: "text",
  value: ""
}



export default Input;
