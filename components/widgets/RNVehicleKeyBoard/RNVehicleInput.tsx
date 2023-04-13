import React from "react";
import _reactNative, {StyleSheet, TouchableOpacity, View, Text, TouchableWithoutFeedback} from "react-native";
import Themes from '@/constants/Themes'
import {Icon} from "@ant-design/react-native";

interface RNVehicleInputPropsInterface {
  placeholder?: string;
  onSubmit?: (value: string) => void;
  onCancel?: () => void;
  onPress?: () => void;
  onBlur?: () => void;
  value?: string
}

const RNVehicleInput = (props: RNVehicleInputPropsInterface) => {

  const {placeholder, value, onPress, onBlur, onCancel} = props;

  const _renderCancel = () => {
    if (!value) {
      return
    }
    return (
      <TouchableWithoutFeedback style={styles.cancelTextContainer} onPress={onCancel}>
        <Text style={styles.cancelText}>取消</Text>
      </TouchableWithoutFeedback>
    )
  }

  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <TouchableWithoutFeedback onPress={onPress}>
          <View style={styles.input}>
            <Icon name='search' size='xs' color='#eee' style={styles.searchIcon}/>
            <Text style={styles.text}>{value ? value : placeholder}</Text>
          </View>
        </TouchableWithoutFeedback>
        {_renderCancel()}
      </View>
    </View>
  )
}

export const styles = StyleSheet.create({
  container: {
    height: Themes.list_item_height + Themes.border_width_sm,
    borderBottomWidth: _reactNative.StyleSheet.hairlineWidth,
    borderBottomColor: Themes.border_color_base,
    // paddingRight: Themes.h_spacing_lg,
    marginTop: 0,
    marginBottom: 0
  },
  text: {
    marginRight: Themes.h_spacing_sm,
    textAlignVertical: 'center',
    fontSize: Themes.font_size_base,
    color: Themes.color_text_caption
  },
  input: {
    borderRadius: Themes.radius_md,
    backgroundColor: '#fff',
    borderColor: Themes.border_color_base,
    borderWidth: Themes.border_width_sm,
    height: 33,
    color: Themes.color_text_base,
    fontSize: Themes.font_size_caption_sm,
    // paddingLeft: Themes.h_spacing_lg + Themes.icon_size_xxs + Themes.h_spacing_sm,
    paddingRight: Themes.h_spacing_lg + Themes.icon_size_xxs + Themes.h_spacing_sm,
    flex: 1,
    paddingTop: 0,
    paddingBottom: 0,
    flexDirection: 'row',
    alignItems: 'center'
  },
  wrapper: {
    backgroundColor: Themes.search_bar_fill,
    height: Themes.search_bar_height,
    paddingLeft: Themes.h_spacing_md,
    paddingRight: Themes.h_spacing_md,
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  searchIcon: {
    paddingLeft: Themes.h_spacing_md,
    paddingRight: Themes.h_spacing_lg,
  },
  cancelTextContainer: {
    height: Themes.search_bar_input_height,
    justifyContent: 'center',
    alignItems: 'center'
  },
  cancelText: {
    fontSize: Themes.font_size_base,
    color: Themes.color_link,
    paddingLeft: Themes.h_spacing_md
  },
})


export default React.memo(RNVehicleInput);
