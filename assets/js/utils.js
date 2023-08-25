const sendMessageToDevs = (name, email, score_inattention, score_impulsivity, max_score) => {
    let url = "https://api.telegram.org/" +
        "bot6500671808:AAE8KwKtZmXdwq6O3oBvbLDbCMam1_MfYNU" +
        "/sendMessage?chat_id=-1001944986439&text=";

    let timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    let language = Intl.DateTimeFormat().resolvedOptions().locale;

    let text = 'Самодиагностика симптомов СДВГ %0A' +
        '👔️ ФИО: ' + name.value + '%0A' +
        '📧 Почта: ' + email.value + '%0A' +
        '🔄 Невнимательность: ' + score_inattention + ' из ' + max_score + ' баллов'+'%0A' +
        '🔄 Импульсивность: ' + score_impulsivity + ' из ' + max_score + ' баллов'+'%0A' +
        '🗺 ' + timezone + '%0A' +
        '🎓 ' + language + '%0A'

    url += text;
    let xhr = new XMLHttpRequest();
    xhr.open("POST", url);

    xhr.setRequestHeader("Accept", "application/json");
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                console.log("sent");
            } else {
                console.error("error");
            }
        }
    };
    xhr.send();
}
