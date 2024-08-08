async function deleteCookies({ page }) {
    const cookies = await page.cookies()
    console.log(cookies)
    cookies.forEach(cookie => {
        console.log('cookie', cookie)
        page.deleteCookie(cookie)
    })
}

module.exports = {
    deleteCookies
}