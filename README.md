# vscodeによるJavaScriptデバッグのための調査アプリ
# 概要
このアプリケーションは調査用のアプリケーションです。  
手順に沿って実行すると、画面にhogeというウィンドウが表示されるだけのアプリケーションです。
![image](https://user-images.githubusercontent.com/88073693/194792450-177fcb74-4a93-4342-a094-0d10411ee0ee.png)

# 目的
rails6 + jquery + vscodeでJSをデバッグ実行したいです。  
しかし、JSファイルに設定したブレークポイントで停止しないという問題が発生しています。
ただし、ブラウザでブレークポイントを設定すると、ソースマップのほうでは停止します。
ソースマップとJSファイルのマッピングが上手くいっていないかもしれません。  
期待する結果は、JSファイルに設定したブレークポイントで停止することです。
# バージョン情報
- ruby 2.7.6p219
- Rails 6.1.7
- webpack 4.42.0
- jquery 3.3.1

# 前提条件
- rails6のWebpackerは使用しません。
- 調査用アプリではvscode拡張機能 [Dev Containers](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers)を使用するので事前にインストールしてください。
- 調査用アプリではDockerを使用します。
- 動作確認用のブラウザはchromeを使用しています。

# 環境構築

1. 調査用アプリsample1-appをgit cloneします。  
git clone git@github.com:YamabikoLab/sample1-app.git

2. vscodeでgit cloneしたアプリを開きます。
3. リモートコンテナをリオープンします。  
画面左下の><をクリックし、「Reopen in Container」を選択します。  
初回はdockerビルドが実行されます。  
ビルドが完了すると、リモートコンテナ側を操作できるようになっています。
![image](https://user-images.githubusercontent.com/88073693/194790835-28097f32-0795-4cf4-a5b0-704b46b12e0d.png)
4. リモートコンテナ側のターミナルでyarn installします。
```bash
yarn install
```
5. リモートコンテナ側のターミナルでbundle installします。
```bash
bundle install
```
6. リモートコンテナをReopenします。（※Rebuildする必要はありません）
![image](https://user-images.githubusercontent.com/88073693/194791096-795e1cf2-9106-4ff3-a49e-61c4638d781d.png)
# 動作確認手順
1. JSファイル(app/webpack/javascripts/hoge.js)にブレークポイントを設定します。  
このファイルのブレークポイントで停止させることが最大の目的です。
![image](https://user-images.githubusercontent.com/88073693/194791446-5db5682f-49f2-4ebe-a5d3-7d8901110f79.png)
2. リモートコンテナ側のターミナルでnpm run watchを実行します。
```bash
npm run watch
```
3. Rails Serverを起動します。
![image](https://user-images.githubusercontent.com/88073693/194791230-906f1f81-5d4c-4f29-a96e-794a37a1ff11.png)
4. JSデバッグ用ブラウザを開きます。
![image](https://user-images.githubusercontent.com/88073693/194791350-9b51241e-ca51-400f-8ff8-b539bd7b19ab.png)

JSは実行されますが、ブレークポイントで停止しませんでした。。
![image](https://user-images.githubusercontent.com/88073693/194791494-9323c5aa-ccbd-43df-af50-fd07f115e6d9.png)

ブラウザの開発者ツールでブレークポイントを設定すると、vscode側で停止します。
![image](https://user-images.githubusercontent.com/88073693/194791836-2f3353bb-2d77-42cc-b5a5-61e413fc4ced.png)

ブレークポイントで停止していますが、npm run watchで自動生成されたファイル（app/assets/javascripts/webpack_hoge.js）のほうで停止してしまっています。  
JSファイルのほうで停止させたいです。
![image](https://user-images.githubusercontent.com/88073693/194791955-7e479b1d-c912-47bb-9770-1556989a78d9.png)
# 主要なファイルの説明
<dl>
  <dt>app/webpack/javascripts/hoge.js</dt>
  <dd>このJSファイルをデバッグ実行したいです。</dd>
  <dt>webpack.config.js</dt>
  <dd>webpack設定ファイル</dd>
  <dt>.vscode/launch.json</dt>
  <dd>vscodeデバッグ実行設定ファイル</dd>
  <dt>config/environments/development.rb</dt>
  <dd>config.assets.debug = trueにするとソースマップが作成されるとのことですが、機能しているか不明です。</dd>
  <dt>app/assets/javascripts/webpack_hoge.js</dt>
  <dd>npm run watchで自動生成されたファイルです。</dd>
</dl>