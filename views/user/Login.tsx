import {Text, View, StyleSheet, Pressable, Dimensions} from 'react-native'
import { useForm } from 'react-hook-form'
import CommonStyle from '@/constants/CommonStyle'
import {Button, Checkbox, Icon, Toast, WhiteSpace, WingBlank} from '@ant-design/react-native'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { RNInput } from '@/components/widgets'
import { RouteComponentProps } from 'types'
import { useEffect, useRef, useState } from 'react'
import { fetchSendSms, ILoginFormValues } from '@/services/user'
import Themes from '@/constants/Themes'
import { useStore } from '@/models/store'
const { height: screenHeight } = Dimensions.get('window')
export default function Login(props: RouteComponentProps) {
  const { navigation } = props
  const fetchLogin = useStore((state) => state.fetchLogin)
  const cacheRef = useRef({
    checked: false
  })
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const [validCodeText, setValidCodeText] = useState('获取短信验证码')
  const schema = z.object({
    mobile: z.string().min(1, { message: '手机号不能为空' }),
    validCode: z.string().min(1, { message: '短信验证码不能为空' })
  })
  const {
    control,
    handleSubmit,
    formState: { errors },
    getValues
  } = useForm({
    defaultValues: {
      mobile: '',
      validCode: ''
    },
    resolver: zodResolver(schema)
  })
  const goUserPolicy = () => {
    // navigation.push('WebViewPage', { data: ConfApp.userPolicy, flag: '0' })
  }
  const goPrivacyPolicy = () => {
    // navigation.push('WebViewPage', { data: ConfApp.privacyPolicy, flag: '1' })
  }
  const onCheckboxChange = (e: { target: { checked: boolean } }) => {
    cacheRef.current.checked = e.target.checked
  }
  const getvalidCode = async () => {
    const mobile = getValues().mobile.replace(/\s*/g, '')
    if (!mobile) {
      Toast.fail('手机号不能为空')
      return
    }
    if (timerRef.current !== null) {
      return
    }
    let count = 60
    timerRef.current && clearInterval(timerRef.current)
    // 发送发短信请求
    await fetchSendSms({ mobile, type: '1001' })
    Toast.success('短信验证码已发送，请查收')
    setValidCodeText(`${count}秒后重发`)
    timerRef.current = setInterval(() => {
      count--
      if (count > 0) {
        setValidCodeText(count + '秒后重发')
      } else {
        timerRef.current && clearInterval(timerRef.current)
        timerRef.current = null
        setValidCodeText('获取短信验证码')
      }
    }, 1000)
  }
  // 校验通过后执行
  const onSubmit = (data: ILoginFormValues) => {
    if (!cacheRef.current.checked) {
      Toast.info({
        content: '请勾选并同意协议'
      })
      return
    }
    // 发起登录请求
    fetchLogin(
      {
        mobile: data.mobile.replace(/\s*/g, ''),
        validCode: data.validCode
      },
      () => {
        navigation.navigate('Root', { screen: 'TabOne' })
      }
    )
  }
  useEffect(() => {
    return () => {
      timerRef.current && clearInterval(timerRef.current)
    }
  }, [])
  return (
    <View style={styles.loginBox}>
      <View style={styles.loginHeader}>
        <Text style={styles.loginHeaderTitle}>短信验证码登录</Text>
        <Text style={styles.loginHeaderSubTitle}>未注册用户验证通过后将自动注册</Text>
        {/*<View style={CommonStyle.line}></View>*/}
      </View>
      <View style={styles.formWrap}>
        <RNInput name='mobile'
                 control={control}
                 type='phone'
                 errors={errors}
                 maxLength={13}
                 placeholder='请输入手机号' />
        <RNInput
          name='validCode'
          control={control}
          type='number'
          errors={errors}
          placeholder='请输入短信验证码'
          extra={validCodeText}
          maxLength={6}
          onExtraClick={getvalidCode}
        />
      </View>
      <View style={styles.loginTip}>
        <Checkbox onChange={onCheckboxChange}>
          <Text style={styles.tipColor}>我已阅读并同意</Text>
        </Checkbox>
        <Pressable onPress={goUserPolicy}>
          <Text style={styles.tip}>用户注册协议</Text>
        </Pressable>
        <Text style={styles.tipColor}>和</Text>
        <Pressable onPress={goPrivacyPolicy}>
          <Text style={styles.tip}>隐私政策</Text>
        </Pressable>
      </View>
      <View>
        <WhiteSpace size='lg' style={{ marginTop: 20 }} />
        <WingBlank>
          <Button onPress={handleSubmit(onSubmit)} type='primary' style={CommonStyle.bottomOneHalfBtn}>
            登录
          </Button>
        </WingBlank>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  loginBox:{
    height:screenHeight,
    backgroundColor: '#FFFFFF',
  },
  loginHeader: {
    paddingTop: 48,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 15
  },
  loginHeaderTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  loginHeaderSubTitle: {
    marginTop: 8,
    marginBottom: 28,
    fontSize: 12,
    color: '#777777'
  },
  loginTip: {
    paddingVertical: 20,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15
  },
  tip: {
    textDecorationLine: 'underline',
    color: Themes.color_link
  },
  tipColor: {
    color: '#777777'
  },
  formWrap: {
    backgroundColor: '#FFFFFF',
    // marginTop: 10
  },
  buttonActive:{
    backgroundColor: 'rgb(0,144,180)',
    borderColor: 'rgb(0,144,180)',
    color:'#fff'
  }
})
