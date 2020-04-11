const co = require("co");

function hoge(){
  return callback => {

    function inner(err,data){
      
    }
    setTimeout(()=>{
      console.log("ok!");
      callback();
    },1000)
  }
}

co(function* (){
  const ret = yield hoge();
  console.log(ret);
});

console.log("coの結果を待たないよ");