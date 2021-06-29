const fs = require('fs')
const JSSoup = require('jssoup').default;

const file = fs.readFileSync('./plushies.html', 'utf-8');

const soup = new JSSoup(file)

class PlushieSet {
  constructor(soup) {
    this.soup = soup;
  }

  getSetPrice() {
    const items = this.getItemsFromSoup();
    const itemsText = this.filterText(items);
    const noDongItems = this.eliminateDongs(itemsText);
    const setPrice = this.sumPrices(noDongItems);
    console.log(setPrice.toLocaleString('en-US'))
    return setPrice;
  }
  
  getItemsFromSoup() {
    return this.soup.findAll('div', 'title')
  }
  
  filterText(soupItemsArray) {
    return soupItemsArray.map(item => {
      return item.getText(';')
    });
  }
  
  eliminateDongs(items) {
    return items.filter(item => !item.includes('Dong'))
  }
  
  sumPrices(items) {
    return items.reduce((acc, item) => {
      const arr = item.replace('$', '').replace(',', '').split(';');
      return acc += parseInt(arr[1])
    }, 0)
  } 
}

new PlushieSet(soup).getSetPrice()