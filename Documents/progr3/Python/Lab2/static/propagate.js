var worker;
var toRet;
var sum = 0;

function testfunc() {
    console.log("LOGLOGLOGLOGLOG");
}

function propagate(weight, length, truck) {
        //console.log("Make worker");
        var isWork = true
        var Node = []
        var Result = []
        var NodeLen = 0;
        var percent;
        console.log("LENGTH " + length);

        var checker = new Worker("static/check.js");
        for(var i = 0; i < length; i++)
        {
            console.log("Worker ", i, " Making");
            Node[i]=new Worker('static/worker.js'); /* создаем Работника */
        }
        NodeLen = length;
        percent = 100/length;

        for(var i = 0; i < length; i++)
        {
            console.log("Workers onmessage ", i, " Making");
            Node[i].onmessage=function(event) {
                console.log("Worker ", event.data.id, " return ", event.data.ret);
                //if(event.data.ret != "undefined")
                if(event.data.ret)
                {
                    console.log("Worker ", event.data.id, " Ended");
                    Result[event.data.id] = event.data.ret;
                    Node[event.data.id].terminate();
                    checker.postMessage({res:Result, len:length});
                    NodeLen--;
                    //----------------------AJAX---------------------
                    var xmlhttp;
                    if (window.XMLHttpRequest)
                    { // code for IE7+, Firefox, Chrome, Opera, Safari
                        xmlhttp=new XMLHttpRequest();
                    }
                    else
                    { // code for IE6, IE5
                        xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
                    }

                    xmlhttp.onreadystatechange=function()
                    {
                        if (xmlhttp.readyState==4 && xmlhttp.status==200)
                        {
                            document.getElementById("task").value = NodeLen;
                            document.getElementById("done").value = (length - NodeLen)*percent + '%';
                        }
                    }

                    xmlhttp.open("GET", "http://localhost:8080/calculations", true);
                    xmlhttp.send();
                    //---------------------/AJAX---------------------
                }

                //waiting for terminating calculations
                /*test();
                if(!check(Node))
                    console.log('STOP CALCULATIONS');
                else
                    console.log("NOPE");*/

                /*console.log("CHECKING");
                isWork = false
                for(var i = 0; i < Node.length; i ++)
                    if(Node[i])
                    {
                        isWork = true;
                        break;
                    }

                if(!isWork)
                    console.log("CALCULATIONS ENDED");
                else
                    console.log("Nope")*/
            }
        }

        for(var i = 0; i < length; i++)
        {
            console.log("Worker ", i, " PostMessage");
            Node[i].postMessage({weight:weight[i], truck:truck, id:i}); /* запускаем WebWorker */
        }


        //Code for checker
        checker.addEventListener('message', function(e) {
            console.log('Worker said: ', e.data);
            if(e.data == true)
            {
                console.log("CHECKER STOPPED");
                checker.terminate();

                for(var i = 0; i < Result.length; i++)
                {
                    sum = sum + Result[i];
                }
                console.log("THIS IS RESULT", sum);
                //----------------------AJAX---------------------
                var xmlhttp;
                if (window.XMLHttpRequest)
                { // code for IE7+, Firefox, Chrome, Opera, Safari
                    xmlhttp=new XMLHttpRequest();
                }
                else
                { // code for IE6, IE5
                    xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
                }

                xmlhttp.onreadystatechange=function()
                {
                    if (xmlhttp.readyState==4 && xmlhttp.status==200)
                    {
                        document.getElementById("result").value = sum;
                    }
                }

                xmlhttp.open("GET", "http://localhost:8080/calculations", true);
                xmlhttp.send();
                //---------------------/AJAX---------------------
            }
        }, false);

        /*var testRes = []
        testRes[2] = 2;
        testRes[1] = 1;
        testRes[0] = 1;
        console.log("LENGTH " + testRes.length);*/
        //checker.postMessage({res:testRes, len:testRes.length});
        //checker.postMessage({res:Result, len:length});


        /*worker = new Worker('static/worker.js');

        worker.addEventListener('message', function(e) {
            //this.document.getElementsByName('weight').setAttribute('value', e.data);
            //console.log(document.getElementsByName('weight').value);
            console.log(e.data);
            toRet = e.data;

            if(e.data == 10) {
                console.log("set cookie");
                document.cookie="value="+e.data;
            }

            //document.write(e.data);
            //console.log(toRet)
            //alert("Some");
        })

        worker.postMessage(0);*/
}





function ret_value() {
    //document.write(toRet);
    //document.cookie="value="+toRet;
    return toRet
}