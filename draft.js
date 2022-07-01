router.get('api/users/current', async(req, res) => {

    const user = await restoreUser()
})