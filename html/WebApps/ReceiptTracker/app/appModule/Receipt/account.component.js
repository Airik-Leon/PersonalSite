angular.module('appModule')
    .component('userAccounts', {
        templateUrl: 'app/appModule/Receipt/account.component.html',
        controller: function (accountService) {
            var vm = this; 
            vm.users = null; 
            vm.user = null; 
            vm.accounts = []; 
            vm.transactions = null; 
            vm.totalCost = null; 
            vm.detail = null;
            vm.selectedAccount = null;
            vm.accountTypes = null;
            vm.transactionTypes = null; 
            vm.transactionSelected = null; 
            vm.selectedTransaction = null; 

            //init receipt list 
            accountService.indexUsers().then(function (res) {
                vm.users = res.data; 
            }); 
            //CRUD Functionality
            var reload = function () {
                accountService.index(vm.user).then(function (res) {
                    vm.accounts = res.data;
                }); 
            }
            vm.show = function (account) {
                accountService.show(account).then(function (res) {
                    vm.transactions = res.data;
                    vm.totalCost = calcTransactions(vm.transactions); 
                    vm.setDetailAccount(account); 
                });
            }
            vm.create = function (account) {
                account.accountType.id = findAccountId(account);
                account.user = vm.user; 
                accountService.create(account).then(function (res) {
                    reload();
                });
            }
            vm.update = function (account) {
                
                accountService.update(account).then(function (res) {
                    reload(); 
                    vm.selectedAccount = null; 
                })
            }
            vm.destroy = function (account) {
                accountService.destroy(account).then(function (res) {
                    reload(); 
                });
            }
            // Transaction Methods 
            vm.destoryTransaction = function (transaction, account) {
                accountService.destroyTransaction(transaction).then(function (res) {
                    reload(); 
                }) 
            }
            vm.createTransaction = function (transaction) {
                transaction.type.id = findTransactionId(transaction);
                transaction.account = vm.detail;
                accountService.createTransaction(transaction).then(function () {
                    reload();

                });
            }
            vm.updateTransaction = function (transaction) {
                transaction.type.id = findTransactionId(transaction); 
                accountService.updateTransaction(transaction).then(function () {
                    vm.selectedTransaction = transaction;
                    vm.setDetailAccount(transaction.account); 
                    reload();
                });
            }
            //Auxiliary Methods 
            vm.setDetailAccount = function (account) {
                vm.detail = account; 
            }
            vm.returnAccounts = function () {
                vm.detail = null;
                vm.transactions = null; 
            }
            vm.setDetailTransaction = function (transaction) {
                vm.detailTranscation = transaction; 
            }
            vm.setSelectedTransaction = function (transaction) {
                vm.selectedTransaction = angular.copy(transaction); 
            }; 
            vm.clearTransaction = function () {
                vm.selectedTransaction = null; 
            }
            vm.setSelectedAccount = function (account) {
                vm.selectedAccount = account; 
            }
            vm.clearSelected = function () {
                vm.selectedAccount = null; 
            }
            vm.logIn = function (id) {
                accountService.showUser(id).then(function (res) {
                    vm.user = res.data; 
                    //load on log in
                    accountService.index(vm.user).then(function(res) {
                        vm.accounts = res.data; 
                    });
                    accountService.indexAccountTypes().then(function (res) {
                        vm.accountTypes = res.data;
                 }); 
                    accountService.indexTransactionTypes().then(function (res) {
                        vm.transactionTypes = res.data;
                 }); 
                });
            }
            vm.logOut = function () {
                vm.user = null; 
            }
            //Helper Methods 
            var calcTransactions = function (transactions) {
                var total = 0; 
                transactions.forEach(t => {
                    if (t.type.type== "Debit") {
                        total += t.price;
                    }
                }); 
                return total; 
            }
            var findAccountId = function (account) {
                var id; 
                vm.accountTypes.forEach(element => {
                    if (element.type == account.accountType.type) {
                        id = element.id; 
                    }
                });
                return id; 
            }
            var findTransactionId = function (transaction) {
                var id; 
                vm.transactionTypes.forEach(element => {
                    if (element.type.type == transaction.type.type.ignoreCase) {
                        id = element.id;
                    }
                }); 
                return id; 
            }
        }, 
        controllerAs: 'vm'
    }); 