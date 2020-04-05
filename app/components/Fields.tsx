import { ReactNode } from 'react';
import { useField } from 'formik';
import { Form, Button, Col, FormControlProps, FormCheckProps, ButtonProps } from 'react-bootstrap';
import { useTranslation } from '../lib/useTranslation';
import { SpinnerIcon } from './FontAwsomeIcons';

interface TextProps extends FormControlProps {
  name: string;
  trans: string;
  info?: string | ReactNode;
  row?: boolean;
  hideLabel?: boolean;
}

interface CheckboxProps extends FormCheckProps {
  name: string;
  trans: string;
  info?: string | ReactNode;
}

// interface SelectProps extends FormCheckProps {
//   name: string;
//   trans: string;
//   info?: string | ReactNode;
//   children?: ReactNode;
//   options?: [string];
// }

interface SelectProps {
  name: string;
  trans: string;
  info?: string | ReactNode;
  children?: ReactNode;
  options?: string[];
  props?: FormCheckProps;
}

interface BtnProps extends ButtonProps {
  trans?: string;
  isLoading?: boolean;
  spinner?: Boolean;
}

/* interface FieldProps {
  name: string;
  trans: string;
  info?: string | ReactNode;
  row?: boolean;
  children?: ReactNode;
  options?: [string];
  isLoading?: boolean;
  spinner?: Boolean;
  type?: string;
  size?: 'lg' | 'sm' | undefined;
} */

export const Text = ({ trans, info = '', row = false, hideLabel = false, ...props }: TextProps) => {
  const [t] = useTranslation();
  delete props.size;
  const [field, meta] = useField(props.name);
  const as = row ? { as: Col } : null;
  const placeholder = t(`${trans}.${props.name}.placeholder`, '');
  const infoText = info || t(`${trans}.${props.name}.info`, '');

  // console.log('field', field, props);

  return (
    <Form.Group {...as}>
      {!hideLabel && <Form.Label>{t(`${trans}.${props.name}.title`)}</Form.Label>}
      <Form.Control {...field} {...props} placeholder={placeholder} />
      {infoText && <Form.Text>{infoText}</Form.Text>}
      {meta.touched && meta.error && <Form.Text className="text-warning">{meta.error}</Form.Text>}
    </Form.Group>
  );
};

export const Checkbox = ({ trans, info, ...props }: CheckboxProps) => {
  const [t] = useTranslation();
  const [field, meta] = useField(props.name);
  const infoText = info || t(`${trans}.${props.name}.info`, '');

  return (
    // <Form.Group>
    <>
      <Form.Check
        type="checkbox"
        className="mt-2"
        {...field}
        {...props}
        checked={field.value}
        label={t(`${trans}.${props.name}.title`)}
      />
      {infoText && <Form.Text>{infoText}</Form.Text>}
      {meta.touched && meta.error && <Form.Text className="text-warning">{meta.error}</Form.Text>}
    </>
    // </Form.Group>
  );
};

export const Select = ({ trans, info, children, options, ...props }: SelectProps) => {
  const [t] = useTranslation();
  const [field, meta] = useField(props.name);
  const infoText = info || t(`${trans}.${props.name}.info`, '');

  return (
    <Form.Group>
      {<Form.Label>{t(`${trans}.${props.name}.title`)}</Form.Label>}
      <Form.Control as="select" {...field} {...props}>
        {children ||
          (options &&
            options.map((option, i) => (
              <option key={i} value={option}>
                {t(`${trans}.${props.name}.${option}`)}
              </option>
            )))}
      </Form.Control>
      {infoText && <Form.Text>{infoText}</Form.Text>}
      {meta.touched && meta.error && <Form.Text className="text-warning">{meta.error}</Form.Text>}
    </Form.Group>
  );
};

export const SubmitButton = ({ isLoading, trans, spinner, disabled, ...props }: BtnProps) => {
  const [t] = useTranslation();
  const path = trans ? `${trans}.button` : 'buttons.save';

  return (
    <div className="d-flex justify-content-end pt-2">
      <Button type="submit" {...props} disabled={disabled || isLoading}>
        {isLoading ? t(`${path}.loading`) : t(`${path}.label`)}
        {isLoading && spinner && <SpinnerIcon className="ml-2" size="24" />}
      </Button>
    </div>
  );
};
