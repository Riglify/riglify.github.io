// GOOGLE TRANSLATE SCRIPT - COPYRIGHT 2026 BY NOTHINGBUTTYLER. ALL RIGHTS RESERVED. \\

/* MAIN */

function googleTranslateElementInit() {

    new google.translate.TranslateElement({

        pageLanguage: 'en',
        includedLanguages: 'en,pt,fil,uk,id',
        autoDisplay: false

    }, 'google_translate_element');

}


function toggleRiglifyTranslate() {

    const panel =
        document.getElementById("riglify-translate-panel");

    if (!panel) return;

    panel.classList.toggle("translate-panel-open");

}


function closeRiglifyTranslate() {

    const panel =
        document.getElementById("riglify-translate-panel");

    if (!panel) return;

    panel.classList.remove("translate-panel-open");

}


function closeTranslationLoading() {

    const loading =
        document.getElementById("riglify-translation-loading");

    if (!loading) return;

    loading.classList.remove("translation-loading-visible");

}


function closeTranslationNotification() {

    const notification =
        document.getElementById(
            "riglify-translation-notification"
        );

    if (!notification) return;

    notification.classList.remove(
        "translation-notification-visible"
    );

}


function translateRiglify(language) {

    const loading =
        document.getElementById(
            "riglify-translation-loading"
        );

    const panel =
        document.getElementById(
            "riglify-translate-panel"
        );

    const notification =
        document.getElementById(
            "riglify-translation-notification"
        );

    const translatedText =
        document.getElementById(
            "translated-success-text"
        );


    /*
       Close the language menu.
    */

    if (panel) {
        panel.classList.remove(
            "translate-panel-open"
        );
    }


    /*
       English doesn't need a translation popup.
    */

    if (language === "en") {

        performGoogleTranslation("en");

        showTranslationNotification(
            "Successfully translated!",
            ""
        );

        return;
    }


    /*
       Show translating animation.
    */

    if (loading) {

        loading.classList.add(
            "translation-loading-visible"
        );

    }


    /*
       Wait a moment so the popup animation
       is actually visible.
    */

    setTimeout(() => {

        performGoogleTranslation(language);

    }, 500);


    /*
       Show success after translation starts.
    */

    setTimeout(() => {

        if (loading) {

            loading.classList.remove(
                "translation-loading-visible"
            );

        }


        const translations = {

            pt: "Tradução realizada com sucesso!",

            fil: "Matagumpay na naisalin!",

            uk: "Успішно перекладено!",

            id: "Berhasil diterjemahkan!"

        };


        showTranslationNotification(

            "Successfully translated!",

            translations[language] || ""

        );

    }, 1800);

}


function performGoogleTranslation(language) {

    const select =
        document.querySelector(
            ".goog-te-combo"
        );

    if (!select) {

        console.warn(
            "Google Translate is not loaded yet."
        );

        return;

    }


    select.value = language;

    select.dispatchEvent(
        new Event("change")
    );

}


function showTranslationNotification(
    englishText,
    translatedText
) {

    const notification =
        document.getElementById(
            "riglify-translation-notification"
        );

    const translated =
        document.getElementById(
            "translated-success-text"
        );


    if (!notification) return;


    if (translated) {

        translated.textContent =
            translatedText || "";

    }


    notification.classList.add(
        "translation-notification-visible"
    );


    /*
       Automatically disappear after 5 seconds.
    */

    setTimeout(() => {

        closeTranslationNotification();

    }, 5000);

      }

      /* HIDE GOOGLE TRANSLATE POPUP */

function removeGoogleTranslateUI() {

    document.body.style.top = "0px";
    document.documentElement.style.marginTop = "0px";

    const banner = document.querySelector(
        ".goog-te-banner-frame"
    );

    if (banner) {
        banner.style.display = "none";
    }

    const balloon = document.querySelector(
        ".goog-te-balloon-frame"
    );

    if (balloon) {
        balloon.style.display = "none";
    }
}

setInterval(removeGoogleTranslateUI, 500);

document.addEventListener(
    "DOMContentLoaded",
    removeGoogleTranslateUI
);


