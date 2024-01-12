function setAlarm(){
    let selector = document.getElementById("alarmTime").value;
    let timeOnly = new Date().toLocaleDateString() + ' ' + selector;
    let alarm = new Date(timeOnly);
    let timeToAlarm = alarm - new Date();
    console.log(selector, alarm);
    if(timeToAlarm<0){
        timeToAlarm += 86400000
    }
    console.log(timeToAlarm)
    setTimeout(()=>{
        var audio = new Audio('alarmSound.mp3');
        audio.play();
        setTimeout(()=>{ 
          audio.pause()
        },5000)
    },timeToAlarm)
}
const hr = document.getElementById("hours")
const min = document.getElementById("minutes")
const sec = document.getElementById("seconds")
setInterval(()=>{
    const dto = new Date()
    hr.textContent = dto.getHours()
    min.textContent = dto.getMinutes()
    sec.textContent = dto.getSeconds()
},1000)