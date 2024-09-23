# QR Code Generator

Project made to showcase my skills when it comes to interacting with APIs and user interaction beyond mere common usage. I also liked to play a bit with the shadows of the different elements to add more flavour to what once was an extremely simple & boring UI. 

# Run Requirement

Requires "Live Server" extension found on VS Code store.
You can get it here: https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer

# Features & Usage

- The user can paste/type a URL via an input field so they can generate a QR code from https://goqr.me/ (respect their terms and rights).
- If the user pasted or typed a valid URL, a QR code should be generated correctly (unless there is a connection in either user's end or goqr's).
- These QRs can then be downloaded, printed or copied to the clipboard and used for personal use.
- About storing the last used link: If the user decides to print or reload the page, the program will automatically re-fetch from API with a stored link located in "sessionStorage". That way, the user won't have to paste/type the URL once again, removing said inconvenience. The user can also manually delete the stored link with a simple click of a button.

[!CAUTION]
Known Bugs: 
- When downloading or copying the QR, the print button will still work but there won't be any QR to print. It is solved with a page reload. 
- When generating a code for the first time, if hovering over the "delete stored link button", "tippy" won't show the newly stored URL until a page reload.