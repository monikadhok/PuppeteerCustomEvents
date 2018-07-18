#!/usr/bin/env node
const puppeteer = require('puppeteer');

( async ()=>{
    const browser = await puppeteer.launch({ headless: false, args: ['--start-maximized']});
    const page = await browser.newPage();
    await page.setViewport({ width: 1920, height: 1040 });
   
    //await pageLoader(page, parsedConfig);

    var wholeStatus = "";

    // page.on('metrics', ({title, metrics}) => {
    //     if(title == "onButtonClick"){
    //         wholeStatus = wholeStatus + title;
    //     }
    //     console.log("The whole status is : " + wholeStatus);
    // })

    // console.log("The whole status is : " + wholeStatus);

    
    //Learnings (page.evaluate)
    
    
    let name = 'jack';
    let age  = 33;
    let location = 'Berlin/Germany';

    await page.evaluate(({name, age, location}) => {

        console.log(name);
        console.log(age);
        console.log(location);

    },{name, age, location});
    
      // Define a window.onCustomEvent function on the page.
    await page.exposeFunction('onCustomEvent', e => {
        console.log(`${e.type} fired`, e.detail || '');
    });

      /**
   * Attach an event listener to page to capture a custom event on page load/navigation.
   * @param {string} type Event name.
   * @return {!Promise}
   */
    function listenFor(type) {
        return page.evaluateOnNewDocument(type => {
            document.addEventListener(type, e => {
                window.onCustomEvent({type, detail: e.detail});
            });
        }, type);
    }

  await listenFor('app-ready'); // Listen for "app-ready" custom event on page load.
  await page.goto('file:///C:/Users/modhok/Desktop/project/index.html', { waitUntil : ['load', 'domcontentloaded']});
})();
