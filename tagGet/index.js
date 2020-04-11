const fetch = require("node-fetch");

const g = gen();
cb();

function cb(value){
  const fn = g.next(value);
  if(!fn.done) fn.value(cb);
}

function* gen(){

  let flg = true;
  let idx = 0;
  let arr = [];
  while(flg){
    const json = yield function(cb){
      fetch(`http://127.0.0.1:8887/${++idx}.json`)
      .then(res => res.json())
      .then(json => {
        cb(json);
      });
    }
    arr = [...arr,...json.items];
    flg = json.hasNext;
  }
  console.log(arr);

}