$(function () {
    $('form').submit(async (e) => {
        e.preventDefault();
        const q = $('#search').val();

        var response = await fetch('/Ratings/SearchResults?query=' + q);
        var data = await response.json();
        console.log(data);

        const template = $('#template').html();
        let results = '';
        for (var item in data) {
            let row = template;
            for (var key in data[item]) {
                row = row.replaceAll('{' + key + '}', data[item][key]);
                row = row.replaceAll('%7B' + key + '%7D', data[item][key]);
            }
            results += row;
        }
        $('tbody').html(results);

    })
});