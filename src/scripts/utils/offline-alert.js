import exclamationTriangleSVG from '@fortawesome/fontawesome-free/svgs/solid/exclamation-triangle.svg'
import reverseAnimationAndRemove from './reverseAnimationAndRemove'

class OfflineAlert {
    constructor (message, showButton) {
        this._message = message || 'Gagal memuat data'
        this._showButton = showButton || 'refresh'

        this._removeAnotherOfflineAlert()
        this.render()
    }

    _removeAnotherOfflineAlert () {
        document.querySelectorAll('offline-alert, alert-backdrop').forEach(element => element.remove())
    }

    render () {
        this._alertBackdrop = document.createElement('div')
        this._alertElement = document.createElement('div')
        this._alertBackdrop.className = 'alert-backdrop'
        this._alertElement.className = 'offline-alert'

        this._alertElement.innerHTML = /* html */ `
            <span is='i-icon'>${exclamationTriangleSVG}</span>
            <b class='message'>${this._message}</b> 
            <p>Tampaknya Anda memiliki koneksi jaringan yang buruk</p>
            <div class='button-list flex'>
                ${this._showButton.includes('close') ? /* html */ '<button class="button button-outline close">Tutup</button>' : ''}
                ${this._showButton.includes('refresh') ? /* html */ '<button class="button button refresh">Refresh Halaman</button>' : ''}
            </div>
        `

        this._addEventListener()
        document.body.appendChild(this._alertBackdrop)
        document.body.appendChild(this._alertElement)
    }

    _addEventListener () {
        const closeButton = this._alertElement.querySelector('.close')
        const refreshButton = this._alertElement.querySelector('.refresh')
        if (closeButton) closeButton.onclick = this._alertBackdrop.onclick = () => this.destroy()
        if (refreshButton) refreshButton.onclick = () => window.location.reload()
    }

    destroy () {
        reverseAnimationAndRemove(this._alertElement)
        reverseAnimationAndRemove(this._alertBackdrop)
    }
}

export default OfflineAlert
