


describe('Get Quotation Functionality', function() {
    
    it('should choose type and enter zipcode', () => {
        browser.waitForAngularEnabled(false);
        browser.get("https://www.americannational.com");
       
       element.all(by.xpath('//*[@id="LOB-select"]/option')).get(2).click();
        $('.input-group #quote-zip').sendKeys("77041");

        $('.input-group-btn #quote-submit').click();
        browser.sleep(4000);

        browser.getAllWindowHandles() .then((handles) => {
            console.log(handles)
            browser.switchTo().window(handles[1]);
            browser.getTitle().then((result) => {
                console.log(result);

            }).catch((err) => {
                console.log("coudn't get guids");

            });
            browser.sleep(4000);

            $('#datepicker').click();

            //table function
          rowColumn=function(row,column){
                var a=element(by.css("tbody>tr:nth-child("+row+")>td:nth-child("+column+")"));
                return a;
            }
            rowColumn(3,5).click();
            browser.sleep(2000);

            //dropdown function
            $('#Address_State').click();
            stateDropdown=function(locator,text){
                var i=element.all(by.css(locator));
                return i.all(by.cssContainingText("option",text));
            }
            stateDropdown('#Address_State>option','Texas').click() .then((result) => {
                console.log("texas selected")

            })
    
            })

    });








});
    