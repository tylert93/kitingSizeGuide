document.addEventListener("DOMContentLoaded", () =>{
    
    const weightButtons = document.querySelectorAll(".weight-unit"),
          speedButtons = document.querySelectorAll(".speed-unit"),
          speedDisplay = document.querySelector("#speed-display"),
          speedInput = document.querySelector("#speedInput"),
          weightInput = document.querySelector("#weightInput"),
          kiteSizeDisplay = document.querySelector("#kite-size-display"),
          boardSizeDisplay = document.querySelector("#board-size-display");

    let weightUnitFactor = 1,
        speedUnitFactor = 1;

    calcKiteSize();
    calcBoardSize();

    weightButtons.forEach(function(item){

        item.addEventListener("click", function(){

            let previousWeightUnit = document.querySelector(".selectedWeight").getAttribute("unit"),
                currentWeightUnit = this.getAttribute("unit");

            weightButtons.forEach(function(item){
                item.classList.remove("selectedWeight");
            })

            this.classList.add("selectedWeight");

            if(previousWeightUnit === "kg" && currentWeightUnit === "lb"){
                weightInput.value = Math.round(weightInput.value * 2.20462);
                weightUnitFactor = 0.453592; 
            } else if (previousWeightUnit === "lb" && currentWeightUnit === "kg"){
                weightInput.value = Math.round(weightInput.value * 0.453592);
                weightUnitFactor = 1;
            }

            calcKiteSize();
            calcBoardSize();
        })  
        
    })

    speedButtons.forEach(function(item){
        item.addEventListener("click", function(){

            let previousSpeedUnit = document.querySelector(".selectedSpeed").getAttribute("unit"),
                currentSpeedUnit = this.getAttribute("unit");

            speedButtons.forEach(function(item){
                item.classList.remove("selectedSpeed");
            })

            this.classList.add("selectedSpeed");           

            //convert units 
            if(previousSpeedUnit === "kts" && currentSpeedUnit === "kmh"){
                speedInput.setAttribute("max", 75);
                speedInput.value *= 1.852;
                speedUnitFactor = 0.539957;
            } else if(previousSpeedUnit === "kts" && currentSpeedUnit === "ms"){
                speedInput.value *= 0.514444;
                speedInput.setAttribute("max", 21);
                speedUnitFactor = 1.94384;
            } else if(previousSpeedUnit === "kmh" && currentSpeedUnit === "kts"){
                speedInput.value *= 0.539957;
                speedInput.setAttribute("max", 40);
                speedUnitFactor = 1;
            } else if(previousSpeedUnit === "kmh" && currentSpeedUnit === "ms"){
                speedInput.value *= 0.277778;
                speedInput.setAttribute("max", 21);
                speedUnitFactor = 1.94384;
            } else if(previousSpeedUnit === "ms" && currentSpeedUnit === "kts"){
                speedInput.setAttribute("max", 40);
                speedInput.value *= 1.94384;
                speedUnitFactor = 1;
            } else if(previousSpeedUnit === "ms" && currentSpeedUnit === "kmh"){
                speedInput.setAttribute("max", 75);
                speedInput.value *= 3.6;
                speedUnitFactor = 0.539957;
            }

            speedDisplay.innerHTML = speedInput.value;

            calcKiteSize();

        })
        
    })

    speedInput.addEventListener("input", function(){
        speedDisplay.innerHTML = this.value;
        calcKiteSize();
    })

    weightInput.addEventListener("input", function(){
        calcKiteSize();
        calcBoardSize();
    })

    function calcKiteSize(){
        var kiteSize = Math.ceil(((weightInput.value * weightUnitFactor)/(speedInput.value * speedUnitFactor)) * 2.5);

        if(kiteSize > 19){
            kiteSize = 19;
        }

        kiteSizeDisplay.innerHTML = kiteSize;
    }

    function calcBoardSize(){
        let weight = weightInput.value * weightUnitFactor;

        if(weight < 68){
            boardSizeDisplay.innerHTML = "130 - 140 cm";
        } else if (weight < 82){
            boardSizeDisplay.innerHTML = "135 - 145 cm";
        } else if (weight < 95){
            boardSizeDisplay.innerHTML = "140 - 150 cm";
        } else if (weight >= 95){
            boardSizeDisplay.innerHTML = "145 - 160 cm";
        }
    }

})