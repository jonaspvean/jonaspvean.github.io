
const isOutOfQuartz = () => {
    // this function catches whether the current page is out of the Quartz environment given that it isn't locally hosted
    const isInQuartz: boolean = (window.location.href.indexOf("notes/public") !=-1)
    const isLocallyHosted: boolean = (window.location.href.indexOf("localhost") !=-1)
    
    if (isLocallyHosted) {
        console.log("isOutOfQuartz status: site is locally hosted")
        return false
    }
    else if (!isLocallyHosted && !isInQuartz) {
        return true
    }
    else {
        return false
    }
}

const instantPageRedirect = () => {
    // redirects a page into itself instantaneously so as to refresh it and remove emitted files
    // from the Quartz environment
    if (isOutOfQuartz()) {
        const url = window.location.href
        var metaElement = document.createElement('meta')
        metaElement.httpEquiv="refresh"
        metaElement.content=`0; url = ${url}`
        document.head.appendChild(metaElement)
        console.log(metaElement)
    }
}

document.addEventListener("nav", () => {
    // once we trigger a navigation, we check if an instant reload is needed
    instantPageRedirect()
})


