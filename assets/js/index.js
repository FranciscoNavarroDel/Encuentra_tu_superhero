// jQuery.fn.extraerinfo es llamada desde submit del formulario
jQuery.fn.extraerinfo = function() {
    // Input usuario es lo que se extra desde el formulario
    let inputusuario = this;
    // conectamos a la api mediante ajax
    $.ajax({
        type: "GET",
        url: "https://superheroapi.com/api.php/10159431839884446/" + inputusuario.val(),
        dataType: "json",
        success: function(data) {
            // extraemos la respuesta que nos entrega la api en el response y un posible error por la id solicitada
            let { response, error } = data
            // Se realiza un if succes para ejecutar la extraccion de los datos si es que fue exitosa la respuesta de la api
            // y else en caso de que el valor devuelto por la id requerida sea error se realiza un alert indicando que el valor de la id no es valido
            if (response == "success") {
                // se descomprime la informacion requerida para el super heroe
                let { powerstats, work: { occupation: ocupacion }, connections: { "group-affiliation": conexiones }, image, name } = data;
                let { biography: { publisher: publicado, "first-appearance": aparicion, aliases: aliases } } = data
                let { appearance: { height: altura, weight: peso } } = data
                // se transpasa la informacion al DOM
                $(".encontrado").text("SuperHero Encontrado")
                $(".imagendata").attr(`src`, `${image.url}`);
                $(".nombre").text(`Nombre: ${name}`);
                $(".conexiones").text(`Conexiones: ${conexiones}`);
                $(".publicado").text(`Publicado por: ${publicado}`)
                $(".work").text(`Ocupacion: ${ocupacion}`);
                $(".primera_aparicion").text(`Primera aparicion: ${aparicion}`)
                $(".altura").text(`Altura: ${altura[0]}, ;${altura[1]}`)
                $(".peso").text(`Peso: ${peso[0]}, ${peso[1]}`);
                // usamos un metodo map para pasar de un array de aliados a un string con los aliados del heroe
                let aliados = ""
                aliados += aliases.map((aliado) => aliado);
                $(".alianzas").text(`Alianzas: ${aliados}`);

                // extraemos y comprobamos los datos que se le pasara a canvas
                // transformamos el objeto en un arreglo
                let status = Object.entries(powerstats)
                let data_status = []
                status.map((stats) => {
                    if (stats[1] == "null") {
                        stats[1] = 0
                    }
                    // pushemos los datos a data_status ordenados y transformados
                    data_status.push({ y: stats[1], label: stats[0] })
                })

                // se utiliza canvas y se setean los valores y propiedades del gráfico
                var chart = new CanvasJS.Chart("chartContainer", {
                    theme: "light1",
                    animationEnabled: true,
                    title: {
                        text: `Estadísticas de Poder para ${name}`,
                        fontSize: 20,
                        fontFamily: 'Odibee Sans'
                    },
                    legend: {
                        fontSize: 12,
                        fontFamily: 'Odibee Sans'
                    },
                    backgroundColor: "",
                    data: [{
                        type: "pie",
                        startAngle: 0,
                        toolTipContent: "<b>{label}</b>: {y}",
                        showInLegend: "true",
                        legendText: "{label}: {y}",
                        indexLabelFontSize: 12,
                        indexLabel: "{label}",
                        dataPoints: data_status
                    }]
                });
                chart.render();

            } else {
                $(".imagen_desplegable").hide();
                $(".superheroinfo").hide()
                alert(error)
            }
        },
        // se alerta del error en caso de que la api no responda
        error: function(error) {
            alert(error)
        }
    });
};

$(".imagen_desplegable").hide();
$(".superheroinfo").hide()

$(document).ready(function() {
    $("form").submit(function(event) {
        event.preventDefault()
        if (Number($("#superheronumber").val())) {
            // al obtener un numero se llama a la funcion extraerinfo que muestra al super heroe recibido desde la api
            $("#superheronumber").extraerinfo();
            $("h4").text("Ingresa el número del SuperHero a buscar").css("color", "black")
            $(".imagen_desplegable").slideDown(3000);
            $(".superheroinfo").show()
        } else if (Number($("#superheronumber").val()) == 0) {
            // en caso de ingresar el valor 0 se indica en el doom que el valor debe ser mayor a 0
            $("h4").text("El valor ingresado debe ser mayor a 0").css("color", "red");
            $(".imagen_desplegable").hide(1000)
            $(".encontrado").text("")
            $(".superheroinfo").hide(1000)
        } else {
            // se realiza la alerta en caso de que el valor no sea un número
            $("h4").text("El valor ingresado no es un número").css("color", "red");
            $(".imagen_desplegable").hide(1000)
            $(".encontrado").text("")
            $(".superheroinfo").hide(1000)
        };
    })
});