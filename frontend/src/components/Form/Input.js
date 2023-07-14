import React from "react";
import { Form } from "react-bootstrap";

const Input = (props) => {
  return (
    <div>
        <label htmlFor="" className="form-label">{props.lableName}</label>
      <input type={props.type} placeholder={props.placeholder} value={props.value} onChange={props.onChange} id={props.id} />
      <p>{props.error}</p>

      {/* <Form.Group className="mb-3 " >
        <Form.Label className="text-start">{props.lableName}</Form.Label>
        <Form.Control type={props.type} placeholder={props.placeholder} value={props.value} onChange={props.onChange} id={props.id} className={props.error && `border-danger`} />
        <Form.Text>
        {props.error}
        </Form.Text>
      </Form.Group> */}
    </div>
  );
};

export default Input;
