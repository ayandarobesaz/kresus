BaseView = require '../lib/base_view'

BalanceBanksView = require './balance_banks'
BalanceOperationsView = require "./balance_operations"

module.exports = class BalanceView extends BaseView

    template: require('./templates/balance')

    el: 'div#content'

    elAccounts: '#balance-column-left'
    elOperations: '#balance-column-right'

    initialize: ->
        #@listenTo window.collections.banks, 'add', @renderBank

    renderBank: (bank) =>
        view = new BalanceBanksView bank
        $(@elAccounts).append view.render().el

    render: =>
        super()

        # prepare the operations list
        operations = new BalanceOperationsView
        $(@elOperations).html operations.render().el

        # prepare the banks list
        for bank in window.collections.banks.models
            @renderBank bank
        @
