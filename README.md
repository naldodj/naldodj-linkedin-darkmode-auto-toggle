# LinkedIn Dark Mode Auto Toggle 🔄🌙

Automatize a ativação do modo escuro no LinkedIn usando Tampermonkey!

Se o seu navegador (como o Microsoft Edge) está configurado para limpar cookies e dados locais ao fechar, o LinkedIn pode esquecer sua preferência de tema escuro. Este pequeno script resolve esse problema com uma automação simples e eficiente.

---

## 🚀 Funcionalidades

✅ Redireciona automaticamente para a página de preferências de tema do LinkedIn  
✅ Ativa o modo escuro ("Sempre ativado") se ainda não estiver ativado  
✅ Retorna para o feed automaticamente após a configuração  
✅ Usa `sessionStorage` para evitar loops infinitos

---

## 🧩 Requisitos

- Navegador compatível com extensões de usuários (como Chrome, Edge ou Firefox)
- [Tampermonkey](https://www.tampermonkey.net/) instalado

---

## 🛠️ Instalação

1. Instale o [Tampermonkey](https://www.tampermonkey.net/) no seu navegador.
2. [Clique aqui para instalar o script](https://github.com/naldodj/naldodj-linkedin-darkmode-auto-toggle/blob/main/linkedin-auto-darkmode.user.js)  
   *(ou baixe manualmente e abra no navegador para o Tampermonkey importar)*
3. Acesse o LinkedIn normalmente — o script fará o resto por você ✅

---

## 📄 Código do Script

O script pode ser encontrado em [`linkedin-auto-darkmode.user.js`](./linkedin-auto-darkmode.user.js).  
Ele funciona escutando o DOM, ativando o tema e evitando repetições com `sessionStorage`.

---

## 🧠 Como funciona

1. Ao abrir o LinkedIn, ele verifica se o modo escuro já foi ativado na sessão atual.
2. Se não foi:
   - Redireciona para `https://www.linkedin.com/mypreferences/d/dark-mode`
   - Ativa o input correspondente ao tema escuro
   - Aguarda 1 segundo e retorna para o feed

---

## 📸 Capturas de Tela

![image](https://github.com/user-attachments/assets/ec1a97c9-cc3c-4d77-b3fd-47f0c9c02800)


---

## ✨ Autor

Desenvolvido por [@NaldoDJ](https://github.com/naldodj)  
Curte automações? Me segue no [LinkedIn](https://www.linkedin.com/in/marinaldo-de-jesus-66392346/) também!

---

## 📝 Licença

Este projeto está licenciado sob a [Apache](./LICENSE).

---

