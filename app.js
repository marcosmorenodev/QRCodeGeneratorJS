//DOM Related Variables

const inputEl = document.getElementById("link-input");
const URLIcon = document.getElementById("url-icon");
const convertBtn = document.createElement("button");
const qrContainer = document.querySelector(".qr__container.hidden");
const qrImgContainer = document.getElementById("img-container");
const qrImg = document.getElementById("qr-img"); 
const downloadBtn = document.getElementById("download-btn");
const printBtn = document.getElementById("print-btn");
const copyBtn = document.getElementById("copy-btn");
const deleteBtn = document.getElementById("delete-btn");
const errorWrapper = document.getElementById("error-wrapper");
const errorContainer = document.querySelector(".error__container.hidden");
const errorEl = document.getElementById("error-msg");
const message = document.createElement("h1");

//==============================//

const storedLink = sessionStorage.getItem("storedLink");

function createQRCode(userInput) {
    //* Since the input has a minLength of 8, this (kind of) also prevents the user from writing an URL that doesn't start with "https://". Furtherly improving error handling.

    if (userInput === "" || userInput.length <= 8 || !userInput.toLowerCase().startsWith("https://")) { 
        const err = "You need to paste/type a valid link!";
        
        handleError(err);
    } 

    else {
        if (qrContainer.contains(message)) { qrContainer.removeChild(message); }

        try {
            const userLink = "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=" + userInput;
            
            sessionStorage.setItem("storedLink", userInput); //* Stores the link
    
            qrImg.src = userLink;
    
            (qrContainer.classList).remove("hidden");
            (qrImgContainer.classList).remove("hidden");
        }

        catch {
            const err = "Connection Error. Try again later!"; 

            handleError(err);
        }
    }
}

async function downloadQRCode() {
    const qrImgURL = qrImg.src;

    try {
        const res = await fetch(qrImgURL);

        if (!res.ok) { handleError(res.statusText); }

        const blob = await res.blob();
        const createdURL = URL.createObjectURL(blob);

        const link = document.createElement("a");
        link.href = createdURL;
        link.download = "qr-code.png"; //*The downloaded IMG will be named as this
    
        link.click(); 
    }

    catch(err) { handleError(err.message); }
}

function printQRCode() {
    const printingArea = qrImgContainer.innerHTML;
    (document.body).innerHTML = printingArea;
    
    window.print();
    (window.location).reload(); //When exiting from function, the page will reload
}

async function copyQRCode() {
    try {
        const qrImgURL = qrImg.src;

        const res = await fetch(qrImgURL);

        if (!res.ok) { handleError(res.statusText); }

        const blob = await res.blob();
        
        navigator.clipboard.write([
            new ClipboardItem( {[blob.type]: blob} )
        ]);

        copyBtn.innerHTML = `
            COPIED
            <i class="fa-solid fa-circle-check"></i>`;
    }

    catch(err) { handleError(err.message); }
}

async function handleError(err) {
    console.log(err);

    errorEl.innerHTML = `<i class="fa-solid fa-triangle-exclamation"></i> ${err} <i <i class="fa-solid fa-triangle-exclamation"></i>`;
    (errorWrapper.classList).remove("hidden");
    
    setTimeout(() => { (errorWrapper.classList).add("hidden"); }, 3500);
}

function deleteStoredLink() {
    sessionStorage.clear();

    (window.location).reload();
}

inputEl.addEventListener( "change", (e => createQRCode((e.target).value)) );

inputEl.addEventListener("focus", () => { URLIcon.classList.add("hidden"); });

inputEl.addEventListener("blur", () => { URLIcon.classList.remove("hidden"); });

inputEl.addEventListener("click", (e) => { (e.target).value = ""; }); //Empties the bar to improve UX (by the user not having to manually delete the link)

downloadBtn.addEventListener("click", downloadQRCode);

printBtn.addEventListener("click", printQRCode);

copyBtn.addEventListener("click", copyQRCode);

deleteBtn.addEventListener("click", deleteStoredLink);

if (storedLink) { 
    inputEl.value = sessionStorage.getItem("storedLink"); 
    createQRCode(inputEl.value);
    
    inputEl.value = "";
    message.textContent = "Previous QR Code:";

    (message.classList).add("message");
    qrContainer.insertAdjacentElement("afterbegin", message);
}

tippy(deleteBtn, {
    content: `URL: ${sessionStorage.getItem("storedLink")}`,
    placement: "bottom"
});