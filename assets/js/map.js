async function getTranslation(lang) {
    return await fetch(`locale/${lang}/translate.json?${Date.now()}`)
        .then((response) => response.json())
        .then((data) => data);
}

async function langChange(set) {
    lang = set.value;
    if (lang == "en") {
        $(".current-lang").text("English");
    } else if (lang == "hi") {
        $(".current-lang").text("Hindi");
    }

    let translations = await getTranslation(lang);
    // console.log(translations);
    $(".lang-change").each(function () {
        let key = $(this).data("lang").split("-");
        let index = translations.findIndex((item) =>
            Object.keys(item).includes(key[0])
        );

        $(this).html(translations[index][key[0]][key[1]]).text();
    });
   
}