function fitSkeletonElement (elements, length) {
    const elementContainer = elements[0].parentElement
    const elementLength = elements.length

    for (let index = length; index < elementLength; index++) elementContainer.lastElementChild.remove()
    for (let index = length; index > elementLength; index--) elementContainer.appendChild(document.createElement(elements[0].tagName))

    return Array.from(elementContainer.children)
}

export default fitSkeletonElement
