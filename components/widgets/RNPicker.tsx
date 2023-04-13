import { Icon, List, Picker, Toast } from '@ant-design/react-native';
import { CascaderValue } from '@ant-design/react-native/lib/picker/cascader/CascaderTypes';
import { Control, Controller } from 'react-hook-form';
import { Text, StyleSheet, View } from 'react-native';
export interface PickerData {
  value: string | number;
  label: string;
  children?: PickerData[];
}
interface RNPickerIProps {
  name: string;
  control: Control<any, any>;
  label: string;
  onChange?(val: CascaderValue | undefined): void;
  data: PickerData[] | PickerData[][];
  cols: number;
  errors?: any;
  required?: boolean;
}

export default function RNPicker(props: RNPickerIProps) {
  const { name, control, cols, data, label, errors, onChange: onChangeEvent, required, ...rest } = props;
  const onShowErr = () => {
    Toast.fail(errors[name].message);
  };
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value } }) => (
        <View style={styles.wrap}>
          <Picker
            onChange={(val) => {
              onChange(val);
              onChangeEvent && onChangeEvent(val);
            }}
            data={data}
            cols={cols}
            value={value}
            {...rest}
          >
            <List.Item arrow='horizontal' style={errors && errors[name] ? styles.itemWrap : {}}>
              {label ? (
                <Text style={{ fontSize: 15 }}>
                  {required ? <Text style={{ color: 'rgb(255, 85, 0)' }}>*</Text> : null}
                  {label}
                </Text>
              ) : null}
            </List.Item>
          </Picker>
          {errors && errors[name] ? (
            <Icon name='info-circle' color='#f4333c' style={styles.icon} onPress={onShowErr}></Icon>
          ) : null}
          {/* {errors && errors[name] ? <Text style={styles.errText}>{errors[name].message}</Text> : null} */}
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  wrap: {
    position: 'relative'
    // flexDirection: 'row',
    // justifyContent: 'space-between'
  },
  icon: {
    position: 'absolute',
    right: 15,
    top: 12
  },
  itemWrap: {
    paddingRight: 18
  },
  errText: {
    color: 'rgb(255, 85, 0)',
    paddingLeft: 15,
    fontSize: 12
  }
});
