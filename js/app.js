
class BoredActivity{
    ajax;
    content;
    url;
    constructor(category){
        this.ajax = new XMLHttpRequest();
        this.url = "http://www.boredapi.com/api/activity?type="+category;
    }

    getNewActivity(){
        let myActivity=this;
        this.ajax.onreadystatechange = function(){
            if(this.readyState==4 && this.status == 200){
                myActivity.content=JSON.parse(this.responseText);
                let h2 = document.createElement("h2");
                h2.innerText = myActivity.content.activity;
                let h3_1 = document.createElement("h3");
                h3_1.innerText = "accessibility :" + myActivity.content.accessibility;
                let h3_2 = document.createElement("h3");
                h3_2.innerText = "participants :" + myActivity.content.participants;
                let h3_3 = document.createElement("h3");
                h3_3.innerText = "price :" + myActivity.content.price;
                let html = document.getElementById("activity");
                html.innerHTML = "";
                html.appendChild(h2);
                html.appendChild(h3_1);
                html.appendChild(h3_2);
                html.appendChild(h3_3);
            }else if(this.readyState!=4){
                let html = document.getElementById("activity");
                html.innerHTML = "<h2> Loading... </h2>";
            }
            else{
                let html = document.getElementById("activity");
                html.innerHTML = "an error occured";
            }
        }
        this.ajax.open("GET", this.url , true);
        this.ajax.send();
    }

}


let buttons=document.querySelectorAll("button");

for(let i=0; i<buttons.length;i++){
    buttons[i].addEventListener("click", function(){
        let activity = new BoredActivity(buttons[i].innerText);
        activity.getNewActivity();
       

    })
}

