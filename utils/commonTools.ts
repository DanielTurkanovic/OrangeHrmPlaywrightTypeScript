export async function highlightClick(page: any, locator: string) {
    const element = page.locator(locator);
  
    // Add a red box before clicking
    await element.evaluate((el: any) => {
      el.style.border = '3px solid red';
      el.style.transition = 'border 0.3s ease';
    });
  
    // Let's restore the original look
    await element.evaluate((el: any) => {
      el.style.border = '';
    });
  }
  