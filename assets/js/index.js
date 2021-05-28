jQuery.fn.extraerinfo = function() {
    var element = this;
    $.ajax({
        type: "GET",
        url: "https://superheroapi.com/api.php/10159431839884446/" + element.val(),
        dataType: "json",
        success: function(data) {
            let { response, error } = data



            if (response == "success") {

                let {
                    powerstats,
                    work: { occupation: ocupacion },
                    connections: { "group-affiliation": conexiones },
                    image,
                    name
                } = data;
                let { biography: { publisher: publicado, "first-appearance": aparicion, "alter-egos": alterego, aliases: aliases } } = data
                let { appearance: { height: altura, weight: peso } } = data
                let { combat, durability, intelligence, power, speed, strength } = powerstats

                let status = [combat, durability, intelligence, power, speed, strength]
                $(".encontrado").text("SuperHero Encontrado")
                $(".imagendata").attr(`src`, `${image.url}`);
                $(".nombre").text(`Nombre: ${name}`);
                $(".conexiones").text(`Conexiones: ${conexiones}`);
                $(".publicado").text(`Publicado por: ${publicado}`)
                $(".work").text(`Ocupacion: ${ocupacion}`);
                $(".primera_aparicion").text(`Primera aparicion: ${aparicion}`)
                $(".altura").text(`Altura: ${altura[0]}, ;${altura[1]}`)
                $(".peso").text(`Peso: ${peso[0]}, ${peso[1]}`);
                $(".biografia").text(`Alter-ego: ${alterego}`);

                let aliados = ""
                aliados += aliases.map((aliado) => aliado);
                $(".alianzas").text(`Alianzas: ${aliados}`);

                status.map((element, index) => {
                    if (element == "null") status[index] = 0
                })

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
                        dataPoints: [
                            { y: status[0], label: "Combat" },
                            { y: status[1], label: "Durability" },
                            { y: status[2], label: "Intelligence" },
                            { y: status[3], label: "Power" },
                            { y: status[4], label: "Speed" },
                            { y: status[5], label: "Strength" }
                        ]
                    }]
                });
                chart.render();

            } else {
                alert(error)
                $(".imagen_desplegable").hide();

            }
        },
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
            $("#superheronumber").extraerinfo();
            $("h4").text("Ingresa el número del SuperHero a buscar").css("color", "black")
            $(".imagen_desplegable").slideDown(3000);
            $(".superheroinfo").show()
        } else if (Number($("#superheronumber").val()) == 0) {
            $("h4").text("El valor ingresado debe ser mayor a 0").css("color", "red");
            $(".imagen_desplegable").hide(1000)
            $(".encontrado").text("")
            $(".superheroinfo").hide(1000)
        } else {
            $("h4").text("El valor ingresado no es un número").css("color", "red");
            $(".imagen_desplegable").hide(1000)
            $(".encontrado").text("")
            $(".superheroinfo").hide(1000)
        };
    })
});