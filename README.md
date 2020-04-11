# 目次

- [ジェネレーターのおさらい](./gen/index.js)
- [coの使い方](./myCo/index.js)
- [ジェネレーターでページ内の画像を取得](./pageGetter/index.js)
- [coとジェネレーターでページ内の画像を取得](./pageGetter/index2.js)

# ポイント

```
- coに渡すジェネレーター内に処理を書いて行く

- 非同期処理を呼ぶときは yield をつける

- yield で ajax通信などの取得結果を使いたい場合は promiseをyieldする必要がある

- 非同期通信の結果を必要としない場合はthunkでもpromiseでもgeneratorでも構わない
```

# 何のために使うか？

```
- コールバック地獄を回避するため。非同期処理をスッキリ書くため

- coとpromiseを組み合わせると then を書かないで良くなるのでネストが浅くなる
```