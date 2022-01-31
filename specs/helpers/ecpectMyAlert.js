const expectMyAlert = (message, status) => {
    const myAlertElement = document.querySelector('.my-alert')
    expect(myAlertElement).toBeTruthy()
    expect(myAlertElement.dataset.status).toEqual(status)
    expect(myAlertElement.innerText).toEqual(message)
}

export default expectMyAlert
