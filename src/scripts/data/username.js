const Username = {
    setName (name) {
        name = name.trim()
        if (!name) return this.getName()
        localStorage.setItem('username', name)

        return this.getName()
    },
    getName () {
        return localStorage.getItem('username')
    }
}

export default Username
