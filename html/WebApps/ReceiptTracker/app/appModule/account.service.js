angular.module('appModule')
    .factory('accountService', function ($http){
        var service = {}; 
        var BASE_URL = 'http://airikleon.io:8080/ReceiptTracker/users'

        service.index = function (user) {
            return $http({
                method: 'GET', 
                url: BASE_URL + '/' + user.id + '/accounts/'
            }); 
        }
        service.show = function (account) {
            return $http({
                method: 'GET', 
                url: BASE_URL + '/'+ account.user.id + '/accounts/' + account.id + '/transactions'
            }); 
        }
        service.create = function (account) {
            return $http({
                method: 'POST',
                url: BASE_URL + '/'+ account.user.id + '/accounts',
                headers: {
                    'content-type': 'application/json'
                },
                data: account
            });
        }
        service.update = function (account) {
            return $http({
                method: 'PUT', 
                url: BASE_URL + '/'+ account.user.id + '/accounts/' + account.id,
                headers: {
                    'content-type': 'application/json'
                },
                data: account
            })
        }
        service.destroy = function (account) {
            return $http({
                method: 'DELETE',
                url: BASE_URL + '/'+ 1 + '/accounts/' + account.id
            }); 
        }
        service.createTransaction = function (tran) {
            console.log(tran);
            return $http({
                method: 'POST',
                url: BASE_URL + '/' + tran.account.user.id + '/accounts/' + tran.account.id + '/transactions',
                headers: {
                    'content-type': 'application/json'
                },
                data: tran
            }); 
        }
        service.updateTransaction = function (tran) {
            return $http({
                method: 'PUT',
                url: BASE_URL + '/' + tran.user.id + '/accounts/' + tran.account.id+ '/transactions/' + tran.id, 
                headers: {
                    'content-type': 'application/json'
                },
                data: tran 
            }); 
        }
        service.destroyTransaction = function (transaction) {
            return $http({
                method: 'DELETE',
                url: BASE_URL + '/' + transaction.user.id + '/accounts/' + transaction.account.id + '/transactions/' + transaction.id
            })
        }
        //User methods
        service.indexUsers = function () {
            return $http({
                method: 'GET',
                url: BASE_URL
            }); 
        }
        service.showUser = function (id) {
            return $http({
                method: 'GET',
                url:BASE_URL + '/' +id
            })
        }

        //Helper methods 
        service.indexAccountTypes = function () {
            return $http({
                method: 'GET', 
                url: 'http://airikleon.io:8080/ReceiptTracker/accountType'
            })
        }
        service.indexTransactionTypes = function () {
            return $http({
                method: 'GET', 
                url: 'http://airikleon.io:8080/ReceiptTracker/transactionType'
            })
        }
        return service; 
    }); 