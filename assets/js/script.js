//  START  //

$(function () {
    reinicio()
    $("form button").click(function (event) {
        event.preventDefault()
        reinicio()
        let contenido = $("form input").val()
        //Validar Contenido
        if (validarInput(contenido) == false) {
            errorInput();  //  Mensaje de error, borrar y focus  //
            return
        }
        //indicar SUCCESS_!!
        $("#loaDing").fadeIn()
       // loading_text()
        successInput()
        consulta_Api(contenido)
        $("#loaDing").fadeOut(1500)


    })




    function validarInput(text) {
        let expression = /^[\d]{1,3}$/
        return expression.test(text)
    }

    function errorInput() {
        let errorInput = `<div class="alert alert-danger alert-dismissible fade show hide px-2 px-md-5 py-0" role="alert">
        <strong class="mx-md-5">Error !!!</strong> Solo número(s) de 1 a 3 cifras en el campo ID a buscar.
        <button type="button" class="btn-close pt-2 pb-0" data-bs-dismiss="alert" aria-label="Close"></button></div>`
        $("#InjectMessages").append(errorInput)
        $("form input").val("").focus()
    }

    function successInput() {
        let SuccessInput = `<div class="alert alert-success alert-dismissible fade show hide px-2 px-md-5 py-0" role="alert">
        <strong class="mx-md-5">Success !!!</strong> ID ingresado de manera Correcta.
        <button type="button" class="btn-close pt-2 pb-0" data-bs-dismiss="alert" aria-label="Close"></button></div>`
        $("#InjectMessages").append(SuccessInput)
        //$("form input").val("").focus()
    }

//    function loading_text() {
//        $("#loaDing").text("L o a d i n g . . .")
//    }

    function consulta_Api(id) {

        $.ajax({
            type: "GET",
            url: `https://superheroapi.com/api.php/1602241526817525/${id}`,
            success: (response) => {
                console.log(response)

                let dataDraw = {
                    name: response.name,
                    img: response.image.url,
                    conex: response.connections['group-affiliation'], //  Grupo Afiliado      
                    publish: response.biography.publisher,
                    work: response.work.occupation,
                    firstAp: response.biography['first-appearance'],
                    height: response.appearance.height,
                    weight: response.appearance.weight,
                    aliases: response.biography.aliases,
                }

                console.log(dataDraw)
                hero_Card(dataDraw)
            },

            error: () => {
                alert("Respuesta ERROR from API")
            },
        })
    }


    function hero_Card(data_Json) {
        $("#insertImage").append(`<img src="${data_Json.img}" class="py-sm-5 py-md-0 px-4 px-sm-0" alt="" width="80%">`)
        let text = `
        <h5><span>Nombre: ${data_Json.name}</span></h5>
        <p class="formatP" ><span class="textCard">Conexiones: ${data_Json.conex}</span></p>
        <p class="formatP" ><span class="textCard">Publicado por: ${data_Json.publish}</span></p>
        <p class="formatP" ><span class="textCard">Ocupación: ${data_Json.work}</span></p>
        <p class="formatP" ><span class="textCard">Primera Aparición: ${data_Json.firstAp}</span></p>
        <p class="formatP" ><span class="textCard">Altura: ${data_Json.height}</span></p>
        <p class="formatP" ><span class="textCard">Peso: ${data_Json.weight}</span></p>
        <p class="formatP" ><span class="textCard">Alias: ${data_Json.aliases}</span></p>`
        $("#insertText").append(text)
    }

    function reinicio(){
        $("#InjectMessages").empty()
        $("#loaDing").fadeOut("fast")
        $("#insertImage").empty()
        $("#insertText").empty()
    }


})
//  END  //