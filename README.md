# 使用 Expo48 + ReactNative + TypeScript 开发的 app 基础模板，适合跨端 app 开发常用场景

## 如何运行

方法 1：

1. 安装 expo-cli: [搭建开发环境]脚手架初始化项目参考(https://docs.expo.dev/)
2. 进入本项目的根路径
3. 运行 `npx expo start`，会打开 http://localhost:19002/本地 bundler 服务
4. 手机端先安装 expo Go，下载链接自行谷歌
5. 打开 expo Go，点击 Scan QR code 扫一扫上面 `npx expo start`命令后出现的二维码，手机会自动打开 app 并进行编译运行

方法 2：
如果项目涉及到第三方原生 SDK 集成，需要改动 android 目录下面的原生代码，则需要用 Android Studio 来运行项目

1. 首先，按照官方配置本地 Android 开发环境，https://www.reactnative.cn/docs/environment-setup；
2. 打开 Android Studio 顶部菜单栏 File，选择 App 项目，并在根目录下找到 Android 并点击确定打开；
3. 用 USB 数据线把你的安卓手机连上电脑，手机会弹出是否同意授权 USB 调试（如果未弹出，需检查手机设置里面是否已打开开发人员选项，以华为手机为例，路径：设置-系统和更新-开发人员选项-打开开发人员选项和 USB 调试），点击同意后，查看调试栏是否有你刚连上电脑的手机设备；
4. 以上准备工作完成后，打开 cmd，执行命令：adb reverse tcp:8081 tcp:8081，输出 8081 代表已连接成功；
5. 接着继续在 cmd 命令行工具，cd 到 app 项目的根目录下，输入 react-native start 命令启动本地 js 服务；
6. 然后，点击 android studio 调试栏，Run app，此操作会对项目的原生部分进行编译，同时会自动启动 Metro 服务对 javascript 代码进行实时打包处理（类似 webpack）。如果未自动启动，Metro 服务也可以在命令行工具输入 react-native start 命令单独启动。 如果配置没有问题，你应该可以看到应用自动安装到设备上并开始运行。注意第一次运行时需要下载大量编译依赖，耗时可能数十分钟（也有可能更长）。此过程可能依赖稳定的代理软件，否则将频繁遭遇链接超时和断开，导致无法运行。请不要轻易点击 Android Studio 中可能弹出的建议更新项目中某依赖项的建议，否则可能导致无法运行。

## 如何打包（如果你不使用云打包）

先生成 keystore 签名证书文件。

首次打包，需要在项目根目录下执行 npx expo prebuild，执行结束后项目根目录会生成 android 目录，然后用 Android Studio 打开项目目录下的 android，Android Studio 会自动下载相应的依赖和模块（这个过程可能会有点久）。

ps：在生成发行 APK 包前需要先更改 app 版本号信息  
1.打开 \android\app\build.gradle 文件  
2.修改版本标识 versionCode（版本号，要比你之前上传应用市场的要高）和版本名称 versionName

方法 1：

1. 进入/android 目录运行以下命令
   > ./gradlew assembleRelease

打包成功后在/android/app/build/outputs/apk/release 目录下会看到生成的 apk 文件

方法 2：
使用 Android Studio 工具栏打包

## 相关技术栈

在这样项目中，我用到的一些技术：

- ahooks
- axios
- react-hook-form
- ant-design/icons-react-native
- ant-design/react-native
- react-native-picker/picker
- react-native-async-storage/async-storage
- expo 48
- zod
- zustand
- react-native 0.71.6
- react 18.2.0
- ......

## 可能遇到的问题

1. https://docs.expo.dev/
2. github issue
3. 谷歌
4. Stack Overflow
5. https://www.reactnative.cn/
