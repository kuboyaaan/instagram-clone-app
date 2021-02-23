# Instagram Clone App
## 1. 環境構築
### application
`create-react-app instagram-clone`<br>
`App.test.js/log.svg/setupTests.js`は削除して、整理する<br>

### firebase
`https://console.firebase.google.com/`で新規プロジェクトを作成<br>
プロジェクトができたら、「プロジェクトの設定」から、firebaseの設定情報を取得しておく。（/src/firebase.jsで使用）<br>

## 2.実装
ハードコーディングでデータをpropsで渡して、`<Post />`側で処理する。<br>
確認後、stateを用いて、`<Post />`にmappingする。<br>
