//  START  //
$(function () {

    reinicio()

    $("form button").click(function (event) {
        event.preventDefault()
        reinicio()
        let contenido = $("form input").val()
        //  Validar  "Contenido"  //
        if (validarInput(contenido) == false) {
            errorInput();  //  Función:  mensaje  error,  borrar  y  focus  //
            return
        }
        //  SUCCESS_!!  -  Continuación  //
        $("#loaDing").fadeIn()
        successInput()
        consulta_Api(contenido)
        $("#loaDing").fadeOut(1500)
    })


    function reinicio(){
        $("#InjectMessages").empty()
        $("#loaDing").fadeOut("fast")
        $("#insertImage").empty()
        $("#insertText").empty()
        $("#insertChart").empty()
        $("#insertImage").removeClass("rrrr")
        $("#insertText").removeClass("yyyy")
        $("#marcoGraph").removeClass("bordeGraph")
    }


    function validarInput(text) {
        let expression = /^[\d]{1,3}$/
        if (expression.test(text) && text <= 732) {
            return true
        }
        return false
    }


    function errorInput() {
        let errorInput = `<div class="alert alert-danger alert-dismissible fade show hide px-2 px-md-5 py-0" role="alert">
        <strong class="mx-md-5">Error !!!</strong> Solo números en el campo ID a buscar (desde el 1 hasta el 732).
        <button type="button" class="btn-close pt-2 pb-0" data-bs-dismiss="alert" aria-label="Close"></button></div>`
        $("#InjectMessages").append(errorInput)
        $("form input").val("").focus()
    }


    function successInput() {
        let SuccessInput = `<div class="alert alert-success alert-dismissible fade show hide px-2 px-md-5 py-0" role="alert">
        <strong class="mx-md-5">Success !!!</strong> ID ingresado de manera Correcta.
        <button type="button" class="btn-close pt-2 pb-0" data-bs-dismiss="alert" aria-label="Close"></button></div>`
        $("#InjectMessages").append(SuccessInput)
        $("form input").val("").focus()
    }



    function consulta_Api(id) {

        $.ajax({

            type: "GET",

            url: `https://superheroapi.com/api.php/1602241526817525/${id}`,

            success: (response) => {
//              console.log(response)                                   //
                let dataDraw = {
                    id: response.id,
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

                let dataGraph = {
                    id: response.id,
                    name: response.name,
                    combat: parseInt(response.powerstats.combat) || 1,
                    durability: parseInt(response.powerstats.durability) || 2,
                    intelligence: parseInt(response.powerstats.intelligence) || 3,
                    power: parseInt(response.powerstats.power) || 4,
                    speed: parseInt(response.powerstats.speed) || 5,
                    strength: parseInt(response.powerstats.strength) || 6,
                }

                hero_Card(dataDraw)
                hero_Graph(dataGraph)
            },

            error: () => {
                alert("Respuesta ERROR from API")
            }
        })
    }


    function hero_Card(data_Json) {

        $("#insertImage").append(`<img src="${data_Json.img}" class="py-sm-5 py-md-0 px-4 px-sm-0" alt="" width="80%">`)
        $("#insertImage").addClass("rrrr")

        let text = `
        <h5 class="text-center border border-danger border-3 py-1 mx-3">Nombre: <span class="text-primary fw-bold me-5 pe-4">${data_Json.name}.</span> Id: <span class="text-danger fw-bold">${data_Json.id}.</span></h5>
        <p class="formatP" ><span class="textCard">Conexiones: ${data_Json.conex}</span></p>
        <p class="formatP" ><span class="textCard">Publicado por: ${data_Json.publish}</span></p>
        <p class="formatP" ><span class="textCard">Ocupación: ${data_Json.work}</span></p>
        <p class="formatP" ><span class="textCard">Primera Aparición: ${data_Json.firstAp}</span></p>
        <p class="formatP" ><span class="textCard">Altura: ${data_Json.height}</span></p>
        <p class="formatP" ><span class="textCard">Peso: ${data_Json.weight}</span></p>
        <p class="formatP" ><span class="textCard">Alias: ${data_Json.aliases}</span></p>`
        $("#insertText").append(text)
        $("#insertText").addClass("yyyy")
    }


//  SECCION  GRAFICO  -  CANVAS  //
    function hero_Graph(data_Json) {
        $("#marcoGraph").addClass("bordeGraph")
        let options = {
            title: {
                text: `Estadisticas de poder para ${data_Json.name}, (Id: ${data_Json.id}). `
            },
            subtitles: [{
                text: ""                            //"As of November, 2017"
            }],
            animationEnabled: true,
            data: [{
                type: "pie",
                startAngle: 31,
                toolTipContent: "<b>{label}</b>: {y}pts",
                showInLegend: "true",
                legendText: "{label}",
                indexLabelFontSize: 16,
                indexLabel: "{label} - {y}pts",

                dataPoints: [
                    { y: data_Json.combat, label: "Combate" },
                    { y: data_Json.durability, label: "Resistencia" },
                    { y: data_Json.intelligence, label: "Inteligencia" },
                    { y: data_Json.power, label: "Poder" },
                    { y: data_Json.speed, label: "Velocidad" },
                    { y: data_Json.strength, label: "Fuerza" }
                ]
                
            }]
        }
        //  DIV  destino  del  gráfico  //
        $("#insertChart").CanvasJSChart(options);
    }
    
})
//  END  //