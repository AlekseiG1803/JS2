class List {
    items = []

    constructor () {
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
        this.items.forEach(good => {
            good.render()
        })
    }

}

class GoodItem {
    name = ' '
    price = 0
    counter = 0
    inCart = false

    constructor ({ name, price }) {
        this.name = name
        this.price = price
    }

    onBtnBuyClicked () {
        this.inCart = true
        this.counter = this.counter + 1
        this.render()

    }

    createButtonBuy () {
        const btnBuy = document.createElement('a')
        btnBuy.classList.add('btnBuy')
        btnBuy.innerHTML = 'В корзину!'

        btnBuy.addEventListener('click', this.onBtnBuyClicked.bind(this))

        return btnBuy
    }

    onBtnPlusClicked () {
        this.counter = this.counter + 1
        this.render()
    }

    createButtonPlus () {
        const btnPlus = document.createElement('a')
        btnPlus.classList.add('btnPlus')
        btnPlus.innerHTML = '+'

        btnPlus.addEventListener('click', this.onBtnPlusClicked.bind(this))

        return btnPlus
    }

    onBtnMinusClicked () {
        if (this.counter > 1){
            this.counter = this.counter - 1
            this.render()
        } else {
            this.inCart = false
        }
     
    }

    createButtonMinus () {
        const btnMinus = document.createElement('a')
        btnMinus.classList.add('btnMinus')
        btnMinus.innerHTML = '-'

        btnMinus.addEventListener('click', this.onBtnMinusClicked.bind(this))

        return btnMinus
    }



    render () {

        let itemName = document.createElement('div')
        let itemPrice = document.createElement('div')
        let itemCounter = document.createElement('div') 
        let itemBtnBuy = document.createElement('a')
        let itemBtnPlus = document.createElement('a')
        let itemBtnMinus = document.createElement('a')

        itemName.innerText = `Товар: ${this.name}`
        itemPrice.innerText = `Цена: ${this.price}`
        itemCounter.innerText = `В корзине ${this.counter} шт.`
        itemBtnBuy = this.createButtonBuy()
        itemBtnPlus = this.createButtonPlus()
        itemBtnMinus = this.createButtonMinus()

        itemName.classList.add('GoodsName')
        itemPrice.classList.add('GoodsPrice')
        itemCounter.classList.add('GoodsCounter')
        itemBtnBuy.classList.add('btnBuy')
        itemBtnPlus.classList.add('btnBuy')
        itemBtnMinus.classList.add('btnBuy')

        if (!this.inCart) {
            const placeToRender = document.querySelector('.goods-list')

            if (placeToRender) {

                placeToRender.appendChild(itemName)
                placeToRender.appendChild(itemPrice)
                placeToRender.appendChild(itemCounter)
                placeToRender.appendChild(itemBtnBuy)

            }
        } else {
            const placeToRender = document.querySelector('.cart')

            if (placeToRender) {

                placeToRender.appendChild(itemName)
                placeToRender.appendChild(itemPrice)
                placeToRender.appendChild(itemCounter)
                placeToRender.appendChild(itemBtnPlus)
                placeToRender.appendChild(itemBtnMinus)

            }
        }
    }
}



const ListInstance = new List()
