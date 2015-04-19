//function test(weight, len, truck)
//{
//    var used;
//    var min = 100;// maximum value
//
//    for(var i = 0; i < len - 1; i++)
//    {
//        console.log("I = ", i);
//        used = [];
//
//        var cur = i;
//        var count = 0;
//        var cur_truck = truck;
//        for(var k = 0; k < len; k++)
//        {
//            console.log("Weight = ", weight[i]);
//            cur_truck = cur_truck - weight[i];
//            console.log("Truckzz = ", cur_truck);
//            if(cur_truck < 0)
//            {
//                cur_truck = truck;
//                count++;
//                console.log("+Truck", count);
//                k--;
//            }
//            else
//                i++;
//
//            if(i >= len)
//                i = 0;
//        }
//        count++;
//        if(count < min)
//            min = count;
//        console.log("MIN", min);
//    }
//
//    document.getElementById("count").value = min;
//}
//
//
//




//----------------------AJAX---------------------
function ajax() {
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

                    xmlhttp.onreadystatechange=function()
                    {
                        if (xmlhttp.readyState==4 && xmlhttp.status==200)
                        {
                            //console.log("TRYING");
                            //document.innerHTML = xmlhttp.responseText;
                            document.getElementById("aj").innerHTML = xmlhttp.responseText;
                        }
                    }

                    //xmlhttp.open("GET", "http://localhost:8080/testing", true);
                    xmlhttp.open("POST", "http://localhost:8080/", true);
                    xmlhttp.send("count=100&weight=200");
}
//                    //---------------------/AJAX---------------------