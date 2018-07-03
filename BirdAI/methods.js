function distance(obj1, obj2){
    let result = Math.pow(obj1.xpos - obj2.xpos, 2) + Math.pow(obj1.ypos - obj2.ypos, 2);
    return Math.sqrt(Math.abs(result));
}