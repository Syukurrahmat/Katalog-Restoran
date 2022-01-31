const reverseAnimationAndRemove = element => {
    const { animation, animationDirection, animationFillMode, animationDuration } = getComputedStyle(element)
    const reversed = animation.replace(animationDirection, 'reverse').replace(animationFillMode, 'both')

    element.style.animation = 'none'
    // eslint-disable-next-line no-unused-expressions
    element.offsetHeight
    element.style.animation = reversed

    setTimeout(() => element.remove(), Number(animationDuration.slice(0, -1)) * 1000)
}

export default reverseAnimationAndRemove
