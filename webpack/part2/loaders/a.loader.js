module.exports = function(source){
    console.log('a loader 被调用了');
    console.log(typeof source);
    source = source + ';const x = 123'
    console.log(source);
    return source
}
 
