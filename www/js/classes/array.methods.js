Object.assign(Array.prototype, {

  // Add a render method to the Array class
  // that calls render (in Base) for each item
  // and also collects and returns the temp html divs
  // (see Base)

  render(selector = '', templateNo = '') {

    let html = '';

    for (let item of this) {
      html += item.render(selector, templateNo);
    }

    return html;

  },

  export(){
    let arr = [];
    for (let item of this){
      arr.push(item.export());
    }

    return arr;
  }

});