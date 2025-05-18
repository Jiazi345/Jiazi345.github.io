document.addEventListener("DOMContentLoaded", async()=>{

//#region change color while mouse on 
    let TitleBoxElems=document.getElementsByClassName('TitleBoxElems');
    let OriginColor="rgb(0,0,0)";
    let hoverColor="rgb(0, 140, 255)";
    if(TitleBoxElems.length!=0)
    {
        OriginColor=TitleBoxElems[0].style.backgroundColor;
    }

    for(let elememt of TitleBoxElems)
    {
        if(elememt.id!="currentPageTitle")
        {
            elememt.addEventListener("mouseover", function() {
                elememt.style.backgroundColor = hoverColor; 
            });
        
            elememt.addEventListener("mouseout", function() {
                elememt.style.backgroundColor =OriginColor; 
            });
        }

    }
    //#endregion

//#region background effects
    //change background color while scorlling
    let backBeginColor=[0,0,0];
    let backEndColor=[43, 63, 94];
    //get stars' original opacity
    let bg_stars=this.document.getElementById("bg_stars");
    let starOpacity=window.getComputedStyle(bg_stars).opacity;

    window.addEventListener("scroll",function(){
        let scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
        let scrollTop = window.scrollY;
        let lerp =1- scrollTop / scrollHeight; 
        document.getElementById("TW_1_body").style.backgroundColor = `rgb(${lerp*(backBeginColor[0])+(1-lerp)*(backEndColor[0])},
        ${lerp*(backBeginColor[1])+(1-lerp)*(backEndColor[1])} , 
          ${lerp*(backBeginColor[2])+(1-lerp)*(backEndColor[2])})`;

        //parallax background scroll
        bg_stars.style.transform = "translateY(" + scrollTop * 0.8 + "px)";
        bg_stars.style.opacity=(lerp==starOpacity?starOpacity:starOpacity-(1-lerp)*(1-lerp));

        //light fade while scrolling
       let bg_light=this.document.getElementById("bottom_light");
       bg_light.style.opacity=(lerp==1?1:1-(1-lerp)*(1-lerp));
        
    });

//add particle effects
//only apply in certain pages
try{
    particlesJS.load('particles-js1', '../Assets/Data/particles.json', function() {
        console.log('Particles.js loaded - callback');
      });
}
catch
{
    console.log("this page do not have particle effect");
}
//#endregion


//#region  expand and uploades texts

let datasource='../Assets/Data/Letters.json';
let letterInfo;
fetch(datasource)
    .then((response)=>{
        return response.json();
    })
    .then((data)=>{
        console.log(data);
        letterInfo=data;
    })
    .catch(
        (err)=>{

        }
    );

//handle click events
let letters=document.querySelectorAll(".hiddenLetter");
letters.forEach(letter => {
    letter.addEventListener("click",function(event){
        const targetId = event.target.dataset.id;
        const curLetter = document.querySelector(`.letter[data-id="${targetId}"]`);
        if (curLetter) {
            if(letterInfo[targetId].IsExpand)
            {
                curLetter.innerHTML="";
                letterInfo[targetId].IsExpand = false;
                letter.textContent="[>>>EXPAND]";
            }
            else
            {
                curLetter.innerHTML += letterInfo[targetId].message;
                curLetter.innerHTML+="<p class='letter_Inscribed'>"+letterInfo[targetId].name+",<br>"+letterInfo[targetId].date+"</p>";
                curLetter.innerHTML+=letterInfo[targetId].attached;
                letterInfo[targetId].IsExpand = true;
                letter.textContent="[>>>FOLD]";
            }
        }
    
    });
});
//#endregion

//#region adjust Title img size when size change
    
    let titleContainer=document.getElementById("TitleBox");

    const resizeObserver = new ResizeObserver(entries => {

        for (let entry of entries) {
            const { width, height } = entry.contentRect;
                        
            const fontSize = Math.min(height/2,100); 
            const imgSize=Math.min(height/2,100);

            const gridItem = document.querySelector('#titles');//get titles black        

            gridItem.style.fontSize = `${fontSize/4}px`; // adjust font
           // gridItem.style.marginleft=`${fontSize}px`;
           //gridItem.style.padding = `${fontSize / 2}px`; // adjust padding
                // if(gridItem.querySelector('img'))
                // {
                //     gridItem.querySelector('img').style.height=`${imgSize}px`;
                // }    

        }
     });

    //listen to title grid
    resizeObserver.observe(titleContainer);

//#endregion

  //  let background=document.getElementsByClassName("ContentBox");
  //  console.log( $(background[0]).css("border-image-slice"));
 //   console.log("background",background[0].style);

});