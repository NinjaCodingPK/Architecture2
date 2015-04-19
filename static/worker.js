var toRet = 0;

onmessage=function(event) {
    //console.log("Worker ", event.data.id, " Started");

    //nameRQ = event.data;

    xhttp = new XMLHttpRequest(); /* создаем XMLHttpRequest-запрос */


    //TimeOut
    //delay = Math.random()*3000000 - Math.random()*1000000 + 1;
    //setTimeout(function() {}, Math.floor(delay));

    //Calculations
    //var used;
    var min = 10000;// maximum value
    //console.log("Len = ", event.data.len);
    for(var i = event.data.id*event.data.len/event.data.clients; i < (event.data.id+1)*event.data.len/event.data.clients - 1; i++)
    {
        //console.log("I = ", i);
        //used = [];

        var cur = i;
        var count = 0;
        var cur_truck = event.data.truck;
        for(var k = 0; k < event.data.len; k++)
        {
            //console.log("Weight = ", event.data.weight[i]);
            cur_truck = cur_truck - event.data.weight[i];
            //console.log("Truckzz = ", cur_truck);
            if(cur_truck < 0)
            {
                cur_truck = event.data.truck;
                count++;
                //console.log("+Truck", count);
                k--;
            }
            else
                i++;

            if(i >= event.data.len)
                i = 0;
        }
        count++;
        if(count < min)
            min = count;
        //console.log("MIN", min);
    }
    //toRet = event.data.weight / event.data.truck
    //setTimeout(function() { toRet = event.data.weight / event.data.truck }, Math.floor((Math.random() * 1000000) + 1));

    //console.log(toRet);
    //console.log(event.data.weight);
    //console.log(event.data.truck);

    xhttp.onreadystatechange = function(){
    	if (xhttp.readyState == 4) {
		    if (xhttp.status == 200) {
                //console.log("RETURNING --- ", toRet, ' ', event.data.id);
                postMessage({goodReq0:xhttp.responseText, ret:min, id:event.data.id})
                //postMessage(1);
		    } else {
			    //alert(xhttp.status);
		    }
	    }
    }; /* Обработчик запроса */

    xhttp.open('GET','http://localhost:8080/calculations',true); /* открываем запрос !!!!CHANGABLE*/
    xhttp.send(); /* и запускаем */


    //postMessage({goodReq0:xhttp.responseText, ret:toRet, id:event.data.id})
}




/*self.addEventListener('message', function(e) {
    i = e.data;
    for(var n = 0; n < 10; n++)
    {
        //console.log(i)
        i = i + 1
        self.postMessage(i)
    }
})*/


/*onmessage = function(ev)
{
    var answ = ev.data;
};

postMessage(answ);*/

/*
self.addEventListener('message', function(e) {
  var data = e.data;
  switch (data.cmd) {
    case 'start':
      self.postMessage('WORKER STARTED: ' + data.msg);
      break;
    case 'stop':
      self.postMessage('WORKER STOPPED: ' + data.msg + '. (buttons will no longer work)');
      self.close(); // Terminates the worker.
      break;
    default:
      self.postMessage('Unknown command: ' + data.msg);
  };
}, false);
*/

/*
var n = 1;
search: while (true) {
  n += 1;
  for (var i = 2; i <= Math.sqrt(n); i += 1)
    if (n % i == 0)
     continue search;
  // found a prime!
  self.postMessage(n);
}*/