const customInterval = setInterval(() => {
    const header = document.getElementsByTagName("header")[0];
    const header_name = header.getElementsByClassName("cds--header__name")[0];
    // hydrateRoot() adds onclick event so just wait until it appears
    if(typeof header_name.onclick === "function") {
        clearInterval(customInterval);
        customClientRender();
    }
}, 10);

function customClientRender() {
    const header = document.getElementsByTagName("header")[0];
    const content = document.createTextNode("Hi there and greetings!");
    const navigation = document.createElement("div");
    navigation.appendChild(content);
    header.appendChild(navigation);
}