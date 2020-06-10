$(document).ready(function () {

    // elements 
    const $playBtn = $("#play-btn");
    const $questionCont = $("#question-container");
    const $chooseInput = $("#choose-input-group");
    const $radioCont = $(".radio-container");
    
    let queryURL;

    init();

    // event handlers
    $playBtn.on("click", clickPlayBtn);


    function clickPlayBtn(event) {
        event.preventDefault();
        
        const $categoryID = $("#category-dropdown option:selected").data("id");
        const $difficulty = $("#difficulty-dropdown option:selected").val().toLowerCase();

        if ($categoryID != "default-drop" && $difficulty != "Select a Difficulty") {
            queryURL = `https://opentdb.com/api.php?amount=10&category=${$categoryID}&difficulty=${$difficulty}&type=multiple`
            // console.log(queryURL);

            $chooseInput.addClass("display-none");
            getQuestions();
        };
    };

    function getQuestions() {
        $.ajax({
            method: "GET",
            url: queryURL
        }).then(data => {
            console.log(data);
            $questionCont.removeClass("display-none");
            let question = data.results[0].question;
            let corrAns = data.results[0].correct_answer;
            let incAns = data.results[0].incorrect_answers;
            let ansArr = [corrAns, incAns[0], incAns[1], incAns[2]];

            $("#question").text(question);
            renderRadios(ansArr);


        })
    };

    // function renderQuestion(questions) {


    // };

    function renderRadios (arr) {

        for (var i = 0; i < arr.length; i++) {
            let radio =
                `<div class="form-check">
                    <input class="form-check-input" type="radio" value="${arr[i]}">
                    <label class="form-check-label">
                        ${arr[i]}
                    </label>
                </div>`

            $radioCont.append(radio);
        };


    };

    function init() {
        $.ajax({
            method: "GET",
            url: "https://opentdb.com/api_category.php"
        }).then(data => {
            
            data.trivia_categories.forEach(el => {
                let option = $("<option>");
                option.attr("data-id", el.id);
                option.text(`${el.name}`);
                $("#category-dropdown").append(option);
            });

        });
    };


});