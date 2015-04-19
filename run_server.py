import main
from bottle import Bottle, run, route
from bottle.ext.websocket import GeventWebSocketServer
from bottle.ext.websocket import websocket

app = Bottle()

addf = main.addform(app)
addf.showform()
addf.get_elem()

tablef = main.tableform(app, addf.GetWeight(), addf.GetCount())
tablef.showform()
# tablef.get_truck()

calculationsf = main.calculations(app, addf.GetWeight(), addf.GetCount(), tablef.ret_truck())
calculationsf.connect()

test = main.test_class(app)

""""@app.get('/websocket', apply=[websocket])
def echo(ws):
    while True:
        msg = ws.receive()
        if msg is not None:
            ws.send(msg)
        else:
            break"""""


#run(app, host='localhost', port=8080, root="~/Documents/progr3/Python/Lab2")
run(app, host='0.0.0.0', port=8080)
