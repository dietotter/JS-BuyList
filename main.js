$(function() {
    
    var STATISTICS_TEMPLATE = $(".product-left").html();
    var STATISTICS_LIST = $(".product-left-list");
    var STATISTICS_BOUGHT_LIST = $(".product-bought-list");
    var ITEM_TEMPLATE = $(".product-list-row").html();
    var LIST = $(".product-list");
    
    initialize();
    
    //new product input listeners`
    $("#submit-button").click(function(){
        submitInput();
    });
    
    $(document).keypress(function(e) {
        if(e.which == 13 && $(".submit-input").is(":focus")) {
            submitInput();
        }
    });
    
    //submits new product input
    function submitInput(){
        
        var input = $(".submit-input");
        var value = input.val();
        addItem(value);
        $(".submit-input").val("");
        $(".submit-input").focus();
    }
    
    //adds new product to the list
    function addItem(title){
        
        //if input line isn't empty
        if(title){
            var node = $('<div class="product-list-row"></div>').append($(ITEM_TEMPLATE));
            var statsNode = $('<div class="product-left"></div>').append($(STATISTICS_TEMPLATE));
            
            //set product name to the value of an input field
            node.find(".product-name").text(title);
            node.find(".change-product-name").val(title);
            statsNode.find(".product-left-name").text(title);
            
            //make product bought/not bought
            node.find(".product-bought").click(function(){
                if(node.hasClass("state-bought")){
                    $(node).removeClass("state-bought");
                    $(node).find(".product-bought").text("Куплено");
                    $(statsNode).remove();
                    STATISTICS_LIST.append(statsNode);
                }
                else{
                    $(node).addClass("state-bought");
                    $(node).find(".product-bought").text("Не куплено");
                    $(statsNode).remove();
                    STATISTICS_BOUGHT_LIST.append(statsNode);
                }
            });
            
            //delete product
            node.find(".product-delete").click(function(){
                $(node).remove();
                $(statsNode).remove();
            });
            
            //decrement product number and make minus button unactive if product number is 1
            node.find(".product-minus").click(function(){
                var pdtNumber = parseInt($(node).find(".product-number").text());
                pdtNumber--;
                $(node).find(".product-number").text(pdtNumber);
                $(statsNode).find(".product-left-number").text(pdtNumber);
                if(pdtNumber === 1){
                    node.find(".product-minus").addClass("not-active");
                }
            });
            
            //increment product number and make minus button active if it is unactive
            node.find(".product-plus").click(function(){
                var pdtNumber = parseInt($(node).find(".product-number").text());
                if(pdtNumber === 1){
                    node.find(".product-minus").removeClass("not-active");
                }
                pdtNumber++;
                $(node).find(".product-number").text(pdtNumber);
                $(statsNode).find(".product-left-number").text(pdtNumber);
            });
            
            //if product name is clicked, get the ability to change it (if product is not bought)
            node.find(".product-name").click(function(event){
                if(!node.hasClass("state-bought")){
                    event.stopPropagation();
                    node.find(".product-name").addClass("hidden");
                    node.find(".change-product-name").removeClass("hidden");
                    node.find(".change-product-name").focus();
                }
            });
            
            //save new product name when clicked somewhere else from product name input field
            $(document).click(function(){

                node.find(".product-name").removeClass("hidden");
                node.find(".change-product-name").addClass("hidden");

                var pnVal = node.find(".change-product-name").val();
                node.find(".product-name").text(pnVal);
                $(statsNode).find(".product-left-name").text(pnVal);
            });
            
            //add new product to the list
            LIST.append(node);
            STATISTICS_LIST.append(statsNode);
        }
    }
    
    //creates 3 starting products
    function initialize(){
        addItem("Помідори");
        addItem("Картопля з Марсу");
        addItem("Королі помідорів");
    }
});