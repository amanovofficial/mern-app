import React from "react";
import { Alert } from "react-bootstrap";

const alert = props => (props.text !== "") ? <Alert variant={props.variant}>{props.text}</Alert>:null

export default alert