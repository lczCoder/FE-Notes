module.exports = function(source){
  console.log('b loader 被调用了');
  console.log(source);
  return source

}
