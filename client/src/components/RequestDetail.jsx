  
import React from 'react';

export default function(props) {
  return (
    <div>
<label>{props.name}</label><p>
         | {props.category} </p><label>{props.priority} </label><p> <label>{props.status}</label></p><p> <label>{props.updatedAt}</label></p>
      </div>
  );
}
