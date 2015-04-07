from bottle import Bottle, run
from bottle import get, post, request, response # or route
from bottle import template
from bottle import static_file
from os.path import basename, abspath, dirname, join
import time


class makedata:
    """ Class for working with data array """
    def __init__(self):
        self.newdata = {}
        self.count = 0


    def addelem(self, elem):
        """
        :param elem: new element of array
        :return: nothing
        """
        self.newdata[self.count] = elem
        self.count += 1

    def retdata(self):
        """
        :return: the whole array
        """
        return self.newdata


class addform:
    def __init__(self, app):
        """
        :param app: bottle application
        :return: nothing
        """
        self.app = app
        self.weight = makedata()
        self.count = makedata()
        self.appPath = dirname(abspath(''))
        print self.appPath
        self.addfile()

    def showform(self):
        """
        :return: html page main.html
        """
        @self.app.route('/', name='static')
        def show():
            return template("static/main.html", num=1)

    def get_elem(self):
        """
        Do receive data from html form
        :return: html page main.html
        """
        @self.app.route('/', method='POST')
        def get():
            new_weight = request.forms.get('weight')
            new_count = request.forms.get('count')
            # print elem
            self.weight.addelem(new_weight)
            self.count.addelem(new_count)

            # if(request.get_cookie("value")):
            # testcookie = request.get_cookie("value")
            # print testcookie
            # else:
            #    print "NO COOKIE"
            return template("static/main.html", num=1)

    def addfile(self):
        @self.app.route(r'/static/<filename:re:[a-zA-Z0-9]+\.js>')
        def js_getting(filename):
            return static_file(filename, root='static/')

    def GetWeight(self):
        """
        :return: weight array
        """
        return self.weight.retdata()

    def GetCount(self):
        """
        :return: count array
        """
        return self.count.retdata()


class tableform:
    def __init__(self, app, weight, count):
        """
        :param app: bottle application
        :param weight:  weight array
        :param count:  count array
        :return: nothing
        """
        self.app = app
        self.addfile()
        self.weight = weight
        self.count = count
        self.truck = 0

    def get_truck(self):
        """
        Do receive truck data from html form
        :return: html page tableform.html
        """
        @self.app.route('/table', method='POST')
        def get():
            truck = request.forms.get('truck')
            return template("static/tableform.html", weight=self.weight, count=self.count)

    def showform(self):
        """
        :return: html page tableform.html
        """
        @self.app.route('/table')
        def show():
            # print("First SHOW")
            # for i in range(len(self.weight)):
                # print self.weight[i]
            return template("static/tableform.html", weight=self.weight, count=self.count)

    def addfile(self):
        @self.app.route(r'/static/<filename:re:[a-zA-Z0-9]+\.js>')
        def js_getting(filename):
            return static_file(filename, root='static/')

    def ret_truck(self):
        """
        :return: truck data
        """
        return self.truck


class calculations:
    def __init__(self, app, weight, count, truck):
        """
        :param app: bottle application
        :param weight: weight array
        :param count: count array
        :param truck: truck data
        :return: nothing
        """
        self.app = app
        self.weight = weight
        self.count = count
        self.truck = truck

    def data_remake(self, weight, count):
        """
        :param weight: weight array
        :param count: count array
        :return: combine array of weight and count arrays
        """
        newdata = {}
        k = 0

        for i in range(len(weight)):
            for j in range(int(count[i])):
                # print weight[i]
                newdata[k] = int(weight[i])
                k += 1

        return newdata

    def test_data(self):
        toRet = {10, 20, 20}
        return toRet

    def connect(self):
        """
        :return: html page calculations.html
        """
        @self.app.route('/calculations')
        def start():
            ret_weight = self.data_remake(self.weight, self.count)
            # print ret_weight
            # for i in ret_weight:
                # print i
            # ret_weight = self.test_data()
            # for i in ret_weight:
                # print i
            # print self.truck
            return template("static/calculations.html", weight=ret_weight, length=len(ret_weight), truck=5)


app = Bottle()

addf = addform(app)
addf.showform()
addf.get_elem()

tablef = tableform(app, addf.GetWeight(), addf.GetCount())
tablef.showform()
tablef.get_truck()

calculationsf = calculations(app, addf.GetWeight(), addf.GetCount(), tablef.ret_truck())
calculationsf.connect()

run(app, host='localhost', port=8080, root="~/Documents/progr3/Python/Lab2")

