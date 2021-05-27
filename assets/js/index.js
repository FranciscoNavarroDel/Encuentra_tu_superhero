jQuery.fn.grafico = function() {

    var chart = new CanvasJS.Chart("chartContainer", {
        theme: "light2", // "light1", "light2", "dark1", "dark2"
        exportEnabled: true,
        animationEnabled: true,
        title: {
            text: "Desktop Browser Market Share in 2016"
        },
        data: [{
            type: "pie",
            startAngle: 25,
            toolTipContent: "<b>{label}</b>: {y}%",
            showInLegend: "true",
            legendText: "{label}",
            indexLabelFontSize: 16,
            indexLabel: "{label} - {y}%",
            dataPoints: [
                { y: 51.08, label: "Chrome" },
                { y: 27.34, label: "Internet Explorer" },
                { y: 10.62, label: "Firefox" },
                { y: 5.02, label: "Microsoft Edge" },
                { y: 4.07, label: "Safari" },
                { y: 1.22, label: "Opera" },
                { y: 0.44, label: "Others" }
            ]
        }]
    });
    chart.render();
}


jQuery.fn.extraerinfo = function() {
    var element = this;
    $.ajax({
        type: "GET",
        url: "https://superheroapi.com/api.php/10159431839884446/" + element.val(),
        dataType: "json",
        success: function(data) {
            let { powerstats, biography, appearance, work, connections, image, name } = data
            $(".imagendata").attr(`src`, `${image.url}`);
            $(".nombre").text(`Nombre: ${name}`);
            $(".conexiones").text(`Conexiones: ${connections["group-affiliation"]}`);
            $(".work").text(`ocupacion: ${work["occupation"]}`);
            $(".altura").text(`Altura: ${appearance.height[0]}, ;${appearance.height[1]}`)
            $(".peso").text(`Peso: ${appearance.weight[0]}, ${appearance.weight[1]}`);
            $(".biografia").text(`Alter-ego: ${biography["alter-egos"]} /   Primera aparicion: ${biography["first-appearance"]}`);

            powerstats.grafico()

        }
    })
};





$(document).ready(function() {
    $("form").submit(function(event) {
        event.preventDefault()
        if (Number($("#superheronumber").val())) {
            $("#superheronumber").extraerinfo();
            $("h4").text("Ingresa el número del SuperHero a buscar").css("color", "black")
        } else $("h4").text("El valor ingresado no es un número").css("color", "red");
    })
});