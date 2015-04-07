function check(Node, length) {
    //console.log("CHECKING");
    for(var i = 0; i < length; i ++)
        if(!Node[i])
        {
            //console.log("ASADASDASD", i);
            return false;
        }
    return true;
}

//function check(Node) {
//    console.log("CHECKING" + Node[1]);
//
//}

self.addEventListener('message', function(e) {
    //for(var i = 0; i < 5000; i++)
    //while(true)
    //{
        var isWork = check(e.data.res, e.data.len)
        self.postMessage(isWork);
    //}
}, false);