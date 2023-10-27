var index=1;
        changeImge = function()
        {
            document.getElementById('img').style.backgroundImage = "url(IMG/background.jpg)";
            var imgs = ["./IMG/background.jpg","./IMG/background_1.jpg","./IMG/background_2.jpg","./IMG/background_3.jpg"];
            switch (index) {
                case 1:
                    document.getElementById('img').style.backgroundImage = "url(IMG/background_1.jpg)";
                    break;
                
                case 2:
                    document.getElementById('img').style.backgroundImage = "url(IMG/background_2.jpg)";
                    break;
                
                case 3:
                    document.getElementById('img').style.backgroundImage = "url(IMG/background_3.jpg)";
                    break;
                
                case 0:
                    document.getElementById('img').style.backgroundImage = "url(IMG/background.jpg)";
                    break;
            }
            index++;
            if(index==4) index = 0;
        }
        setInterval(changeImge,2500);