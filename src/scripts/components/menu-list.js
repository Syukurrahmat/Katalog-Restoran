import fitSkeletonElement from '../utils/fit-skeleton-element'
import Loading from '../utils/loading'

class MenuList extends HTMLElement {
    connectedCallback () {
        this._group = this.getAttribute('group')
        this._groupInd = this._group === 'foods' ? 'Makanan' : this._group === 'drinks' ? 'Minuman' : null
        this.removeAttribute('group')

        this.render()
    }

    render () {
        this.innerHTML = /* html */ `
            <b class='title-group'>ligula eget dolor</b>
            <hr>
            <ul class='list'>
               <li>ligula eget dolor</li>
               <li>ligula eget dolor eget dolor</li>
               <li>ligula eget ligula dolor ligula</li>
               <li>ligula eget dolor eget dolor</li>
            </ul>
        `
        this._loading = new Loading({
            element: this,
            otherSelector: 'li'
        })
    }

    set data (data) {
        this._data = data.map(menuObject => menuObject.name)
        this.applyData()
    }

    get data () {
        return this._data
    }

    set group (groups) {
        this._group = groups
    }

    get group () {
        return this._group
    }

    applyData () {
        this.querySelector('.title-group').innerHTML = this._groupInd
        const listSkeletons = this.querySelector('.list').children

        const lists = fitSkeletonElement(listSkeletons, this._data.length)

        lists.forEach((list, index) => {
            list.innerHTML = this.data[index]
        })

        this._loading.clear()
    }
}
customElements.define('menu-list', MenuList)
