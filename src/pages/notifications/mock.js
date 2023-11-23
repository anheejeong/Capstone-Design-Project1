import Highcharts from "highcharts";

var text = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Tincidunt arcu non sodales neque. Risus in hendrerit gravida rutrum quisque non tellus. Tincidunt vitae semper quis lectus nulla. Leo duis ut diam quam nulla porttitor massa. Aliquam sem fringilla ut morbi tincidunt augue. Faucibus in ornare quam viverra orci sagittis eu volutpat. Viverra suspendisse potenti nullam ac tortor vitae purus. Eget magna fermentum iaculis eu non diam. Dui accumsan sit amet nulla facilisi morbi tempus. Integer quis auctor elit sed. Et magnis dis parturient montes nascetur. Dictum non consectetur a erat nam at. Ipsum faucibus vitae aliquet nec ullamcorper sit. Vestibulum rhoncus est pellentesque elit. Laoreet suspendisse interdum consectetur libero id faucibus. Ut faucibus pulvinar elementum integer. Dictum varius duis at consectetur lorem donec massa. Pellentesque nec nam aliquam sem et tortor consequat id porta. Odio ut enim blandit volutpat maecenas volutpat. Vitae et leo duis ut diam quam nulla. Non quam lacus suspendisse faucibus interdum. Aenean vel elit scelerisque mauris pellentesque pulvinar pellentesque habitant. Leo urna molestie at elementum eu facilisis. Gravida cum sociis natoque penatibus et magnis dis parturient montes. Sit amet tellus cras adipiscing enim eu. Vel risus commodo viverra maecenas accumsan lacus vel facilisis volutpat. Id semper risus in hendrerit gravida rutrum quisque non tellus. Donec enim diam vulputate ut pharetra sit amet. Tellus integer feugiat scelerisque varius morbi enim nunc faucibus. Lacus sed viverra tellus in hac habitasse platea dictumst. Vitae justo eget magna fermentum iaculis eu non diam.";
var lines = text.split(/[,\. ]+/g);
var data = Highcharts.reduce(lines, function (arr, word) {
    var obj = Highcharts.find(arr, function (obj) {
        return obj.name === word;
    });
    if (obj) {
        obj.weight += 1;
    } else {
        arr.push({
            name: word,
            weight: 1
        });
    }
    return arr;
}, []);

export const chartData = {
    highcharts: {
        wordcloud: {
            accessibility: {
                screenReaderSection: {
                    beforeChartFormat: '<h5>{chartTitle}</h5>' +
                        '<div>{chartSubtitle}</div>' +
                        '<div>{chartLongdesc}</div>' +
                        '<div>{viewTableButton}</div>'
                }
            },
            series: [{
                type: 'wordcloud',
                data,
                name: 'Occurrences'
            }],
            title: {
                text: 'Wordcloud of Alice\'s Adventures in Wonderland',
                align: 'left'
            },
            subtitle: {
                text: 'An excerpt from chapter 1: Down the Rabbit-Hole',
                align: 'left'
            },
            tooltip: {
                headerFormat: '<span style="font-size: 16px"><b>{point.key}</b></span><br>'
            }
        },
    },
}