class GoodItem {
    name = ''
    price = 0
    count = 1


    constructor ({name, price}) {
        this.name = name
        this.price = price
    }

    inc () {
        this.count++
    }

    dec () {
        this.count--
    }

    getBuyBtn () {
        const btnBuy = document.createElement('div')
        btnBuy.classList.add('btnBuy')
        btnBuy.innerHTML = 'Купить!'

        btnBuy.addEventListener('click', () => {
            const CartInstance = new Cart()
            CartInstance.add(this)
            console.log(CartInstance)
        })

        return btnBuy
    }

    getPlusBtn () {
        const btnPlus = document.createElement('div')
        btnPlus.classList.add('btnPlus')
        btnPlus.innerHTML = '+'
      
        btnPlus.addEventListener('click', () => {
            const CartInstance = new Cart()
            CartInstance.add(this)
            console.log(CartInstance)
    })

        return btnPlus
    }

    getMinusBtn () {
        const btnMinus = document.createElement('div')
        btnMinus.classList.add('btnMinus')
        btnMinus.innerHTML = '-'

        btnMinus.addEventListener('click', () => {
            const CartInstance = new Cart()
            CartInstance.remove(this)
            console.log(CartInstance)
        })

        return btnMinus
    }

    getTemplate () {
        const { name, price, count } = this
        const wrapper = document.createElement('div')
        wrapper.innerHTML = `
        <div class="good">
            <div class="good_name">Товар: <span>${name}</span></div> 
            <div class="good_price">Цена: <span>${price}</span></div>
        </div>`
        wrapper.appendChild(this.getBuyBtn())

        return wrapper
    }

    getCartTemplate () {
        const { name, price, count } = this
        const wrapper = document.createElement('div')
        wrapper.innerHTML = `
        <div class="cart_item">
            <div class="cart_name">Товар: <span>${name}</span></div> 
            <div class="cart_price">Цена: <span>${price}</span></div>
            <div class="cart_price">В корзине: <span>${count}</span> шт. на <span>${count*price}</span> руб.</div>
        </div>`
        wrapper.appendChild(this.getPlusBtn())
        wrapper.appendChild(this.getMinusBtn())

        return wrapper
    }
    
 
}

class List {
    
    items =[]

    constructor (items = []) {
        this.items = items
    }

    findGood (good) {
        return this.items.filter(item => item.name === good.name)[0]
    }

    add (item) {
        const exists = this.findGood(item)
        if (exists) {
            exists.inc()
        } 
        else {
            this.items.push(item)
            
        }
        this.render()
    }

    remove (item) {
        const exists = this.findGood(item)

        if (!exists) {
            return
        }

        if (exists.count > 1) {
            exists.dec()
        } 
        else {
            this.items = this.items.filter(good => item.name !== good.name)
            
        }
        this.render()
    }

    render() {

    }

}


class Cart extends List {

    constructor (items) {
        if (Cart._Instance) {
            return Cart._Instance
        }

        super(items)
        this.init()

        Cart._Instance = this

    }

     init () {
        const block = document.createElement('div')
        block.classList.add('cart')

        const btnCartInit = document.createElement('div')
        btnCartInit.innerHTML = `Корзина`
        btnCartInit.classList.add('cart_btnInit')

        const list = document.createElement('div')
        list.innerHTML = 'Корзина пуста'
        list.classList.add('cart_list')

        btnCartInit.addEventListener('click', () => {
            list.classList.toggle('shown')
        })

        block.appendChild(btnCartInit)

        block.appendChild(list)
        

        const placeToRender = document.querySelector('header')
        
        if (placeToRender) {
            placeToRender.appendChild(block)
        }
    }

    // getTotalPriceTemplate () {
    //     const  totalPrice = this.items.reduce((result, item) => {
    //             return result + item.price * item.counter
    //     }, 0)

    //     console.log(totalPrice)

    //     const block = document.createElement('div')
    //     block.classList.add('cart_sum')
    //     block.innerHTML = `Cтоимость корзины: ${totalPrice} руб.`

    //     return block
     
    // }

    render () {
        const placeToRender = document.querySelector('.cart_list')

        if (!placeToRender) {
            return
        } 

        placeToRender.innerHTML = ''

        this.items.forEach(item => {
            const template = item.getCartTemplate()
            placeToRender.appendChild(template)
        })

        // placeToRender.appendChild(this.getTotalPriceTemplate())
    }

}


class GoodsList extends List {

    constructor (items) {
        super(items)

        let goods = this.fetchGoods()
        goods = goods.map(cur => {
            return new GoodItem(cur)
        })
        this.items.push(...goods)

        this.render()
    }

    fetchGoods () {
        return [
            { name: '1', price: 10},
            { name: '2', price: 20},
            { name: '3', price: 30},
            { name: '4', price: 40},
            { name: '5', price: 50},
        ]
    }

    render () {
        const placeToRender = document.querySelector('.goods-list')

        if (!placeToRender) {
            return
        } 

        this.items.forEach(item => {
            const template = item.getTemplate()
            placeToRender.appendChild(template)
        })
    }
    
}

const GoodsListInstanse = new GoodsList()

const CartInstanse = new Cart()