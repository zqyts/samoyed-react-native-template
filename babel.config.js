module.exports = function (api) {
  api.cache(true)
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      ['import', { libraryName: '@ant-design/react-native' }],
      [
        'module-resolver',
        {
          root: ['./'],
          alias: {
            '@/components': './components',
            '@/utils': './utils',
            '@/views': './views',
            '@/navigation': './navigation',
            '@/models': './models',
            '@/config': './config',
            '@/constants': './constants',
            '@/assets': './assets',
            '@/screens': './screens',
            '@/hooks': './hooks',
            '@/services': './services'
          }
        }
      ]
    ]
  }
}
