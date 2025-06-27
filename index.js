// bd //
const bdGame = { "finaltext": "", "cards": {}, "imgName": [] };

const bdStaticImg = {
    "imgsOfVictory": ["victory1.gif", "victory2.gif", "victory3.gif"],
    "imgFail": ["Fail1.gif", "Fail2.gif", "Fail3.gif", "Fail4.gif", "Fail5.gif", "Fail6.gif", "Fail7.gif"],
    "imgSuccess": ["Success1.gif", "Success2.gif", "Success3.gif", "Success4.gif", "Success5.gif", "Success6.gif", "Success7.gif", "Success8.gif", "Success9.gif", "Success10.gif"],
}

const linkAbout = document.getElementById("aboutGame");

// Tools/Utils //
function shuffleArray(arr) {
    //  Перемешивает массив на месте (МУТИРУЕТ исходный массив!).
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

function getRandomIndex(length) {
    // Возвращает случайный индекс для массива длиной length.
    return Math.floor(Math.random() * length);
}
// bd
function resetBD() {
    //Сбрасывает bdGame (МУТИРУЕТ bdGame!).
    bdGame.finaltext = "";
    bdGame.cards = {};
    bdGame.imgName = [];
}
//localStorage
function saveToLocalStorage() {
    try {
        localStorage.setItem('bdGame', JSON.stringify(bdGame));
        return true;
    } catch (e) {
        console.error('Ошибка:', e.message);
        return false;
    }
}

function loadFromLocalStorage() {
    const savedData = localStorage.getItem('bdGame');

    if (!savedData) return false;

    try {
        const parsedData = JSON.parse(savedData);
        Object.assign(bdGame, parsedData);
        return true;
    } catch (e) {
        console.error('Ошибка парсинга:', e.message);
        return false;
    }
}

function hasSavedGame() {
    return localStorage.getItem('bdGame') !== null;
}

function clearLocalStorage() {
    localStorage.removeItem('bdGame');
}
// DOM
function creatEl(elem, idEl = '', classEl = '', textContenEl = '') {
    const el = document.createElement(elem);

    if (idEl) el.id = idEl;

    if (classEl) el.classList.add(...classEl.split(' ').filter(className => className.trim()));

    if (textContenEl) el.textContent = textContenEl;

    return el
}

function clearListOfDesrImg() {
    const btnLSG = document.getElementById("btnLoadSaveGame");
    const btnSG = document.getElementById("btnStartGame");
    const btnCG = document.getElementById("btnCreateGame");
    const btnAddDescr = document.getElementById("btnAddCard");

    const listDescr = document.getElementById("descrList");
    const finalText = document.getElementById("descrTextVictory");
    listDescr.innerHTML = '';
    finalText.value = '';

    btnLSG.disabled = true;
    btnSG.disabled = true;
    if (btnSG.textContent == "Продолжить") btnSG.textContent = "Играть";

    btnCG.disabled = false;
    btnAddDescr.disabled = false;
    finalText.readOnly = false;
}

function getLiElemDescr(titleImg, descrImg, onlyReadLi) {
    const li = creatEl("li", "", "descrElem");
    const title = creatEl("p", "", "titleImg", `${titleImg} - `);
    const valueDescrText = creatEl("input", "", "descrValue");
    valueDescrText.type = "text";
    valueDescrText.readOnly = onlyReadLi;
    valueDescrText.value = descrImg;

    const buttonDel = creatEl("button", "", "deleteElemBtn");
    buttonDel.innerHTML = `
        <svg viewBox="-40 0 496 496" xmlns="http://www.w3.org/2000/svg">
        <path d="m160 40h96v32h32v-64h-160v64h32zm0 0" fill="#57a4ff"/>
        <path d="m80 488h256l40-360h-336zm186.089844-65.742188 28.261718-240.226562c1.027344-8.714844 8.921876-14.949219 17.636719-13.921875 8.714844 1.023437 14.949219 8.917969 13.921875 17.632813l-28.261718 240.226562c-1.027344 8.714844-8.921876 14.949219-17.636719 13.921875-8.714844-1.023437-14.949219-8.917969-13.921875-17.632813zm-74.089844-238.257812c0-8.835938 7.164062-16 16-16s16 7.164062 16 16v240c0 8.835938-7.164062 16-16 16s-16-7.164062-16-16zm-86.128906-16c8.058594-.003906 14.839844 6.03125 15.777344 14.03125l28.261718 240.226562c1.027344 8.714844-5.207031 16.609376-13.921875 17.632813-8.714843 1.027344-16.609375-5.207031-17.636719-13.921875l-28.261718-240.226562c-.53125-4.503907.894531-9.019532 3.910156-12.410157s7.335938-5.332031 11.871094-5.332031zm0 0" fill="#57a4ff"/>
        <g fill="#004fac">
        <path d="m408 64h-112v-56c0-4.417969-3.582031-8-8-8h-160c-4.417969 0-8 3.582031-8 8v56h-112c-4.417969 0-8 3.582031-8 8v56c0 4.417969 3.582031 8 8 8h24.839844l39.199218 352.878906c.449219 4.058594 3.878907 7.125 7.960938 7.121094h256c4.078125 0 7.503906-3.066406 7.953125-7.121094l39.246094-352.878906h24.800781c4.417969 0 8-3.582031 8-8v-56c0-4.417969-3.582031-8-8-8zm-272-48h144v48h-16v-24c0-4.417969-3.582031-8-8-8h-96c-4.417969 0-8 3.582031-8 8v24h-16zm32 48v-16h80v16zm160.800781 416h-241.601562l-38.261719-344h318.125zm71.199219-360h-384v-40h384zm0 0"/>
        <path d="m208 448c13.253906 0 24-10.746094 24-24v-240c0-13.253906-10.746094-24-24-24s-24 10.746094-24 24v240c0 13.253906 10.746094 24 24 24zm-8-264c0-4.417969 3.582031-8 8-8s8 3.582031 8 8v240c0 4.417969-3.582031 8-8 8s-8-3.582031-8-8zm0 0"/>
        <path d="m82.144531 186.6875 28.253907 240.214844c.871093 8.589844 6.300781 16.042968 14.214843 19.5 7.910157 3.453125 17.070313 2.371094 23.960938-2.828125 6.886719-5.203125 10.4375-13.714844 9.28125-22.269531l-28.253907-240.207032c-.871093-8.589844-6.300781-16.042968-14.214843-19.5-7.910157-3.453125-17.070313-2.371094-23.960938 2.828125-6.886719 5.203125-10.4375 13.714844-9.28125 22.269531zm17.832031-8c1.480469-1.710938 3.632813-2.691406 5.894532-2.6875 4.003906-.003906 7.371094 2.992188 7.832031 6.96875l28.265625 240.230469c.511719 4.328125-2.582031 8.253906-6.910156 8.765625-4.328125.511718-8.25-2.582032-8.761719-6.910156l-28.265625-240.253907c-.261719-2.238281.457031-4.480469 1.96875-6.152343zm0 0"/>
        <path d="m281.871094 448c12.113281 0 22.308594-9.066406 23.730468-21.097656l28.253907-240.222656c1.546875-13.105469-7.824219-24.980469-20.925781-26.527344-13.105469-1.546875-24.984376 7.824218-26.53125 20.925781l-28.253907 240.242187c-.796875 6.773438 1.339844 13.570313 5.875 18.667969 4.53125 5.097657 11.03125 8.011719 17.851563 8.011719zm20.425781-265.03125c.460937-3.976562 3.828125-6.972656 7.832031-6.96875 2.25 0 4.394532.964844 5.890625 2.644531 1.496094 1.679688 2.207031 3.917969 1.949219 6.15625l-28.265625 240.230469c-.460937 3.976562-3.828125 6.972656-7.832031 6.96875-2.25 0-4.394532-.964844-5.890625-2.644531-1.496094-1.679688-2.207031-3.917969-1.949219-6.15625zm0 0"/>
        </g>
        </svg>
    `;

    buttonDel.addEventListener('click', function () {
        const li = this.closest('li');

        if (!li) return;

        const imgName = li.querySelector("p").textContent.trim().replace(/ -$/, "").trim();
        bdGame.imgName = bdGame.imgName.filter(name => name !== imgName);

        li.remove();
    });

    buttonDel.disabled = onlyReadLi;

    li.append(title, valueDescrText, buttonDel);
    return li;
}

function getRandomStaticImg(categoryFolder, categotyBD, IdImg = "", classImg = "") {
    const imgVictory = creatEl("img", IdImg, classImg);
    const randomImg = getRandomIndex(categotyBD.length);
    imgVictory.src = `./static/${categoryFolder}/${categotyBD[randomImg]}`;

    return imgVictory;
}

function renderBlock(block) {
    const root = document.getElementById("root")
    if (root) {
        root.innerHTML = '';
        root.append(block);
    } else {
        throw new Error(
            "Root element with ID 'root' was not found in the document. Ensure there is a corresponding HTML element with the ID 'root' in your HTML file.",
        )
    }
}
////////////////////

// handlers //
function handlerBtnLSG() {
    const listDescr = document.getElementById("descrList");
    const finalText = document.getElementById("descrTextVictory");
    const descrImg = document.getElementById("descrImg");

    const btnCG = document.getElementById("btnCreateGame");
    const btnSG = document.getElementById("btnStartGame");
    const btnAddDescr = document.getElementById("btnAddCard");

    btnCG.disabled = true;
    btnAddDescr.disabled = true;

    btnSG.textContent = "Продолжить";
    btnSG.disabled = false;

    if ([...Object.keys(bdGame.cards)].length > 0 && listDescr.children.length > 0) {
        alert("Вы уже загрузили данные! Продожите игру!");
        return
    }

    loadFromLocalStorage();

    listDescr.innerHTML = '';

    finalText.value = '';
    finalText.readOnly = true;

    descrImg.value = '';

    [...Object.entries(bdGame.cards)]
        .filter((saveCard) => saveCard[1].isGuessed === true)
        .forEach((saveCard) => {
            const saveLi = getLiElemDescr(saveCard[0], saveCard[1].description, true);
            saveLi.style.cssText = "background-color: lightgreen !important;"
            saveLi.querySelector("input").value = "Картинка угадана!";
            listDescr.append(saveLi);
        });
}

function handlerBtnCG() {
    const btnSG = document.getElementById("btnStartGame");
    const btnLSG = document.getElementById("btnLoadSaveGame");

    const finalText = document.getElementById("descrTextVictory");
    const liElements = [...document.getElementById("descrList").children];

    const msgId = "minCardsWarning";

    function delErrortext() {
        const el = document.getElementById(msgId);
        if (el) el.remove();
    }
    // Показывает ошибку под текущей кнопкой, исчезает через 3 секунды
    function handlerErrorText(textError) {
        delErrortext();

        const warningMsg = creatEl("span", msgId, "minCardsWarningError", textError);

        this.after(warningMsg);

        setTimeout(delErrortext, 3000);
        return
    }

    if (!finalText.value.trim()) {
        finalText.classList.add("error");
        handlerErrorText.call(this, "Введи фразу для поощерения/поздравления!");
        return
    }

    delErrortext();

    if (liElements.length < 5) {
        handlerErrorText.call(this, "Минимум 5 карточек для начала игры!");
        return
    }

    bdGame.finaltext = finalText.value.trim();

    liElements.forEach(li => {
        const p = li.querySelector("p");
        const input = li.querySelector("input");
        if (p && input) {
            const fileName = p.textContent.trim().replace(/ -$/, "");
            const description = input.value.trim();
            bdGame.cards[fileName] = {
                isGuessed: false,
                description
            };
        }
    });

    saveToLocalStorage();
    btnLSG.disabled = true;
    btnSG.disabled = false;
}

function handlerBtnCD() {
    clearLocalStorage();
    resetBD();
    clearListOfDesrImg();
}

function handlerAddDescr() {
    const file = document.getElementById("nameImg");
    const descrText = document.getElementById("descrImg");
    const listDescr = document.getElementById("descrList");

    function pushImg(img) {
        for (let nameImg of bdGame.imgName) {
            if (img === nameImg) return false;
        }

        bdGame.imgName.push(img);
        return true
    }

    if (file.files.length === 0) {
        file.classList.add("error")
        return
    }

    if (!descrText.value.trim()) {
        descrText.classList.add("error");
        return;
    }

    if (!pushImg(file.files[0].name)) {
        descrText.classList.add("error");
        descrText.value = "Вы уже описали это изображение! Исправьте описание ниже или выберите новое изображение!";
        return
    }

    const liDescr = getLiElemDescr(file.files[0].name, descrText.value, false);

    listDescr.append(liDescr);

    file.value = "";
    descrText.value = "";
}
//////////////////

// block create game //
// create elements
function createCreateGameBlock() {
    const blockCreateGame = creatEl("div", "containerCG", "container flex flex__column");

    const wrapperButtonSG = creatEl("div", "", "wrapper wrapperBtnSG flex");
    const wrapperInputs = creatEl("div", "", "wrapper wrapperInputs flex");

    const buttonLSG = creatEl("button", "btnLoadSaveGame", "btn btnLoadSaveGame flex", "Загрузить\u00A0игру");
    buttonLSG.disabled = true;
    const buttonCG = creatEl("button", "btnCreateGame", "btn btnCreateGame flex", "Сформировать\u00A0игру");
    const buttonCD = creatEl("button", "btnClearData", "btn btnClearData flex", "Очистить\u00A0данные");
    const buttonSG = creatEl("button", "btnStartGame", "btn btnStartGame flex", "Играть");
    buttonSG.disabled = true;
    wrapperButtonSG.append(buttonLSG, buttonCG, buttonCD, buttonSG);

    const wrapperFinalText = creatEl("div", "", "wrapper wrapperVictory flex flex__column");
    const descrTitle = creatEl("div", "", "descrTitleVictory", "Введите фразу для прочтения, после победы");
    const textOfVictory = creatEl("textarea", "descrTextVictory", "textareaDescr textareaDescrVictory");
    textOfVictory.placeholder = "Введите фразу!";
    textOfVictory.readOnly = false;
    wrapperFinalText.append(descrTitle, textOfVictory);

    const inputFile = creatEl("input", "nameImg", "input inputF");
    inputFile.type = "file";
    inputFile.accept = '.png, .jpg, .jpeg, image/png, image/jpeg';
    const textImgDescr = creatEl("textarea", "descrImg", "textareaDescr");
    textImgDescr.placeholder = "Добавте описание!"
    const buttonAddDescr = creatEl("button", "btnAddCard", "btn btnAddCard", "Добавить карточку");
    const wrapBtnInputs = creatEl("span", "", "wrapBtnInputs flex flex__column");
    wrapBtnInputs.append(inputFile, buttonAddDescr)
    wrapperInputs.append(wrapBtnInputs, textImgDescr);

    const description = creatEl("ol", "descrList", "listDescr");

    blockCreateGame.append(wrapperButtonSG, wrapperFinalText, wrapperInputs, description);

    return {
        blockCreateGame,
        buttonLSG,
        buttonCG,
        buttonCD,
        buttonSG,
        textOfVictory,
        inputFile,
        textImgDescr,
        buttonAddDescr,
    }
}
// render block
function renderStartApp() {
    const {
        blockCreateGame,
        buttonLSG,
        buttonCG,
        buttonCD,
        buttonSG,
        textOfVictory,
        inputFile,
        textImgDescr,
        buttonAddDescr,
    } = createCreateGameBlock();

    renderBlock(blockCreateGame);

    const saveGame = hasSavedGame();
    if (saveGame) {
        buttonLSG.disabled = false;
    }

    buttonLSG.addEventListener("click", handlerBtnLSG);

    buttonCG.addEventListener("click", handlerBtnCG);

    buttonCD.addEventListener("click", handlerBtnCD);

    buttonSG.addEventListener("click", renderGame);

    buttonAddDescr.addEventListener('click', handlerAddDescr);

    [inputFile, textImgDescr, textOfVictory].forEach((elem) => elem.addEventListener('click', function () {
        const classList = this.classList;

        if (classList.contains("error")) {
            classList.remove("error");
        }
    }));
}

// block game //
// create elements
function createGameBlock() {
    const blockGame = creatEl("div", "game", "game flex flex__column");
    const wrapDescr = creatEl("div", "descrRandImg", "wpapDescrRandImg flex");
    const wrapGame = creatEl("ul", "bodyGame", "listCards flex");

    blockGame.append(wrapDescr, wrapGame)
    return {
        blockGame,
        wrapDescr,
        wrapGame,
    }
}

// create elements answer form
function createAnswerForm(status) {
    let firstWord = null;
    let secondWord = null;
    let randomImgForm = null;
    const symanticImg = creatEl("img", "", "symanticImg")

    if (status) {
        firstWord = "ДА";
        secondWord = "Правильно!";
        randomImgForm = getRandomStaticImg("success", bdStaticImg.imgSuccess, "", "imgAnswerForm");
        symanticImg.src = "./static/success/Success.gif";
    } else {
        firstWord = "НЕТ";
        secondWord = "Не правильно!";
        randomImgForm = getRandomStaticImg("fail", bdStaticImg.imgFail, "", "imgAnswerForm");
        symanticImg.src = "./static/fail/Fail.gif"
    }

    const overflow = creatEl("div", "answerForm", "overAnswer flex flex__column");
    const wrapForm = creatEl("div", "", "warpAnswer flex flex__column");
    const wrapFirstText = creatEl("div", "", "wrapSymantic flex");
    const elFirstText = creatEl("p", "", "firstTextForm", firstWord);
    const elSecondText = creatEl("p", "", "secondTextForm", secondWord);
    const buttonClsForm = creatEl("button", "", "btn btnClose flex flex__column", "Дальше!");
    buttonClsForm.addEventListener("click", () => overflow.remove());

    wrapFirstText.append(symanticImg, elFirstText);
    wrapForm.append(wrapFirstText, randomImgForm, elSecondText, buttonClsForm);
    overflow.append(wrapForm);

    return {
        buttonClsForm,
        overflow,
    };
}

function renderGame() {
    const root = document.getElementById("root");
    const listCards = Object.entries(bdGame.cards);
    const listImgName = bdGame.imgName.filter(name => !bdGame.cards[name].isGuessed);
    const listRandomCards = shuffleArray(listCards);

    function isVictory() {
        return listImgName.length === 0
    }

    function handleVictory() {
        const textVictory = bdGame.finaltext;
        clearLocalStorage();
        resetBD();
        renderVictoryApp(textVictory);
    }

    function appendRandomDescr(index) {
        if (listImgName.length === 0) return null;

        const randomImgGame = listImgName[index];
        const randomImgDescr = bdGame.cards[randomImgGame].description;
        const elTextDescr = creatEl("p", "", "textDescrImg", randomImgDescr);

        wrapDescr.innerHTML = '';
        wrapDescr.append(elTextDescr);
        return randomImgGame;
    }

    const {
        blockGame,
        wrapDescr,
        wrapGame,
    } = createGameBlock();

    let randomIndex = getRandomIndex(listImgName.length);

    let randomImg = appendRandomDescr(randomIndex);

    if (randomImg === null) return;

    listRandomCards.forEach((card) => {
        const nameCard = card[0];
        const statusCard = card[1].isGuessed;

        const cardGame = creatEl("li", nameCard, "card flex flex__column");
        if (statusCard) {
            cardGame.classList.add("successCard");
        } else {
            cardGame.classList.add("isSuccess");
        };
        const wrapImg = creatEl("div", `wrapImg${nameCard}`, "wrapImgCard flex");
        const imgCard = creatEl("img", "", "cardImg");
        imgCard.src = `./imgGame/${nameCard}`;

        wrapImg.append(imgCard);
        cardGame.append(wrapImg);

        wrapGame.append(cardGame);

        cardGame.addEventListener("click", function () {
            if (this.classList.contains("successCard") || (bdGame.cards[this.id].isGuessed === true)) return;

            const statusAnswer = this.id === randomImg
            const { buttonClsForm, overflow } = createAnswerForm(statusAnswer);

            if (statusAnswer) {
                bdGame.cards[randomImg].isGuessed = true;
                saveToLocalStorage();

                this.classList.remove("isSuccess");
                this.classList.add("successCard");

                listImgName.splice(randomIndex, 1);

                if (isVictory()) {
                    this.classList.add("lastSuccesCard");
                    setTimeout(handleVictory, 2000);
                    return;
                }

                buttonClsForm.addEventListener("click", () => {
                    setTimeout(() => {
                        randomIndex = getRandomIndex(listImgName.length);
                        randomImg = appendRandomDescr(randomIndex);
                    }, 150);
                });
            }

            if (root) root.append(overflow);
        })
    })

    if (linkAbout) linkAbout.remove();
    renderBlock(blockGame);
}

// block victory //
// create elements
function createVictoryBlock(finalText) {
    const blockVictory = creatEl("div", "victory", "victoryBlock flex flex__column");
    const wrap = creatEl("div", "", "wrapVictoryEl flex flex__column")

    const imgVictory = getRandomStaticImg("victory", bdStaticImg.imgsOfVictory, "", "imgVictory");
    const textVictory = finalText;
    const textVictoryElem = creatEl("p", "", "textOfVictory", `${textVictory}`);
    wrap.append(imgVictory, textVictoryElem);
    blockVictory.append(wrap);
    return blockVictory
}
// render block
function renderVictoryApp(finalText) {
    const vicktory = createVictoryBlock(finalText);

    renderBlock(vicktory);

    vicktory.addEventListener("click", () => {
        const newGame = confirm("Сыграем снова?");
        if (newGame) {
            renderStartApp();
        } else { window.close() }
    });
}

// render //
document.addEventListener("DOMContentLoaded", () => {
    renderStartApp();
})
