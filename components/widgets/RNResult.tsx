import { Icon, Result } from '@ant-design/react-native';
import { ReactNode } from 'react';
import {StyleSheet} from 'react-native'

interface IRNResult {
  title?: string;
  message: string;
  img?: ReactNode;
}
export default function RNEmptyData({ title, message }: IRNResult) {
  return (
    <Result
      img={<Icon name='message' size='lg' />}
      title={title}
      message={message}
      style={styles.resultStyle}
      // buttonText='完成'
      // buttonType='primary'
      // onButtonClick={(e: any) => alert(e.toString())}
    />
  );
}
const styles = StyleSheet.create({
  resultStyle: {
    backgroundColor: 'eee',
  },
})