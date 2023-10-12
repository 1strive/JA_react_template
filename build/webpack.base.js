// webpack.base.js
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
    entry: path.join(__dirname, '../src/index.tsx'), // 入口文件
    output: {
        filename: 'static/js/[name].js', // 每个输出js的名称
        path: path.join(__dirname, '../dist'), // 打包结果输出路径
        clean: true, // webpack4需要配置clean-webpack-plugin来删除dist文件,webpack5内置了
        publicPath: '/' // 打包后文件的公共前缀路径
    },
    module: {
        rules: [
            {
                test: /.(ts|tsx)$/, // 匹配.ts, tsx文件
                use: {
                    loader: 'babel-loader',
                    options: {
                        // 预设执行顺序由右往左,所以先处理ts,再处理jsx
                        presets: [
                            '@babel/preset-react',
                            '@babel/preset-typescript'
                        ]
                    }
                }
            },
            //loader执行顺序是从右往左,从下往上的,匹配到css文件后先用css-loader解析css, 最后借助style-loader把css插入到头部style标签中。
            {
                test: /.(css|less)$/, //匹配 css和less 文件
                use: ['style-loader', {
                    loader: 'css-loader',
                    options: {
                        modules: {
                            localIdentName: '[name]__[local]--[hash:base64:5]',//css-loader中的options部分指定了模块化的配置，其中localIdentName定义了生成的CSS类名的格式。
                        },
                    },
                }, , 'less-loader']
            },
        ]
    },
    resolve: {
        extensions: ['.js', '.tsx', '.ts'],
    },//配置引入模块时可以不带的后缀
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, '../public/index.html'), // 模板取定义root节点的模板
            inject: true, // 自动注入静态资源
        })
    ]


}
