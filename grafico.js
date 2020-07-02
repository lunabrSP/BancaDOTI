let labels1 = ['YES', 'NO'];
let data1 = [69,31];
let colors1 = ['#49A9EA','#36CAAB'];

let myChart1 = document.getElementById("myChart").getContext('2d');

let chart1 = new Chart (myChart1, {
    type: 'doughnut',
    data: {
        labels: labels1,
        datasets: [ {
            data: data1,
            backgroudColor: colors1
        }]
    },
    options: {
        title: {
            text: "Vc gosta de pizza?",
            display: true
        }
    }
    
});