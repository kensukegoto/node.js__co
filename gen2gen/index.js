const co = require("co");

function* waitFunc2(){

  const m = yield new Promise(cb => {
      setTimeout(() => {
        cb("waitFunc2");
      }, 1000);
  })

  return m;
}

function* waitFunc(){

  const m = yield new Promise(cb => {
      setTimeout(() => {
        cb("waitFunc");
      }, 1000);
  })

  const m2 = yield waitFunc2(); 

  return [m,m2];
}

co(function* (){
  const total = yield waitFunc();
  console.log(total);
})