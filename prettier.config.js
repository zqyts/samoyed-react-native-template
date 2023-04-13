module.exports = {
  eslintIntegration: true,
  arrowParens: 'always', // always:(x) => x  avoid: x => x
  printWidth: 120, // 每行代码最大长度
  //   tabWidth: 1, // 一个tab代表几个空格数
  useTabs: false, // 是否使用tab进行缩进，默认为false，表示用空格进行缩减
  semi: false, // 声明后带分号
  singleQuote: true, // 使用单引号
  jsxSingleQuote: true, // 使用单引号
  jsxBracketSameLine: false, // 启用jsx语法，> 放在末尾
  trailingComma: 'none',
  bracketSpacing: true // 在对象，数组括号与文字之间加空格 "{ foo: bar }"
};
