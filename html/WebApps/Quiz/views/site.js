$(document).ready(function () {
    $.get("http://localhost:8080/MVCProject/quiz/",
        function (data, status, json) {
            let div = $('<div>'); 
            for (let i = 0; i < data.length; i++) {
                let a = $('<a>'); 
                a.attr('', data[i].id); 
                a.attr('onclick', 'renderQuestions()');
                a.text(data[i].name); 
                div.append(a).append('<br>'); 
            }
            $('#content').append(div);
        });
});

function renderQuestions() {
    $.get('http://localhost:8080/MVCProject/quiz/' + id + '/questions'),
        function (data, status, json) {

            var quiz = $.get('http://localhost:8080/MVCProject/quiz/' + id, function (data, status, json) {
                return data; 
            });

            let $div = $('<div>'); 
            let h4 = $('<h4>'); 
            h4.text(name); 
            let ul = $('<ul>'); 
            ul.attr('class', 'list-group'); 
            for (var i = 0; i < data.length; i++){
                let li = $('<li>'); 
                li.attr('class', 'list-group-item'); 
                li.text(data[i].text); 
                ul.append(li); 
            }
            div.append(h4); 
            div.append(ul); 
            $('body').append($div); 
    }    
}
