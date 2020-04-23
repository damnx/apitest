const { hooks } = require('@adonisjs/ignitor')
const { ioc } = require('@adonisjs/fold')

hooks.after.providersBooted(() => {
    const Validator = use('Validator')
    const Database = use('Database')

    const existsFn = async (data, field, message, args, get) => {
        const value = get(data, field)
        if (!value) {
            /**
             * skip validation if value is not defined. `required` rule
             * should take care of it.
            */
            return
        }

        const [table, column] = args
        if(Array.isArray(value)) {
            for(let i in value) {
                let fieldData = value[i]
                let row = await Database.table(table).where(column, fieldData).first()
                if(!row) {
                    throw message
                }
            }
        } else {
            let row = await Database.table(table).where(column, value).first()
            if(!row) {
                throw message
            }
        }
    }

    const notBlankItemFn = async (data, field, message, args, get) => {
        const value = get(data, field)
        if (!value) {
            /**
             * skip validation if value is not defined. `required` rule
             * should take care of it.
            */
            return
        }
        if(Array.isArray(value)) {
            for(let i in value) {
                if(value[i] == "") {
                    throw message
                }
            }
        } else {
            if(value === "") {
                throw message
            }
        }

        return
    }


    Validator.extend('notBlankItem', notBlankItemFn)
    Validator.extend('exists', existsFn)
})