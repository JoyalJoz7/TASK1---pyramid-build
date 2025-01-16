const main_container = document.querySelector('.main-container')
const pyramid_container = document.querySelector('.pyramid-container')
const play = document.querySelector('.play-btn')
const pause = document.querySelector('.pause-btn')
const activecircle = document.querySelector('.pyramid.active .circle')

let timeoutids = []
let isPaused = false
let currentIndex = 0
let totalPyramids = 0

function pyramidbuild(rows){
    pyramid_container.innerHTML = ''
    for(let i=1;i<=rows;i++){
        const pyr = document.createElement('div')
        pyr.classList.add('pyramid')

        for(let j=1; j<=i;j++){
            // pattern +='$ '
            const circle = document.createElement('div')
            circle.classList.add('circle')
            pyr.appendChild(circle)
        }
        pyramid_container.appendChild(pyr)
        // let pattern ='';
        
    }
}

// let timeoutid
// function pyramidcolorOverlap(){
//     const pyramids = document.querySelectorAll('.pyramid-container .pyramid')
//     pyramids.forEach((pyramid,index )=> {
//      timeoutid = setTimeout(() => {
//         pyramid.classList.add('active')
//         pyramids[index-1].classList.remove('active')
//         if(pyramid.classList.contains('active')){
//             const circles = document.querySelectorAll('.circle')
//             circles.forEach(circle => {
//                 circle.style.backgroundColor = color_val
//             })
//             console.log(index)
//         }
//       },index * delay_val)  
//       pause.addEventListener('click',() => {
//       clearTimeout(timeoutid)
//     })
//     })
// }

// play.addEventListener('click',() =>{
//     pyramidcolorOverlap()
// })

let timeoutid
function pyramidcolorOverlap(){
    // if(activecircle){
    //     activecircle.style.backgroundColor = color_val
    // }
    const pyramids = document.querySelectorAll('.pyramid-container .pyramid')
    function activatePyramid(index){
        if(isPaused) return
        pyramids.forEach((pyr, i) => pyr.classList.remove('active')) // Remove active from all
        if (index < pyramids.length) {
            pyramids[index].classList.add('active')
            currentIndex = index
            timeoutids.push(setTimeout(() => activatePyramid((index + 1) % pyramids.length), delay_val))
        }
    }
    activatePyramid(currentIndex)
}

play.addEventListener('click', () => {
    if (!isPaused) {
        currentIndex = 0 // Restart from the beginning
    }
    isPaused = false
    pyramidcolorOverlap()
})

pause.addEventListener('click', () => {
    isPaused = true
    timeoutids.forEach(clearTimeout)
    timeoutids = []
})

const refresh = document.querySelector('#refresh')
refresh.addEventListener('click', () => {
    location.reload()
})


const rows = document.getElementById('rows-inp')
let row_val = 0
rows.addEventListener('input', (e) => {
    row_val = e.target.value
})

rows.addEventListener('keypress',function(event){
    if(event.key === 'Enter'){
        pyramidbuild(row_val)
    }
})


const color = document.getElementById('color')
let color_val = ''
color.addEventListener('input',(e) => {
    color_val = e.target.value
    // console.log(color_val)
})

const delay = document.getElementById('delay')
let delay_val = 500
delay.addEventListener('input',(e) => {
    delay_val = e.target.value
})

// TITLE SCREEN 

const start =document.querySelector('.start-banner')
const start_head = document.querySelector('.start-banner h3')

document.addEventListener('click',() => {
    start.style.opacity = '0'
    start.style.zIndex = '-4'
    start_head.style.display = 'none'
    main_container.style.opacity ='1'
})