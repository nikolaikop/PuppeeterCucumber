const { clickElement, getText } = require('./lib/commands');
const daysWeek = require('./daysIndex');

const seats = require('./seatIndex');

let page;

beforeEach(async () => {
  page = await browser.newPage();
  await page.setDefaultNavigationTimeout(60000);
});

afterEach(() => {
  page.close();
});

describe('Ticket booking', () => {
  beforeEach(async () => {
    page = await browser.newPage();
    await page.goto('http://qamid.tmweb.ru/client/index.php', {
      timeout: 60000,
    });
  });

  test('should book 2 seats', async () => {
    await clickElement(page, daysWeek.thirdDay);
    await clickElement(page, daysWeek.morningMovie);
    await page.waitForSelector('h1');
    await clickElement(page, seats.seat4Row2);
    await clickElement(page, seats.seat3Row5);
    await clickElement(page, 'button');
    await page.waitForSelector('h1');
    const actual = await getText(
      page,
      'main > section > div > p:nth-child(2) > span',
      text => text.textContent,
    );
    const expected = '2/4, 5/3';
    const actualPrise = await getText(
      page,
      'main > section > div > p:nth-child(6) > span',
      text => text.textContent,
    );
    const expectedPrise = '200';
    expect(actual).toContain(expected);
    expect(actualPrise).toContain(expectedPrise);
  }, 60000);

  // test('should book a VIP seat', async () => {
  //   await clickElement(page, daysWeek.secondDay);
  //   await clickElement(page, daysWeek.eveningMovie);
  //   await page.waitForSelector('h1');
  //   await clickElement(page, seats.vipSeatRow1);
  //   await clickElement(page, 'button');
  //   await page.waitForSelector('h1');
  //   const actual = await getText(
  //     page,
  //     'main > section > div > p:nth-child(2) > span',
  //     text => text.textContent,
  //   );
  //   const expected = '1/2';
  //   const actualPrise = await getText(
  //     page,
  //     'main > section > div > p:nth-child(6) > span',
  //     text => text.textContent,
  //   );
  //   const expectedPrise = '350';
  //   expect(actual).toContain(expected);
  //   expect(actualPrise).toContain(expectedPrise);
  // }, 60000);

//   test('Should check if the seat is booked', async () => {
//     await clickElement(page, daysWeek.secondDay);
//     await clickElement(page, daysWeek.eveningMovie);
//     await page.waitForSelector('h1');

//     const isDisabled = await page.$eval('button', button => {
//       return button.disabled;
//     });
//     expect(isDisabled).toEqual(true);
//   });

//   test('should not book', async () => {
//     await clickElement(page, daysWeek.secondDay);
//     await clickElement(page, daysWeek.dayMovie);
//     await page.waitForSelector('h1');
//     await clickElement(page, seats.seat8Row1);
//     const actual = await getText(page, 'h2', text => text.textContent);
//     const expected = 'Фильм 1';
//     expect(actual).toContain(expected);
//   }, 60000);
});
