var index=1;
        changeImge = function()
        {
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
        setInterval(changeImge,4000);

        function reveal() {
            var reveals = document.querySelectorAll(".reveal");
          
            for (var i = 0; i < reveals.length; i++) {
              var windowHeight = window.innerHeight;
              var elementTop = reveals[i].getBoundingClientRect().top;
              var elementVisible = 150;
          
              if (elementTop < windowHeight - elementVisible) {
                reveals[i].classList.add("active");
              } else {
                reveals[i].classList.remove("active");
              }
            }
          }
          window.addEventListener("scroll", reveal);