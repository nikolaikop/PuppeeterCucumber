module.exports = {
  async clickElement(page, selector) {
    try {
      await page.waitForSelector(selector);
      await page.click(selector);
    } catch (error) {
      throw new Error(`Selector ${selector} is not clickable`);
    }
  },

  async getText(page, selector) {
    try {
      await page.waitForSelector(selector);
      return await page.$eval(selector, link => link.textContent);
    } catch (error) {
      throw new Error(`Not possible to get text from ${selector} selector`);
    }
  },
};
