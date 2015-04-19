var prepared = []

function make_request() {
    console.log("start ajax req");
    var xmlhttp;
    if (window.XMLHttpRequest)
    { // code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp=new XMLHttpRequest();
    }
    else
    { // code for IE6, IE5
        xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
    }

    return xmlhttp;
}


function show() {
                    var xmlhttp = make_request();

                    xmlhttp.onreadystatechange=function()
                    {
                        if (xmlhttp.readyState==4 && xmlhttp.status==200)
                        {
                            //console.log("TRYING");
                            //document.innerHTML = xmlhttp.responseText;
                            document.getElementById("prep").innerHTML = xmlhttp.responseText;
                        }
                    }
                    //xmlhttp.open("GET", "calculations.html", true);
                    xmlhttp.open("GET", "http://localhost:8080/prep", true);
                    //xmlhttp.open("GET", "http://192.168.0.12:8080/prep", true);
                    xmlhttp.send();
}

function preparing(array, length, count) {
    var temp_arr = [];
    var temp_i = 0;


    for(var i = 0; i < count; i++)
    {
        var k = 0;
        for(var j = 0; j < length/count; j++)
        {
            temp_arr[j] = array[j + i*length/count];
        }
        prepared[i] = temp_arr;
    }

    for(var i = 0; i < prepared.length; i++)
    {
        console.log("I = ", i);
        for(var j = 0; j < prepared[i].length; j++)
        {
            console.log("J = ", prepared[i][j]);
        }
    }
}

function propagate(weight, length, truck, clients) {
    show();
    //preparing(weight, length, clients);
    var min = 100000;
    //Workers initialization
    Node = []
    NodeLen = clients;
    for(var i = 0; i < clients; i++)
    {
//      console.log("Worker ", i, " Making");
        Node[i]=new Worker('static/worker.js'); /* создаем Работника */
    }
    //End workers initializtion
    var start = new Date();

    //onmessage init
    for(var i = 0; i < clients; i++)
    {
        Node[i].onmessage=function(event) {
            if(event.data.ret)
            {
                //console.log("Worker ", event.data.id, " Ended");
                //Result[event.data.id] = event.data.ret;
                if(event.data.ret < min) {
                    min = event.data.ret;
                }
                Node[event.data.id].terminate();
                //checker.postMessage({res:Result, len:length});
                NodeLen--;
                if(NodeLen == 0)
                {
                    var finish = new Date();
                    document.getElementById("time").value = finish.getTime() - start.getTime();
                    document.getElementById("result").value = event.data.ret;
                }
            }
        }
    }
    //end onmessage init

    //send data to workers
    for(var i = 0; i < clients; i++)
    {
       //console.log("Worker ", i, " PostMessage");
       Node[i].postMessage({weight:weight, truck:truck, id:i, len:length, clients:clients}); /* запускаем WebWorker */
    }
    //end sending data


//------------------CLUSTER------------------------------------------------------------
//    cluster1=new Worker('static/worker.js');
//    var start = new Date();
//
//    cluster1.onmessage=function(event) {
//        if(event.data.ret) {
//            var finish = new Date();
//            document.getElementById("time").value = finish.getTime() - start.getTime();
//            document.getElementById("result").value = event.data.ret;
//            cluster1.terminate;
//        }
//    }
//
//    cluster1.postMessage({weight:weight, truck:truck, id:0, len:length});
//-------------------CLUSTER-END-----------------------------------------------------------
}









//function propagate(weight, length, truck) {
//        //console.log("Make worker");
//        var isWork = true
//        var Node = []
//        var Result = []
//        var NodeLen = 0;
//        var percent;
//
//        var i = 0;
//        //console.log("LENGTH " + length);
//
//        var start = new Date();
//
//        var checker = new Worker("static/check.js");
//        //for(var i = 0; i < length; i++)
//        //{
//            //console.log("Worker ", i, " Making");
//            Node[i]=new Worker('static/worker.js'); /* создаем Работника */
//        //}
//        NodeLen = length;
//        percent = 100/length;
//
//            Node[i].onmessage=function(event) {
//                if(event.data.ret)
//                {
//                    //console.log("Worker ", event.data.id, " Ended");
//                    Result[event.data.id] = event.data.ret;
//                    Node[event.data.id].terminate();
//                    checker.postMessage({res:Result, len:length});
//                    NodeLen--;
//                    //----------------------AJAX---------------------
//                    var xmlhttp;
//                    if (window.XMLHttpRequest)
//                    { // code for IE7+, Firefox, Chrome, Opera, Safari
//                        xmlhttp=new XMLHttpRequest();
//                    }
//                    else
//                    { // code for IE6, IE5
//                        xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
//                    }
//
//                    xmlhttp.onreadystatechange=function()
//                    {
//                        if (xmlhttp.readyState==4 && xmlhttp.status==200)
//                        {
//                            document.getElementById("task").value = NodeLen;
//                            document.getElementById("done").value = (length - NodeLen)*percent + '%';
//                        }
//                    }
//
//                    xmlhttp.open("GET", "http://localhost:8080/calculations", true);
//                    xmlhttp.send();
//                    //---------------------/AJAX---------------------
//                }
//            }
//        //}
//
//        //for(var i = 0; i < length; i++)
//        //{
//            //console.log("Worker ", i, " PostMessage");
//            Node[i].postMessage({weight:weight, truck:truck, id:i, len:length}); /* запускаем WebWorker */
//        //}
//
//
//        //Code for checker
//        checker.addEventListener('message', function(e) {
//            //console.log('Worker said: ', e.data);
//            if(e.data == true)
//            {
//                //console.log("CHECKER STOPPED");
//                checker.terminate();
//
//                //for(var i = 0; i < Result.length; i++)
//                //{
//                    sum = sum + Result[i];
//                //}
//                console.log("THIS IS RESULT", sum);
//                //----------------------AJAX---------------------
//                var xmlhttp;
//                if (window.XMLHttpRequest)
//                { // code for IE7+, Firefox, Chrome, Opera, Safari
//                    xmlhttp=new XMLHttpRequest();
//                }
//                else
//                { // code for IE6, IE5
//                    xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
//                }
//
//                xmlhttp.onreadystatechange=function()
//                {
//                    if (xmlhttp.readyState==4 && xmlhttp.status==200)
//                    {
//                        document.getElementById("result").value = sum;
//                        var finish = new Date();
//                        document.getElementById("time").value = finish.getTime() - start.getTime();
//                    }
//                }
//
//                xmlhttp.open("GET", "http://localhost:8080/calculations", true);
//                xmlhttp.send();
//                //---------------------/AJAX---------------------
//            }
//        }, false);
//
//
//}

