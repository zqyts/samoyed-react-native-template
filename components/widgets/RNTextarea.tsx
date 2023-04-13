import {TextareaItem, Toast, Text, Icon} from '@ant-design/react-native';
import { TextareaItemProps } from '@ant-design/react-native/lib/textarea-item';
import {Control, Controller, useWatch} from 'react-hook-form';
import {GestureResponderEvent, StyleSheet, View} from 'react-native';
import React, {useEffect, useRef, useState} from "react";

interface RNIProps extends TextareaItemProps {
  name: string;
  control: Control<any, any>;
  placeholder?: string;
  errors?: any;
  label?: string;
  onBlur?(val: string | undefined): void;
  onChange?(val: string | undefined): void;
  onExtraClick?: (event: GestureResponderEvent) => void;
  count:number
}

export default function RNTextarea(props: RNIProps) {
  const { control, name, placeholder = '请输入内容', errors, label,count , ...rest} = props;
  const [editorValue, setEditorValue] = useState(control._defaultValues);
  const textareaItemRef = useRef<any>(null);
  const onShowErr = () => {
    Toast.fail(errors[name].message);
  };

  {
    const watchValue = useWatch({
      control: control,
      name: name
    });
    React.useEffect(() => {
      // 当观察值改变时，设置当前的编辑状态，触发重新渲染
      setEditorValue(watchValue);
      const watchValueLength = watchValue.length > 300?300:watchValue.length
      textareaItemRef.current.state.inputCount = watchValueLength
      console.log(watchValue.length,'watchValue.length')
    }, [watchValue]);
  }
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, onBlur, value } }) => (
        <TextareaItem
          ref={(ref)=> (textareaItemRef.current = ref)}
          placeholder={placeholder}
          value={value}
          error={errors ? !!errors[name] : undefined}
          {...rest}
          onBlur={onBlur}
          onChange={onChange}
          onErrorClick={onShowErr}
          rows={6}
          disabled={false}
          editable = {true}
          style={styles.textarea}
          clear={true}
          count={count}
        >
          {label}
        </TextareaItem>
      )}
    />
  );
}
const styles = StyleSheet.create({
  textarea: {
    minHeight: 100,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingBottom: 25,
    fontSize: 15,
    backgroundColor: 'transparent',
  },
})
