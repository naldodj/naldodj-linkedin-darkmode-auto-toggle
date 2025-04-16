// ==UserScript==
// @name         LinkedIn - Auto Ativar Modo Escuro (com controle de sessão)
// @namespace    https://www.linkedin.com/
// @version      1.2
// @description  Ativa o modo escuro automaticamente e evita loops no LinkedIn
// @author       Naldo
// @match        https://www.linkedin.com/*
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    const DARKMODE_FLAG = "darkModeActivated";

    // Se ainda não ativamos o modo escuro nesta sessão
    if (!sessionStorage.getItem(DARKMODE_FLAG)) {
        // Se não estamos na página de dark mode, redireciona pra lá
        if (!window.location.href.includes("/mypreferences/d/dark-mode")) {
            window.location.href = "https://www.linkedin.com/mypreferences/d/dark-mode";
            return;
        }

        // Espera o input aparecer e ativa se necessário
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

                // Marca como feito para não repetir
                sessionStorage.setItem(DARKMODE_FLAG, "true");

                // Opcional: volta para a home
                setTimeout(() => {
                    window.location.href = "https://www.linkedin.com/feed/";
                }, 1000);
            }
        }, 300);
    }
})();
