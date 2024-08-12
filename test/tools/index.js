async function deleteCookies({ page }) {
  const cookies = await page.cookies();
  cookies.forEach((cookie) => {
    page.deleteCookie(cookie);
  });
}

module.exports = {
  deleteCookies,
};
