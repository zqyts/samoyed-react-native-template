import { DatePicker, List } from '@ant-design/react-native';
import { DatePickerProps } from '@ant-design/react-native/lib/date-picker';
import { Control, Controller } from 'react-hook-form';
import { Text, StyleSheet } from 'react-native';

interface RNDatePickerIProps extends DatePickerProps {
  name: string;
  control: Control<any, any>;
  label: string;
  errors?: any;
  required?: boolean;
}

export default function RNDatePicker(props: RNDatePickerIProps) {
  const { name, control, label, errors, required, ...rest } = props;
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value } }) => (
        <>
          <DatePicker
            value={value}
            mode='datetime'
            defaultDate={new Date()}
            minDate={new Date(2015, 1, 1)}
            maxDate={new Date(2035, 1, 1)}
            onChange={onChange}
            // format='YYYY-MM-DD'
            {...rest}
          >
            <List.Item arrow='horizontal'>
              {label ? (
                <Text style={{ fontSize: 16 }}>
                  {required ? <Text style={{ color: 'rgb(255, 85, 0)' }}>*</Text> : null}
                  {label}
                </Text>
              ) : null}
            </List.Item>
          </DatePicker>
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
  }
});
