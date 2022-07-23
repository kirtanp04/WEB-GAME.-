
function rectangularCollistion({rectangle1, rectangle2}){
    return(
        rectangle1.attackBox.position.x+rectangle1.attackBox.width>=rectangle2.position.x
        &&rectangle1.attackBox.position.x<=rectangle2.position.x+rectangle2.width
        &&rectangle1.attackBox.position.y+ rectangle1.attackBox.height>=rectangle2.position.y
        &&rectangle1.attackBox.position.y<=rectangle2.position.y+rectangle2.height
    )
}
function determinewinner({player,enemy,timerid}){
    clearTimeout(timerid)
    document.querySelector('#dt').style.display='flex'

    if(player.health===enemy.health){
        document.querySelector('#dt').innerHTML='Tie'
     }
     else if(player.health>enemy.health){
         document.querySelector('#dt').innerHTML='Player 1 wins'
     }
     else if(player.health<enemy.health){
         document.querySelector('#dt').innerHTML='Player 2 wins'
     }
}
let timer=60
let timerid
function decreasetimer(){
    timerid= setTimeout(decreasetimer,1000)
    if(timer>0){
        timer--
        document.querySelector('#timer').innerHTML=timer
    }
    if(timer===0){
       determinewinner({player,enemy,timerid
    })
   
}
}