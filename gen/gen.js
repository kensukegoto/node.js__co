const prompts = require("prompts");

function easyAsync(gfn){
  const g = gfn();

  function cb(value){
    // yieldを進めて関数を取得 
    // g.next(value)で一旦ジェネレーターにvalueを返す
    // fnに入るのはg.next()でジェネレーターに戻り次に出会うyield
    const fn = g.next(value); 
    console.log(fn);
    if(!fn.done) fn.value(cb); // 関数を実行 yieldを進めるコールバックを引数にすると関数内でコールバックが実行される
    if(fn.done) console.log("終わり！");
  }
  cb();
}

easyAsync(function* (){
  console.log("最初の処理");
  const message = yield function(cb){
    // ３秒後にokを実行する関数を呼び出し元に返す
    // cbは呼び出し元にあるジェネレーターを進める関数
    setTimeout(() => {
      cb("タイマー終了");
    },3000);
  }
  console.log(message);
  console.log("３秒たちました！");

  const name = yield function(cb){
    prompts({
      type: "text", // selectタイプ
      name: "greet", // 変数名
      message: "お名前を教えて下さい"
    },{
      onSubmit: (err,data)=>{
        cb(data); // g.next(value); nameにvalueが入る
      }
    });
  }

  console.log(`${name}と入力しました`);
});