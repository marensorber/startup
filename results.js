function resultsOnload(){
    let result = localStorage.getItem("resultname")
    let resultinfo = localStorage.getItem("resultinfo")
    if(result != null && resultinfo != null){
        const resnameEl = document.querySelector('#resultname')
        const resinfoEl = document.querySelector('#resulttext')
        resnameEl.textContent = result
        resinfoEl.textContent = resultinfo
        //document.getElementById("resultname") = result
        //document.getElementById("resulttext") = resultinfo
    }else{
        const resnameEl = document.querySelector('#resultname')
        const resinfoEl = document.querySelector('#resulttext')
        resnameEl.textContent = "No result"
        resinfoEl.textContent = "No result information"
        //document.getElementById("resultname") = "No result"
        //document.getElementById("resulttext") = "No result information"
    }
    
}

resultsOnload()