// Way 1
// const select = document.getElementById('select');
// const seats = document.getElementsByClassName('seat');
// const number_seat = document.getElementById('numberseat');
// const price = document.getElementById('price');
// function coutSelect(){
//     let count=0;
//     for(let i=0; i<seats.length; i++){
//         if(seats[i].parentNode.className!='status' && seats[i].classList.contains('Selected')){
//             count++;
//         }
//     }
//     return count;
// }
// select.addEventListener('change', ()=>{
//     upDatePrice(coutSelect()); 
// })
// function upDatePrice(count){
//     number_seat.innerHTML = count;
//     price.innerHTML = select.value*count;
// }
// function myFunction(seat){
//     seat.classList.toggle('Selected');
//     upDatePrice(coutSelect()); 
// }
// for(let i=0; i<seats.length; i++){
//     if(seats[i].parentNode.className!='status'){
//         seats[i].addEventListener('click', ()=> myFunction(seats[i]));
//     }
// }

// Way 2

const select = document.getElementById('select');
const seats = document.querySelectorAll('.column .seat');
const contener = document.querySelector('.allseat');
const amount = document.getElementById('numberseat');
const price = document.getElementById('price');

loadLocalStorage()
function fillHtml(number_seat,priceMV){
    amount.innerHTML=number_seat;
    price.innerHTML =  priceMV * number_seat;
}
function update(){
    const number_seat = document.querySelectorAll('.column .seat.Selected');
    const seats_index = [...number_seat].map(seat => [...seats].indexOf(seat));
    localStorage.setItem('selectedSeat',JSON.stringify(seats_index));
    let priceMovie = select.value;
    fillHtml(number_seat.length,priceMovie);
}
function setMovieData(movieIndex, moviePrice){
    localStorage.setItem('selectedMovieIndex', movieIndex);
    localStorage.setItem('selectedMoviePrice', moviePrice);
}
select.addEventListener('change', (e)=>{
    setMovieData(e.target.selectedIndex,e.target.value);
    update();
});
contener.addEventListener('click', (e) => {
    if(e.target.classList.contains('seat') && !e.target.classList.contains('Occupied')){
        e.target.classList.toggle('Selected');
        update();
    }
});
function loadLocalStorage(){
    let selectedSeatIndex =JSON.parse(localStorage.getItem('selectedSeat'));
    seats.forEach((seat, index) => {
        if(selectedSeatIndex.includes(index)){
            seat.classList.add('Selected');
        }
    });
    let indexFlim = localStorage.getItem('selectedMovieIndex');
    select.selectedIndex = indexFlim;
    let priceFilm = localStorage.getItem('selectedMoviePrice');
    fillHtml(selectedSeatIndex.length,priceFilm);
}