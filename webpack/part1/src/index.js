const a = () => {
  console.log('hello')
}


const p = new Promise ((resolve,reject)=>{
  if(true){
    resolve('ok')
  }else{
    reject('err')
  }
})