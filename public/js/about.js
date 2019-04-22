{
  window.onload = ()=>{
    card_rotate()
  }
  /**
   * 内部的方法，使卡片进行翻转
   */
  let card_rotate = function(){
    // //鼠标移入事件监听
    // card_area.addEventListener("mouseover",e=>{
    //   e.preventDefault
    //   //移入正面卡片
    //   if(e.target.dataset.card === "front"){
    //     console.log(e.target)
    //     //正面卡片和反面卡片翻转
    //     e.target.style.transform = "rotateY(180deg)"
    //     e.target.parentElement.children[1].style.transform = "rotateY(0deg)"
    //   }  
    // })
    // //鼠标移出事件监听
    // card_area.addEventListener("mouseout",e=>{
    //   e.preventDefault
    //   //移出反面卡片
    //   if(e.target.dataset.card === "back"){
    //     console.log(e.target)
    //     //正面卡片和反面卡片翻转
    //     e.target.style.transform = "rotateY(180deg)"
    //     e.target.parentElement.children[0].style.transform = "rotateY(0deg)"
    //   }
    // })
    //遍历card元素，绑定鼠标事件
    for(let i = 0,cards = card_area.children,len = cards.length; i < len; i++ ) {
      //移入正面卡片
      cards[i].children[0].onmouseenter  = e => {
        e.preventDefault
        //正面卡片和反面卡片翻转
        e.target.style.transform = "rotateY(180deg)"
        e.target.parentElement.children[1].style.transform = "rotateY(0deg)"
      }
      //移出反面卡片
      cards[i].children[1].onmouseleave = e => {
        e.preventDefault
        //正面卡片和反面卡片翻转,延时0.5s
        setTimeout(()=>{
          e.target.style.transform = "rotateY(180deg)"
          e.target.parentElement.children[0].style.transform = "rotateY(0deg)"
        },500)
      }
    }
  }

}