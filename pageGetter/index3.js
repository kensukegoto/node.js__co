const fetch = require("node-fetch");
const fs = require("fs");
const cheerio = require("cheerio");
const urlParse  = require("url").parse;
const co = require("co");

const url = "https://www.kensukegoto.com/";

co(function* processsings(){

  const html = yield new Promise(cb => {
    fetch(url)
    .then(res => res.text())
    .then(html => {
      cb(html);
    })
  })

  // cheerioオブジェクトとして取得される
  const imgs = [].slice.call(cheerio.load(html)("img"))
    .map(img => {
      return cheerio.load(img)("img").attr("src");
    })

  let gens = [];
  for(let i = 0,l = imgs.length; i < l; i++){
    gens.push(imgGet(imgs[i]));
  }

  // ジェネレーター・プロミス・サンクの配列を yield すると並行実行出来る
  yield gens;

})

function* imgGet (src) {

  const myImg = yield new Promise(cb =>{
    fetch(src)
      .then(res => cb(res))
  })

  const dirName = urlParse(myImg.url).hostname;
  const fileName = urlParse(myImg.url).path.split("/")
        .filter( e => /\.jpe{0,1}g|\.png|\.svg/.test(e))[0];

  yield new Promise (cb => {

    fs.exists(dirName,exsits =>{

      if(exsits) return cb(dirName);

      fs.mkdir(dirName,err => {
        cb(dirName)
      })
    })
  }) // myDir

  yield new Promise (cb => {
    myImg.body.pipe(fs.createWriteStream(`${dirName}/${fileName}`));
    cb();
  })

  console.log(`${fileName}取得`);

}

// const g = processsings();
// cb();

// function cb(value){
//   const fn = g.next(value);
//   if(!fn.done) fn.value(cb);
// }



