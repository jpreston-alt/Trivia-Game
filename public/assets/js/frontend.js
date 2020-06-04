$(document).ready(function () {

    init();

    function init() {
        $.ajax({
            method: "GET",
            url: "https://opentdb.com/api_category.php"
        }).then(data => {
            
            data.trivia_categories.forEach(el => {
                let option = $("<option>");
                option.text(`${el.name}`);
                $("#choose-category-dropdown").append(option);
            });

        });
    };

});