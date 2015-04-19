from bottle import Bottle, run
from bottle import get, post, request, response # or route
from bottle import template
from bottle import static_file
from os.path import basename, abspath, dirname, join
import socket
# import distutils
# import time

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


class MakeIp:
    def __init__(self):
        self.ip = []
        self.count = 0

    def push(self, value):
        # self.ip[self.count] = value
        self.ip.append(value)
        self.count += 1

    def get_ip(self):
        return self.ip

    def check_ip(self, value):
        if value in self.ip:
            return False
        else:
            return True

    def remove_ip(self, ip):
        self.ip.remove(ip)
        self.count -= 1

    def get_count(self):
        return self.count


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
        self.addjs()
        self.addhtml()
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

    def addjs(self):
        @self.app.route(r'/static/<filename:re:[a-zA-Z0-9]+\.js>')
        def js_getting(filename):
            return static_file(filename, root='static/')

    def addhtml(self):
        @self.app.route(r'/static/<filename:re:[a-zA-Z0-9]+\.html>')
        def html_getting(filename):
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
        self.make_calc_temp()
        self.Ips = MakeIp()
        self.disconnect()

    def disconnect(self):
        @self.app.route("/disconnect")
        def disc():
            ip = request.remote_addr
            self.Ips.remove_ip(ip)
            return template("static/disconnect.html", ip=ip)

    def make_calc_temp(self):
        @self.app.route("/prep")
        def make():
            return template("static/calculations.html")

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
            ip = request.remote_addr
            route = request.remote_route
            print route
            if self.Ips.check_ip(ip):
                self.Ips.push(ip)
            print self.Ips.get_count()
            return template("static/calc_prepare.html", weight=ret_weight, length=len(ret_weight), truck=100, clients=self.Ips.get_count())


class test_class():
    def __init__(self, app):
        self.app = app
        self.test()

    def test(self):
        @self.app.route('/testing')
        def test():
            ip = request.remote_addr
            print ip
            ret_weight = [10, 10, 12, 14]
            return template("static/test.html", weight=ret_weight, length=len(ret_weight), truck=25)


