import checkCircleSVG from '@fortawesome/fontawesome-free/svgs/solid/check-circle.svg'
import timesSVG from '@fortawesome/fontawesome-free/svgs/solid/times.svg'
import exclamationTriangleSVG from '@fortawesome/fontawesome-free/svgs/solid/exclamation-triangle.svg'
import reverseAnimationAndRemove from './reverseAnimationAndRemove'

class MyAlert {
    constructor (message, status) {
        this._message = message
        this._status = status || 'success'

        if (!this._message) throw new Error('Message cannot be empty')

        this._destroyAnotherSuccesAlert()
        this.render()
    }

    _destroyAnotherSuccesAlert () {
        document.querySelectorAll('.my-alert').forEach(alert => alert.remove())
    }

    render () {
        this._alertElement = document.createElement('div')
        this._alertElement.className = 'my-alert'
        this._alertElement.dataset.status = this._status

        this._alertElement.innerHTML = /* html */ `
            <span is='i-icon' class='alert-icon'></span>
            <p>${this._message}</p>
            <button class='close' aria-label='Tutup Pemberitahuan'>
                <span is='i-icon'>${timesSVG}</span>
            </button>
        `
        const icons = {
            success: checkCircleSVG,
            warning: exclamationTriangleSVG
        }

        this._alertElement.querySelector('.alert-icon').innerHTML = icons[this._status]
        this._alertElement.querySelector('button.close').onclick = () => this.destroy()

        document.body.appendChild(this._alertElement)
        setTimeout(() => {
            if (document.contains(this._alertElement)) this.destroy()
        }, 1750)
    }

    destroy () {
        reverseAnimationAndRemove(this._alertElement)
    }
}

export default MyAlert
