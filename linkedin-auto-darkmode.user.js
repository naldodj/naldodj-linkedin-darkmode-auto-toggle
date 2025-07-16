// ==UserScript==
// @name         LinkedIn - Auto Ativar Modo Escuro (com retorno inteligente)
// @namespace    https://www.linkedin.com/
// @version      1.7
// @description  Ativa o modo escuro automaticamente e retorna à URL original, evitando loops em autenticação de dois fatores.
// @author       Naldo
// @match        https://www.linkedin.com/*
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    const DARKMODE_FLAG = "darkModeActivated";
    const RETURN_URL_KEY = "linkedinReturnUrl";

    const isDarkModePage = window.location.href.includes("/mypreferences/d/dark-mode");
    const isAuthPage = window.location.href.includes("/uas/login") || 
                       window.location.href.includes("/checkpoint/lg/") || 
                       window.location.href.includes("/checkpoint/challenge/");

    // Impede a execução do script em páginas de login ou autenticação em dois fatores
    if (isAuthPage) {
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

                if (returnUrl && !returnUrl.includes("/checkpoint/")) {
                    // Espera um pouco e volta, evitando redirecionar para páginas de autenticação
                    setTimeout(() => {
                        window.location.href = returnUrl;
                    }, 1000);
                }
            }
        }, 300);
    }
})();
