import { Checkbox } from '@ant-design/react-native';
import { CheckboxProps } from '@ant-design/react-native/lib/checkbox/Checkbox';
import { Control, Controller } from 'react-hook-form';
import { Text, StyleSheet } from 'react-native';

interface IRNCheckboxProps extends CheckboxProps {
  name: string;
  control: Control<any, any>;
  label: string;
  errors?: any;
}

export default function RNCheckbox(props: IRNCheckboxProps) {
  const { name, control, label, errors, ...rest } = props;
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value } }) => (
        <>
          <Checkbox
            onChange={(e) => {
              onChange(e.target.checked);
            }}
            checked={value}
            {...rest}
          >
            <Text style={styles.checkbox}>{label}</Text>
          </Checkbox>
          {errors && errors[name] ? <Text style={styles.errText}>{errors[name].message}</Text> : null}
        </>
      )}
    />
  );
}

const styles = StyleSheet.create({
  errText: {
    color: 'rgb(255, 85, 0)',
    paddingLeft: 15,
    fontSize: 12
  },
  checkbox: {
    fontSize: 16,
    color: 'rgba(0,0,0,0.50)'
  }
});
