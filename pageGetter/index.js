const fetch = require("node-fetch");
const fs = require("fs");
const cheerio = require("cheerio");
const urlParse  = require("url").parse;

const url = "https://www.kensukegoto.com/";

function* processsings(){

  const html = yield function (cb){
    fetch(url)
    .then(res => res.text())
    .then(html => {
      cb(html);
    })
  }

  // cheerioオブジェクトとして取得される
  const imgs = [].slice.call(cheerio.load(html)("img"))
    .map(img => {
      return cheerio.load(img)("img").attr("src");
    })


  for(let i = 0,l = imgs.length; i < l; i++){
    yield function (cb){

      fetch(imgs[i])
        .then(res => {
          const dirName = urlParse(res.url).hostname;
          if(!fs.existsSync(dirName)){
            fs.mkdirSync(dirName);
          }
          const name = urlParse(res.url).path.split("/")
            .filter( e => /\.jpe{0,1}g|\.png|\.svg/.test(e));

          	const dest = fs.createWriteStream(`${dirName}/${name[0]}`);
            res.body.pipe(dest);
          cb();
        })
    }
  }

}

const g = processsings();
cb();

function cb(value){
  const fn = g.next(value);
  if(!fn.done) fn.value(cb);
}



