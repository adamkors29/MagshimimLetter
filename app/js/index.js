const daniel_hashed_name = "307f553de10228735f047229c1abc64fc001627af13665c1e7e695a2b589f578"

$("#main input").on("input", function () {
    hashText($(this).val()).then(hash => {
        if (hash === daniel_hashed_name) {
            $("#main").slideUp(600)
            setTimeout(() => {
                fetch("./17203.txt")
                    .then(response => response.text())
                    .then(text => {
                        $("#main").text(text)
                            .addClass("logged")
                            .slideDown(600)
                    })
            }, 1500)
        }
    })
})

async function hashText(text) {
    let hashBuffer = await crypto.subtle.digest('SHA-256', (new TextEncoder()).encode(text))
    let hashArray = Array.from(new Uint8Array(hashBuffer))
    let hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('')

    return hashHex
}