// ==UserScript==
// @name         LinkedIn - Auto Ativar Modo Escuro (com retorno inteligente)
// @namespace    https://www.linkedin.com/
// @version      1.6
// @description  Ativa o modo escuro automaticamente e retorna à URL original, mesmo ao seguir links externos como do Gmail.
// @author       Naldo
// @match        https://www.linkedin.com/*
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    const DARKMODE_FLAG = "darkModeActivated";
    const RETURN_URL_KEY = "linkedinReturnUrl";

    const isDarkModePage = window.location.href.includes("/mypreferences/d/dark-mode");
    const isLoginPage = window.location.href.includes("/uas/login?session_redirect=");

    // Impede a execução do script na página de login
    if (isLoginPage) {
        return;
    }

    // Caso 1: Vindo de fora e ainda não ativou o modo escuro
    if (!sessionStorage.getItem(DARKMODE_FLAG) && !isDarkModePage) {
        // Salva a URL atual completa, caso não tenha sido salva
        if (!localStorage.getItem(RETURN_URL_KEY)) {
            localStorage.setItem(RETURN_URL_KEY, window.location.href);
        }
        window.location.href = "https://www.linkedin.com/mypreferences/d/dark-mode";
        return;
    }

    // Caso 2: Já estamos na página de dark mode e ainda não ativamos
    if (isDarkModePage && !sessionStorage.getItem(DARKMODE_FLAG)) {
        const waitForDarkModeInput = setInterval(() => {
            const darkModeRadio = document.querySelector('input#theme__dark');

            if (darkModeRadio) {
                clearInterval(waitForDarkModeInput);

                if (!darkModeRadio.checked) {
                    darkModeRadio.click();
                    darkModeRadio.dispatchEvent(new Event('change', { bubbles: true }));
                    console.log("💡 Modo escuro ativado.");
                } else {
                    console.log("🔘 Modo escuro já estava ativado.");
                }

                sessionStorage.setItem(DARKMODE_FLAG, "true");

                // Recupera a URL original
                const returnUrl = localStorage.getItem(RETURN_URL_KEY);
                localStorage.removeItem(RETURN_URL_KEY);

                if (returnUrl) {
                    // Espera um pouco e volta
                    setTimeout(() => {
                        window.location.href = returnUrl;
                    }, 1000);
                }
            }
        }, 300);
    }
})();
