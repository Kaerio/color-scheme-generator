const colorPickerInput = document.getElementById('color-picker-input')
const selectModeInput = document.getElementById('select-mode-input')
const getColorBtn = document.getElementById('get-color-btn')
const scheme = document.getElementById('scheme')

// choose the number of colors to display (seed color not included)
const colorCount = 4

function renderScheme(){
    const hexValue = colorPickerInput.value.substring(1)  //remove the #

    fetch(`https://www.thecolorapi.com/scheme?format=json&hex=${hexValue}&count=${colorCount}&mode=${selectModeInput.value}`)
        .then(res => res.json())
        .then(data => {
            //Create the first column that correspond to the input color value (seed)
            let bgColor = data.seed.hex.value

            let html = `<div class="color-container">
                            <div class="color" style="background-color: ${bgColor}" data-bg="${bgColor}"></div>
                            <div class="hex-value" data-bg="${bgColor}">${bgColor}</div>
                        </div>`
            
            //Create the rest of the columns
            for (let i = 0; i < colorCount; i++) {
                bgColor = data.colors[i].hex.value

                html += `
                    <div class="color-container">
                        <div class="color" style="background-color: ${bgColor}" data-bg="${bgColor}"></div>
                        <div class="hex-value" data-bg="${bgColor}">${bgColor}</div>
                    </div>`
            }
            
            scheme.innerHTML = html
        })
}

renderScheme()

//Copy color to clipboard
document.addEventListener('click', function(e){
    if (e.target.dataset.bg){
        navigator.clipboard.writeText(e.target.dataset.bg);

        alert("Copied to clipboard: " + e.target.dataset.bg);
    }
})

getColorBtn.addEventListener('click', renderScheme)

