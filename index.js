const canvas=document.querySelector('canvas');
const c=canvas.getContext('2d')
canvas.width=1024
canvas.height=576
c.fillRect(0,0,canvas.width,canvas.height)

const gravity=0.7
const background=new Sprite({
    position:{
        x:0,
        y:0
    },
    imageSrc:"./img/background.jpeg"  
})

const shop=new Sprite({
    position:{
        x:600,
        y:128
    },
    imageSrc:'./img/shop_anim.png',
    scale:2.75,
    framemax:6
})

const player =new Fighter({
    position:{
    
    x:0,
    y:0
},
velocity:{
    x:0,
    y:0
},
offset:{
    x:0,
    y:0
},
imageSrc:'./img/Sprite/idle.png',
framemax:8,
scale:2.5,
offset:{
    x:215,
    y:157
},
sprites:{
    idle:{
imageSrc:'./img/Sprite/idle.png',
framemax:8,
    },
    run:{
        imageSrc:'./img/Sprite/Run.png',
        framemax:8,
            },
            jump:{
                imageSrc:'./img/Sprite/jump.png',
                framemax:2,
                    },
                    fall:{
                        imageSrc:'./img/Sprite/Fall.png',
                        framemax:2,
                            },
      attack1:{
              imageSrc:'./img/Sprite/Attack1.png',
             framemax:6
             },
             takehit:{
                imageSrc:'./img/Sprite/Take Hit - white silhouette.png',
               framemax:4
               },
               death:{
                imageSrc:'./img/Sprite/Death.png',
                framemax:6
               }

},attackBox:{
    offset:{
        x:100,
        y:50
    },
    width:160,
    height:50
}


})


const enemy =new Fighter({
    position:{
    
    x:400,
    y:100
},
velocity:{
    x:0,
    y:0
},
color:'blue',
offset:{
    x:-50,
    y:0
},
imageSrc:'./img/Sprites/idle.png',
framemax:4,
scale:2.5,
offset:{
    x:215,
    y:167
},
sprites:{
    idle:{
imageSrc:'./img/Sprites/idle.png',
framemax:4
    },
    run:{
        imageSrc:'./img/Sprites/Run.png',
        framemax:8
            },
            jump:{
                imageSrc:'./img/Sprites/jump.png',
                framemax:2
                    },
                    fall:{
                        imageSrc:'./img/Sprites/Fall.png',
                        framemax:2
                            },
                            attack1:{
                                imageSrc:'./img/Sprites/Attack1.png',
                                framemax:4
                                    },
                                    takehit:{
                                        imageSrc:'./img/Sprites/Take hit.png',
                                        framemax:3
                                    },
                                    death:{
                                        imageSrc:'./img/Sprites/Death.png',
                                        framemax:7
                                       }

},attackBox:{
    offset:{
        x:-170,
        y:50
    },
    width:170,
    height:50
}
})

const keys={
    a:{
        pressed:false
    },
    d:{
        pressed:false
    },
    w:{
        pressed:false
    },
    ArrowLeft:{
        pressed:false
    },
    ArrowRight:{
        pressed:false
    }
}

decreasetimer()


// animation  function
function animate(){
    requestAnimationFrame(animate)
    c.fillStyle='black'
    c.fillRect(0,0,canvas.width,canvas.height)
    
    background.update()
    shop.update()
    c.fillStyle='rgba(255,255,255,0.15)'
c.fillRect(0,0,canvas.width,canvas.height)
    player.update()
    enemy.update()

       player.velocity.x=0
       enemy.velocity.x=0
// player movement
    if(keys.a.pressed && player.lastkey==='a'){
        player.velocity.x=-5
        player.switchSprite('run')
    }else if(keys.d.pressed && player.lastkey==='d'){
        player.velocity.x=5
        player.switchSprite('run')

    }else {
player.switchSprite('idle')

    }

    //jumping
    if(player.velocity.y<0){
       player.switchSprite('jump')
    }else if (player.velocity.y>0){
       player.switchSprite('fall')

    }

// enemy movement

    if(keys.ArrowLeft.pressed && enemy.lastkey==='ArrowLeft'){
        enemy.velocity.x=-5
        enemy.switchSprite('run')

    }else if(keys.ArrowRight.pressed && enemy.lastkey==='ArrowRight'){
        enemy.velocity.x=5
        enemy.switchSprite('run')

    }else {
        enemy.switchSprite('idle')
          }
          if(enemy.velocity.y<0){
            enemy.switchSprite('jump')
         }else if (enemy.velocity.y>0){
            enemy.switchSprite('fall')
     
         }

   
    //detect for collision
    if(rectangularCollistion({
        rectangle1:player,
        rectangle2:enemy})
        && player.isAttacking&& player.framecurrent===4){
            enemy.takehit()
            player.isAttacking=false
            gsap.to('#eh',{
                width:enemy.health +'%'
            })
    }
    //misses
    if(player.isAttacking&&player.framecurrent===4){
        player.isAttacking=false
    }
// player get hit
    if(rectangularCollistion({
        rectangle1:enemy,
        rectangle2:player})
        && enemy.isAttacking&&enemy.framecurrent===2){
            player.takehit()
            enemy.isAttacking=false
            gsap.to('#ph',{
                width:player.health +'%'
            })
    }
    if(enemy.isAttacking&&enemy.framecurrent===2){
        enemy.isAttacking=false
    }
   
    // end the game based on health
    if(enemy.health<=0||player.health<=0){
        determinewinner({player,enemy,timerid})
    }
}
animate()

addEventListener('keydown',(event)=>{
    if(!player.dead){
    switch(event.key){
        case'd':
        keys.d.pressed=true
     player. lastkey='d'
        break
        case'a':
        keys.a.pressed=true
     player. lastkey='a'
        break
        case'w':
      player.velocity.y=-20
        break
        case' ':
        player.attack()
        break
        
    }
}
if(!enemy.dead){
    switch(event.key){
        case'ArrowRight':
        keys.ArrowRight.pressed=true
        enemy.lastkey='ArrowRight'
        break
        case'ArrowLeft':
        keys.ArrowLeft.pressed=true
        enemy.lastkey='ArrowLeft'

        break
        case'ArrowUp':
      enemy.velocity.y=-20
     
        break
        case'ArrowDown':
enemy.attack()       
          break
    }
}
})
addEventListener('keyup',(event)=>{
    switch(event.key){
        case'd':
        keys.d.pressed=false
    
        break
        case'a':
        keys.a.pressed=false
        break
    }  

        switch(event.key){
            case'ArrowRight':
            keys.ArrowRight.pressed=false
        
            break
            case'ArrowLeft':
            keys.ArrowLeft.pressed=false
            break
            case'ArrowDown':
            enemy.isAttacking=false
           
              break
        }
    
})