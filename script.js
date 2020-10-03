$(document).ready(function() {

// Start your code from here
    //INIT----------------
    var temas = ["Dog", "Cat", "Horse"]

    for(var i = 0; i < temas.length; i++){
        console.log(temas[i])
        $("#animal-buttons").append(`<button class="buttonSearch"> ${temas[i]}</button>`)
    }

    //ATIONS---------
    $("#add-animal").on("click", addAnimal);
    $("#animal-buttons").on("click", ".buttonSearch", searchGiphy)
    $("body").on("click", ".animal-item", changeState)

    
    
    


    //FUNCTIONS---------

    function addAnimal(e){
        e.preventDefault()
        var input = $("#animal-input").val()
        console.log("Add Animal " + input)
        $("#animal-buttons").append(`<button class="buttonSearch"> ${input}</button>`)
    }

    function searchGiphy(e){
        e.preventDefault()
        $("#animals").empty()
        var busqueda
        busqueda = $(this).text()
        console.log("Click Search" + busqueda)

        var content = $.get("https://api.giphy.com/v1/gifs/search", {
            api_key: "ebPbVfXEB1DMaSFaFFvncDAFno0HG2Dp",
            q: busqueda,
            limit: 10,
        })
        
        content.done(function(response){
            console.log(response)
            console.log(response.data[0].images.fixed_height_still.url)
            for(var i = 0; i < response.data.length; i++){
                var imagen = $("<img>")
                imagen.attr("src", response.data[i].images.fixed_height_still.url)
                imagen.attr("data-still", response.data[i].images.fixed_height_still.url)
                imagen.attr("data-move", response.data[i].images.fixed_height.url)
                imagen.attr("data-state", "no")
                imagen.addClass("animal-item")
                var gif = $(`<div id="gif"><p>rating: ${response.data[i].rating}</p></div>`).append(imagen)
                $("#animals").append(gif)
            }
        })
    }

    function changeState(e){
        e.preventDefault()
        var state = $(this).attr("data-state")
        if(state == "no"){
            $(this).attr("src", $(this).attr("data-move"))
            $(this).attr("data-state", "si")
        }else{
            $(this).attr("src", $(this).attr("data-still"))
            $(this).attr("data-state", "no")
        }
    }

    



});
