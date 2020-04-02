import React from 'react';
import { Form } from 'react-bootstrap';

interface CheckBoxProps {
  id: string;
  checked: boolean;
  onChange: (e: any) => void;
}

export const CheckBox: React.SFC<CheckBoxProps> = ({ id, checked, onChange }) => {
  return (
    <div className="wrapper">
      <Form.Check type="checkbox" id={id} checked={checked} onChange={onChange} />
      <style jsx>{`
        .wrapper {
          /* width: 20px; */
          text-align: center;
        }
      `}</style>
    </div>
  );
};
